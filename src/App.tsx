import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import GeneratorPage from './pages/GeneratorPage/GeneratorPage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<AnalyticsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
