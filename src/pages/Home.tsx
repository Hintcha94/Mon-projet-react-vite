
import BaseLayout from "../layout/BaseLayout";

const Home = () => {
  return (
    <BaseLayout>
    <>
    <section
    className="hero-section position-relative"
    id="home"
    style={{
      background:
        'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("images/219.jpg") no-repeat center center/cover',
      backgroundAttachment: "fixed"
    }}
  >
    <div className="wave-shape">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f8fafc"
          fillOpacity={1}
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h1 className="hero-title">
            Tracking automobile, Suivi et gestion du carburant et de flotte
            automobile 
          </h1>
          <p className="hero-subtitle">
            Utilisez Tracking automobile pour suivre vos véhicules en temps
            réel, à tout moment, depuis n’importe quel appareil connecté à
            internet. Vous pouver également suivre et gérez efficacement la
            consommation.
          </p>
          <div className="d-flex gap-3">
            <a
              href="PRESENTATION_2COMS.pdf"
              target="_blank"
              className="btn btn-primary"
            >
              Télécharger nos offres
            </a>
            {/* <a href="#services" className="btn btn-outline-light">En savoir plus</a>  */}
          </div>
        </div>
        <div className="col-lg-6">
          <img
            src="images/PBLTJD1.jpg"
            alt="Dashboard de suivi"
            className="img-fluid mt-5 mt-lg-0 dashboard-img rounded-4 shadow-lg"
          />
        </div>
      </div>
    </div>
  </section>
  
   {/* About Us Section */}
  <section className="py-5" id="about">
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <img
            src="images/photo2-747x580.png"
            alt="Notre équipe"
            className="img-fluid rounded-4 shadow-lg"
          />
        </div>
        <div className="col-lg-6">
          <h2 className="section-title">À propos de 2comsystems</h2>
          <p className="lead">
            Experts en solutions de tracking automobile, Gestion du carburant et
            Gestion flotte automobile depuis 2016
          </p>
          <p>
            <b>2COMS</b>, créée depuis 2016, est une start-up ivorienne,
            spécialisée dans les Business Solutions Géo-Mobiles. Editeur
            d’applications, opérateur de services en ligne et intégrateur de
            solution de géolocalisation, 2COMS, met à votre disposition une
            gamme complète de solutions de navigation connectée, pour optimiser
            la gestion de vos ressources mobiles et des comportements de
            conduite.{" "}
          </p>
          <div className="row mt-4">
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <img
                  src="images/traking_auto.jpg"
                  style={{ height: 40, width: 40, borderRadius: 10 }}
                />
                <div>
                  <h5 className="mb-1"> Tracking automobile</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <img
                  src="images/gc.jpg"
                  style={{ height: 40, width: 40, borderRadius: 10 }}
                />
                <div>
                  <h5 className="mb-1">Gestion du carburant</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <img
                  src="images/fotte.jpg"
                  style={{ height: 40, width: 40, borderRadius: 10 }}
                />
                <div>
                  <h5 className="mb-1">Gestion flotte automobile</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex">
                <i className="fas fa-check-circle fa-2x text-primary me-2 mt-1" />
                <div>
                  <h5 className="mb-1">Support: Assistance 24/7</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

 <section className="py-5" id="services">
    <section className="py-5" id="services" style={{ scrollMarginTop: '100px' }}></section>
    <div className="container">
      <div className="mb-5">
        <h2 className="fw-bold mb-3 section-title">Nos Services Complets</h2>
        <p className="text-muted lead  mt-2">
          Découvrez notre gamme de services technologiques conçus pour
          optimiser votre gestion de flotte et sécuriser vos actifs.
          <br />
          Contactez notre équipe pour vous accompagner dans votre choix.
        </p>
      </div>
      {/* Services Section */}
      <div className="row g-4">
        {/* Service 1 */}
        <div className="col-md-6 col-lg-4">
          <div className="service-card card h-100 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <i className="fas fa-truck text-primary fs-4" />
                </div>
                <h3 className="h5 mb-0 fw-bold">
                  Géolocalisation de flotte et données associées
                </h3>
              </div>
              <p className="text-muted mb-0">
                Suivi en temps réel de votre flotte automobile avec analyse des
                données de conduite, consommation et maintenance.
              </p>
            </div>
          </div>
        </div>
        {/* Service 2 */}
        <div className="col-md-6 col-lg-4">
          <div className="service-card card h-100 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                  <i className="fas fa-trailer text-success fs-4" />
                </div>
                <h3 className="h5 mb-0 fw-bold">
                  Géolocalisation de remorques
                </h3>
              </div>
              <p className="text-muted mb-0">
                Service dédié au suivi des remorques avec alertes en cas de
                décrochage ou mouvement non autorisé.
              </p>
            </div>
          </div>
        </div>
        {/* Service 3 */}
        <div className="col-md-6 col-lg-4">
          <div className="service-card card h-100 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-purple bg-opacity-10 p-3 rounded-circle me-3">
                  <i className="fas fa-car text-purple fs-4" />
                </div>
                <h3 className="h5 mb-0 fw-bold">Gestion de parc automobile</h3>
              </div>
              <p className="text-muted mb-0">
                Optimisation de l'utilisation de votre parc véhicules avec
                planning, entretien et gestion des coûts.
              </p>
            </div>
          </div>
        </div>
        {/* Service 4 */}
        <div className="col-md-6 col-lg-4">
          <div className="service-card card h-100 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                  <i className="fas fa-bus text-warning fs-4" />
                </div>
                <h3 className="h5 mb-0 fw-bold">Loueurs, transporteurs</h3>
              </div>
              <p className="text-muted mb-0">
                Services spécifiques pour les professionnels du transport et de
                la location de véhicules.
              </p>
            </div>
          </div>
        </div>
        {/* Service 5 */}
        <div className="col-md-6 col-lg-4">
          <div className="service-card card h-100 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle me-3">
                  <i className="fas fa-gas-pump text-danger fs-4" />
                </div>
                <h3 className="h5 mb-0 fw-bold">
                  Surveillance carburant camions citernes
                </h3>
              </div>
              <p className="text-muted mb-0">
                Détection précise des variations de niveau de carburant pour
                prévenir les vols et optimiser la consommation.
              </p>
            </div>
          </div>
        </div>
        {/* Service 6 */}
        <div className="col-md-6 col-lg-4">
          <div className="service-card card h-100 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                  <i className="fas fa-ship text-info fs-4" />
                </div>
                <h3 className="h5 mb-0 fw-bold">
                  Géolocalisation et suivi de containers maritimes
                </h3>
              </div>
              <p className="text-muted mb-0">
                Technologie IoT pour le suivi des containers en temps réel
                durant tout leur trajet.
              </p>
            </div>
          </div>
        </div>
        {/* Service 7 */}
        <div className="col-md-6 col-lg-4">
          <div className="service-card card h-100 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-orange bg-opacity-10 p-3 rounded-circle me-3">
                  <i className="fas fa-tractor text-orange fs-4" />
                </div>
                <h3 className="h5 mb-0 fw-bold">
                  Gestion activité engins de chantier
                </h3>
              </div>
              <p className="text-muted mb-0">
                Optimisation de l'utilisation des engins avec suivi des heures
                de travail et maintenance préventive.
              </p>
            </div>
          </div>
        </div>
        {/* Service 8 */}
        <div className="col-md-6 col-lg-4">
          <div className="service-card card h-100 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-pink bg-opacity-10 p-3 rounded-circle me-3">
                  <i className="fas fa-shield-alt text-pink fs-4" />
                </div>
                <h3 className="h5 mb-0 fw-bold">
                  Siphonage et vol de carburant
                </h3>
              </div>
              <p className="text-muted mb-0">
                Système intelligent de détection des anomalies de consommation
                et prévention des vols.
              </p>
            </div>
          </div>
        </div>
        {/* Service 9 */}
        <div className="col-md-6 col-lg-4">
          <div className="service-card card h-100 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-teal bg-opacity-10 p-3 rounded-circle me-3">
                  <i className="fas fa-map-marked-alt text-teal fs-4" />
                </div>
                <h3 className="h5 mb-0 fw-bold">TRACKER GPS</h3>
              </div>
              <p className="text-muted mb-0">
                Nos services de tracking GPS haute performance pour tous types
                de véhicules et actifs.
              </p>
            </div>
          </div>
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

  
  
  
  {/* Dashboard Preview */}
  <section id="sara" className="py-3 bg-light">
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 order-lg-2">
          <h2 className="section-title">
            DECOUVREZ SARA, NOTRE LOGICIEL DE GESTION DE FLOTTE AUTOMOBILE
          </h2>
          <p className="lead mb-4">
            SARA OFFRE LES FONCTIONNALITES SUIVANTES :
          </p>
          <ul className="list-unstyled">
            <li className="mb-3">
              <i className="fas fa-check-circle text-success me-2" /> Suivi des
              déclarations administratives (Assurance ; visite technique) ;
            </li>
            <li className="mb-3">
              <i className="fas fa-check-circle text-success me-2" /> Suivi de
              la maintenance des véhicules (Vidange ; Réparation et mécanique) ;
            </li>
            <li className="mb-3">
              <i className="fas fa-check-circle text-success me-2" /> Suivi de
              la consommation carburant ;
            </li>
            <li className="mb-3">
              <i className="fas fa-check-circle text-success me-2" /> Gestion
              des missions/déplacements et leurs programmations ;
            </li>
            <li className="mb-3">
              <i className="fas fa-check-circle text-success me-2" /> Tracking
              automobile (Géolocalisation et arrêt de véhicule à distance) ;
            </li>
            <li className="mb-3">
              <i className="fas fa-check-circle text-success me-2" /> Gestion
              des conducteurs et affectation des véhicules ;
            </li>
            <li className="mb-3">
              <i className="fas fa-check-circle text-success me-2" />{" "}
              Multi-profils utilisateurs et privilèges d’accès.
            </li>
          </ul>
        </div>
        <div className="col-lg-6 order-lg-1">
          <img
            src="images/22.jpg"
            alt="Tableau de bord"
            className="img-fluid dashboard-img rounded-4 shadow-lg"
          />
        </div>
      </div>
      <div className="mt-2">
        <p>
          Dans le fonctionnement d’une entreprise avec une danse activité
          logistique, la gestion de flotte fait partie des tâches les plus
          complexes. Il faut savoir se retrouver entre les différents
          déplacements, les missions et les problèmes qui exigent une
          maintenance. Le fait est que les personnes en charge de la gestion du
          parc automobile d’une société ont souvent d’autres missions en plus de
          celle-ci. En effet toutes les sociétés n’emploient pas un gestionnaire
          de parc automobile et préfèrent parfois déléguer cette mission à un
          collaborateur qui occupe déjà d’autres fonctions au sein de
          l’entreprise. Que votre parc soit de 5 véhicules ou 500 véhicules, la
          gestion de parc automobile n’est pas une mince affaire. C’est pourquoi
          nous avons conçu et développé un Système d’Analyse de Risque et
          d’Alerte, afin de vous permettre d’optimiser la gestion de votre parc
          automobile.{" "}
        </p>
      </div>
    </div>
  </section>
  <section id="medsoft" className="py-3 bg-light">
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 order-lg-2">
          <h2 className="section-title text-uppercase">
            Medsoft-ci – Plateforme digitale de gestion des établissements de
            santé
          </h2>
          <p className="lead mb-4">
            MEDSOFT OFFRE LES FONCTIONNALITES SUIVANTES :
          </p>
          <ul className="list-unstyled">
            <li className="mb-3">
              📋 Centralisation des dossiers médicaux et des consultations.
            </li>
            <li className="mb-3">
              💊 Gestion des consultations &amp; prescriptions.
            </li>
            <li className="mb-3">
              🏥 Création et suivi des rendez-vous, ordonnances, examens,
              hospitalisations.
            </li>
            <li className="mb-3">
              🏥 Pharmacie intégrée et validation des prescriptions.
            </li>
            <li className="mb-3">
              💰 Facturation &amp; caisse : Suivi des paiements, encaissements,
              dépenses.
            </li>
            <li className="mb-3">
              📊 Tableaux de bord statistiques : Indicateurs de performance
              médicale.
            </li>
            <li className="mb-3">
              📱 Application mobile patient (carnet de santé électronique,
              partage contrôlé des dossiers).
            </li>
            <li className="mb-3">
              🔐 Sécurité &amp; confidentialité : Gestion des rôles,
              journalisation des accès.
            </li>
          </ul>
        </div>
        <div className="col-lg-6 order-lg-1">
          <a href="https://medsoftci.com" target="_blank">
            <img
              src="images/medsoft.png"
              alt="Tableau de bord"
              className="img-fluid dashboard-img rounded-4 shadow-lg"
              style={{ height: 500 }}
            />
          </a>
        </div>
      </div>
      <div className="mt-2">
        <p>
          <b>Medsoft-CI</b> est une solution numérique complète dédiée à la
          gestion intégrée des établissements de santé en Côte d’Ivoire. Elle
          permet aux cliniques, hôpitaux, cabinets médicaux et centres de santé
          de <b>centraliser, automatiser et sécuriser</b> l’ensemble de leurs
          activités médicales et administratives.
        </p>
        <p>
          La plateforme dispose également d’une{" "}
          <b>application mobile dédiée aux patients</b>. Véritable carnet de
          santé électronique personnel, cette application permet aux patients de
          gérer, consulter et partager leurs informations médicales en toute
          sécurité, directement depuis leur smartphone.
        </p>
      </div>
    </div>
  </section>
  {/* Section Partenaires */}
  <section className="partner-section">
    <div className="container position-relative" style={{ zIndex: 1 }}>
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h2 className="section-title display-5 fw-bold">Nos Partenaires</h2>
          <p className="lead text-muted mb-5">
            Nous collaborons avec les meilleures entreprises pour vous offrir
            des solutions innovantes et de qualité.
          </p>
        </div>
      </div>
      {/* Version Desktop (Carousel) */}
      <div className="desktop-partners">
        <div
          id="partnerCarousel"
          className="carousel slide partner-carousel"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {/* Premier groupe de partenaires */}
            <div className="carousel-item active">
              <div className="row g-4">
                <div className="col-md-3 col-6">
                  <div className="partner-card">
                    <img
                      src="images/clients/danan.jpg"
                      alt="Partner 1"
                      className="partner-logo"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="partner-card">
                    <img
                      src="images/clients/mikade.jpeg"
                      alt="Partner 1"
                      className="partner-logo"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="partner-card">
                    <img
                      src="images/clients/lassire.jpg"
                      alt="Partner 2"
                      className="partner-logo"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="partner-card">
                    <img
                      src="images/clients/client-2.png"
                      alt="Partner 2"
                      className="partner-logo"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Deuxième groupe de partenaires */}
            <div className="carousel-item">
              <div className="row g-4">
                <div className="col-md-3 col-6">
                  <div className="partner-card">
                    <img
                      src="images/clients/danan.jpg"
                      alt="Partner 1"
                      className="partner-logo"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="partner-card">
                    <img
                      src="images/clients/mikade.jpeg"
                      alt="Partner 1"
                      className="partner-logo"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="partner-card">
                    <img
                      src="images/clients/lassire.jpg"
                      alt="Partner 2"
                      className="partner-logo"
                    />
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="partner-card">
                    <img
                      src="images/clients/client-2.png"
                      alt="Partner 2"
                      className="partner-logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#partnerCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#partnerCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
          <div className="carousel-indicators mt-4">
            <button
              type="button"
              data-bs-target="#partnerCarousel"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#partnerCarousel"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
          </div>
        </div>
      </div>
      {/* Version Mobile (Slider horizontal) */}
      <div className="mobile-partners">
        <div
          className="d-flex overflow-auto py-3"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="d-flex" style={{ gap: 15, padding: "0 15px" }}>
            <div style={{ scrollSnapAlign: "center", minWidth: 150 }}>
              <div className="partner-card">
                <img
                  src="images/clients/danan.jpg"
                  alt="Partner 1"
                  className="partner-logo"
                />
              </div>
            </div>
            <div style={{ scrollSnapAlign: "center", minWidth: 150 }}>
              <div className="partner-card">
                <img
                  src="images/clients/mikade.jpeg"
                  alt="Partner 2"
                  className="partner-logo"
                />
              </div>
            </div>
            <div style={{ scrollSnapAlign: "center", minWidth: 150 }}>
              <div className="partner-card">
                <img
                  src="images/clients/lassire.jpg"
                  alt="Partner 3"
                  className="partner-logo"
                />
              </div>
            </div>
            <div style={{ scrollSnapAlign: "center", minWidth: 150 }}>
              <div className="partner-card">
                <img
                  src="images/clients/client-2.png"
                  alt="Partner 4"
                  className="partner-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 text-center">
          <h3 className="h4 mb-4">Vous souhaitez devenir partenaire ?</h3>
          <a href="#contact" className="btn btn-partner">
            Contactez-nous <i className="fas fa-arrow-right ms-2" />
          </a>
        </div>
      </div>
    </div>
  </section>
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
        {/* <div className="col-lg-7">
          <form>
              <div className="row g-3">
                  <div className="col-md-6">
                      <label for="name" className="form-label">Nom complet</label>
                      <input type="text" className="form-control" id="name" required>
                  </div>
                  <div className="col-md-6">
                      <label for="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" required>
                  </div>
                  <div className="col-12">
                      <label for="subject" className="form-label">Sujet</label>
                      <input type="text" className="form-control" id="subject" required>
                  </div>
                  <div className="col-12">
                      <label for="message" className="form-label">Message</label>
                      <textarea className="form-control" id="message" rows="5" required></textarea>
                  </div>
                  <div className="col-12">
                      <button type="submit" className="btn btn-primary">Envoyer le message</button>
                  </div>
              </div>
          </form>
      </div> */}
      </div>
    </div>
  </section>
    </>
    </BaseLayout>
  );
};

export default Home;



