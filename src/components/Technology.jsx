import dashboard from '../assets/tech-dashboard.jpg';

const ROWS = [
  { h: 'Planification précise des tournées', p: 'Affectez les expéditions au bon conducteur et au bon véhicule, avec les contraintes de poids, volume et fenêtres horaires.' },
  { h: 'Visibilité bout-en-bout', p: 'Du quai de chargement à la signature client, chaque étape est horodatée et partagée.' },
  { h: 'Performance opérationnelle', p: 'Indicateurs clairs : taux de remplissage, coût par kilomètre, ponctualité, incidents.' },
];

export default function Technology() {
  return (
    <section className="section container">
      <div className="tech">
        <div>
          <h2 style={{fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.2, marginBottom: 16}}>
            Une technologie qui livre des résultats mesurables
          </h2>
          <p style={{color: 'var(--muted)', marginBottom: 28, fontSize: 15, lineHeight: 1.6}}>
            Nos modules s'adaptent à la taille de votre flotte, du transporteur indépendant aux groupes multi-sites.
          </p>
          <div className="tech-list">
            {ROWS.map((r) => (
              <div className="tech-item" key={r.h}>
                <div className="dot" />
                <div>
                  <h4>{r.h}</h4>
                  <p>{r.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="tech-visual">
          <img src={dashboard} alt="Aperçu du tableau de bord TrackPulse" loading="lazy" />
          <div className="tech-badge">
            <div className="v">87%</div>
            <div className="l">Taux de remplissage</div>
          </div>
        </div>
      </div>
    </section>
  );
}
