import { useState, useCallback } from 'react';
import { getSessions } from '../api/analyticsApi';
import { useAutoFetch } from '../hooks/useAnalytics';
import SessionTable from '../components/SessionTable';
import Loader, { ErrorState, EmptyState } from '../components/Loader';

export default function Sessions() {
  const [search, setSearch] = useState('');
  const fetchFn = useCallback(() => getSessions(), []);
  const { data: sessions, loading, error, refetch } = useAutoFetch(fetchFn);

  if (loading) return <Loader message="Fetching sessions…" />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const filtered = (sessions || []).filter((s) =>
    s.session_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Sessions</h1>
          <p className="text-sm text-muted mt-1">
            {sessions?.length || 0} total session{sessions?.length !== 1 ? 's' : ''} recorded
          </p>
        </div>
        <button
          onClick={refetch}
          className="self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-sm text-slate-300 hover:border-brand-500/50 hover:text-brand-400 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by session ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border text-slate-300 text-sm rounded-xl px-4 py-3 pl-11 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 placeholder:text-muted transition-all font-mono"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-slate-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title={search ? 'No sessions match' : 'No sessions yet'}
          description={search ? `No session IDs match "${search}"` : 'Sessions will appear once users visit your tracked pages.'}
        />
      ) : (
        <SessionTable sessions={filtered} />
      )}
    </div>
  );
}
