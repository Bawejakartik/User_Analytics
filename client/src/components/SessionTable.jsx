import { useNavigate } from 'react-router-dom';

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function SessionRow({ session, index }) {
  const navigate = useNavigate();
  const shortId = session.session_id?.slice(0, 8) + '…';

  return (
    <tr
      className="border-b border-border hover:bg-white/[0.03] transition-colors group cursor-pointer"
      onClick={() => navigate(`/sessions/${session.session_id}`)}
    >
      <td className="px-5 py-4">
        <span className="text-muted text-xs font-mono mr-3 select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="font-mono text-sm text-brand-400 bg-brand-900/30 border border-brand-500/20 px-2.5 py-1 rounded-md">
          {shortId}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          {session.total_events ?? 0} events
        </span>
      </td>
      <td className="px-4 py-4 text-slate-400 text-sm">
        {formatDate(session.first_visit)}
      </td>
      <td className="px-4 py-4 text-slate-400 text-sm">
        {formatDate(session.last_visit)}
      </td>
      <td className="px-4 py-4">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/sessions/${session.session_id}`); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-brand-400 border border-brand-500/30 hover:bg-brand-600/20 transition-all opacity-0 group-hover:opacity-100"
        >
          View journey
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default function SessionTable({ sessions }) {
  if (!sessions?.length) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="px-5 py-3.5 text-xs text-muted font-semibold uppercase tracking-wider w-12">#</th>
            <th className="px-4 py-3.5 text-xs text-muted font-semibold uppercase tracking-wider">Session ID</th>
            <th className="px-4 py-3.5 text-xs text-muted font-semibold uppercase tracking-wider">Events</th>
            <th className="px-4 py-3.5 text-xs text-muted font-semibold uppercase tracking-wider">First Visit</th>
            <th className="px-4 py-3.5 text-xs text-muted font-semibold uppercase tracking-wider">Last Visit</th>
            <th className="px-4 py-3.5 text-xs text-muted font-semibold uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, i) => (
            <SessionRow key={session.session_id} session={session} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
