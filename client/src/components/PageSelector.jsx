export default function PageSelector({ pages, selectedPage, onChange, loading }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-3">
        Select Page URL
      </label>
      <div className="relative">
        <select
          value={selectedPage || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading || !pages?.length}
          className="w-full appearance-none bg-surface border border-border text-slate-300 text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono"
        >
          <option value="" disabled>
            {loading ? 'Loading pages…' : pages?.length ? 'Choose a page…' : 'No pages tracked yet'}
          </option>
          {pages?.map((page) => (
            <option key={page} value={page}>{page}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {selectedPage && (
        <p className="mt-2.5 text-xs text-muted flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Showing heatmap for selected page
        </p>
      )}
    </div>
  );
}
