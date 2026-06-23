import { useState, useCallback } from 'react';
import { getPages, getHeatmapData } from '../api/analyticsApi';
import { useAutoFetch, useFetch } from '../hooks/useAnalytics';
import PageSelector from '../components/PageSelector';
import HeatmapCanvas from '../components/HeatmapCanvas';
import Loader, { ErrorState } from '../components/Loader';

export default function Heatmap() {
  const [selectedPage, setSelectedPage] = useState('');

  const pagesFetchFn = useCallback(() => getPages(), []);
  const { data: pages, loading: pagesLoading, error: pagesError } = useAutoFetch(pagesFetchFn);

  const heatmapFetchFn = useCallback(
    (page) => getHeatmapData(page),
    []
  );
  const {
    data: clicks,
    loading: clicksLoading,
    error: clicksError,
    execute: fetchHeatmap,
  } = useFetch(heatmapFetchFn);

  const handlePageChange = (page) => {
    setSelectedPage(page);
    if (page) fetchHeatmap(page);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
    
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Heatmap</h1>
        <p className="text-sm text-muted mt-1">Visualize where users click across your tracked pages</p>
      </div>

    
      {pagesLoading && <Loader message="Loading pages…" />}
      {pagesError && <ErrorState message={pagesError} />}
      {!pagesLoading && !pagesError && (
        <PageSelector
          pages={pages}
          selectedPage={selectedPage}
          onChange={handlePageChange}
          loading={pagesLoading}
        />
      )}

      {!selectedPage && !pagesLoading && (
        <div className="bg-card border border-border rounded-2xl flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center">
            <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-slate-300 font-semibold">Select a page to view its heatmap</p>
            <p className="text-muted text-sm mt-1">
              {pages?.length
                ? `${pages.length} page${pages.length !== 1 ? 's' : ''} available`
                : 'No pages tracked yet'}
            </p>
          </div>
        </div>
      )}

      {selectedPage && clicksLoading && <Loader message="Fetching click data…" />}
      {selectedPage && clicksError && <ErrorState message={clicksError} />}
      {selectedPage && !clicksLoading && !clicksError && (
        <HeatmapCanvas clicks={clicks} pageUrl={selectedPage} />
      )}
    </div>
  );
}
