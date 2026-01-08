import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import VideoAnalysis from './pages/VideoAnalysis';
import ContextAnalysis from './pages/ContextAnalysis';
import DriverScore from './pages/DriverScore';
import './index.css';

function App() {
  return (
    <Router>
      <div className="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/video-analysis" element={<VideoAnalysis />} />
            <Route path="/context-analysis" element={<ContextAnalysis />} />
            <Route path="/driver-score" element={<DriverScore />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
