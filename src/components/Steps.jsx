const STEPS = [
  { n: '01', h: 'Connectez votre flotte', p: 'Importez vos véhicules, conducteurs et clients en quelques minutes.' },
  { n: '02', h: 'Suivez en temps réel', p: 'Cartographie en direct et alertes automatiques en cas d\'écart.' },
  { n: '03', h: 'Optimisez vos livraisons', p: 'Analyses opérationnelles pour ajuster vos tournées et vos coûts.' },
];

export default function Steps() {
  return (
    <section className="steps-section">
      <h2 className="section-title">De la donnée à de meilleures livraisons</h2>
      <p className="section-sub">Trois étapes pour transformer votre logistique terrestre.</p>
      <div className="steps">
        {STEPS.map((s) => (
          <div className="step" key={s.n}>
            <div className="step-num">{s.n}</div>
            <h4>{s.h}</h4>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
