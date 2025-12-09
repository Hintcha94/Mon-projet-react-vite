import BaseLayout from "../layout/BaseLayout";
import { Link } from "react-router-dom";

const Services: React.FC = () => {
  return (
    <BaseLayout>
      <section className="py-5" id="services" style={{ scrollMarginTop: '100px' }}>
        <section className="py-5" id="solutions" style={{ scrollMarginTop: '100px' }}></section>

        <div className="container">
          <div className="mb-5">
            <h2 className="fw-bold mb-3 section-title">Nos Services Complets</h2>
            <p className="text-muted lead mt-2">
              Découvrez notre gamme de services technologiques conçus pour
              optimiser votre gestion de flotte et sécuriser vos actifs.
              <br />
              Contactez notre équipe pour vous accompagner dans votre choix.
            </p>
          </div>
          <div className="row g-4">
            {/* Service 1 - MAINTENANT CLIQUABLE */}
            <div className="col-md-6 col-lg-4">
              <Link to="/services/geolocalisation-flotte" className="text-decoration-none" style={{ textDecoration: 'none' }}>
                <div className="service-card card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-truck text-primary fs-4" />
                      </div>
                      <h3 className="h5 mb-0 fw-bold text-dark">
                        Géolocalisation de flotte et données associées
                      </h3>
                    </div>
                    <p className="text-muted mb-0">
                      Suivi en temps réel de votre flotte automobile avec analyse des
                      données de conduite, consommation et maintenance.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Service 2 - MAINTENANT CLIQUABLE */}
            <div className="col-md-6 col-lg-4">
              <Link to="/services/geolocalisation-remorques" className="text-decoration-none" style={{ textDecoration: 'none' }}>
              
                <div className="service-card card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-trailer text-success fs-4" />
                      </div>
                      <h3 className="h5 mb-0 fw-bold text-dark">
                        Géolocalisation de remorques
                      </h3>
                    </div>
                    <p className="text-muted mb-0">
                      Service dédié au suivi des remorques avec alertes en cas de
                      décrochage ou mouvement non autorisé.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Service 3 - MAINTENANT CLIQUABLE */}
            <div className="col-md-6 col-lg-4">
              <Link to="/services/gestion-parc-auto" className="text-decoration-none" style={{ textDecoration: 'none' }}>
                <div className="service-card card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-purple bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-car text-purple fs-4" />
                      </div>
                      <h3 className="h5 mb-0 fw-bold text-dark">Gestion de parc automobile</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Optimisation de l'utilisation de votre parc véhicules avec
                      planning, entretien et gestion des coûts.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Service 4 - MAINTENANT CLIQUABLE */}
            <div className="col-md-6 col-lg-4">
              <Link to="/services/loueurs-transporteurs" className="text-decoration-none" style={{ textDecoration: 'none' }}>
                <div className="service-card card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-bus text-warning fs-4" />
                      </div>
                      <h3 className="h5 mb-0 fw-bold text-dark">Loueurs, transporteurs</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Services spécifiques pour les professionnels du transport et de
                      la location de véhicules.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Service 5 - MAINTENANT CLIQUABLE */}
            <div className="col-md-6 col-lg-4">
              <Link to="/services/surveillance-carburant" className="text-decoration-none" style={{ textDecoration: 'none' }}>
                <div className="service-card card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-danger bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-gas-pump text-danger fs-4" />
                      </div>
                      <h3 className="h5 mb-0 fw-bold text-dark">
                        Surveillance carburant camions citernes
                      </h3>
                    </div>
                    <p className="text-muted mb-0">
                      Détection précise des variations de niveau de carburant pour
                      prévenir les vols et optimiser la consommation.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Service 6 - MAINTENANT CLIQUABLE */}
            <div className="col-md-6 col-lg-4">
              <Link to="/services/containers-maritimes" className="text-decoration-none" style={{ textDecoration: 'none' }}>
                <div className="service-card card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-ship text-info fs-4" />
                      </div>
                      <h3 className="h5 mb-0 fw-bold text-dark">
                        Géolocalisation et suivi de containers maritimes
                      </h3>
                    </div>
                    <p className="text-muted mb-0">
                      Technologie IoT pour le suivi des containers en temps réel
                      durant tout leur trajet.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Service 7 - MAINTENANT CLIQUABLE */}
            <div className="col-md-6 col-lg-4">
              <Link to="/services/engins-chantier" className="text-decoration-none" style={{ textDecoration: 'none' }}>
                <div className="service-card card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-orange bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-tractor text-orange fs-4" />
                      </div>
                      <h3 className="h5 mb-0 fw-bold text-dark">
                        Gestion activité engins de chantier
                      </h3>
                    </div>
                    <p className="text-muted mb-0">
                      Optimisation de l'utilisation des engins avec suivi des heures
                      de travail et maintenance préventive.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Service 8 - MAINTENANT CLIQUABLE */}
            <div className="col-md-6 col-lg-4">
              <Link to="/services/vol-carburant" className="text-decoration-none" style={{ textDecoration: 'none' }}>
                <div className="service-card card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-pink bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-shield-alt text-pink fs-4" />
                      </div>
                      <h3 className="h5 mb-0 fw-bold text-dark">
                        Siphonage et vol de carburant
                      </h3>
                    </div>
                    <p className="text-muted mb-0">
                      Système intelligent de détection des anomalies de consommation
                      et prévention des vols.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Service 9 - MAINTENANT CLIQUABLE */}
            <div className="col-md-6 col-lg-4">
              <Link to="/services/tracker-gps" className="text-decoration-none" style={{ textDecoration: 'none' }}>
                <div className="service-card card h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-teal bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-map-marked-alt text-teal fs-4" />
                      </div>
                      <h3 className="h5 mb-0 fw-bold text-dark">TRACKER GPS</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Nos services de tracking GPS haute performance pour tous types
                      de véhicules et actifs.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="mb-5">
            <h2 className="fw-bold mb-3 section-title">
              Pourquoi choisir nos services ?
            </h2>
            <div className="divider" />
            <p className="text-muted lead">
              Des technologies éprouvées pour répondre à vos besoins spécifiques
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 d-inline-flex p-3 rounded-circle mb-3">
                    <i className="fas fa-bolt text-primary fs-2" />
                  </div>
                  <h3 className="h5 fw-bold mb-3">Technologie de pointe</h3>
                  <p className="text-muted mb-0">
                    Des services basés sur les dernières innovations en matière de
                    géolocalisation et IoT.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success bg-opacity-10 d-inline-flex p-3 rounded-circle mb-3">
                    <i className="fas fa-headset text-success fs-2" />
                  </div>
                  <h3 className="h5 fw-bold mb-3">Support 24/7</h3>
                  <p className="text-muted mb-0">
                    Une équipe technique disponible en permanence pour vous
                    accompagner.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-purple bg-opacity-10 d-inline-flex p-3 rounded-circle mb-3">
                    <i className="fas fa-chart-line text-purple fs-2" />
                  </div>
                  <h3 className="h5 fw-bold mb-3">Rentabilité</h3>
                  <p className="text-muted mb-0">
                    Réduction des coûts opérationnels et augmentation de la
                    productivité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Services;