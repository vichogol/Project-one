import { useState } from 'react';
import Curtain from '../components/Curtain.jsx';
import Turnstile from '../components/Turnstile.jsx';

const CONTACT_METHODS = ['WhatsApp', 'Correo electrónico', 'Llamada telefónica'];

const EMPTY = {
  nombre: '',
  telefono: '',
  correo: '',
  contacto: CONTACT_METHODS[0],
  cotizacion: ''
};

function Quote() {
  const [values, setValues] = useState(EMPTY);
  const [token, setToken] = useState(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const update = field => event => {
    const { value } = event.target;
    setValues(current => ({ ...current, [field]: value }));
  };

  const resetCaptcha = () => {
    setToken(null);
    setSent(false);
    setError('');
    window.turnstile?.reset();
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!token) {
      setError('Confirma la verificación para poder enviar la cotización.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <main className="quote">
      <div className="quote__wrap">
        <p className="quote__kicker">Project One</p>
        <h1 className="quote__title">Cotización</h1>
        <p className="quote__lead">
          Cuéntanos qué necesitas y te respondemos con una propuesta a la medida.
        </p>

        <form className="quote__form" onSubmit={onSubmit} noValidate>
          <label className="quote__cell">
            <span className="quote__label">(Nombre)</span>
            <input
              className="quote__input"
              type="text"
              name="nombre"
              value={values.nombre}
              onChange={update('nombre')}
              placeholder="Nombre y apellido"
              autoComplete="name"
              required
            />
          </label>

          <label className="quote__cell">
            <span className="quote__label">(Número de teléfono)</span>
            <input
              className="quote__input"
              type="tel"
              name="telefono"
              value={values.telefono}
              onChange={update('telefono')}
              placeholder="+00 000 000 0000"
              autoComplete="tel"
              required
            />
          </label>

          <label className="quote__cell">
            <span className="quote__label">(Correo)</span>
            <input
              className="quote__input"
              type="email"
              name="correo"
              value={values.correo}
              onChange={update('correo')}
              placeholder="correo@dominio.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="quote__cell">
            <span className="quote__label">(--¿Cómo prefieres ser contactado?)</span>
            <select
              className="quote__input quote__input--select"
              name="contacto"
              value={values.contacto}
              onChange={update('contacto')}
            >
              {CONTACT_METHODS.map(method => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </label>

          <label className="quote__cell quote__cell--wide">
            <span className="quote__label">(--¿Qué quieres cotizar?)</span>
            <textarea
              className="quote__input quote__input--area"
              name="cotizacion"
              value={values.cotizacion}
              onChange={update('cotizacion')}
              placeholder="Describe tu proyecto: servicio, alcance, plazos…"
              rows={5}
              required
            />
          </label>

          <div className="quote__cell quote__cell--wide quote__cell--guard">
            <Turnstile onToken={setToken} onExpired={() => setError('')} />
          </div>

          <div className="quote__cell quote__cell--wide quote__cell--actions">
            <button className="quote__submit" type="submit" disabled={!token}>
              Enviar cotización
            </button>
            {error ? <p className="quote__error">{error}</p> : null}
            {sent ? (
              <p className="quote__done">
                Gracias, {values.nombre || 'hemos recibido tu solicitud'}. Te contactaremos por {values.contacto}.
              </p>
            ) : null}
          </div>
        </form>

        <button className="quote__again" type="button" onClick={resetCaptcha}>
          Limpiar formulario
        </button>
      </div>
      <Curtain />
    </main>
  );
}

export default Quote;