import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessions } from '../api/analyticsApi';
import { useAutoFetch } from '../hooks/useAnalytics';
import Loader, { ErrorState } from '../components/Loader';

function StatCard({ label, value, icon, accent, trend }) {
  return (
    <div className={`bg-card border rounded-2xl p-5 card-hover relative overflow-hidden ${accent.border}`}>
      {/* Background glow */}
      <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 blur-xl ${accent.glow}`} />

      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent.iconBg}`}>
          <span className={accent.iconColor}>{icon}</span>
        </div>
        {trend !== undefined && (
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            Live
          </span>
        )}
      </div>
      <div>
        <p className={`text-3xl font-bold font-mono mb-1 ${accent.value}`}>{value}</p>
        <p className="text-xs text-muted font-medium uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

function RecentSessionRow({ session, onClick }) {
  const shortId = session.session_id?.slice(0, 10) + '…';
  return (
    <div
      className="flex items-center gap-4 py-3 border-b border-border last:border-0 hover:bg-white/[0.02] rounded-lg px-2 -mx-2 cursor-pointer group transition-colors"
      onClick={() => onClick(session.session_id)}
    >
      <div className="w-8 h-8 rounded-lg bg-brand-900/40 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-mono text-brand-400 truncate">{shortId}</p>
        <p className="text-xs text-muted">{session.total_events ?? 0} events</p>
      </div>
      <svg className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const fetchFn = useCallback(() => getSessions(), []);
  const { data: sessions, loading, error, refetch } = useAutoFetch(fetchFn);

  if (loading) return <Loader message="Loading dashboard…" />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const totalSessions = sessions?.length || 0;
  const totalEvents = sessions?.reduce((sum, s) => sum + (s.total_events || 0), 0) || 0;
  const uniquePages = sessions ? new Set(
    sessions.flatMap(s => s.page_urls || [])
  ).size : 0;

  const recent = [...(sessions || [])].sort(
    (a, b) => new Date(b.last_visit) - new Date(a.last_visit)
  ).slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
 
    <div className="flex items-center justify-between">
  <div>
    <h1 className="text-2xl font-bold text-slate-100">Overview</h1>
    <p className="text-sm text-muted mt-1">
      Real-time analytics across all tracked sessions
    </p>
  </div>

  <button
    onClick={refetch}
    className="px-4 py-2 text-sm bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition flex items-center gap-2"
  >
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v6h6M20 20v-6h-6M20 8a8 8 0 00-13.657-5.657L4 4M20 20l-2.343-2.343A8 8 0 014 16"
      />
    </svg>
    Refresh
  </button>
</div>
   
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Sessions"
          value={totalSessions.toLocaleString()}
          trend
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          accent={{
            border: 'border-border',
            glow: 'bg-brand-500',
            iconBg: 'bg-brand-900/40',
            iconColor: 'text-brand-400',
            value: 'text-gradient',
          }}
        />
        <StatCard
          label="Total Events"
          value={totalEvents.toLocaleString()}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          accent={{
            border: 'border-border',
            glow: 'bg-amber-400',
            iconBg: 'bg-amber-500/10',
            iconColor: 'text-amber-400',
            value: 'text-amber-300',
          }}
        />
        <StatCard
          label="Pages Tracked"
          value={uniquePages || '—'}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          }
          accent={{
            border: 'border-border',
            glow: 'bg-emerald-400',
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-400',
            value: 'text-emerald-300',
          }}
        />
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent sessions */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-slate-300">Recent Sessions</h2>
            <button
              onClick={() => navigate('/sessions')}
              className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 transition-colors"
            >
              View all
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {recent.length === 0 ? (
            <p className="text-muted text-sm text-center py-8">No sessions recorded yet.</p>
          ) : (
            <div>
              {recent.map((s) => (
                <RecentSessionRow
                  key={s.session_id}
                  session={s}
                  onClick={(id) => navigate(`/sessions/${id}`)}
                />
              ))}
            </div>
          )}
        </div>

       
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: 'Browse all sessions', to: '/sessions', desc: 'Full session list and details' },
                { label: 'View heatmap', to: '/heatmap', desc: 'Visualize click density' },
              ].map((action) => (
                <button
                  key={action.to}
                  onClick={() => navigate(action.to)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-border transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-900/40 border border-brand-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-600/20 transition-colors">
                    <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 font-medium">{action.label}</p>
                    <p className="text-xs text-muted">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-3">Event Types</h2>
            <div className="space-y-2.5">
              {[
                { type: 'Page Views', color: 'bg-emerald-400', pct: 60 },
                { type: 'Clicks', color: 'bg-amber-400', pct: 30 },
                { type: 'Other', color: 'bg-sky-400', pct: 10 },
              ].map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between text-xs text-muted mb-1">
                    <span>{item.type}</span>
                    <span>{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
