import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import GeneratorPage from './pages/GeneratorPage/GeneratorPage';
import Layout from './components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/analytics" replace />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/generator" element={<GeneratorPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Route>
        </Routes>
    );
}
