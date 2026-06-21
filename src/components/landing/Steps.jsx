const STEPS = [
  { n: '01', h: 'Enregistrez vos expéditions', p: 'Ajoutez rapidement vos clients, vos destinataires, vos colis et toutes les informations nécessaires à l\'organisation des livraisons. Quelques minutes suffisent pour démarrer vos opérations.' },
  { n: '02', h: 'Analysez et améliorez', p: 'Exploitez les tableaux de bord et les rapports d\'activité afin d\'évaluer vos performances, d\'identifier les points d\'amélioration et d\'optimiser durablement votre organisation.' },
  { n: '03', h: 'Suivez chaque étape', p: 'Consultez en temps réel l\'évolution de vos expéditions, mettez à jour leur statut et informez automatiquement les différents intervenants tout au long du processus de livraison.' },
];

export default function Steps() {
  return (
    <section className="steps-section">
      <h2 className="section-title">Comment ça fonctionne ?</h2>
      <p className="section-sub">Notre plateforme simplifie la gestion des expéditions en seulement trois étapes.</p>
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
