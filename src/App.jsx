import { Route, Routes } from 'react-router-dom';
import Bar from './components/Bar.jsx';
import Home from './pages/Home.jsx';
import Quote from './pages/Quote.jsx';
import './App.css';

function App() {
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