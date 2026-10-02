import { useEffect, useState } from 'react';
import DitherVeil from './components/DitherVeil.jsx';
import './App.css';

const IMAGE_SRC = import.meta.env.VITE_IMAGE_SRC || '/image.png';
const FALLBACK_SRC = 'https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop';

function App() {
  const [src, setSrc] = useState(IMAGE_SRC);
  const [missing, setMissing] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const probe = new Image();
    probe.crossOrigin = 'anonymous';
    probe.onerror = () => {
      if (src === IMAGE_SRC) {
        setSrc(FALLBACK_SRC);
        setMissing(true);
      }
    };
    probe.src = IMAGE_SRC;
  }, [src]);

  useEffect(() => {
    const hide = setTimeout(() => setHint(false), 6000);
    return () => clearTimeout(hide);
  }, []);

  return (
    <main className="stage">
      <DitherVeil
        src={src}
        fit="contain"
        pattern="floyd"
        palette="duotone"
        pixelSize={2}
        levels={2}
        inkColor="#0a0a0c"
        paperColor="#68696a"
        contrast={1.2}
        revealRadius={220}
        softness={0.6}
        linger={1}
        rimColor="#a78bfa"
        rim={0}
        reverse
        photoOpacity={0.2}
        wander
        clickBurst
      />
      <p className={`hint ${hint ? '' : 'hint--hidden'}`}>
        {missing ? `No se halló ${IMAGE_SRC} — imagen de ejemplo` : 'Mueve el cursor o haz clic'}
      </p>
    </main>
  );
}

export default App;