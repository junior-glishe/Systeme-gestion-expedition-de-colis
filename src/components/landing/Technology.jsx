import dashboard from '../../assets/tech-dashboard.jpg';

const ROWS = [
  { h: 'Planification efficace', p: 'Organisez vos expéditions en fonction des destinations, des véhicules disponibles, des priorités de livraison et des contraintes opérationnelles afin d\'améliorer la productivité de vos équipes.' },
  { h: 'Suivi de bout en bout', p: 'Gardez une visibilité complète sur l\'ensemble du cycle de vie de chaque expédition. Depuis la création de l\'envoi jusqu\'à sa livraison finale, toutes les informations sont accessibles en temps réel pour une meilleure réactivité.' },
  { h: 'Décisions basées sur les données', p: 'Transformez vos données opérationnelles en véritables outils d\'aide à la décision. Grâce aux rapports détaillés et aux indicateurs de performance, identifiez les axes d\'amélioration et optimisez continuellement vos processus logistiques.' },
];

export default function Technology() {
  return (
    <section className="section container">
      <div className="tech">
        <div>
          <h2 style={{fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.2, marginBottom: 16}}>
            Une solution pensée pour les professionnels du transport
          </h2>
          <p style={{color: 'var(--muted)', marginBottom: 28, fontSize: 15, lineHeight: 1.6}}>
            Notre plateforme accompagne les entreprises de transport, les services de messagerie, les sociétés de livraison et les organisations logistiques dans leur transformation numérique. Quelle que soit la taille de votre activité, bénéficiez d'une solution évolutive, intuitive et adaptée à vos besoins.          </p>
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
