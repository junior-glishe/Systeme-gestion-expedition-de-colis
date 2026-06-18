const M = [
  { v: '38%', l: 'Réduction des coûts d\'exploitation' },
  { v: '92%', l: 'Précision des livraisons' },
  { v: '500+', l: 'Flottes gérées' },
  { v: '4x', l: 'Suivi plus rapide' },
];

export default function Metrics() {
  return (
    <section className="section container">
      <h2 className="section-title">Une performance logistique qui compte</h2>
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
