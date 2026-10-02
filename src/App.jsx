import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Bar from './components/Bar.jsx';
import Home from './pages/Home.jsx';
import Quote from './pages/Quote.jsx';
import './App.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('redirect');
    if (!stored) return;
    sessionStorage.removeItem('redirect');
    const base = import.meta.env.BASE_URL;
    const target = stored.startsWith(base) ? stored.slice(base.length - 1) : stored;
    if (target !== window.location.pathname) navigate(target, { replace: true });
  }, [navigate]);

  return (
    <>
      <Bar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizacion" element={<Quote />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;