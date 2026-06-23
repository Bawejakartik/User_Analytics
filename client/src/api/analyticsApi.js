import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export const getSessions = async () => {
  const { data } = await api.get('/sessions');
  return data.sessions;
};

export const getSessionEvents = async (sessionId) => {
  const { data } = await api.get(`/sessions/${sessionId}`);
  return data.events;
};

export const getHeatmapData = async (pageUrl) => {
  const { data } = await api.get('/heatmap', { params: { page_url: pageUrl } });
  return data.clicks;
};

export const getPages = async () => {
  const { data } = await api.get('/pages');
  return data.pages;
};

export default api;
