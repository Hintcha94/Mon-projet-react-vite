// src/pages/ServiceDetail.tsx
import { useParams } from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";

const ServiceDetail = () => {
  const { serviceId } = useParams();

  // Noms des services pour l'affichage
  const serviceNames: { [key: string]: string } = {
    "geolocalisation-flotte": "Géolocalisation de flotte et données associées",
    "geolocalisation-remorques": "Géolocalisation de remorques",
    "gestion-parc-auto": "Gestion de parc automobile",
    "loueurs-transporteurs": "Loueurs, transporteurs",
    "surveillance-carburant": "Surveillance carburant camions citernes",
    "containers-maritimes": "Géolocalisation et suivi de containers maritimes",
    "engins-chantier": "Gestion activité engins de chantier",
    "vol-carburant": "Siphonage et vol de carburant",
    "tracker-gps": "TRACKER GPS"
  };

  // Vérification de sécurité pour TypeScript
  const serviceTitle = serviceId ? serviceNames[serviceId] || "Service" : "Service";

  return (
    <BaseLayout>
    <section className="py-3" id="service-detail" > 
    <section className="py-5" id="solutions" style={{ scrollMarginTop: '100px' }}></section>

      <div className="container py-5">
        <h2 className="text-center section-title">{serviceTitle}</h2>
        <p className="mb-5 lead text-center">
          Utilisez Tracking automobile pour suivre vos véhicules en temps réel, à
          tout moment, depuis n'importe quel appareil connecté à internet. Aucun
          logiciel supplémentaire n'est à installer, tout est accessible depuis
          internet.
        </p>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="service-card card h-100">
              <div className="card-body text-center p-4">
                <div className="service-icon">
                  <i className="fas fa-map-marked-alt" />
                </div>
                <h3 className="h4">Localisation de véhicule</h3>
                <p className="text-muted">
                  Utilisez notre système de tracking automobile pour suivre vos
                  véhicules en temps réel, à tout moment, depuis n'importe quel
                  appareil connecté à internet. Aucun logiciel supplémentaire
                  n'est à installer.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="service-card card h-100">
              <div className="card-body text-center p-4">
                <div className="service-icon">
                  <i className="fas fa-car-crash" />
                </div>
                <h3 className="h4">Immobilisation à distance</h3>
                <p className="text-muted">
                  Notre système dispose d'un relais coupe-circuit pouvant être
                  installé à l'alimentation du démarreur. En cas de vol, vous
                  pouvez neutraliser votre véhicule en lui envoyant une commande
                  par un simple clic.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="service-card card h-100">
              <div className="card-body text-center p-4">
                <div className="service-icon">
                  <i className="fas fa-gas-pump" />
                </div>
                <h3 className="h4">Suivi consommation</h3>
                <p className="text-muted">
                  Suivez et gérez efficacement la consommation et les dépenses en
                  carburant de l'ensemble de votre flotte et réalisez des
                  économies substantielles sur vos coûts opérationnels.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="service-card card h-100">
              <div className="card-body text-center p-4">
                <div className="service-icon">
                  <i className="fas fa-route" />
                </div>
                <h3 className="h4">Optimisation des itinéraires</h3>
                <p className="text-muted">
                  Analysez les itinéraires de vos véhicules grâce à notre tableau
                  de bord. En tenant compte de la consommation en carburant et de
                  la fluidité routière, trouvez le trajet parfait pour chaque
                  mission.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="service-card card h-100">
              <div className="card-body text-center p-4">
                <div className="service-icon">
                  <i className="fas fa-file-alt" />
                </div>
                <h3 className="h4">Rapports des mouvements</h3>
                <p className="text-muted">
                  Notre système de géolocalisation vous permet de générer en temps
                  voulu des rapports de mouvement pour chaque véhicule de votre
                  flotte, selon des critères que vous définissez.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="service-card card h-100">
              <div className="card-body text-center p-4">
                <div className="service-icon">
                  <i className="fas fa-shield-alt" />
                </div>
                <h3 className="h4">Sécurité renforcée</h3>
                <p className="text-muted">
                  Protégez vos actifs avec nos fonctionnalités de sécurité
                  avancées, y compris les alertes de sortie de zone, les
                  notifications de conduite dangereuse et les historiques de
                  trajet complets.
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

export default ServiceDetail;