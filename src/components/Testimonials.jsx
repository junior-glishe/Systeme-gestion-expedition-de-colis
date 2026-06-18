import a1 from '../assets/avatar1.jpg';
import a2 from '../assets/avatar2.jpg';
import a3 from '../assets/avatar3.jpg';

const T = [
  { img: a1, n: 'Karim Benali', r: 'Transporteur — TransRoute', t: 'TrackPulse a transformé notre quotidien : nos clients voient leurs colis en direct et nos conducteurs reçoivent leurs tournées optimisées.' },
  { img: a2, n: 'Sophie Marchand', r: 'Responsable logistique — NordFret', t: 'En trois mois nous avons réduit nos kilomètres à vide de 22%. Les rapports sont clairs et exploitables.' },
  { img: a3, n: 'Mehdi Rahmouni', r: 'Directeur d\'entrepôt — LogiPlus', t: 'Le scan à chaque étape a quasiment supprimé les erreurs de chargement. Un outil indispensable.' },
];

export default function Testimonials() {
  return (
    <section className="section container">
      <h2 className="section-title">La confiance des professionnels du transport</h2>
      <div className="tlist">
        {T.map((x) => (
          <div className="tcard" key={x.n}>
            <div className="stars">★★★★★</div>
            <p>"{x.t}"</p>
            <div className="tperson">
              <img src={x.img} alt={x.n} loading="lazy" />
              <div>
                <div className="n">{x.n}</div>
                <div className="r">{x.r}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
