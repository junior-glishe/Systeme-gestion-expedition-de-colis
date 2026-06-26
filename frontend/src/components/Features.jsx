import { Truck, MapPin, ScanBarcode, BarChart3, Route, Lock } from 'lucide-react';
import fleet from '../assets/feat-fleet.jpg';
import tracking from '../assets/feat-tracking.jpg';
import scan from '../assets/feat-scan.jpg';
import analytics from '../assets/feat-analytics.jpg';
import route from '../assets/feat-route.jpg';
import secure from '../assets/feat-secure.png';

const ITEMS = [
  { img: fleet, icon: <Truck size={18} />, title: 'Gestion des expéditions', text: 'Créez, planifiez et gérez facilement toutes vos expéditions depuis une interface centralisée. Organisez les envois selon leur destination, leur priorité ou leur statut afin d\'améliorer la coordination entre les différents acteurs de la chaîne logistique.' },
  { img: tracking, icon: <MapPin size={18} />, title: 'Traçabilité des colis', text: 'Conservez un historique détaillé de chaque mouvement effectué sur un colis. Chaque changement de statut est enregistré afin d\'assurer une traçabilité complète et de renforcer la confiance de vos clients.' },
  { img: scan, icon: <ScanBarcode size={18} />, title: 'Numérisation des colis', text: 'Scannez rapidement les codes-barres des colis pour accéder à leurs informations détaillées. Simplifiez le processus de gestion et réduisez les erreurs humaines.' },
  { img: analytics, icon: <BarChart3 size={18} />, title: 'Tableaux de bord intelligents', text: 'Visualisez vos performances grâce à des statistiques détaillées, des graphiques interactifs et des indicateurs clés. Analysez les délais de livraison, le volume des expéditions, les incidents et les performances de vos équipes pour prendre de meilleures décisions.' },
  { img: route, icon: <Route size={18} />, title: 'Optimisation des tournées', text: 'Planifiez efficacement les trajets de livraison afin de réduire les distances parcourues, limiter les coûts de transport et améliorer les délais de distribution. Une meilleure organisation permet une utilisation optimale des ressources disponibles.' },
  { img: secure, icon: <Lock size={18} />, title: 'Sécurité et gestion des accès', text: 'Garantissez la confidentialité de vos données grâce à une gestion avancée des rôles et des permissions. Chaque utilisateur accède uniquement aux fonctionnalités correspondant à ses responsabilités, assurant ainsi une administration sécurisée de la plateforme.' },

];

export default function Features() {
  return (
    <section className="section container">
      <h2 className="section-title">Une plateforme complète pour piloter vos opérations logistiques</h2>
      <p className="section-sub">Simplifiez le traitement de vos expéditions grâce à des outils conçus pour automatiser les tâches, assurer la traçabilité des colis et améliorer la qualité de vos livraisons. Chaque fonctionnalité contribue à une meilleure organisation et à une gestion plus efficace de votre activité.</p>
      <div className="bento">
        {ITEMS.map((it) => (
          <article className="tile" key={it.title}>
            <div className="tile-img"><img src={it.img} alt={it.title} loading="lazy" /></div>
            <div className="tile-body">
              <div className="tile-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
