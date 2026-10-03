import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const EASE = 'cubic-bezier(0.33, 0, 0.2, 1)';

function Curtain({ className = '', duration = 920, delay = 80, replayKey = 0 }) {
  const ref = useRef(null);
  const animationRef = useRef(null);

  const play = useCallback(() => {
    const node = ref.current;
    if (!node || typeof node.animate !== 'function') return;
    animationRef.current?.cancel();
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    animationRef.current = node.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
      delay,
      easing: EASE,
      fill: 'backwards'
    });
  }, [duration, delay]);

  useLayoutEffect(() => {
    play();
  }, [play, replayKey]);

  useEffect(() => () => animationRef.current?.cancel(), []);

  return <div ref={ref} className={`curtain ${className}`.trim()} />;
}

export default Curtain;