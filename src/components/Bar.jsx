import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const SECTIONS = [
  { label: 'Servicio', to: null },
  { label: 'Clientes', to: null },
  { label: 'Proyectos', to: null },
  { label: 'Quiénes somos', to: null },
  { label: 'Cotiza', to: '/cotizacion' }
];

const LOGO_SRC = import.meta.env.VITE_LOGO_SRC || `${import.meta.env.BASE_URL}logo.svg`;

function Bar() {
  const navRef = useRef(null);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const element = navRef.current;
    if (!element) return undefined;
    const update = () => {
      const remaining = element.scrollWidth - element.clientWidth - element.scrollLeft;
      setMore(remaining > 4);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      element.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <header className="bar">
      <NavLink to="/" className="bar__brand" aria-label="Project One — inicio">
        <img className="bar__logo" src={LOGO_SRC} alt="Project One" width="30" height="30" />
      </NavLink>
      <div className="bar__nav-wrap" data-more={more ? 'true' : undefined}>
        <nav className="bar__nav" aria-label="Secciones" ref={navRef}>
          <ul className="bar__list">
            {SECTIONS.map(section => (
              <li key={section.label} className="bar__item">
                {section.to ? (
                  <NavLink
                    to={section.to}
                    className={({ isActive }) => `bar__link bar__link--cta ${isActive ? 'bar__link--active' : ''}`}
                  >
                    {section.label}
                  </NavLink>
                ) : (
                  <button type="button" className="bar__link">
                    {section.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <span className="bar__more" aria-hidden="true" />
      </div>
    </header>
  );
}

export default Bar;