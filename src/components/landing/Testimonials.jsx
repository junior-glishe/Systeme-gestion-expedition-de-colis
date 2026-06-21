import a1 from '../../assets/avatar1.jpg';
import a2 from '../../assets/avatar2.jpg';
import a3 from '../../assets/avatar3.jpg';

const T = [
  { img: a1, n: 'Karim Benali', r: 'Responsable Logistique', t: 'Grâce à cette plateforme, nous avons centralisé toute la gestion de nos expéditions. Le suivi en temps réel et les tableaux de bord nous permettent aujourd\'hui de prendre des décisions beaucoup plus rapidement."' },
  { img: a2, n: 'Sophie Marchand', r: 'Chef d\'Exploitation', t: '"L\'interface est intuitive, les informations sont accessibles instantanément et toute notre équipe collabore désormais sur une plateforme unique. Un véritable gain de temps au quotidien."' },
  { img: a3, n: 'Mehdi Rahmouni', r: 'Directeur des Opérations', t: '"La gestion des colis est devenue simple, fluide et parfaitement organisée. Nous avons considérablement réduit les erreurs et amélioré la satisfaction de nos clients."' },
];

export default function Testimonials() {
  return (
    <section className="section container">
      <h2 className="section-title">Témoignages</h2>
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
