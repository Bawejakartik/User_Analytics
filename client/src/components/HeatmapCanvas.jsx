export default function HeatmapCanvas({ clicks, pageUrl }) {
  if (!clicks || clicks.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-center h-64 text-muted text-sm">
          No click data for this page.
        </div>
      </div>
    );
  }

  // Normalize positions to canvas size
  const CANVAS_W = 900;
  const CANVAS_H = 500;

  // Find min/max to scale if needed
  const xs = clicks.map(c => c.click_position?.x || 0);
  const ys = clicks.map(c => c.click_position?.y || 0);
  const maxX = Math.max(...xs, CANVAS_W);
  const maxY = Math.max(...ys, CANVAS_H);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-300">Click Heatmap</h3>
          {pageUrl && (
            <p className="text-xs text-muted font-mono mt-0.5 truncate max-w-md">{pageUrl}</p>
          )}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs text-red-300 font-medium">{clicks.length} clicks</span>
        </div>
      </div>

      {/* Canvas area */}
      <div className="p-6">
        <div
          className="relative bg-slate-900/60 border border-border rounded-xl overflow-hidden"
          style={{ width: '100%', paddingBottom: `${(CANVAS_H / CANVAS_W) * 100}%` }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Page representation overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center opacity-10 select-none pointer-events-none">
              <svg className="w-16 h-16 mx-auto text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-500 text-sm mt-2 font-medium">Page viewport</p>
            </div>
          </div>

          {/* Click dots */}
          {clicks.map((click, i) => {
            if (!click.click_position) return null;
            const x = (click.click_position.x / maxX) * 100;
            const y = (click.click_position.y / maxY) * 100;

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Glow ring */}
                <div
                  className="absolute rounded-full bg-red-400 opacity-10 animate-ping"
                  style={{ width: 20, height: 20, top: -10, left: -10, animationDuration: `${1.5 + (i % 3) * 0.5}s` }}
                />
                {/* Main dot */}
                <div
                  className="relative w-3 h-3 rounded-full bg-red-500 border-2 border-red-300/60 shadow-lg"
                  style={{ boxShadow: '0 0 8px rgba(239,68,68,0.6)' }}
                  title={`X: ${click.click_position.x}, Y: ${click.click_position.y}`}
                />
              </div>
            );
          })}
        </div>
      </div>

     
      <div className="px-6 pb-5 flex flex-wrap gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow" style={{ boxShadow: '0 0 6px rgba(239,68,68,0.6)' }} />
          <span>Click position</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 opacity-40" />
          <span>Interaction radius</span>
        </div>
        <span className="ml-auto">Coordinates relative to page viewport</span>
      </div>
    </div>
  );
}
