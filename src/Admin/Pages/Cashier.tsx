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

interface CashFlow {
  id: number;
  date: string;
  description: string;
  type: 'in' | 'out';
  amount: number;
  category: string;
  initiatedBy: string;
  clientId?: number;
  clientName?: string;
  balance: number;
}

const Cashier: React.FC = () => {
  const [cashFlows, setCashFlows] = useState<CashFlow[]>(() => {
    const saved = localStorage.getItem('cashFlows');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        date: "2024-06-20",
        description: "Vente d'une balise GPS",
        type: 'in',
        amount: 50000,
        category: "Vente d'une balise GPS",
        initiatedBy: "",
        clientId: 1,
        clientName: "Jean Dupont",
        balance: 250000
      },
      {
        id: 2,
        date: "2024-06-19",
        description: "Paiement salaires",
        type: 'out',
        amount: 25000,
        category: "Salaire",
        initiatedBy: "Jean Dupont",
        balance: 225000
      },
      {
        id: 3,
        date: "2024-06-18",
        description: "Redevance mensuelle",
        type: 'in',
        amount: 15000,
        category: "Redevance mensuelle",
        initiatedBy: "",
        clientId: 2,
        clientName: "Marie Martin",
        balance: 200000
      }
    ];
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'in' as 'in' | 'out',
    category: '',
    initiatedBy: '',
    date: new Date().toISOString().split('T')[0],
    clientId: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<CashFlow>>({});

  // Charger les clients depuis le LocalStorage
  useEffect(() => {
    const clientsSauvegardes = localStorage.getItem('clients');
    if (clientsSauvegardes) {
      const clientsParses = JSON.parse(clientsSauvegardes);
      const aujourdhui = new Date().toISOString().split('T')[0];
      const clientsAvecGPS = clientsParses.map((client: Client) => ({
        ...client,
        gpsActif: client.dateExpiration >= aujourdhui
      }));
      setClients(clientsAvecGPS);
    }
  }, []);

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('cashFlows', JSON.stringify(cashFlows));
  }, [cashFlows]);

  const currentBalance = cashFlows.length > 0 ? cashFlows[0].balance : 0;
  const totalIn = cashFlows.filter(f => f.type === 'in').reduce((sum, f) => sum + f.amount, 0);
  const totalOut = cashFlows.filter(f => f.type === 'out').reduce((sum, f) => sum + f.amount, 0);

  // Catégories spécifiques
  const expenseCategories = [
    'Salaire', 
    'Facture CIE', 
    'Facture SODECI', 
    'Matériels de bureaux',
    'Fournisseurs',
    'Loyer',
    'Autre'
  ];

  const incomeCategories = [
    "Vente d'une balise GPS",
    "Redevance mensuelle",
    "Autre"
  ];

  // Filtrer les transactions
  const filteredCashFlows = cashFlows.filter(flow => {
    const matchesSearch = flow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flow.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flow.initiatedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (flow.clientName && flow.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || 
                       (typeFilter === 'in' && flow.type === 'in') || 
                       (typeFilter === 'out' && flow.type === 'out');
    const matchesCategory = categoryFilter === 'all' || flow.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleAddTransaction = () => {
    if (newTransaction.description && newTransaction.amount && newTransaction.category) {
      const amount = parseFloat(newTransaction.amount);
      const newBalance = newTransaction.type === 'in' ? currentBalance + amount : currentBalance - amount;
      
      // Trouver le nom du client si un client est sélectionné
      let clientName = '';
      if (newTransaction.clientId) {
        const selectedClient = clients.find(c => c.id.toString() === newTransaction.clientId);
        if (selectedClient) {
          clientName = `${selectedClient.prenom} ${selectedClient.nom}`;
        }
      }

      const newCashFlow: CashFlow = {
        id: Date.now(),
        date: newTransaction.date,
        description: newTransaction.description,
        type: newTransaction.type,
        amount: amount,
        category: newTransaction.category,
        initiatedBy: newTransaction.initiatedBy || '',
        clientId: newTransaction.clientId ? parseInt(newTransaction.clientId) : undefined,
        clientName: clientName || undefined,
        balance: newBalance
      };

      // Mettre à jour tous les soldes
      const updatedFlows = cashFlows.map(flow => ({
        ...flow,
        balance: newTransaction.type === 'in' ? flow.balance + amount : flow.balance - amount
      }));

      setCashFlows([newCashFlow, ...updatedFlows]);
      setNewTransaction({ 
        description: '', 
        amount: '', 
        type: 'in', 
        category: '', 
        initiatedBy: '',
        date: new Date().toISOString().split('T')[0],
        clientId: ''
      });
      setShowNewTransaction(false);
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  };

  const handleDeleteTransaction = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      const transactionToDelete = cashFlows.find(flow => flow.id === id);
      if (transactionToDelete) {
        const updatedFlows = cashFlows
          .filter(flow => flow.id !== id)
          .map(flow => ({
            ...flow,
            balance: transactionToDelete.type === 'in' ? 
              flow.balance - transactionToDelete.amount : 
              flow.balance + transactionToDelete.amount
          }));
        setCashFlows(updatedFlows);
      }
    }
  };

  const handleEditTransaction = (flow: CashFlow) => {
    setEditingId(flow.id);
    setEditForm(flow);
  };

  const handleUpdateTransaction = () => {
    if (editingId && editForm.description && editForm.amount && editForm.category) {
      const updatedFlows = cashFlows.map(flow => 
        flow.id === editingId ? { ...flow, ...editForm } : flow
      );
      setCashFlows(updatedFlows);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Calculer la répartition par catégorie
  const getCategoryDistribution = () => {
    const incomeByCategory: { [key: string]: number } = {};
    const expenseByCategory: { [key: string]: number } = {};

    cashFlows.forEach(flow => {
      if (flow.type === 'in') {
        incomeByCategory[flow.category] = (incomeByCategory[flow.category] || 0) + flow.amount;
      } else {
        expenseByCategory[flow.category] = (expenseByCategory[flow.category] || 0) + flow.amount;
      }
    });

    return { incomeByCategory, expenseByCategory };
  };

  const { incomeByCategory, expenseByCategory } = getCategoryDistribution();
  const totalIncome = Object.values(incomeByCategory).reduce((sum, amount) => sum + amount, 0);
  const totalExpense = Object.values(expenseByCategory).reduce((sum, amount) => sum + amount, 0);

  return (
    <BaseAdminLayout>
      <div className="cashier-page">
        {/* En-tête principale - Titre en blanc */}
        <div className="page-header-section">
          <div className="header-content">
            <div className="header-text">
              <h1 style={{ color: 'white' }}>Gestion de Caisse</h1>
              <p style={{ color: 'white' }}>Suivi des flux de trésorerie et gestion des transactions</p>
            </div>
            <div className="header-actions">
              <div className="action-buttons">
                <button 
                  className="btn btn-success"
                  onClick={() => {
                    setNewTransaction({ 
                      description: '', 
                      amount: '', 
                      type: 'in', 
                      category: '', 
                      initiatedBy: '',
                      date: new Date().toISOString().split('T')[0],
                      clientId: ''
                    });
                    setShowNewTransaction(true);
                  }}
                >
                  💰 Entrée de caisse
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => {
                    setNewTransaction({ 
                      description: '', 
                      amount: '', 
                      type: 'out', 
                      category: '', 
                      initiatedBy: '',
                      date: new Date().toISOString().split('T')[0],
                      clientId: ''
                    });
                    setShowNewTransaction(true);
                  }}
                >
                  📤 Sortie de caisse
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques - MODIFIÉ : Solde actuel placé en premier */}
        <div className="cashier-stats-section">
          <div className="stats-grid">
            {/* Carte : Solde Actuel */}
            <div className="stat-card balance-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Solde Actuel</h3>
                <div className="value">{currentBalance.toLocaleString()} FCFA</div>
                <div className="stat-trend">Solde disponible</div>
              </div>
            </div>
            
            {/* Carte : Entrées Total */}
            <div className="stat-card income-card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <h3>Entrées Total</h3>
                <div className="value">{totalIn.toLocaleString()} FCFA</div>
                <div className="stat-trend">Ce mois</div>
              </div>
            </div>
            
            {/* Carte : Sorties Total */}
            <div className="stat-card expense-card">
              <div className="stat-icon">📉</div>
              <div className="stat-content">
                <h3>Sorties Total</h3>
                <div className="value">{totalOut.toLocaleString()} FCFA</div>
                <div className="stat-trend">Ce mois</div>
              </div>
            </div>

            {/* Carte SUPPRIMÉE : Flux Net */}
            {/* <div className="stat-card flow-card">
              <div className="stat-icon">⚖️</div>
              <div className="stat-content">
                <h3>Flux Net</h3>
                <div className={`value ${totalIn - totalOut >= 0 ? 'positive' : 'negative'}`}>
                  {(totalIn - totalOut).toLocaleString()} FCFA
                </div>
                <div className="stat-trend">Balance</div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Modal nouvelle transaction */}
        {showNewTransaction && (
          <div className="modal-overlay">
            <div className="modal-content card">
              <div className="modal-header">
                <h3>
                  {newTransaction.type === 'in' ? '💸 Nouvelle Entrée' : '📤 Nouvelle Sortie'} de Caisse
                </h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowNewTransaction(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Description *</label>
                    <input
                      type="text"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                      placeholder={
                        newTransaction.type === 'in' 
                          ? "Description de l'entrée de caisse" 
                          : "Description de la sortie de caisse"
                      }
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Catégorie *</label>
                    <select
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {newTransaction.type === 'in' ? (
                        incomeCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))
                      ) : (
                        expenseCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))
                      )}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Montant (FCFA) *</label>
                    <input
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Champ "Client" seulement pour les entrées de type spécifiques */}
                  {newTransaction.type === 'in' && (
                    <div className="form-group">
                      <label>Sélectionner le client</label>
                      <select
                        value={newTransaction.clientId}
                        onChange={(e) => setNewTransaction({...newTransaction, clientId: e.target.value})}
                      >
                        <option value="">Aucun client</option>
                        {clients.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.prenom} {client.nom} - {client.telephone}
                          </option>
                        ))}
                      </select>
                      <small className="form-help">
                        {clients.length === 0 ? 'Aucun client disponible' : 'Sélectionnez un client'}
                      </small>
                    </div>
                  )}

                  {/* Champ "Initié par" seulement pour les sorties */}
                  {newTransaction.type === 'out' && (
                    <div className="form-group">
                      <label>Initié par :</label>
                      <input
                        type="text"
                        value={newTransaction.initiatedBy}
                        onChange={(e) => setNewTransaction({...newTransaction, initiatedBy: e.target.value})}
                        placeholder="Nom de la personne qui a demandé la sortie"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Type</label>
                    <div className="type-selector">
                      <button
                        type="button"
                        className={`type-btn ${newTransaction.type === 'in' ? 'active' : ''}`}
                        onClick={() => setNewTransaction({...newTransaction, type: 'in'})}
                        style={{
                          backgroundColor: newTransaction.type === 'in' ? '#16a34a' : '#f3f4f6',
                          color: newTransaction.type === 'in' ? 'white' : '#374151',
                          border: '1px solid',
                          borderColor: newTransaction.type === 'in' ? '#16a34a' : '#d1d5db'
                        }}
                      >
                        💰 Entrée
                      </button>
                      <button
                        type="button"
                        className={`type-btn ${newTransaction.type === 'out' ? 'active' : ''}`}
                        onClick={() => setNewTransaction({...newTransaction, type: 'out'})}
                        style={{
                          backgroundColor: newTransaction.type === 'out' ? '#dc2626' : '#f3f4f6',
                          color: newTransaction.type === 'out' ? 'white' : '#374151',
                          border: '1px solid',
                          borderColor: newTransaction.type === 'out' ? '#dc2626' : '#d1d5db'
                        }}
                      >
                        📤 Sortie
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowNewTransaction(false)}
                >
                  Annuler
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleAddTransaction}
                  disabled={!newTransaction.description || !newTransaction.amount || !newTransaction.category || !newTransaction.date}
                >
                  💾 Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filtres et recherche - Section modifiée */}
        <div className="filters-section">
          <div className="filters-card card">
            <div className="filters-header">
              <h3>Filtres</h3>
              <div className="results-count">
                {filteredCashFlows.length} transaction(s) trouvée(s)
              </div>
            </div>
            
            <div className="filters-content">
              <div className="filters-grid">
                <div className="filter-group">
                  <label>Type</label>
                  <select 
                    className="filter-select"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">Tous les types</option>
                    <option value="in">Entrées</option>
                    <option value="out">Sorties</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Catégorie</label>
                  <select 
                    className="filter-select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">Toutes les catégories</option>
                    {[...incomeCategories, ...expenseCategories]
                      .filter((value, index, self) => self.indexOf(value) === index)
                      .map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))
                    }
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Actions</label>
                  <div className="filter-actions">
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setSearchTerm('');
                        setTypeFilter('all');
                        setCategoryFilter('all');
                      }}
                    >
                      🔄 Réinitialiser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des transactions */}
        <div className="transactions-section">
          <div className="section-header">
            <h3>Mouvements de Caisse</h3>
            <div className="section-actions">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => {
                  const dataStr = JSON.stringify(cashFlows, null, 2);
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `transactions-${new Date().toISOString().split('T')[0]}.json`;
                  link.click();
                }}
              >
                💾 Exporter
              </button>
            </div>
          </div>

          <div className="cashflow-table card">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>DESCRIPTION</th>
                    <th>CLIENT</th>
                    <th>CATÉGORIE</th>
                    <th>TYPE</th>
                    <th>INITIÉ PAR</th>
                    <th>MONTANT</th>
                    <th>SOLDE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCashFlows.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="no-data">
                        📭 Aucune transaction trouvée
                      </td>
                    </tr>
                  ) : (
                    filteredCashFlows.map(flow => (
                      <tr key={flow.id} className={flow.type}>
                        <td className="date-cell">
                          {new Date(flow.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </td>
                        
                        <td className="description-cell">
                          {editingId === flow.id ? (
                            <input
                              type="text"
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              className="edit-input"
                            />
                          ) : (
                            flow.description
                          )}
                        </td>
                        
                        <td className="client-cell">
                          {flow.clientName ? (
                            <div className="client-info">
                              <span className="client-name">{flow.clientName}</span>
                            </div>
                          ) : (
                            <span className="no-client">-</span>
                          )}
                        </td>
                        
                        <td className="category-cell">
                          {editingId === flow.id ? (
                            <select
                              value={editForm.category || ''}
                              onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                              className="edit-select"
                            >
                              {flow.type === 'in' ? (
                                incomeCategories.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))
                              ) : (
                                expenseCategories.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))
                              )}
                            </select>
                          ) : (
                            <span className={`category-tag category-${flow.category.toLowerCase().replace(/\s+/g, '-')}`}>
                              {flow.category}
                            </span>
                          )}
                        </td>
                        
                        <td className="type-cell">
                          <span className={`type-badge ${flow.type}`}>
                            {flow.type === 'in' ? '💰 Entrée' : '📤 Sortie'}
                          </span>
                        </td>
                        
                        <td className="initiated-by-cell">
                          {editingId === flow.id && flow.type === 'out' ? (
                            <input
                              type="text"
                              value={editForm.initiatedBy || ''}
                              onChange={(e) => setEditForm({...editForm, initiatedBy: e.target.value})}
                              className="edit-input"
                              placeholder="Initié par"
                            />
                          ) : flow.initiatedBy ? (
                            <span className="initiated-by-text">{flow.initiatedBy}</span>
                          ) : (
                            <span className="no-initiated">-</span>
                          )}
                        </td>
                        
                        <td className={`amount-cell ${flow.type}`}>
                          {editingId === flow.id ? (
                            <input
                              type="number"
                              value={editForm.amount || ''}
                              onChange={(e) => setEditForm({...editForm, amount: parseFloat(e.target.value)})}
                              className="edit-input"
                              min="0"
                              step="0.01"
                            />
                          ) : (
                            <>
                              {flow.type === 'in' ? '+' : '-'}
                              {flow.amount.toLocaleString()} FCFA
                            </>
                          )}
                        </td>
                        
                        <td className="balance-cell">
                          {flow.balance.toLocaleString()} FCFA
                        </td>
                        
                        <td className="actions-cell">
                          {editingId === flow.id ? (
                            <div className="edit-actions">
                              <button 
                                className="btn btn-success btn-sm"
                                onClick={handleUpdateTransaction}
                                title="Sauvegarder"
                              >
                                ✅
                              </button>
                              <button 
                                className="btn btn-outline btn-sm"
                                onClick={handleCancelEdit}
                                title="Annuler"
                              >
                                ❌
                              </button>
                            </div>
                          ) : (
                            <div className="action-buttons">
                              <button 
                                className="btn btn-outline btn-sm"
                                onClick={() => handleEditTransaction(flow)}
                                title="Modifier"
                              >
                                ✏️
                              </button>
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteTransaction(flow.id)}
                                title="Supprimer"
                              >
                                🗑️
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Résumé et statistiques */}
        <div className="summary-section">
          <div className="summary-grid">
            <div className="summary-card card">
              <h3>📊 Répartition des Entrées</h3>
              <div className="category-breakdown">
                {Object.entries(incomeByCategory).map(([category, amount]) => {
                  const percentage = totalIncome > 0 ? (amount / totalIncome * 100).toFixed(1) : '0';
                  return (
                    <div key={category} className="breakdown-item">
                      <div className="breakdown-header">
                        <span className="category-name">{category}</span>
                        <span className="category-amount">{amount.toLocaleString()} FCFA</span>
                      </div>
                      <div className="breakdown-bar">
                        <div 
                          className="breakdown-fill income-fill"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="breakdown-percentage">{percentage}%</span>
                    </div>
                  );
                })}
                {Object.keys(incomeByCategory).length === 0 && (
                  <div className="no-data">Aucune entrée enregistrée</div>
                )}
              </div>
            </div>

            <div className="summary-card card">
              <h3>📊 Répartition des Sorties</h3>
              <div className="category-breakdown">
                {Object.entries(expenseByCategory).map(([category, amount]) => {
                  const percentage = totalExpense > 0 ? (amount / totalExpense * 100).toFixed(1) : '0';
                  return (
                    <div key={category} className="breakdown-item">
                      <div className="breakdown-header">
                        <span className="category-name">{category}</span>
                        <span className="category-amount">{amount.toLocaleString()} FCFA</span>
                      </div>
                      <div className="breakdown-bar">
                        <div 
                          className="breakdown-fill expense-fill"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="breakdown-percentage">{percentage}%</span>
                    </div>
                  );
                })}
                {Object.keys(expenseByCategory).length === 0 && (
                  <div className="no-data">Aucune sortie enregistrée</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseAdminLayout>
  );
};

export default Cashier;