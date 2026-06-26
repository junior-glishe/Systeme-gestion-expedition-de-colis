export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Colonne gauche - Marque et droits */}
        <div className="footer-brand">
          <div className="footer-logo">
            <i className="fas fa-truck-fast"></i>
            <span>TRACK<span>PULSE</span></span> 
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Tous droits réservés
          </p>
          <p className="footer-legal">
            Gestion et suivi des expéditions terrestres
          </p>
        </div>

        {/* Colonne centrale - Liens rapides */}
        <div className="footer-links">
          <div className="footer-links-col">
            <h4>Plateforme</h4>
            <ul>
              <li><a href="#">Fonctionnalités</a></li>
              <li><a href="#">Tarifs</a></li>
              <li><a href="#">Intégrations</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
          <div className="footer-links-col">
            <h4>Ressources</h4>
            <ul>
              <li><a href="#">Centre d'aide</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Communauté</a></li>
            </ul>
          </div>
          <div className="footer-links-col">
            <h4>Entreprise</h4>
            <ul>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Carrières</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Presse</a></li>
            </ul>
          </div>
        </div>

        {/* Colonne droite - Téléchargement et réseaux */}
        <div className="footer-actions">
          <div className="footer-stores">
            <span className="footer-store">
              <i className="fab fa-apple"></i>
              <div>
                <small>Télécharger sur</small>
                <strong>App Store</strong>
              </div>
            </span>
            <span className="footer-store">
              <i className="fab fa-google-play"></i>
              <div>
                <small>Disponible sur</small>
                <strong>Google Play</strong>
              </div>
            </span>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      {/* Bas de footer - Mentions légales */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>Politique de confidentialité</span>
          <span>Conditions d'utilisation</span>
          <span>Mentions légales</span>
          <span>Gestion des cookies</span>
        </div>
      </div>
    </footer>
  );
}