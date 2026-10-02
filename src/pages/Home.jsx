import { useEffect, useRef, useState } from 'react';
import DitherVeil from '../components/DitherVeil.jsx';

const IMAGE_SRC = import.meta.env.VITE_IMAGE_SRC || `${import.meta.env.BASE_URL}image.png`;
const FALLBACK_SRC = 'https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop';
const TITLE = 'Project One | Marketing Audiovisual';
const SLOGAN = '*Slogan*';

function Home() {
  const [src, setSrc] = useState(IMAGE_SRC);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [keyBox, setKeyBox] = useState({ width: 0, height: 0 });
  const stageRef = useRef(null);
  const keyRef = useRef(null);

  useEffect(() => {
    const probe = new Image();
    probe.crossOrigin = 'anonymous';
    probe.onerror = () => {
      if (src === IMAGE_SRC) setSrc(FALLBACK_SRC);
    };
    probe.src = IMAGE_SRC;
  }, [src]);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = keyRef.current;
    if (!element) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setKeyBox({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const centerX = box.width / 2;
  const centerY = box.height / 2;
  const brandY = centerY - (box.height - centerY) / 5;

  const keyX = box.width / 4;
  const keyY = centerY + (box.height - centerY) / 6;
  const keyLeft = keyX - keyBox.width / 2;
  const keyTop = keyY - keyBox.height / 2;
  const keyLeftX = keyLeft - keyLeft / 2 + keyBox.width / 2;
  const keyTopY = keyTop + (box.height - keyTop) / 3 + keyBox.height / 2;

  return (
    <main className="stage" ref={stageRef}>
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
      <div className="overlay" style={{ top: `${brandY}px`, left: `${centerX}px` }}>
        <h1 className="brand__title">{TITLE}</h1>
        <p className="brand__slogan">{SLOGAN}</p>
      </div>
      <div
        ref={keyRef}
        className="overlay overlay--left"
        style={{ top: `${keyTopY}px`, left: `${keyLeftX}px` }}
      >
        <p className="key__text">
          <strong>¡Atención a este dato clave!</strong> Todo lo que necesitas saber está justo ahí, a un solo
          clic (o paso). Tómate un momento para revisar la info: está diseñada para guiarte sin perderte ningún
          detalle importante. ¡Échale un vistazo!
        </p>
      </div>
    </main>
  );
}

export default Home;