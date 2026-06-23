import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Sessions from '../pages/Sessions';
import SessionDetails from '../pages/SessionDetails';
import Heatmap from '../pages/Heatmap';

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/"                    element={<Dashboard />} />
        <Route path="/sessions"            element={<Sessions />} />
        <Route path="/session/:sessionId" element={<SessionDetails />} />
        <Route path="/heatmap"  element={<Heatmap />} />
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="text-6xl">404</span>
            <p className="text-muted">This page doesn't exist.</p>
          </div>
        } />
      </Routes>
    </Layout>
  );
}
