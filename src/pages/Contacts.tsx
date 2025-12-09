import React from "react";
import BaseLayout from "../layout/BaseLayout"; // ← AJOUTEZ CET IMPORT

const Contacts: React.FC = () => {
  return (
    <BaseLayout>
      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <h2 className="text-center section-title">Contactez-nous</h2>
          <p className="text-center mb-5 lead">
            Prêt à optimiser votre flotte ? Contactez-nous pour une démonstration
            gratuite.
          </p>
          <div className="row">
            <div className="col-lg-12 mb-5 mb-lg-0">
              <div className="contact-info">
                <h4 className="mb-4">Informations de contact</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex align-items-start mb-4">
                      <div className="contact-icon">
                        <i className="fas fa-map-marker-alt" />
                      </div>
                      <div>
                        <h5 className="mb-1">Adresse</h5>
                        <p className="mb-0">
                          Côte d'Ivoire, Yamoussoukro, Nanan Carréfour garage Ciera{" "}
                          <a
                            href="https://maps.app.goo.gl/9qP4jnbJ2JaFPNoGA?g_st=ic"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Voir dans le map
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-start mb-4">
                      <div className="contact-icon">
                        <i className="fas fa-envelope" />
                      </div>
                      <div>
                        <h5 className="mb-1">Email</h5>
                        <p className="mb-0">
                          <a href="mailto:societe2coms@yahoo.com">
                            societe2coms@yahoo.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-start mb-4">
                      <div className="contact-icon">
                        <i className="fas fa-phone-alt" />
                      </div>
                      <div>
                        <h5 className="mb-1">Téléphone</h5>
                        <p className="mb-0">
                          <a href="tel:+225 27 33 75 18 38">
                            (+225) 27 33 75 18 38
                          </a>
                          <br />
                          <a href="tel:+225 01 03 64 10 29">
                            (+225) 01 03 64 10 29
                          </a>
                          <br />
                          <a href="tel:+224 611 77 07 08">(+224) 611 77 07 08</a>
                          <br />
                          <a href="tel:+1 611 77 07 08">(+1) 240 424 6950</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-start">
                      <div className="contact-icon">
                        <i className="fas fa-clock" />
                      </div>
                      <div>
                        <h5 className="mb-1">Heures d'ouverture</h5>
                        <p className="mb-0">Lundi - Vendredi: 08h - 18h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> {/* ← FERME div.row */}
        </div> {/* ← FERME div.container */}
      </section> {/* ← FERME section.contact-section */}
    </BaseLayout>
  );
};

export default Contacts;