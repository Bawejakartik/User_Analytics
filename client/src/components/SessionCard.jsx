import { useNavigate } from 'react-router-dom';

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function SessionCard({ session }) {
  const navigate = useNavigate();
  const shortId = session.session_id?.slice(0, 12) + '…';

  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 card-hover cursor-pointer"
      onClick={() => navigate(`/sessions/${session.session_id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-brand-400 bg-brand-900/30 border border-brand-500/20 px-2.5 py-1 rounded-md">
          {shortId}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          {session.total_events ?? 0} events
        </span>
      </div>
      <div className="space-y-1.5 text-xs text-muted">
        <div className="flex justify-between">
          <span>First visit</span>
          <span className="text-slate-400">{formatDate(session.first_visit)}</span>
        </div>
        <div className="flex justify-between">
          <span>Last visit</span>
          <span className="text-slate-400">{formatDate(session.last_visit)}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 transition-colors">
          View full journey
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
