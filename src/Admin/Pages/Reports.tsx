import React, { useState, useEffect } from 'react';
import BaseAdminLayout from '../../AdminLayout/BaseAdminLayout';

interface RecentReport {
  id: number;
  name: string;
  generationDate: string;
  generatedBy: string;
  type: string;
  period: string;
}

interface PayrollReportData {
  name: string;
  grossSalary: number;
  taxes: number;
  netSalary: number;
  status: string;
  department?: string;
}

interface ExpenseReportData {
  date: string;
  description: string;
  category: string;
  amount: number;
  initiatedBy: string;
  type: 'out';
}

interface IncomeReportData {
  date: string;
  description: string;
  category: string;
  amount: number;
  clientName: string;
  type: 'in';
}

interface FinancialReportData {
  category: string;
  amount: number;
  percentage: number;
  type: 'income' | 'expense';
}

const Reports: React.FC = () => {
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [period, setPeriod] = useState({ start: '2023-10-01', end: '2023-10-31' });
  const [department, setDepartment] = useState('Tous les départements');
  const [reportTitle, setReportTitle] = useState('');
  const [cashFlows, setCashFlows] = useState<any[]>([]);
  
  const [recentReports, setRecentReports] = useState<RecentReport[]>(() => {
    const saved = localStorage.getItem('recentReports');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "Rapport de Paie - Oct 2023",
        generationDate: "01 Nov 2023, 09:15",
        generatedBy: "Admin",
        type: "payroll",
        period: "Octobre 2023"
      },
      {
        id: 2,
        name: "Rapport de Dépenses - T3 2023",
        generationDate: "15 Oct 2023, 14:30",
        generatedBy: "Admin",
        type: "expenses",
        period: "T3 2023"
      },
      {
        id: 3,
        name: "Rapport d'Entrée - Sept 2023",
        generationDate: "01 Oct 2023, 11:00",
        generatedBy: "Admin",
        type: "income",
        period: "Septembre 2023"
      },
      {
        id: 4,
        name: "Bilan Financier - T3 2023",
        generationDate: "30 Sep 2023, 16:45",
        generatedBy: "Admin",
        type: "financial",
        period: "T3 2023"
      }
    ];
  });

  const reportTypes = [
    {
      title: "Rapport de Paie",
      description: "Détails des salaires, taxes et paiements des employés.",
      type: "payroll",
      icon: "💰"
    },
    {
      title: "Rapport de Dépenses",
      description: "Suivi et catégorisation de toutes les dépenses de l'entreprise.",
      type: "expenses",
      icon: "💸"
    },
    {
      title: "Rapport d'Entrée",
      description: "Analyse des revenus et entrées de caisse de l'entreprise.",
      type: "income",
      icon: "📈"
    },
    /*
    {
      title: "Bilan Financier",
      description: "Aperçu des actifs, passifs et capitaux propres de l'entreprise.",
      type: "financial",
      icon: "📊"
    },
    {
      title: "Performance Individuelle",
      description: "Analyse des objectifs, réalisations et KPIs par employé.",
      type: "performance",
      icon: "⭐"
    },
    {
      title: "Rapport d'Assiduité",
      description: "Suivi des heures travaillées, des retards et des absences.",
      type: "attendance",
      icon: "⏰"
    },
    */
    {
      title: "Rapport des Employés",
      description: "Liste complète des employés avec informations détaillées.",
      type: "employees",
      icon: "👥"
    }
  ];

  const departments = ['Tous les départements', 'IT', 'Finance', 'Marketing', 'RH', 'Production', 'Commercial'];

  // Charger les données de caisse pour les rapports de dépenses et d'entrée
  useEffect(() => {
    const savedCashFlows = localStorage.getItem('cashFlows');
    if (savedCashFlows) {
      setCashFlows(JSON.parse(savedCashFlows));
    }
  }, []);

  // Données pour le rapport de paie
  const getPayrollData = (): PayrollReportData[] => {
    const baseData = [
      {
        name: "Jean Dupont",
        grossSalary: 3500.00,
        taxes: 770.00,
        netSalary: 2730.00,
        status: "Payé",
        department: "IT"
      },
      {
        name: "Marie Curie",
        grossSalary: 4200.00,
        taxes: 924.00,
        netSalary: 3276.00,
        status: "Payé",
        department: "Finance"
      },
      {
        name: "Pierre Martin",
        grossSalary: 3850.00,
        taxes: 847.00,
        netSalary: 3003.00,
        status: "Payé",
        department: "Marketing"
      },
      {
        name: "Sophie Bernard",
        grossSalary: 3600.00,
        taxes: 792.00,
        netSalary: 2808.00,
        status: "En attente",
        department: "RH"
      },
      {
        name: "Lucas Robert",
        grossSalary: 3200.00,
        taxes: 704.00,
        netSalary: 2496.00,
        status: "Erreur",
        department: "Production"
      }
    ];

    if (department !== 'Tous les départements') {
      return baseData.filter(emp => emp.department === department);
    }

    return baseData;
  };

  // Données pour le rapport de dépenses
  const getExpenseData = (): ExpenseReportData[] => {
    const startDate = new Date(period.start);
    const endDate = new Date(period.end);
    
    const expenses = cashFlows
      .filter(flow => flow.type === 'out' && 
        new Date(flow.date) >= startDate && 
        new Date(flow.date) <= endDate
      )
      .map(expense => ({
        date: expense.date,
        description: expense.description,
        category: expense.category,
        amount: expense.amount,
        initiatedBy: expense.initiatedBy || 'Non spécifié',
        type: 'out' as const
      }));

    return expenses;
  };

  // Données pour le rapport d'entrée
  const getIncomeData = (): IncomeReportData[] => {
    const startDate = new Date(period.start);
    const endDate = new Date(period.end);
    
    const incomes = cashFlows
      .filter(flow => flow.type === 'in' && 
        new Date(flow.date) >= startDate && 
        new Date(flow.date) <= endDate
      )
      .map(income => ({
        date: income.date,
        description: income.description,
        category: income.category,
        amount: income.amount,
        clientName: income.clientName || 'Non spécifié',
        type: 'in' as const
      }));

    return incomes;
  };

  // Données pour le bilan financier
  const getFinancialData = (): FinancialReportData[] => {
    const startDate = new Date(period.start);
    const endDate = new Date(period.end);
    
    const filteredFlows = cashFlows.filter(flow => 
      new Date(flow.date) >= startDate && 
      new Date(flow.date) <= endDate
    );

    const incomeByCategory: { [key: string]: number } = {};
    const expenseByCategory: { [key: string]: number } = {};

    filteredFlows.forEach(flow => {
      if (flow.type === 'in') {
        incomeByCategory[flow.category] = (incomeByCategory[flow.category] || 0) + flow.amount;
      } else {
        expenseByCategory[flow.category] = (expenseByCategory[flow.category] || 0) + flow.amount;
      }
    });

    const totalIncome = Object.values(incomeByCategory).reduce((sum, amount) => sum + amount, 0);
    const totalExpense = Object.values(expenseByCategory).reduce((sum, amount) => sum + amount, 0);
    const total = totalIncome + totalExpense;

    const financialData: FinancialReportData[] = [];

    // Ajouter les entrées
    Object.entries(incomeByCategory).forEach(([category, amount]) => {
      financialData.push({
        category: `Revenu - ${category}`,
        amount,
        percentage: total > 0 ? (amount / total * 100) : 0,
        type: 'income'
      });
    });

    // Ajouter les dépenses
    Object.entries(expenseByCategory).forEach(([category, amount]) => {
      financialData.push({
        category: `Dépense - ${category}`,
        amount,
        percentage: total > 0 ? (amount / total * 100) : 0,
        type: 'expense'
      });
    });

    return financialData.sort((a, b) => b.amount - a.amount);
  };

  // Sauvegarder les rapports récents
  useEffect(() => {
    localStorage.setItem('recentReports', JSON.stringify(recentReports));
  }, [recentReports]);

  const handleGenerateReport = () => {
    if (activeReport) {
      const reportType = reportTypes.find(r => r.type === activeReport);
      const newReport: RecentReport = {
        id: Date.now(),
        name: `${reportType?.title} - ${new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`,
        generationDate: new Date().toLocaleString('fr-FR', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        generatedBy: "Admin",
        type: activeReport,
        period: `${period.start} à ${period.end}`
      };

      setRecentReports(prev => [newReport, ...prev]);
      setReportTitle(newReport.name);
      
      alert(`Rapport "${newReport.name}" généré avec succès !`);
    }
  };

  const handleDownloadReport = (report: RecentReport) => {
    let reportData;
    
    switch(report.type) {
      case 'payroll':
        reportData = {
          title: report.name,
          generatedAt: report.generationDate,
          period: report.period,
          data: getPayrollData(),
          summary: {
            totalGross: getPayrollData().reduce((sum, emp) => sum + emp.grossSalary, 0),
            totalTaxes: getPayrollData().reduce((sum, emp) => sum + emp.taxes, 0),
            totalNet: getPayrollData().reduce((sum, emp) => sum + emp.netSalary, 0)
          }
        };
        break;
        
      case 'expenses':
        reportData = {
          title: report.name,
          generatedAt: report.generationDate,
          period: report.period,
          data: getExpenseData(),
          summary: {
            totalExpenses: getExpenseData().reduce((sum, exp) => sum + exp.amount, 0),
            categoryBreakdown: getExpenseData().reduce((acc: {[key: string]: number}, exp) => {
              acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
              return acc;
            }, {})
          }
        };
        break;
        
      case 'income':
        reportData = {
          title: report.name,
          generatedAt: report.generationDate,
          period: report.period,
          data: getIncomeData(),
          summary: {
            totalIncome: getIncomeData().reduce((sum, inc) => sum + inc.amount, 0),
            categoryBreakdown: getIncomeData().reduce((acc: {[key: string]: number}, inc) => {
              acc[inc.category] = (acc[inc.category] || 0) + inc.amount;
              return acc;
            }, {})
          }
        };
        break;
        
      case 'financial':
        reportData = {
          title: report.name,
          generatedAt: report.generationDate,
          period: report.period,
          data: getFinancialData(),
          summary: {
            totalIncome: getFinancialData().filter(d => d.type === 'income').reduce((sum, d) => sum + d.amount, 0),
            totalExpense: getFinancialData().filter(d => d.type === 'expense').reduce((sum, d) => sum + d.amount, 0),
            netBalance: getFinancialData().filter(d => d.type === 'income').reduce((sum, d) => sum + d.amount, 0) -
                       getFinancialData().filter(d => d.type === 'expense').reduce((sum, d) => sum + d.amount, 0)
          }
        };
        break;
        
      default:
        reportData = {
          title: report.name,
          generatedAt: report.generationDate,
          period: report.period,
          data: []
        };
    }

    const dataStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.toLowerCase().replace(/ /g, '-')}.json`;
    link.click();
    
    alert(`Rapport "${report.name}" téléchargé !`);
  };

  const handleDeleteReport = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rapport ?')) {
      setRecentReports(prev => prev.filter(report => report.id !== id));
    }
  };

  const getReportIcon = (type: string) => {
    return reportTypes.find(r => r.type === type)?.icon || '📄';
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Aperçu du rapport en fonction du type
  const renderReportPreview = () => {
    switch(activeReport) {
      case 'payroll':
        const payrollData = getPayrollData();
        return (
          <>
            <div className="report-table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>NOM DE L'EMPLOYÉ</th>
                    <th>DÉPARTEMENT</th>
                    <th>SALAIRE BRUT</th>
                    <th>TAXES</th>
                    <th>SALAIRE NET</th>
                    <th>STATUT</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollData.map((employee, index) => (
                    <tr key={index}>
                      <td className="employee-name">{employee.name}</td>
                      <td className="employee-department">
                        <span className="dept-badge">{employee.department}</span>
                      </td>
                      <td className="salary-amount">{employee.grossSalary.toLocaleString()} FCFA</td>
                      <td className="taxes-amount">{employee.taxes.toLocaleString()} FCFA</td>
                      <td className="net-salary-amount">
                        <strong>{employee.netSalary.toLocaleString()} FCFA</strong>
                      </td>
                      <td>
                        <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                          {employee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="report-summary">
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="stat-label">Total salaires bruts:</span>
                  <span className="stat-value">
                    {payrollData.reduce((sum, emp) => sum + emp.grossSalary, 0).toLocaleString()} FCFA
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Total taxes:</span>
                  <span className="stat-value">
                    {payrollData.reduce((sum, emp) => sum + emp.taxes, 0).toLocaleString()} FCFA
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Total salaires nets:</span>
                  <span className="stat-value">
                    {payrollData.reduce((sum, emp) => sum + emp.netSalary, 0).toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </div>
          </>
        );

      case 'expenses':
        const expenseData = getExpenseData();
        return (
          <>
            <div className="report-table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>DESCRIPTION</th>
                    <th>CATÉGORIE</th>
                    <th>INITIÉ PAR</th>
                    <th>MONTANT</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseData.map((expense, index) => (
                    <tr key={index}>
                      <td className="date-cell">{formatDate(expense.date)}</td>
                      <td className="description-cell">{expense.description}</td>
                      <td className="category-cell">
                        <span className="category-badge">{expense.category}</span>
                      </td>
                      <td className="initiated-by-cell">{expense.initiatedBy}</td>
                      <td className="amount-cell expense">-{expense.amount.toLocaleString()} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="report-summary">
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="stat-label">Total des dépenses:</span>
                  <span className="stat-value expense">
                    {expenseData.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()} FCFA
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Nombre de transactions:</span>
                  <span className="stat-value">{expenseData.length}</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Période:</span>
                  <span className="stat-value">{formatDate(period.start)} - {formatDate(period.end)}</span>
                </div>
              </div>
            </div>
          </>
        );

      case 'income':
        const incomeData = getIncomeData();
        return (
          <>
            <div className="report-table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>DESCRIPTION</th>
                    <th>CATÉGORIE</th>
                    <th>CLIENT</th>
                    <th>MONTANT</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeData.map((income, index) => (
                    <tr key={index}>
                      <td className="date-cell">{formatDate(income.date)}</td>
                      <td className="description-cell">{income.description}</td>
                      <td className="category-cell">
                        <span className="category-badge income">{income.category}</span>
                      </td>
                      <td className="client-cell">{income.clientName}</td>
                      <td className="amount-cell income">+{income.amount.toLocaleString()} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="report-summary">
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="stat-label">Total des entrées:</span>
                  <span className="stat-value income">
                    {incomeData.reduce((sum, inc) => sum + inc.amount, 0).toLocaleString()} FCFA
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Nombre de transactions:</span>
                  <span className="stat-value">{incomeData.length}</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Période:</span>
                  <span className="stat-value">{formatDate(period.start)} - {formatDate(period.end)}</span>
                </div>
              </div>
            </div>
          </>
        );

      case 'financial':
        const financialData = getFinancialData();
        const totalIncome = financialData.filter(d => d.type === 'income').reduce((sum, d) => sum + d.amount, 0);
        const totalExpense = financialData.filter(d => d.type === 'expense').reduce((sum, d) => sum + d.amount, 0);
        const netBalance = totalIncome - totalExpense;

        return (
          <>
            <div className="report-table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>CATÉGORIE</th>
                    <th>TYPE</th>
                    <th>MONTANT</th>
                    <th>POURCENTAGE</th>
                  </tr>
                </thead>
                <tbody>
                  {financialData.map((item, index) => (
                    <tr key={index}>
                      <td className="category-cell">{item.category}</td>
                      <td className="type-cell">
                        <span className={`type-badge ${item.type}`}>
                          {item.type === 'income' ? '💰 Revenu' : '💸 Dépense'}
                        </span>
                      </td>
                      <td className={`amount-cell ${item.type}`}>
                        {item.amount.toLocaleString()} FCFA
                      </td>
                      <td className="percentage-cell">
                        <div className="percentage-bar">
                          <div 
                            className={`percentage-fill ${item.type}`}
                            style={{ width: `${Math.min(item.percentage, 100)}%` }}
                          ></div>
                        </div>
                        <span className="percentage-text">{item.percentage.toFixed(1)}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="report-summary">
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="stat-label">Total des revenus:</span>
                  <span className="stat-value income">
                    {totalIncome.toLocaleString()} FCFA
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Total des dépenses:</span>
                  <span className="stat-value expense">
                    {totalExpense.toLocaleString()} FCFA
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Bilan net:</span>
                  <span className={`stat-value ${netBalance >= 0 ? 'income' : 'expense'}`}>
                    {netBalance.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="no-data-preview">
            <div className="no-data-icon">📄</div>
            <h3>Aucun aperçu disponible</h3>
            <p>Sélectionnez un type de rapport pour voir l'aperçu</p>
          </div>
        );
    }
  };

  const getReportDataCount = () => {
    switch(activeReport) {
      case 'payroll': return getPayrollData().length;
      case 'expenses': return getExpenseData().length;
      case 'income': return getIncomeData().length;
      case 'financial': return getFinancialData().length;
      default: return 0;
    }
  };

  return (
    <BaseAdminLayout>
      <div className="reports-page">
        {/* En-tête principale */}
        <div className="page-header-section">
          <div className="header-content">
            <div className="header-text">
              <h1>📊 Rapports et Analytics</h1>
              <p>Générer, visualiser et exporter des rapports financiers et de performance</p>
            </div>
            <div className="header-stats">
              <div className="stat-badge">
                <span className="stat-number">{recentReports.length}</span>
                <span className="stat-label">Rapports générés</span>
              </div>
            </div>
          </div>
        </div>

        {!activeReport ? (
          /* Tableau de bord des rapports */
          <div className="reports-dashboard">
            {/* Cartes des types de rapports */}
            <div className="reports-categories-section">
              <div className="section-header">
                <h2>📋 Types de Rapports Disponibles</h2>
                <p>Sélectionnez le type de rapport à générer</p>
              </div>
              
              <div className="reports-grid">
                {reportTypes.map((report, index) => (
                  <div key={index} className="report-type-card card">
                    <div className="report-icon">{report.icon}</div>
                    <div className="report-content">
                      <h3>{report.title}</h3>
                      <p>{report.description}</p>
                    </div>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setActiveReport(report.type)}
                    >
                      📈 Générer
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Rapports récents */}
            <div className="recent-reports-section">
              <div className="section-header">
                <h2>🕐 Rapports Récents</h2>
                <p>Historique des rapports générés récemment</p>
              </div>

              <div className="recent-reports card">
                {recentReports.length === 0 ? (
                  <div className="no-reports">
                    <div className="no-reports-icon">📭</div>
                    <h3>Aucun rapport généré</h3>
                    <p>Générez votre premier rapport pour commencer</p>
                  </div>
                ) : (
                  <div className="reports-table-container">
                    <table className="reports-table">
                      <thead>
                        <tr>
                          <th>RAPPORT</th>
                          <th>TYPE</th>
                          <th>PÉRIODE</th>
                          <th>DATE DE GÉNÉRATION</th>
                          <th>GÉNÉRÉ PAR</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentReports.map(report => (
                          <tr key={report.id}>
                            <td className="report-name">
                              <span className="report-icon-small">
                                {getReportIcon(report.type)}
                              </span>
                              <strong>{report.name}</strong>
                            </td>
                            <td>
                              <span className="report-type-badge">
                                {reportTypes.find(r => r.type === report.type)?.title}
                              </span>
                            </td>
                            <td className="report-period">{report.period}</td>
                            <td className="report-date">{report.generationDate}</td>
                            <td className="report-author">{report.generatedBy}</td>
                            <td>
                              <div className="report-actions">
                                <button 
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleDownloadReport(report)}
                                  title="Télécharger"
                                >
                                  📥
                                </button>
                                <button 
                                  className="btn btn-outline btn-sm"
                                  onClick={() => {
                                    setActiveReport(report.type);
                                    setReportTitle(report.name);
                                  }}
                                  title="Regénérer"
                                >
                                  🔄
                                </button>
                                <button 
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDeleteReport(report.id)}
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
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Interface de génération de rapport */
          <div className="report-generation">
            {/* En-tête de génération */}
            <div className="generation-header">
              <button 
                className="btn btn-outline back-btn"
                onClick={() => setActiveReport(null)}
              >
                ← Retour aux rapports
              </button>
              <div className="generation-title">
                <h1>🚀 Génération de Rapport</h1>
                <p>Configurez et générez votre rapport personnalisé</p>
              </div>
            </div>

            <div className="generation-content">
              {/* Configuration du rapport */}
              <div className="config-section">
                <div className="config-card card">
                  <div className="config-header">
                    <h3>⚙️ Configuration du Rapport</h3>
                    <div className="config-actions">
                      <button 
                        className="btn btn-outline"
                        onClick={() => {
                          setPeriod({ start: '2023-10-01', end: '2023-10-31' });
                          setDepartment('Tous les départements');
                        }}
                      >
                        🔄 Réinitialiser
                      </button>
                    </div>
                  </div>

                  <div className="config-grid">
                    <div className="form-group">
                      <label>📄 Type de rapport</label>
                      <select 
                        value={activeReport} 
                        onChange={(e) => setActiveReport(e.target.value)}
                        className="report-type-select"
                      >
                        {reportTypes.map(report => (
                          <option key={report.type} value={report.type}>
                            {report.icon} {report.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>📅 Période du rapport</label>
                      <div className="date-range">
                        <div className="date-input-group">
                          <label>Du</label>
                          <input 
                            type="date" 
                            value={period.start}
                            onChange={(e) => setPeriod({...period, start: e.target.value})}
                            className="date-input"
                          />
                        </div>
                        <div className="date-input-group">
                          <label>Au</label>
                          <input 
                            type="date" 
                            value={period.end}
                            onChange={(e) => setPeriod({...period, end: e.target.value})}
                            className="date-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>🏢 Département</label>
                      <select 
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="department-select"
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>🎯 Options avancées</label>
                      <div className="advanced-options">
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          Inclure les détails complets
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          Inclure les graphiques
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" />
                          Export automatique
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aperçu du rapport */}
              <div className="preview-section">
                <div className="preview-card card">
                  <div className="preview-header">
                    <h3>👁️ Aperçu du Rapport</h3>
                    <div className="preview-info">
                      <span className="report-type">
                        {reportTypes.find(r => r.type === activeReport)?.icon}
                        {reportTypes.find(r => r.type === activeReport)?.title}
                      </span>
                      <span className="report-period">
                        {formatDate(period.start)} - {formatDate(period.end)}
                      </span>
                    </div>
                  </div>

                  <div className="report-preview">
                    <div className="report-header">
                      <h4>{reportTitle || `${reportTypes.find(r => r.type === activeReport)?.title} - ${formatDate(period.start)} à ${formatDate(period.end)}`}</h4>
                      <p className="report-meta">
                        Généré le {new Date().toLocaleDateString('fr-FR')} | 
                        Département: {department} | 
                        {getReportDataCount()} enregistrement(s)
                      </p>
                    </div>

                    {renderReportPreview()}

                  </div>

                  <div className="preview-footer">
                    <div className="export-options">
                      <label>Format d'export:</label>
                      <select className="export-select">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                        <option>JSON</option>
                      </select>
                    </div>
                    
                    <div className="preview-actions">
                      <button className="btn btn-outline">
                        📊 Aperçu avancé
                      </button>
                      <button 
                        className="btn btn-success"
                        onClick={handleGenerateReport}
                      >
                        ⚡ Générer le Rapport
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          const reportType = reportTypes.find(r => r.type === activeReport);
                          const report: RecentReport = {
                            id: Date.now(),
                            name: `${reportType?.title} - ${new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`,
                            generationDate: new Date().toLocaleString('fr-FR', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }),
                            generatedBy: "Admin",
                            type: activeReport!,
                            period: `${formatDate(period.start)} - ${formatDate(period.end)}`
                          };
                          handleDownloadReport(report);
                        }}
                      >
                        💾 Télécharger
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseAdminLayout>
  );
};

export default Reports;