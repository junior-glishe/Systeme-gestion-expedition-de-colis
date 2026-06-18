import truck from '../assets/hero-truck.jpg';
import { useState } from 'react';

const NAV = ['Aperçu', 'Flotte', 'Automatisation', 'Suivi GPS', 'Analyses', 'Tarifs', 'Société'];

const STATS = [
  { label: 'Livraisons à temps', value: '96%', trend: 'up', delta: '+4% ce mois' },
  { label: 'Flotte active', value: '248', trend: 'up', delta: '+12 véhicules' },
  { label: 'Délai moyen', value: '2.3j', trend: 'down', delta: '-15% ce mois' },
  { label: 'Satisfaction client', value: '92%', trend: 'up', delta: '+6% ce mois' },
];

function Spark({ up = true }) {
  const stroke = up ? '#34d399' : '#f87171';
  const d = up ? 'M0 22 Q15 8 30 16 T60 6 T80 12' : 'M0 6 Q15 18 30 12 T60 22 T80 16';
  return (
    <svg className="stat-spark" viewBox="0 0 80 28" fill="none">
      <path d={d} stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="hero-wrap">
      <div className="hero">
        <nav className="nav">
          <div className="brand">
            <div className="brand-mark">TP</div>
            <span>TRACKPULSE</span>
          </div>
          <div className="nav-links">
            {NAV.map((l, i) => (
              <a key={l} href="#" className={i === 0 ? 'active' : ''}>{l}</a>
            ))}
          </div>
          <div className="nav-buttons">
            <button className="btn btn-ghost">Demande d'inscription</button>
            <button className="btn btn-white">Commencer</button>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>

        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-links">
              {NAV.map((l) => (
                <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>
              ))}
            </div>
            <div className="mobile-menu-buttons">
              <button className="btn btn-ghost">Demande d'inscription</button>
              <button className="btn btn-white">Commencer</button>
            </div>
          </div>
        )}

        <div className="hero-content">
          <h1>Un transport terrestre plus intelligent grâce au suivi en temps réel</h1>
          <p className="lead">
            Pilotez vos expéditions, optimisez vos itinéraires et coordonnez votre flotte
            depuis une seule plateforme logistique intelligente.
          </p>
          <div className="hero-cta">
            <button className="btn btn-white">Démo gratuite</button>
            <button className="btn btn-ghost">Voir la plateforme</button>
          </div>
        </div>

        <div className="hero-visual">
          <img src={truck} alt="Camion de livraison en route" />
        </div>

        <div className="stats">
          {STATS.map((s) => (
            <div className="stat-item" key={s.label}>
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-foot">
                <span className={s.trend === 'up' ? 'up' : 'down'}>
                  {s.trend === 'up' ? '↑' : '↓'} {s.delta}
                </span>
              </span>
              <Spark up={s.trend === 'up'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
