import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer les données d'authentification
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <div className="sidebar">
      {/* En-tête de la sidebar avec logo et info admin */}
      <div className="sidebar-header">
        {/* Logo et nom de l'entreprise */}
        <div className="company-brand">
          <div className="company-logo">
            <img src="/images/logo1.png" alt="Logo" />
          </div>
          <div className="company-info">
            <div className="company-name">2comsystems</div>
            <div className="company-status">En ligne</div>
          </div>
        </div>

        {/* Photo et nom de l'administrateur */}
        <div className="admin-profile">
          <div className="admin-avatar">
            <img src="/images/team2.jpg" alt="Photo" />
          </div>
          <div className="admin-info">
            <div className="admin-name">Adama Doumbia</div>
            <div className="admin-role">Administrateur</div>
          </div>
        </div>
      </div>

      {/* Navigation rapide */}
      <div className="quick-nav card">
        <h3>Navigation</h3>
        <div className="nav-links">
          <Link 
            to="/admin/dashboard" 
            className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            📊 Tableau de bord
          </Link>
          <Link 
            to="/admin/employees" 
            className={`nav-link ${location.pathname === '/admin/employees' ? 'active' : ''}`}
          >
            👥 Employés
          </Link>
          <Link 
            to="/admin/clients" 
            className={`nav-link ${location.pathname === '/admin/clients' ? 'active' : ''}`}
          >
            👥 Clients GPS
          </Link>
         
          <Link 
            to="/admin/payroll" 
            className={`nav-link ${location.pathname === '/admin/payroll' ? 'active' : ''}`}
          >
            📋 Paie
          </Link>
          <Link 
            to="/admin/cashier" 
            className={`nav-link ${location.pathname === '/admin/cashier' ? 'active' : ''}`}
          >
            🏦 Caisse
          </Link>
          <Link 
            to="/admin/reports" 
            className={`nav-link ${location.pathname === '/admin/reports' ? 'active' : ''}`}
          >
            📈 Rapports
          </Link>
          <Link 
            to="/admin/settings" 
            className={`nav-link ${location.pathname === '/admin/settings' ? 'active' : ''}`}
          >
            ⚙️ Paramètres
          </Link>
          
          {/* Bouton de déconnexion */}
          <button 
            onClick={handleLogout}
            className="nav-link logout-btn"
          >
            🚪 Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;