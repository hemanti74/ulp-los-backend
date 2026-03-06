import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ApplicationList from './pages/ApplicationList';
import ApplicationDetail from './pages/ApplicationDetail';

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ApplicationList />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />
        </Routes>
      </main>
    </div>
  );
}
