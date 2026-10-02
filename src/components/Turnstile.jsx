import { useEffect, useRef, useState } from 'react';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const Turnstile = ({ onToken, onExpired }) => {
  const hostRef = useRef(null);
  const widgetRef = useRef(null);
  const callbacksRef = useRef({ onToken, onExpired });
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(false);

  callbacksRef.current = { onToken, onExpired };

  useEffect(() => {
    let cancelled = false;

    const render = () => {
      if (cancelled || widgetRef.current || !hostRef.current) return;
      if (!window.turnstile) {
        setError(true);
        setStatus('error');
        return;
      }
      widgetRef.current = window.turnstile.render(hostRef.current, {
        sitekey: SITE_KEY,
        theme: 'dark',
        size: 'normal',
        callback: token => {
          setStatus('solved');
          setError(false);
          callbacksRef.current.onToken(token);
        },
        'expired-callback': () => {
          setStatus('loading');
          callbacksRef.current.onToken(null);
          callbacksRef.current.onExpired?.();
        },
        'error-callback': () => {
          setStatus('error');
          setError(true);
          callbacksRef.current.onToken(null);
        },
        'unsupported-callback': () => {
          setStatus('error');
          setError(true);
          callbacksRef.current.onToken(null);
        }
      });
    };

    const start = () => {
      if (cancelled) return;
      if (window.turnstile) {
        render();
        return;
      }
      const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      const script = existing || document.createElement('script');
      if (!existing) {
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener('load', render, { once: true });
      script.addEventListener('error', () => {
        if (cancelled) return;
        setStatus('error');
        setError(true);
      });
    };

    start();

    return () => {
      cancelled = true;
      if (widgetRef.current && window.turnstile) {
        window.turnstile.remove(widgetRef.current);
        widgetRef.current = null;
      }
    };
  }, []);

  return (
    <div className="turnstile">
      <div ref={hostRef} className="turnstile__host" />
      {status === 'loading' && !error ? <p className="turnstile__note">Verificando que eres humano…</p> : null}
      {error ? (
        <p className="turnstile__note turnstile__note--error">
          No se pudo cargar la verificación. Revisa tu conexión o desactiva el bloqueador de scripts.
        </p>
      ) : null}
    </div>
  );
};

export default Turnstile;