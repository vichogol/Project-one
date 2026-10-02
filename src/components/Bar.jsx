import { NavLink } from 'react-router-dom';

const SECTIONS = [
  { label: 'Servicio', to: null },
  { label: 'Clientes', to: null },
  { label: 'Proyectos', to: null },
  { label: 'Quiénes somos', to: null },
  { label: 'Cotiza', to: '/cotizacion' }
];

const LOGO_SRC = import.meta.env.VITE_LOGO_SRC || '/logo.svg';

function Bar() {
  return (
    <header className="bar">
      <NavLink to="/" className="bar__brand" aria-label="Project One — inicio">
        <img className="bar__logo" src={LOGO_SRC} alt="Project One" width="30" height="30" />
      </NavLink>
      <nav className="bar__nav" aria-label="Secciones">
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
    </header>
  );
}

export default Bar;