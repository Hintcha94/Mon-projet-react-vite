// Mise en commentaire complète du code
/*
import React, { useState, useEffect } from 'react';
import BaseAdminLayout from '../../AdminLayout/BaseAdminLayout';

interface AccountingEntry {
  id: number;
  date: string;
  journal: 'Vente' | 'Achat' | 'Banque' | 'Caisse' | 'Salaires' | 'OD';
  accountNumber: string;
  accountLabel: string;
  debit: number;
  credit: number;
  description: string;
  reference: string;
  source: 'Caisse' | 'Paie' | 'Manuel';
  linkedId?: number; // ID lié à la transaction source
}

interface Account {
  number: string;
  label: string;
  type: 'Actif' | 'Passif' | 'Capitaux' | 'Produits' | 'Charges';
  balance: number;
}

interface BalanceSheet {
  assets: {
    currentAssets: Account[];
    fixedAssets: Account[];
    totalAssets: number;
  };
  liabilities: {
    equity: Account[];
    debts: Account[];
    totalLiabilities: number;
  };
}

interface IncomeStatement {
  revenue: Account[];
  expenses: Account[];
  profit: number;
}

const Accounting: React.FC = () => {
  // États pour les données de comptabilité
  const [accountingEntries, setAccountingEntries] = useState<AccountingEntry[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheet | null>(null);
  const [incomeStatement, setIncomeStatement] = useState<IncomeStatement | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-10');
  
  // États pour les données de paie et caisse
  const [payrollData, setPayrollData] = useState<any[]>([]);
  const [cashFlowData, setCashFlowData] = useState<any[]>([]);
  
  // États pour le formulaire de nouvelle transaction manuelle
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    type: 'Revenu' as 'Revenu' | 'Dépense',
    category: '',
    journal: 'Vente' as 'Vente' | 'Achat' | 'Banque' | 'Caisse' | 'Salaires' | 'OD'
  });

  // Charger les données de paie et caisse
  useEffect(() => {
    // Charger les données de paie
    const savedPayroll = localStorage.getItem('payrollEntries');
    if (savedPayroll) {
      setPayrollData(JSON.parse(savedPayroll));
    }

    // Charger les données de caisse
    const savedCashFlows = localStorage.getItem('cashFlows');
    if (savedCashFlows) {
      setCashFlowData(JSON.parse(savedCashFlows));
    }

    // Charger les écritures comptables existantes
    const savedEntries = localStorage.getItem('accountingEntries');
    if (savedEntries) {
      setAccountingEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Plan comptable par défaut
  const defaultAccounts: Account[] = [
    // Actifs
    { number: '101', label: 'Caisse', type: 'Actif', balance: 0 },
    { number: '102', label: 'Banque', type: 'Actif', balance: 0 },
    { number: '103', label: 'Clients', type: 'Actif', balance: 0 },
    { number: '201', label: 'Matériel de bureau', type: 'Actif', balance: 0 },
    
    // Passifs
    { number: '401', label: 'Fournisseurs', type: 'Passif', balance: 0 },
    { number: '421', label: 'Salaires à payer', type: 'Passif', balance: 0 },
    
    // Capitaux
    { number: '501', label: 'Capital social', type: 'Capitaux', balance: 100000 },
    { number: '502', label: 'Résultat de l\'exercice', type: 'Capitaux', balance: 0 },
    
    // Produits
    { number: '701', label: 'Ventes de marchandises', type: 'Produits', balance: 0 },
    { number: '702', label: 'Prestations de services', type: 'Produits', balance: 0 },
    { number: '703', label: 'Redevances GPS', type: 'Produits', balance: 0 },
    
    // Charges
    { number: '601', label: 'Achats de marchandises', type: 'Charges', balance: 0 },
    { number: '602', label: 'Salaires et appointements', type: 'Charges', balance: 0 },
    { number: '603', label: 'Charges sociales', type: 'Charges', balance: 0 },
    { number: '604', label: 'Loyer et charges locatives', type: 'Charges', balance: 0 },
    { number: '605', label: 'Électricité (CIE)', type: 'Charges', balance: 0 },
    { number: '606', label: 'Eau (SODECI)', type: 'Charges', balance: 0 },
    { number: '607', label: 'Fournitures de bureau', type: 'Charges', balance: 0 },
    { number: '608', label: 'Entretien et réparations', type: 'Charges', balance: 0 },
    { number: '609', label: 'Frais de déplacement', type: 'Charges', balance: 0 },
  ];

  // Initialiser les comptes
  useEffect(() => {
    if (accounts.length === 0) {
      setAccounts(defaultAccounts);
    }
  }, [accounts.length]);

  // Générer les écritures comptables depuis la paie
  const generatePayrollEntries = () => {
    const entries: AccountingEntry[] = [];
    
    payrollData.forEach(payroll => {
      // Débit: Charges de personnel (602)
      entries.push({
        id: Date.now() + Math.random(),
        date: new Date().toISOString().split('T')[0],
        journal: 'Salaires',
        accountNumber: '602',
        accountLabel: 'Salaires et appointements',
        debit: payroll.grossSalary,
        credit: 0,
        description: `Paie de ${payroll.name} - ${selectedPeriod}`,
        reference: `PAY-${payroll.id}`,
        source: 'Paie',
        linkedId: payroll.id
      });

      // Débit: Charges sociales (603)
      entries.push({
        id: Date.now() + Math.random(),
        date: new Date().toISOString().split('T')[0],
        journal: 'Salaires',
        accountNumber: '603',
        accountLabel: 'Charges sociales',
        debit: payroll.deductions || 0,
        credit: 0,
        description: `Charges sociales - ${payroll.name}`,
        reference: `SOC-${payroll.id}`,
        source: 'Paie',
        linkedId: payroll.id
      });

      // Crédit: Salaires à payer (421)
      entries.push({
        id: Date.now() + Math.random(),
        date: new Date().toISOString().split('T')[0],
        journal: 'Salaires',
        accountNumber: '421',
        accountLabel: 'Salaires à payer',
        debit: 0,
        credit: payroll.netSalary,
        description: `À payer - ${payroll.name}`,
        reference: `PAY-${payroll.id}`,
        source: 'Paie',
        linkedId: payroll.id
      });
    });

    return entries;
  };

  // Générer les écritures comptables depuis la caisse
  const generateCashFlowEntries = () => {
    const entries: AccountingEntry[] = [];
    
    cashFlowData.forEach(flow => {
      if (flow.type === 'in') {
        // Entrée de caisse
        entries.push({
          id: Date.now() + Math.random(),
          date: flow.date,
          journal: 'Caisse',
          accountNumber: '101',
          accountLabel: 'Caisse',
          debit: flow.amount,
          credit: 0,
          description: flow.description,
          reference: `CAISSE-IN-${flow.id}`,
          source: 'Caisse',
          linkedId: flow.id
        });

        // Déterminer le compte produit selon la catégorie
        let productAccount = '701';
        if (flow.category === "Vente d'une balise GPS") {
          productAccount = '701';
        } else if (flow.category === "Redevance mensuelle") {
          productAccount = '703';
        }

        entries.push({
          id: Date.now() + Math.random(),
          date: flow.date,
          journal: 'Vente',
          accountNumber: productAccount,
          accountLabel: 'Ventes de marchandises',
          debit: 0,
          credit: flow.amount,
          description: flow.description,
          reference: `CAISSE-IN-${flow.id}`,
          source: 'Caisse',
          linkedId: flow.id
        });
      } else {
        // Sortie de caisse
        entries.push({
          id: Date.now() + Math.random(),
          date: flow.date,
          journal: 'Caisse',
          accountNumber: '101',
          accountLabel: 'Caisse',
          debit: 0,
          credit: flow.amount,
          description: flow.description,
          reference: `CAISSE-OUT-${flow.id}`,
          source: 'Caisse',
          linkedId: flow.id
        });

        // Déterminer le compte charge selon la catégorie
        let expenseAccount = '607';
        if (flow.category === 'Salaire') expenseAccount = '602';
        else if (flow.category === 'Facture CIE') expenseAccount = '605';
        else if (flow.category === 'Facture SODECI') expenseAccount = '606';
        else if (flow.category === 'Matériels de bureaux') expenseAccount = '607';
        else if (flow.category === 'Loyer') expenseAccount = '604';

        entries.push({
          id: Date.now() + Math.random(),
          date: flow.date,
          journal: 'Achat',
          accountNumber: expenseAccount,
          accountLabel: getAccountLabel(expenseAccount),
          debit: flow.amount,
          credit: 0,
          description: flow.description,
          reference: `CAISSE-OUT-${flow.id}`,
          source: 'Caisse',
          linkedId: flow.id
        });
      }
    });

    return entries;
  };

  const getAccountLabel = (accountNumber: string): string => {
    const account = accounts.find(acc => acc.number === accountNumber);
    return account ? account.label : 'Compte inconnu';
  };

  // Synchroniser toutes les écritures
  const synchronizeAccounting = () => {
    const payrollEntries = generatePayrollEntries();
    const cashFlowEntries = generateCashFlowEntries();
    const allEntries = [...payrollEntries, ...cashFlowEntries];
    
    setAccountingEntries(allEntries);
    localStorage.setItem('accountingEntries', JSON.stringify(allEntries));
    
    updateAccountBalances(allEntries);
    alert('Comptabilité synchronisée avec succès !');
  };

  // Mettre à jour les soldes des comptes
  const updateAccountBalances = (entries: AccountingEntry[]) => {
    const updatedAccounts = [...accounts];
    
    entries.forEach(entry => {
      const accountIndex = updatedAccounts.findIndex(acc => acc.number === entry.accountNumber);
      if (accountIndex !== -1) {
        const account = updatedAccounts[accountIndex];
        // Pour les comptes d'actif et de charges : débit augmente, crédit diminue
        // Pour les comptes de passif, capitaux et produits : crédit augmente, débit diminue
        if (account.type === 'Actif' || account.type === 'Charges') {
          account.balance = account.balance + entry.debit - entry.credit;
        } else {
          account.balance = account.balance + entry.credit - entry.debit;
        }
        updatedAccounts[accountIndex] = account;
      }
    });

    setAccounts(updatedAccounts);
    generateFinancialStatements(updatedAccounts);
  };

  // Générer les états financiers
  const generateFinancialStatements = (accountList: Account[]) => {
    // Bilan
    const assets = accountList.filter(acc => acc.type === 'Actif');
    const liabilities = accountList.filter(acc => acc.type === 'Passif');
    const equity = accountList.filter(acc => acc.type === 'Capitaux');
    
    const currentAssets = assets.filter(acc => ['101', '102', '103'].includes(acc.number));
    const fixedAssets = assets.filter(acc => !['101', '102', '103'].includes(acc.number));
    
    const totalAssets = assets.reduce((sum, acc) => sum + acc.balance, 0);
    const totalLiabilities = [...liabilities, ...equity].reduce((sum, acc) => sum + acc.balance, 0);

    setBalanceSheet({
      assets: {
        currentAssets,
        fixedAssets,
        totalAssets
      },
      liabilities: {
        equity,
        debts: liabilities,
        totalLiabilities
      }
    });

    // Compte de résultat
    const revenue = accountList.filter(acc => acc.type === 'Produits');
    const expenses = accountList.filter(acc => acc.type === 'Charges');
    const totalRevenue = revenue.reduce((sum, acc) => sum + acc.balance, 0);
    const totalExpenses = expenses.reduce((sum, acc) => sum + acc.balance, 0);
    const profit = totalRevenue - totalExpenses;

    setIncomeStatement({
      revenue,
      expenses,
      profit
    });
  };

  // Ajouter une transaction manuelle
  const handleAddManualTransaction = () => {
    if (!newTransaction.description || newTransaction.amount <= 0) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const entry: AccountingEntry = {
      id: Date.now(),
      date: newTransaction.date,
      journal: newTransaction.journal,
      accountNumber: newTransaction.type === 'Revenu' ? '701' : '607',
      accountLabel: newTransaction.type === 'Revenu' ? 'Ventes' : 'Fournitures',
      debit: newTransaction.type === 'Dépense' ? newTransaction.amount : 0,
      credit: newTransaction.type === 'Revenu' ? newTransaction.amount : 0,
      description: newTransaction.description,
      reference: `MAN-${Date.now()}`,
      source: 'Manuel'
    };

    const counterEntry: AccountingEntry = {
      id: Date.now() + 1,
      date: newTransaction.date,
      journal: newTransaction.journal,
      accountNumber: '101',
      accountLabel: 'Caisse',
      debit: newTransaction.type === 'Revenu' ? newTransaction.amount : 0,
      credit: newTransaction.type === 'Dépense' ? newTransaction.amount : 0,
      description: newTransaction.description,
      reference: `MAN-${Date.now()}`,
      source: 'Manuel'
    };

    const newEntries = [...accountingEntries, entry, counterEntry];
    setAccountingEntries(newEntries);
    localStorage.setItem('accountingEntries', JSON.stringify(newEntries));
    
    updateAccountBalances(newEntries);
    
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: 0,
      type: 'Revenu',
      category: '',
      journal: 'Vente'
    });
    
    alert('Transaction ajoutée avec succès !');
  };

  // Calculer les totaux
  const totalDebit = accountingEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = accountingEntries.reduce((sum, entry) => sum + entry.credit, 0);
  const balance = totalDebit - totalCredit;

  return (
    <BaseAdminLayout>
      <div className="accounting-page">
        <div className="page-header-section">
          <div className="header-content">
            <div className="header-text">
              <h1 style={{ color: 'white' }}>📒 Comptabilité Générale</h1>
              <p style={{ color: 'white' }}>Gestion complète de la comptabilité - Intégration Paie & Caisse</p>
            </div>
            <div className="header-actions">
              <button 
                className="btn btn-success"
                onClick={synchronizeAccounting}
              >
                🔄 Synchroniser la comptabilité
              </button>
            </div>
          </div>
        </div>

        <div className="accounting-stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Total Débit</h3>
                <div className="value">{totalDebit.toLocaleString()} FCFA</div>
                <div className="stat-subtitle">Somme des débits</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">💳</div>
              <div className="stat-content">
                <h3>Total Crédit</h3>
                <div className="value">{totalCredit.toLocaleString()} FCFA</div>
                <div className="stat-subtitle">Somme des crédits</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⚖️</div>
              <div className="stat-content">
                <h3>Équilibre</h3>
                <div className={`value ${balance === 0 ? 'balanced' : 'unbalanced'}`}>
                  {balance === 0 ? 'Équilibré' : 'Déséquilibré'}
                </div>
                <div className="stat-subtitle">
                  {balance === 0 ? 'La partie double est respectée' : 'Différence: ' + Math.abs(balance).toLocaleString() + ' FCFA'}
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Nombre d'écritures</h3>
                <div className="value">{accountingEntries.length}</div>
                <div className="stat-subtitle">Écritures comptables</div>
              </div>
            </div>
          </div>
        </div>

        <div className="financial-statements-section">
          <div className="section-header">
            <h2>📈 États Financiers</h2>
            <p>Bilan et compte de résultat générés automatiquement</p>
          </div>

          <div className="statements-grid">
            <div className="statement-card card">
              <h3>🏦 Bilan Comptable</h3>
              {balanceSheet ? (
                <div className="balance-sheet">
                  <div className="balance-section">
                    <h4>ACTIF</h4>
                    <div className="balance-items">
                      {balanceSheet.assets.currentAssets.map(asset => (
                        <div key={asset.number} className="balance-item">
                          <span className="account-label">{asset.label}</span>
                          <span className="account-balance">{asset.balance.toLocaleString()} FCFA</span>
                        </div>
                      ))}
                      {balanceSheet.assets.fixedAssets.map(asset => (
                        <div key={asset.number} className="balance-item">
                          <span className="account-label">{asset.label}</span>
                          <span className="account-balance">{asset.balance.toLocaleString()} FCFA</span>
                        </div>
                      ))}
                    </div>
                    <div className="balance-total">
                      <strong>Total Actif:</strong>
                      <strong>{balanceSheet.assets.totalAssets.toLocaleString()} FCFA</strong>
                    </div>
                  </div>

                  <div className="balance-section">
                    <h4>PASSIF</h4>
                    <div className="balance-items">
                      {balanceSheet.liabilities.equity.map(equity => (
                        <div key={equity.number} className="balance-item">
                          <span className="account-label">{equity.label}</span>
                          <span className="account-balance">{equity.balance.toLocaleString()} FCFA</span>
                        </div>
                      ))}
                      {balanceSheet.liabilities.debts.map(debt => (
                        <div key={debt.number} className="balance-item">
                          <span className="account-label">{debt.label}</span>
                          <span className="account-balance">{debt.balance.toLocaleString()} FCFA</span>
                        </div>
                      ))}
                    </div>
                    <div className="balance-total">
                      <strong>Total Passif:</strong>
                      <strong>{balanceSheet.liabilities.totalLiabilities.toLocaleString()} FCFA</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="no-data">Cliquez sur "Synchroniser" pour générer le bilan</p>
              )}
            </div>

            <div className="statement-card card">
              <h3>📊 Compte de Résultat</h3>
              {incomeStatement ? (
                <div className="income-statement">
                  <div className="income-section">
                    <h4>PRODUITS</h4>
                    <div className="income-items">
                      {incomeStatement.revenue.map(rev => (
                        <div key={rev.number} className="income-item">
                          <span className="account-label">{rev.label}</span>
                          <span className="account-balance income">{rev.balance.toLocaleString()} FCFA</span>
                        </div>
                      ))}
                    </div>
                    <div className="income-total">
                      <strong>Total Produits:</strong>
                      <strong className="income">
                        {incomeStatement.revenue.reduce((sum, rev) => sum + rev.balance, 0).toLocaleString()} FCFA
                      </strong>
                    </div>
                  </div>

                  <div className="income-section">
                    <h4>CHARGES</h4>
                    <div className="income-items">
                      {incomeStatement.expenses.map(exp => (
                        <div key={exp.number} className="income-item">
                          <span className="account-label">{exp.label}</span>
                          <span className="account-balance expense">{exp.balance.toLocaleString()} FCFA</span>
                        </div>
                      ))}
                    </div>
                    <div className="income-total">
                      <strong>Total Charges:</strong>
                      <strong className="expense">
                        {incomeStatement.expenses.reduce((sum, exp) => sum + exp.balance, 0).toLocaleString()} FCFA
                      </strong>
                    </div>
                  </div>

                  <div className="profit-section">
                    <h4>RÉSULTAT</h4>
                    <div className={`profit-amount ${incomeStatement.profit >= 0 ? 'positive' : 'negative'}`}>
                      {incomeStatement.profit >= 0 ? 'Bénéfice' : 'Perte'}: 
                      <strong>{Math.abs(incomeStatement.profit).toLocaleString()} FCFA</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="no-data">Cliquez sur "Synchroniser" pour générer le compte de résultat</p>
              )}
            </div>
          </div>
        </div>

        <div className="accounting-content">
          <div className="journal-section">
            <div className="section-header">
              <h3>📖 Journal Comptable</h3>
              <div className="filters">
                <input 
                  type="month" 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="period-select"
                />
                <select className="filter-select">
                  <option>Tous les journaux</option>
                  <option>Vente</option>
                  <option>Achat</option>
                  <option>Banque</option>
                  <option>Caisse</option>
                  <option>Salaires</option>
                </select>
              </div>
            </div>

            <div className="journal-table card">
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>JOURNAL</th>
                    <th>COMPTE</th>
                    <th>LIBELLÉ</th>
                    <th>DÉBIT</th>
                    <th>CRÉDIT</th>
                    <th>SOURCE</th>
                  </tr>
                </thead>
                <tbody>
                  {accountingEntries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="no-data">
                        📭 Aucune écriture comptable
                      </td>
                    </tr>
                  ) : (
                    accountingEntries.map(entry => (
                      <tr key={entry.id}>
                        <td>{new Date(entry.date).toLocaleDateString('fr-FR')}</td>
                        <td>
                          <span className={`journal-badge ${entry.journal.toLowerCase()}`}>
                            {entry.journal}
                          </span>
                        </td>
                        <td className="account-number">{entry.accountNumber}</td>
                        <td className="description">{entry.description}</td>
                        <td className="debit-amount">
                          {entry.debit > 0 ? entry.debit.toLocaleString() : ''} FCFA
                        </td>
                        <td className="credit-amount">
                          {entry.credit > 0 ? entry.credit.toLocaleString() : ''} FCFA
                        </td>
                        <td>
                          <span className={`source-badge ${entry.source.toLowerCase()}`}>
                            {entry.source}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}><strong>TOTAUX</strong></td>
                    <td><strong>{totalDebit.toLocaleString()} FCFA</strong></td>
                    <td><strong>{totalCredit.toLocaleString()} FCFA</strong></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="new-transaction-section card">
            <h3>➕ Nouvelle Transaction Manuelle</h3>
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <input 
                type="text" 
                placeholder="Description de la transaction..."
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select 
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'Revenu' | 'Dépense'})}
                >
                  <option value="Revenu">Revenu</option>
                  <option value="Dépense">Dépense</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Montant (FCFA)</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: parseFloat(e.target.value) || 0})}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Journal</label>
              <select 
                value={newTransaction.journal}
                onChange={(e) => setNewTransaction({...newTransaction, journal: e.target.value as any})}
              >
                <option value="Vente">Journal des Ventes</option>
                <option value="Achat">Journal des Achats</option>
                <option value="Banque">Journal de Banque</option>
                <option value="Caisse">Journal de Caisse</option>
                <option value="OD">Journal des Opérations Diverses</option>
              </select>
            </div>

            <button 
              className="btn btn-primary"
              onClick={handleAddManualTransaction}
              disabled={!newTransaction.description || newTransaction.amount <= 0}
            >
              Enregistrer la transaction
            </button>
          </div>
        </div>

        <div className="chart-of-accounts-section">
          <div className="section-header">
            <h2>📋 Plan Comptable</h2>
            <p>Liste des comptes avec leurs soldes</p>
          </div>

          <div className="accounts-table card">
            <table>
              <thead>
                <tr>
                  <th>NUMÉRO</th>
                  <th>LIBELLÉ DU COMPTE</th>
                  <th>TYPE</th>
                  <th>SOLDE</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(account => (
                  <tr key={account.number}>
                    <td className="account-number">{account.number}</td>
                    <td className="account-label">{account.label}</td>
                    <td>
                      <span className={`account-type ${account.type.toLowerCase()}`}>
                        {account.type}
                      </span>
                    </td>
                    <td className={`account-balance ${account.balance >= 0 ? 'positive' : 'negative'}`}>
                      {account.balance.toLocaleString()} FCFA
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BaseAdminLayout>
  );
};

export default Accounting;
*/