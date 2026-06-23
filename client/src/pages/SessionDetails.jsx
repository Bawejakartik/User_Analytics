import { useParams, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getSessionEvents } from '../api/analyticsApi';
import { useAutoFetch } from '../hooks/useAnalytics';
import EventList from '../components/EventList';
import Loader, { ErrorState, EmptyState } from '../components/Loader';

function StatBadge({ label, value, color }) {
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 flex flex-col items-center gap-1 min-w-[100px]">
      <span className={`text-xl font-bold font-mono ${color}`}>{value}</span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

export default function SessionDetails() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const fetchFn = useCallback(() => getSessionEvents(sessionId), [sessionId]);
  const { data: events, loading, error, refetch } = useAutoFetch(fetchFn);

  const clickCount  = events?.filter(e => e.event_type === 'click').length || 0;
  const pageViews   = events?.filter(e => e.event_type === 'page_view').length || 0;
  const otherEvents = (events?.length || 0) - clickCount - pageViews;

  const uniquePages = events
    ? [...new Set(events.filter(e => e.page_url).map(e => e.page_url))]
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb + back */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/sessions')}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-slate-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Sessions
        </button>
        <span className="text-border">/</span>
        <span className="text-sm font-mono text-brand-400 truncate max-w-[200px]">
          {sessionId?.slice(0, 16)}…
        </span>
      </div>

      {/* Header card */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-100 mb-1">Session Journey</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted">ID:</span>
              <code className="text-xs font-mono text-brand-400 bg-brand-900/30 border border-brand-500/20 px-2 py-0.5 rounded">
                {sessionId}
              </code>
            </div>
          </div>
          <button
            onClick={refetch}
            className="self-start flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border text-xs text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {!loading && !error && events && (
          <div className="mt-5 flex flex-wrap gap-3">
            <StatBadge label="Total Events"  value={events.length}  color="text-gradient" />
            <StatBadge label="Page Views"    value={pageViews}      color="text-emerald-300" />
            <StatBadge label="Clicks"        value={clickCount}     color="text-amber-300" />
            {otherEvents > 0 && (
              <StatBadge label="Other"       value={otherEvents}    color="text-sky-300" />
            )}
          </div>
        )}

        {!loading && !error && uniquePages.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted uppercase tracking-wider font-semibold mb-2">Pages visited</p>
            <div className="flex flex-wrap gap-2">
              {uniquePages.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-slate-400 hover:text-brand-400 bg-surface border border-border hover:border-brand-500/30 px-2.5 py-1 rounded-lg transition-all truncate max-w-xs"
                >
                  {url}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Events timeline */}
      {loading && <Loader message="Loading user journey…" />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && events?.length === 0 && (
        <EmptyState icon="📭" title="No events" description="This session has no recorded events." />
      )}
      {!loading && !error && events?.length > 0 && (
        <EventList events={events} />
      )}
    </div>
  );
}
