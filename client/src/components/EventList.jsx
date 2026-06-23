const EVENT_META = {
  page_view: {
    label: 'Page View',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/25',
    dot: 'bg-emerald-400',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  click: {
    label: 'Click',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/25',
    dot: 'bg-amber-400',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
  scroll: {
    label: 'Scroll',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/25',
    dot: 'bg-sky-400',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
  },
};

function getEventMeta(type) {
  return EVENT_META[type] || {
    label: type,
    color: 'text-slate-400',
    bg: 'bg-slate-500/10 border-slate-500/25',
    dot: 'bg-slate-400',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };
}

function formatTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function EventNode({ event, index, isLast }) {
  const meta = getEventMeta(event.event_type);
  const isClick = event.event_type === 'click' && event.click_position;

  return (
    <div className="flex gap-4">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${meta.bg} ${meta.color}`}>
          {meta.icon}
        </div>
        {!isLast && <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[24px]" />}
      </div>

      {/* Content */}
      <div className={`pb-6 flex-1 min-w-0 ${isLast ? '' : ''}`}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${meta.bg} ${meta.color}`}>
            {meta.label}
          </span>
          <span className="text-xs text-muted font-mono">{formatTime(event.timestamp)}</span>
          <span className="text-xs text-muted/60">{formatDate(event.timestamp)}</span>
        </div>

        {event.page_url && (
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-3.5 h-3.5 text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a
              href={event.page_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-brand-400 font-mono truncate transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {event.page_url}
            </a>
          </div>
        )}

        {isClick && (
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <span className="text-xs text-muted">X</span>
              <span className="text-xs font-mono font-semibold text-amber-300">{event.click_position.x}px</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <span className="text-xs text-muted">Y</span>
              <span className="text-xs font-mono font-semibold text-amber-300">{event.click_position.y}px</span>
            </div>
          </div>
        )}
      </div>

  
      <div className="flex-shrink-0 self-start mt-1.5">
        <span className="text-xs font-mono text-muted/50 select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

export default function EventList({ events }) {
  if (!events?.length) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-slate-300 mb-6 flex items-center gap-2">
        <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        User Journey — {events.length} events
      </h3>
      <div>
        {events.map((event, i) => (
          <EventNode
            key={event._id || i}
            event={event}
            index={i}
            isLast={i === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
