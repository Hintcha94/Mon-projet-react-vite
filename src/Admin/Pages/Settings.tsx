import React, { useState, useEffect } from 'react';
import BaseAdminLayout from '../../AdminLayout/BaseAdminLayout';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Actif' | 'Inactif';
  lastLogin: string;
}

interface SettingsData {
  // Général
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  
  // Entreprise
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  fiscalYear: string;
  
  // Sécurité
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  
  // Notifications
  emailNotifications: boolean;
  payrollReminders: boolean;
  expenseAlerts: boolean;
  systemUpdates: boolean;
}

// Valeurs par défaut pour les paramètres
const DEFAULT_SETTINGS: SettingsData = {
  language: "fr",
  timezone: "Africa/Abidjan",
  currency: "FCFA",
  dateFormat: "dd/MM/yyyy",
  companyName: "2COMSYSTEMS",
  companyEmail: "contact@2comsystems.com",
  companyPhone: "+225 01 02 03 04 05",
  companyAddress: "Abidjan, Côte d'Ivoire",
  fiscalYear: "Janvier - Décembre",
  twoFactorAuth: false,
  sessionTimeout: 30,
  passwordExpiry: 90,
  emailNotifications: true,
  payrollReminders: true,
  expenseAlerts: true,
  systemUpdates: true
};

// Valeurs par défaut pour les utilisateurs
const DEFAULT_USERS: User[] = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@2comsystems.com",
    role: "Administrateur",
    status: "Actif",
    lastLogin: new Date().toLocaleString('fr-FR')
  },
  {
    id: 2,
    name: "Marie Curie",
    email: "marie.curie@2comsystems.com",
    role: "Gestionnaire",
    status: "Actif",
    lastLogin: new Date().toLocaleString('fr-FR')
  }
];

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'company' | 'security' | 'notifications'>('general');
  const [settings, setSettings] = useState<SettingsData>(() => {
    const saved = localStorage.getItem('appSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('appUsers');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Gestionnaire',
    status: 'Actif' as 'Actif' | 'Inactif'
  });
  const [showUserForm, setShowUserForm] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  // Sauvegarder les paramètres
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  // Sauvegarder les utilisateurs
  useEffect(() => {
    localStorage.setItem('appUsers', JSON.stringify(users));
  }, [users]);

  // Détecter les changements non sauvegardés
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [settings, users]);

  const handleSaveSettings = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    localStorage.setItem('appUsers', JSON.stringify(users));
    setHasUnsavedChanges(false);
    alert('✅ Paramètres sauvegardés avec succès!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      setSettings(DEFAULT_SETTINGS);
      setUsers(DEFAULT_USERS);
      setHasUnsavedChanges(true);
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      if (editingUserId) {
        // Mise à jour d'un utilisateur existant
        const updatedUsers = users.map(user => 
          user.id === editingUserId 
            ? { 
                ...user, 
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                status: newUser.status
              }
            : user
        );
        setUsers(updatedUsers);
        alert(`✅ Utilisateur ${newUser.name} modifié avec succès!`);
      } else {
        // Création d'un nouvel utilisateur
        const user: User = {
          id: Date.now(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
          lastLogin: new Date().toLocaleString('fr-FR')
        };
        setUsers([...users, user]);
        alert(`✅ Utilisateur ${user.name} ajouté avec succès!`);
      }
      
      setNewUser({ name: '', email: '', role: 'Gestionnaire', status: 'Actif' });
      setShowUserForm(false);
      setEditingUserId(null);
      setHasUnsavedChanges(true);
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== id));
      setHasUnsavedChanges(true);
      alert('✅ Utilisateur supprimé avec succès!');
    }
  };

  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'Actif' ? 'Inactif' : 'Actif' }
        : user
    ));
    setHasUnsavedChanges(true);
    
    const user = users.find(u => u.id === id);
    if (user) {
      alert(`✅ Statut de ${user.name} changé en ${user.status === 'Actif' ? 'Inactif' : 'Actif'}`);
    }
  };

  const handleEditUser = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setNewUser({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      });
      setEditingUserId(id);
      setShowUserForm(true);
    }
  };

  const handleCancelEdit = () => {
    setNewUser({ name: '', email: '', role: 'Gestionnaire', status: 'Actif' });
    setShowUserForm(false);
    setEditingUserId(null);
  };

  const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' }
  ];

  const timezones = [
    { value: 'Africa/Abidjan', label: 'Abidjan (UTC+0)' },
    { value: 'Europe/Paris', label: 'Paris (UTC+1)' },
    { value: 'America/New_York', label: 'New York (UTC-5)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' }
  ];

  const currencies = [
    { value: 'FCFA', label: 'Franc CFA (FCFA)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'USD', label: 'Dollar ($)' },
    { value: 'GBP', label: 'Livre Sterling (£)' }
  ];

  const dateFormats = [
    { value: 'dd/MM/yyyy', label: 'JJ/MM/AAAA' },
    { value: 'MM/dd/yyyy', label: 'MM/JJ/AAAA' },
    { value: 'yyyy-MM-dd', label: 'AAAA-MM-JJ' },
    { value: 'dd MMM yyyy', label: 'JJ MMM AAAA' }
  ];

  const fiscalYears = [
    { value: 'Janvier - Décembre', label: 'Janvier - Décembre' },
    { value: 'Avril - Mars', label: 'Avril - Mars' },
    { value: 'Juillet - Juin', label: 'Juillet - Juin' },
    { value: 'Octobre - Septembre', label: 'Octobre - Septembre' }
  ];

  const userRoles = ['Administrateur', 'Gestionnaire', 'Utilisateur', 'Consultant'];

  return (
    <BaseAdminLayout>
      <div className="settings-page">
        {/* En-tête principale */}
        <div className="page-header-section">
          <div className="header-content">
            <div className="header-text">
              <h1 style={{ color: 'white' }}>⚙️ Paramètres Système</h1>
              <p style={{ color: 'white' }}>Configurez les paramètres de votre application et gérez les utilisateurs</p>
            </div>
            <div className="header-actions">
              {hasUnsavedChanges && (
                <div className="unsaved-changes">
                  ⚠️ Modifications non sauvegardées
                </div>
              )}
              <div className="action-buttons">
                <button 
                  className="btn btn-outline"
                  onClick={handleResetSettings}
                >
                  🔄 Réinitialiser
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveSettings}
                  disabled={!hasUnsavedChanges}
                >
                  💾 Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-layout">
          {/* Navigation latérale */}
          <div className="settings-sidebar card">
            <div className="sidebar-header">
              <h3>Configuration</h3>
            </div>
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                <span className="nav-icon">🌐</span>
                <span className="nav-label">Général</span>
              </button>
              <button 
                className={`nav-item ${activeTab === 'company' ? 'active' : ''}`}
                onClick={() => setActiveTab('company')}
              >
                <span className="nav-icon">🏢</span>
                <span className="nav-label">Entreprise</span>
              </button>
              <button 
                className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <span className="nav-icon">🔒</span>
                <span className="nav-label">Sécurité</span>
              </button>
              <button 
                className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <span className="nav-icon">🔔</span>
                <span className="nav-label">Notifications</span>
              </button>
            </nav>
          </div>

          {/* Contenu principal */}
          <div className="settings-content">
            {/* Section Général */}
            {activeTab === 'general' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>🌐 Paramètres Généraux</h2>
                  <p>Configurez les paramètres de base de votre application</p>
                </div>

                <div className="settings-grid">
                  <div className="setting-card card">
                    <h4>📍 Langue et Région</h4>
                    <div className="form-group">
                      <label>Langue de l'interface</label>
                      <select 
                        value={settings.language}
                        onChange={(e) => setSettings({...settings, language: e.target.value})}
                      >
                        {languages.map(lang => (
                          <option key={lang.value} value={lang.value}>{lang.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Fuseau horaire</label>
                      <select 
                        value={settings.timezone}
                        onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                      >
                        {timezones.map(tz => (
                          <option key={tz.value} value={tz.value}>{tz.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="setting-card card">
                    <h4>💰 Paramètres Monétaires</h4>
                    <div className="form-group">
                      <label>Devise par défaut</label>
                      <select 
                        value={settings.currency}
                        onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      >
                        {currencies.map(currency => (
                          <option key={currency.value} value={currency.value}>{currency.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Format de date</label>
                      <select 
                        value={settings.dateFormat}
                        onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
                      >
                        {dateFormats.map(format => (
                          <option key={format.value} value={format.value}>{format.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section Entreprise */}
            {activeTab === 'company' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>🏢 Informations de l'Entreprise</h2>
                  <p>Gérez les informations de votre organisation</p>
                </div>

                <div className="company-settings card">
                  <div className="settings-grid">
                    <div className="form-group">
                      <label>Nom de l'entreprise *</label>
                      <input 
                        type="text" 
                        value={settings.companyName}
                        onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email de contact *</label>
                      <input 
                        type="email" 
                        value={settings.companyEmail}
                        onChange={(e) => setSettings({...settings, companyEmail: e.target.value})}
                        placeholder="contact@entreprise.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input 
                        type="tel" 
                        value={settings.companyPhone}
                        onChange={(e) => setSettings({...settings, companyPhone: e.target.value})}
                        placeholder="+225 00 00 00 00"
                      />
                    </div>
                    <div className="form-group">
                      <label>Année fiscale</label>
                      <select 
                        value={settings.fiscalYear}
                        onChange={(e) => setSettings({...settings, fiscalYear: e.target.value})}
                      >
                        {fiscalYears.map(year => (
                          <option key={year.value} value={year.value}>{year.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Adresse</label>
                    <textarea 
                      value={settings.companyAddress}
                      onChange={(e) => setSettings({...settings, companyAddress: e.target.value})}
                      rows={3}
                      placeholder="Adresse complète de l'entreprise"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section Sécurité */}
            {activeTab === 'security' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>🔒 Paramètres de Sécurité</h2>
                  <p>Configurez les paramètres de sécurité et gérez les utilisateurs</p>
                </div>

                <div className="security-settings">
                  <div className="security-card card">
                    <h4>🔐 Sécurité du Compte</h4>
                    
                    <div className="security-item">
                      <div className="security-info">
                        <h5>Authentification à deux facteurs</h5>
                        <p>Ajoutez une couche de sécurité supplémentaire à votre compte</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.twoFactorAuth}
                          onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="security-item">
                      <div className="security-info">
                        <h5>Délai d'expiration de session</h5>
                        <p>Durée d'inactivité avant déconnexion automatique</p>
                      </div>
                      <select 
                        value={settings.sessionTimeout}
                        onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 heure</option>
                        <option value={120}>2 heures</option>
                        <option value={240}>4 heures</option>
                      </select>
                    </div>

                    <div className="security-item">
                      <div className="security-info">
                        <h5>Expiration du mot de passe</h5>
                        <p>Durée de validité des mots de passe</p>
                      </div>
                      <select 
                        value={settings.passwordExpiry}
                        onChange={(e) => setSettings({...settings, passwordExpiry: parseInt(e.target.value)})}
                      >
                        <option value={30}>30 jours</option>
                        <option value={60}>60 jours</option>
                        <option value={90}>90 jours</option>
                        <option value={180}>180 jours</option>
                        <option value={365}>1 an</option>
                      </select>
                    </div>
                  </div>

                  <div className="users-management card">
                    <div className="management-header">
                      <h4>👥 Gestion des Utilisateurs</h4>
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowUserForm(true)}
                      >
                        ➕ Ajouter un utilisateur
                      </button>
                    </div>

                    {showUserForm && (
                      <div className="user-form card">
                        <h5>{editingUserId ? 'Modifier Utilisateur' : 'Nouvel Utilisateur'}</h5>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Nom complet *</label>
                            <input
                              type="text"
                              value={newUser.name}
                              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                              placeholder="Nom et prénom"
                            />
                          </div>
                          <div className="form-group">
                            <label>Email *</label>
                            <input
                              type="email"
                              value={newUser.email}
                              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                              placeholder="email@entreprise.com"
                            />
                          </div>
                          <div className="form-group">
                            <label>Rôle</label>
                            <select
                              value={newUser.role}
                              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                            >
                              {userRoles.map(role => (
                                <option key={role} value={role}>{role}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Statut</label>
                            <select
                              value={newUser.status}
                              onChange={(e) => setNewUser({...newUser, status: e.target.value as 'Actif' | 'Inactif'})}
                            >
                              <option value="Actif">Actif</option>
                              <option value="Inactif">Inactif</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-actions">
                          <button 
                            className="btn btn-outline"
                            onClick={handleCancelEdit}
                          >
                            Annuler
                          </button>
                          <button 
                            className="btn btn-success"
                            onClick={handleAddUser}
                            disabled={!newUser.name || !newUser.email}
                          >
                            {editingUserId ? 'Mettre à jour' : 'Créer l\'utilisateur'}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="users-table-container">
                      <table className="users-table">
                        <thead>
                          <tr>
                            <th>Utilisateur</th>
                            <th>Rôle</th>
                            <th>Statut</th>
                            <th>Dernière connexion</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(user => (
                            <tr key={user.id}>
                              <td className="user-info">
                                <div className="user-avatar">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="user-details">
                                  <div className="user-name">{user.name}</div>
                                  <div className="user-email">{user.email}</div>
                                </div>
                              </td>
                              <td className="user-role">
                                <span className={`role-badge role-${user.role.toLowerCase()}`}>
                                  {user.role}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className={`status-toggle ${user.status.toLowerCase()}`}
                                  onClick={() => handleToggleUserStatus(user.id)}
                                >
                                  {user.status}
                                </button>
                              </td>
                              <td className="last-login">{user.lastLogin}</td>
                              <td>
                                <div className="user-actions">
                                  <button 
                                    className="btn btn-outline btn-sm"
                                    title="Modifier"
                                    onClick={() => handleEditUser(user.id)}
                                  >
                                    ✏️
                                  </button>
                                  <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteUser(user.id)}
                                    title="Supprimer"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section Notifications */}
            {activeTab === 'notifications' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>🔔 Paramètres de Notifications</h2>
                  <p>Configurez les préférences de notification de votre application</p>
                </div>

                <div className="notifications-card card">
                  <h4>📧 Notifications par Email</h4>
                  <div className="notifications-list">
                    <div className="notification-item">
                      <div className="notification-info">
                        <h5>Notifications générales</h5>
                        <p>Recevez des notifications importantes par email</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.emailNotifications}
                          onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="notification-item">
                      <div className="notification-info">
                        <h5>Rappels de paie</h5>
                        <p>Notifications pour les échéances de paie</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.payrollReminders}
                          onChange={(e) => setSettings({...settings, payrollReminders: e.target.checked})}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="notification-item">
                      <div className="notification-info">
                        <h5>Alertes de dépenses</h5>
                        <p>Notifications pour les dépenses importantes</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.expenseAlerts}
                          onChange={(e) => setSettings({...settings, expenseAlerts: e.target.checked})}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="notification-item">
                      <div className="notification-info">
                        <h5>Mises à jour système</h5>
                        <p>Notifications pour les mises à jour de l'application</p>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={settings.systemUpdates}
                          onChange={(e) => setSettings({...settings, systemUpdates: e.target.checked})}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseAdminLayout>
  );
};

export default Settings;