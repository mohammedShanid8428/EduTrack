import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* stub routes for later */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
