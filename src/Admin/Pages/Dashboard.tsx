import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BaseAdminLayout from '../../AdminLayout/BaseAdminLayout';

// Données pour les statistiques
const stats = [
  {
    title: "Total des employés",
    value: "124",
    change: "+2%",
    trend: "up"
  },
  {
    title: "Masse salariale (Mois)",
    value: "85 230 FCFA",
    change: "-1.5%",
    trend: "down"
  },
  {
    title: "Chiffre d'affaires (Mois)",
    value: "152 780 FCFA",
    change: "+5.2%",
    trend: "up"
  },
  {
    title: "Depenses du mois",
    value: "210 450 FCFA",
    change: "+8%",
    trend: "up"
  }
];

// Données pour les Opérations - Dépenses (simplifiées)
const operationsExpenses = [
  { category: "Dépenses", amount: 128780, percentage: 100 }
];

// Données pour les Opérations - Recettes (simplifiées)
const operationsRevenues = [
  { category: "Recettes", amount: 152780, percentage: 100 }
];

// Demandes en attente
const pendingRequests = [
  {
    name: "Sophie Martin",
    type: "Demande de congé",
    amount: null
  },
  {
    name: "Luc Bernard",
    type: "Note de frais",
    amount: "78 FCFA"
  },
  {
    name: "Chloé Dubois",
    type: "Demande de congé",
    amount: null
  }
];

// Prochains paiements
const upcomingPayments = [
  {
    description: "Paie mensuelle",
    date: "28 Juin 2024",
    amount: "85 230 FCFA"
  },
  {
    description: "Fournisseur Tech SARL",
    date: "02 Juillet 2024",
    amount: "4 500 FCFA"
  },
  {
    description: "Loyer bureaux",
    date: "05 Juillet 2024",
    amount: "7 200 FCFA"
  }
];

const Dashboard: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
  };

  // Calculer les totaux pour les opérations
  const totalExpenses = operationsExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalRevenues = operationsRevenues.reduce((sum, revenue) => sum + revenue.amount, 0);

  return (
    <BaseAdminLayout>
      <div className="dashboard-page">
        {/* En-tête avec titre seulement */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Tableau de bord</h1>
          </div>
        </div>

        {/* Section des actions rapides - SÉPARÉE DE LA NAVIGATION */}
        <div className="quick-actions-section">
          <div className="quick-actions">
            <Link 
              to="/admin/payroll" 
              className={`btn ${selectedAction === 'payroll' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleActionClick('payroll')}
            >
              Lancer la paie
            </Link>
            <Link 
              to="/admin/employees" 
              className={`btn ${selectedAction === 'employees' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleActionClick('employees')}
            >
              Ajouter un employé
            </Link>
                      {/*
                <Link 
                  to="/admin/accounting" 
                  className={`btn ${selectedAction === 'accounting' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleActionClick('accounting')}
                >
                  Créer une facture
                </Link>
                */}
          </div>
        </div>

        {/* Grille principale du dashboard */}
        <div className="dashboard-grid">
          {/* Colonne gauche */}
          <div className="dashboard-column left-column">
            {/* Cartes de statistiques */}
            <div className="stats-section">
              <div className="stats-cards">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <h3>{stat.title}</h3>
                    <div className="stat-value">{stat.value}</div>
                    <div className={`stat-change ${stat.trend}`}>
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opérations */}
            <div className="operations-section">
              <div className="operations-grid">
                {/* Opérations - Section unique avec Dépenses et Recettes */}
                <div className="operations-card card">
                  <div className="section-header">
                    <h3>Opérations</h3>
                    <div className="operations-total">
                      Balance: {(totalRevenues - totalExpenses).toLocaleString()} FCFA
                    </div>
                  </div>
                  
                  <div className="operations-content">
                    {/* Section Dépenses - SIMPLIFIÉE */}
                    <div className="expenses-section">
                      <div className="expenses-header">
                        <h4 className="expenses-title">DÉPENSES</h4>
                        <div className="total-expenses">{totalExpenses.toLocaleString()} FCFA</div>
                      </div>
                      <div className="expenses-bars">
                        {operationsExpenses.map((expense, index) => (
                          <div key={`expense-${index}`} className="expense-bar-item">
                            <div className="expense-info">
                              <span className="expense-category">{expense.category}</span>
                              <span className="expense-amount">{expense.amount.toLocaleString()} FCFA</span>
                            </div>
                            <div className="expense-bar">
                              <div 
                                className="expense-fill" 
                                style={{ width: `${expense.percentage}%` }}
                              ></div>
                            </div>
                            <span className="expense-percentage">{expense.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section Recettes - SIMPLIFIÉE */}
                    <div className="revenues-section">
                      <div className="revenues-header">
                        <h4 className="revenues-title">RECETTES</h4>
                        <div className="total-revenues">{totalRevenues.toLocaleString()} FCFA</div>
                      </div>
                      <div className="revenues-bars">
                        {operationsRevenues.map((revenue, index) => (
                          <div key={`revenue-${index}`} className="revenue-bar-item">
                            <div className="revenue-info">
                              <span className="revenue-category">{revenue.category}</span>
                              <span className="revenue-amount">{revenue.amount.toLocaleString()} FCFA</span>
                            </div>
                            <div className="revenue-bar">
                              <div 
                                className="revenue-fill" 
                                style={{ width: `${revenue.percentage}%` }}
                              ></div>
                            </div>
                            <span className="revenue-percentage">{revenue.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Évolution de la masse salariale - CONSERVÉ */}
                <div className="salary-evolution card">
                  <h3>Évolution de la masse salariale</h3>
                  <div className="evolution-content">
                    <div className="evolution-value">85 230 FCFA</div>
                    <div className="evolution-period">6 derniers mois <span className="change-up">+1.8%</span></div>
                    <div className="evolution-chart">
                      {/* Placeholder pour le graphique d'évolution */}
                      <div className="chart-placeholder">
                        <div className="chart-line"></div>
                        <div className="chart-points">
                          <div className="point"></div>
                          <div className="point"></div>
                          <div className="point"></div>
                          <div className="point"></div>
                          <div className="point"></div>
                          <div className="point"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="dashboard-column right-column">
            {/* Demandes en attente */}
            <div className="pending-requests card">
              <div className="section-header">
                <h3>Demandes en attente</h3>
                <Link to="/admin/employees" className="view-all">Voir tout</Link>
              </div>
              <div className="requests-list">
                {pendingRequests.map((request, index) => (
                  <div key={index} className="request-item">
                    <div className="request-info">
                      <div className="request-name">{request.name}</div>
                      <div className="request-type">{request.type}</div>
                      {request.amount && (
                        <div className="request-amount">{request.amount}</div>
                      )}
                    </div>
                    <button className="btn btn-sm btn-outline">Voir</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Prochains paiements */}
            <div className="upcoming-payments card">
              <div className="section-header">
                <h3>Prochains paiements</h3>
                <Link to="/admin/accounting" className="view-all">Voir tout</Link>
              </div>
              <div className="payments-list">
                {upcomingPayments.map((payment, index) => (
                  <div key={index} className="payment-item">
                    <div className="payment-info">
                      <div className="payment-description">{payment.description}</div>
                      <div className="payment-date">{payment.date}</div>
                    </div>
                    <div className="payment-amount">{payment.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseAdminLayout>
  );
};

export default Dashboard;