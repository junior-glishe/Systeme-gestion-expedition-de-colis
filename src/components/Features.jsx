import { Truck, MapPin, ScanBarcode, BarChart3, Route } from 'lucide-react';
import fleet from '../assets/feat-fleet.jpg';
import tracking from '../assets/feat-tracking.jpg';
import scan from '../assets/feat-scan.jpg';
import analytics from '../assets/feat-analytics.jpg';
import route from '../assets/feat-route.jpg';

const ITEMS = [
  { img: fleet, icon: <Truck size={18} />, title: 'Gestion de flotte', text: 'Centralisez vos véhicules, conducteurs et maintenance dans un tableau de bord unique.' },
  { img: tracking, icon: <MapPin size={18} />, title: 'Suivi GPS en direct', text: 'Localisez chaque expédition en temps réel et anticipez les retards à la minute près.' },
  { img: scan, icon: <ScanBarcode size={18} />, title: 'Scan & traçabilité', text: 'Code-barres et QR à chaque étape pour une chaîne logistique 100% traçable.' },
  { img: analytics, icon: <BarChart3 size={18} />, title: 'Analyses opérationnelles', text: 'Identifiez les goulots d\'étranglement et améliorez vos KPI livraison.' },
  { img: route, icon: <Route size={18} />, title: 'Optimisation d\'itinéraires', text: 'Calcul intelligent des trajets pour réduire les kilomètres et la consommation.' },
];

export default function Features() {
  return (
    <section className="section container">
      <h2 className="section-title">Le système d'exploitation du transport terrestre moderne</h2>
      <p className="section-sub">Tous les outils dont vos équipes ont besoin pour planifier, expédier et livrer.</p>
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
