const M = [
  { v: '35%', l: 'de réduction du temps de traitement des expéditions.' },
  { v: '95%', l: 'de précision dans le suivi et la traçabilité des colis.' },
  { v: '500+', l: 'entreprises et professionnels utilisent quotidiennement la plateforme.' },
  { v: '24h/24', l: 'd\'accès sécurisé aux données et aux opérations logistiques.' },
];

export default function Metrics() {
  return (
    <section className="section container">
      <h2 className="section-title">Des résultats concrets</h2>
      <p className="section-sub">Notre solution permet aux entreprises de gagner en efficacité, de renforcer la qualité de leurs services et d'améliorer leur compétitivité.</p>
      <div className="metrics" style={{marginTop: 40}}>
        {M.map((m) => (
          <div className="metric" key={m.l}>
            <div className="v">{m.v}</div>
            <div className="l">{m.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
