import React, { useState, useEffect } from 'react';
import BaseAdminLayout from '../../AdminLayout/BaseAdminLayout';

interface Client {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  dateExpiration: string;
  gpsActif: boolean;
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [nouveauClient, setNouveauClient] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    dateExpiration: ''
  });
  const [clientPourProlongation, setClientPourProlongation] = useState<number | null>(null);
  const [nouvelleDateExpiration, setNouvelleDateExpiration] = useState('');

  // Charger les clients depuis le LocalStorage au démarrage
  useEffect(() => {
    const clientsSauvegardes = localStorage.getItem('clients');
    if (clientsSauvegardes) {
      const clientsParses = JSON.parse(clientsSauvegardes);
      
      // Vérifier l'état du GPS pour chaque client
      const aujourdhui = new Date().toISOString().split('T')[0];
      const clientsAvecGPS = clientsParses.map((client: Client) => ({
        ...client,
        gpsActif: client.dateExpiration >= aujourdhui
      }));
      
      setClients(clientsAvecGPS);
    }
  }, []);

  // Sauvegarder les clients dans le LocalStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  // Vérifier l'expiration des clients et désactiver le GPS si nécessaire
  useEffect(() => {
    const verifierExpiration = () => {
      const aujourdhui = new Date().toISOString().split('T')[0];
      setClients(prevClients => 
        prevClients.map(client => ({
          ...client,
          gpsActif: client.dateExpiration >= aujourdhui
        }))
      );
    };

    // Vérifier immédiatement
    verifierExpiration();

    // Vérifier toutes les heures
    const interval = setInterval(verifierExpiration, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Fonction pour ouvrir le calendrier de prolongation - CORRIGÉE
  const ouvrirCalendrierProlongation = (clientId: number) => {
    setClientPourProlongation(clientId);
    // Par défaut, mettre la date d'aujourd'hui + 1 mois
    const aujourdhui = new Date();
    aujourdhui.setMonth(aujourdhui.getMonth() + 1);
    setNouvelleDateExpiration(aujourdhui.toISOString().split('T')[0]);
  };

  // Fonction pour confirmer la prolongation
  const confirmerProlongation = () => {
    if (!clientPourProlongation || !nouvelleDateExpiration) return;

    setClients(clients.map(client => 
      client.id === clientPourProlongation 
        ? { 
            ...client, 
            dateExpiration: nouvelleDateExpiration,
            gpsActif: true 
          }
        : client
    ));

    alert(`Date d'expiration prolongée jusqu'au ${formatDate(nouvelleDateExpiration)}`);
    
    // Réinitialiser
    setClientPourProlongation(null);
    setNouvelleDateExpiration('');
  };

  // Fonction pour annuler la prolongation
  const annulerProlongation = () => {
    setClientPourProlongation(null);
    setNouvelleDateExpiration('');
  };

  // Fonction pour gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNouveauClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour ajouter un nouveau client avec ID unique
  const handleAjouterClient = () => {
    if (!nouveauClient.nom || !nouveauClient.prenom || !nouveauClient.telephone || !nouveauClient.dateExpiration) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const aujourdhui = new Date().toISOString().split('T')[0];
    
    // Générer un ID unique avec timestamp
    const nouvelId = Date.now();
    
    const client: Client = {
      id: nouvelId, // ID unique basé sur le timestamp
      nom: nouveauClient.nom,
      prenom: nouveauClient.prenom,
      telephone: nouveauClient.telephone,
      dateExpiration: nouveauClient.dateExpiration,
      gpsActif: nouveauClient.dateExpiration >= aujourdhui
    };

    setClients(prevClients => [...prevClients, client]);
    
    // Réinitialiser le formulaire
    setNouveauClient({
      nom: '',
      prenom: '',
      telephone: '',
      dateExpiration: ''
    });
    setShowForm(false);
  };

  // Fonction pour supprimer un client
  const handleSupprimer = (clientId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setClients(prevClients => prevClients.filter(client => client.id !== clientId));
    }
  };

  // Filtrer les clients selon la recherche
  const filteredClients = clients.filter(client => {
    return (
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telephone.includes(searchTerm)
    );
  });

  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Obtenir la date minimale pour le formulaire (aujourd'hui)
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Vérifier si une date est expirée
  const isExpired = (dateString: string) => {
    const aujourdhui = new Date().toISOString().split('T')[0];
    return dateString < aujourdhui;
  };

  // Fonction pour réinitialiser toutes les données (optionnel - pour le débogage)
  const reinitialiserDonnees = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser toutes les données clients ? Cette action est irréversible.')) {
      localStorage.removeItem('clients');
      setClients([]);
      alert('Données réinitialisées avec succès.');
    }
  };

  return (
    <BaseAdminLayout>
      <div className="clients-page">
        {/* En-tête */}
        <div className="page-header-section">
          <div className="header-content">
            <div className="header-text">
              <h1 style={{ color: 'white' }}>Liste des Clients GPS</h1>
              <p style={{ color: 'white' }}>Gestion et suivi des clients de l'entreprise</p>
              <small style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>
                Données sauvegardées localement ({clients.length} clients)
              </small>
            </div>
            <div className="header-period">
              <span className="period-badge">Total clients</span>
              <div className="current-period">{clients.length}</div>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        {showForm && (
          <div className="form-section">
            <div className="form-card card">
              <div className="form-header">
                <h3>Ajouter un Nouveau Client</h3>
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowForm(false)}
                >
                  ✕ Fermer
                </button>
              </div>
              <div className="form-content">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nom *</label>
                    <input
                      type="text"
                      name="nom"
                      value={nouveauClient.nom}
                      onChange={handleInputChange}
                      placeholder="Entrez le nom"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Prénom *</label>
                    <input
                      type="text"
                      name="prenom"
                      value={nouveauClient.prenom}
                      onChange={handleInputChange}
                      placeholder="Entrez le prénom"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Numéro de téléphone *</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={nouveauClient.telephone}
                      onChange={handleInputChange}
                      placeholder="+33 1 23 45 67 89"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date d'expiration *</label>
                    <input
                      type="date"
                      name="dateExpiration"
                      value={nouveauClient.dateExpiration}
                      onChange={handleInputChange}
                      min={getTodayDate()}
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => setShowForm(false)}
                  >
                    Annuler
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleAjouterClient}
                  >
                    ✅ Ajouter le Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de prolongation */}
        {clientPourProlongation && (
          <div className="modal-overlay">
            <div className="modal-content card">
              <div className="modal-header">
                <h3>Prolonger la date d'expiration</h3>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={annulerProlongation}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <p>Sélectionnez la nouvelle date d'expiration :</p>
                <div className="date-picker-container">
                  <input
                    type="date"
                    value={nouvelleDateExpiration}
                    onChange={(e) => setNouvelleDateExpiration(e.target.value)}
                    min={getTodayDate()}
                    className="form-input date-picker"
                  />
                  <div className="date-preview">
                    Nouvelle date : <strong>{formatDate(nouvelleDateExpiration)}</strong>
                  </div>
                </div>
                <div className="quick-date-options">
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      const aujourdhui = new Date();
                      aujourdhui.setMonth(aujourdhui.getMonth() + 1);
                      setNouvelleDateExpiration(aujourdhui.toISOString().split('T')[0]);
                    }}
                  >
                    +1 mois
                  </button>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      const aujourdhui = new Date();
                      aujourdhui.setMonth(aujourdhui.getMonth() + 3);
                      setNouvelleDateExpiration(aujourdhui.toISOString().split('T')[0]);
                    }}
                  >
                    +3 mois
                  </button>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      const aujourdhui = new Date();
                      aujourdhui.setFullYear(aujourdhui.getFullYear() + 1);
                      setNouvelleDateExpiration(aujourdhui.toISOString().split('T')[0]);
                    }}
                  >
                    +1 an
                  </button>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  className="btn btn-outline"
                  onClick={annulerProlongation}
                >
                  Annuler
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={confirmerProlongation}
                >
                  ✅ Confirmer la prolongation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contrôles et filtres */}
        <div className="clients-controls-section">
          <div className="controls-card card">
            <div className="controls-header">
              <h3>Gestion des Clients GPS</h3>
              <div className="controls-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  ➕ Ajouter un Client
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={reinitialiserDonnees}
                  style={{ marginLeft: '10px' }}
                >
                  🔄 Réinitialiser
                </button>
              </div>
            </div>

            <div className="controls-content">
              <div className="filters-row">
                <div className="filter-group">
                  <label>Rechercher un client</label>
                  <input 
                    type="text" 
                    placeholder="Nom, prénom ou téléphone..." 
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des clients */}
        <div className="clients-table-section">
          <div className="table-header">
            <h3>Détails des Clients</h3>
            <div className="table-summary">
              {filteredClients.length} client(s) trouvé(s)
            </div>
          </div>

          <div className="clients-table card">
            <table>
              <thead>
                <tr>
                  <th>CLIENT</th>
                  <th>CONTACT</th>
                  <th>DATE D'EXPIRATION</th>
                  <th>STATUT GPS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr key={client.id} className="client-main-row">
                    <td className="client-info">
                      <div className="client-avatar">
                        {client.prenom[0]}{client.nom[0]}
                      </div>
                      <div className="client-details">
                        <div className="client-name">{client.prenom} {client.nom}</div>
                      </div>
                    </td>
                    <td className="client-contact">
                      <div className="client-phone">{client.telephone}</div>
                    </td>
                    <td className="expiration-date">
                      <div className={`date-display ${isExpired(client.dateExpiration) ? 'expired' : ''}`}>
                        {formatDate(client.dateExpiration)}
                        {isExpired(client.dateExpiration) && (
                          <span className="expired-badge">Expiré</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`gps-status ${client.gpsActif ? 'actif' : 'inactif'}`}>
                        <span className="status-dot"></span>
                        {client.gpsActif ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-primary" 
                          title="Prolonger la date"
                          onClick={() => ouvrirCalendrierProlongation(client.id)} 
                        >
                          📅 Prolonger
                        </button>
                        <button 
                          className="btn btn-sm btn-danger" 
                          title="Supprimer le client"
                          onClick={() => handleSupprimer(client.id)}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {clients.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h3>Aucun client</h3>
                <p>Cliquez sur "Ajouter un Client" pour commencer.</p>
                <small>Les clients seront sauvegardés automatiquement</small>
              </div>
            )}

            {clients.length > 0 && filteredClients.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>Aucun client trouvé</h3>
                <p>Aucun client ne correspond à vos critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseAdminLayout>
  );
};

export default Clients;