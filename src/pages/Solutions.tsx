import React from "react";
import BaseLayout from "../layout/BaseLayout";



const Solutions: React.FC = () => {
  return (
    <BaseLayout>
   <>
   {/* Dashboard Preview */}
  <section id="sara" className="py-3 bg-light">
    <section className="py-5" id="solutions" style={{ scrollMarginTop: '100px' }}></section>
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
    
   </>
    
    </BaseLayout>
  
  );
};

export default Solutions;
