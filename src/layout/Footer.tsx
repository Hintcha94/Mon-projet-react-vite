import React from "react";

const Footer: React.FC = () => {
  return (
    <>
     <div className="container">
      <div className="row">
        {/* About Company */}
        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h5 className="footer-title">2COMSYSTEMES</h5>
          <p className="company-description">
            2COMSYSTEMES est une société de droit Ivoirien. Elle est spécialisée
            dans l'informatisation de tout système de gestion.
          </p>
          <div className="social-icons mt-4">
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#">
              <i className="fab fa-twitter" />
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h5 className="footer-title">Liens rapides</h5>
          <div className="footer-links">
            <a href="index.html">
              <i className="fas fa-chevron-right me-2" /> Accueil
            </a>
            <a href="#about">
              <i className="fas fa-chevron-right me-2" /> A propos de nous
            </a>
            <a href="#services">
              <i className="fas fa-chevron-right me-2" /> Tracking automobile
            </a>
            <a href="#systemes">
              <i className="fas fa-chevron-right me-2" /> Solution MedSoft
            </a>
            <a href="#contact">
              <i className="fas fa-chevron-right me-2" /> Contact
            </a>
          </div>
        </div>
        {/* Contact Info */}
        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="footer-title">Contacts</h5>
          <div className="contact-inf">
            <p className="mb-3">
              <i className="fas fa-map-marker-alt" />
              ROUTE DE BINGERVILLE DERRIERE LA STATION PETROLIUM
              <br />
              RESIDENCE BELLEVUE VILLA 97
            </p>
            <p className="mb-3">
              <i className="fas fa-phone" />
              <a href="tel:+225 27 33 75 18 38">(+225) 27 33 75 18 38</a>
              <br />
              <a href="tel:+225 01 03 64 10 29" style={{ marginLeft: 22 }}>
                (+225) 01 03 64 10 29
              </a>
              <br />
              <a href="tel:+224 611 77 07 08" style={{ marginLeft: 22 }}>
                (+224) 611 77 07 08
              </a>
              <br />
              <a href="tel:+1 611 77 07 08" style={{ marginLeft: 22 }}>
                (+1) 240 424 6950
              </a>
            </p>
            <p className="mb-0">
              <i className="fas fa-envelope" />
              societe2coms@yahoo.com
            </p>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              © 2COMSYSTEMES. Tous droits réservés.
            </div>
            <div className="col-md-6 text-center text-md-end">
              <a href="#" className="text-white me-3">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-white">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Footer;
