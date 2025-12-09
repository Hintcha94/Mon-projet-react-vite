import React, { useState } from 'react';
import BaseAdminLayout from '../../AdminLayout/BaseAdminLayout';

interface PayrollEmployee {
  id: number;
  name: string;
  email: string;
  position: string;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  status: 'Traité' | 'En attente' | 'Erreur';
}

const Payroll: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('7'); // Juillet
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [employees, setEmployees] = useState<PayrollEmployee[]>([
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@hrpay.com",
      position: "Développeur Front-end",
      grossSalary: 3500.00,
      deductions: 875.00,
      netSalary: 2625.00,
      status: 'Traité'
    },
    {
      id: 2,
      name: "Marie Claire",
      email: "marie.claire@hrpay.com",
      position: "Chef de Projet",
      grossSalary: 4200.00,
      deductions: 1050.00,
      netSalary: 3150.00,
      status: 'En attente'
    },
    {
      id: 3,
      name: "Pierre Martin",
      email: "pierre.martin@hrpay.com",
      position: "Designer UI/UX",
      grossSalary: 3800.00,
      deductions: 950.00,
      netSalary: 2850.00,
      status: 'Erreur'
    },
    {
      id: 4,
      name: "Sophie Bernard",
      email: "sophie.bernard@hrpay.com",
      position: "Développeur Back-end",
      grossSalary: 3700.00,
      deductions: 925.00,
      netSalary: 2775.00,
      status: 'En attente'
    },
    {
      id: 5,
      name: "Thomas Leroy",
      email: "thomas.leroy@hrpay.com",
      position: "Commercial",
      grossSalary: 3200.00,
      deductions: 800.00,
      netSalary: 2400.00,
      status: 'En attente'
    }
  ]);
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);
  const [editedGrossSalary, setEditedGrossSalary] = useState<number>(0);
  const [editedDeductions, setEditedDeductions] = useState<number>(0);

  // Génération des mois
  const months = [
    { value: '1', label: 'Janvier' },
    { value: '2', label: 'Février' },
    { value: '3', label: 'Mars' },
    { value: '4', label: 'Avril' },
    { value: '5', label: 'Mai' },
    { value: '6', label: 'Juin' },
    { value: '7', label: 'Juillet' },
    { value: '8', label: 'Août' },
    { value: '9', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' }
  ];

  // Génération des années (2024 à 2030)
  const years = Array.from({ length: 7 }, (_, i) => (2024 + i).toString());

  const currentPeriod = `${months.find(m => m.value === selectedMonth)?.label} ${selectedYear}`;
  const totalGross = employees.reduce((sum, emp) => sum + emp.grossSalary, 0);
  const paidEmployees = employees.filter(emp => emp.status === 'Traité').length;
  
  // Trouver l'employé sélectionné
  const selectedEmp = employees.find(emp => emp.id.toString() === selectedEmployee);

  const handleLaunchPayroll = () => {
    if (!selectedEmployee) {
      alert("Veuillez sélectionner un employé à traiter");
      return;
    }
    
    const updatedEmployees = employees.map(emp => {
      if (emp.id.toString() === selectedEmployee) {
        return { ...emp, status: 'Traité' as const };
      }
      return emp;
    });
    
    setEmployees(updatedEmployees);
    alert(`Paie traitée pour ${selectedEmp?.name}`);
  };

  const handleExportPaySlip = () => {
    if (!selectedEmployee) {
      alert("Veuillez sélectionner un employé");
      return;
    }
    alert(`Fiche de paie exportée pour ${selectedEmp?.name}`);
  };

 const handleModifyEmployee = (id: number) => {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  setEditingEmployeeId(id);
  setEditedGrossSalary(emp.grossSalary);
  setEditedDeductions(emp.deductions);
};

const handleSaveEmployee = (id: number) => {
  const updatedEmployees = employees.map(emp => {
    if (emp.id === id) {
      const netSalary = editedGrossSalary - editedDeductions;
      return { ...emp, grossSalary: editedGrossSalary, deductions: editedDeductions, netSalary };
    }
    return emp;
  });
  setEmployees(updatedEmployees);
  setEditingEmployeeId(null); // fermer le formulaire
};

  const handleDownloadPayslip = (id: number) => {
    alert(`Téléchargement de la fiche de paie ${id}`);
  };

  return (
    <BaseAdminLayout>
      <div className="payroll-page">
        {/* En-tête séparé de la navigation */}
        <div className="page-header-section">
          <div className="header-content">
            <div className="header-text">
              <h1 style={{ color: 'white' }}>Gestion de la Paie</h1>
              <p style={{ color: 'white' }}>Gestion et traitement des salaires des employés</p>
            </div>
            <div className="header-period">
              <span className="period-badge">Période en cours</span>
              <div className="current-period">{currentPeriod}</div>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="payroll-stats-section">
          <div className="stats-grid">
            <div className="stat-card primary-stat">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Masse Salariale Brute</h3>
                <div className="value">{totalGross.toLocaleString()} FCFA</div>
                <div className="stat-subtitle">Total des salaires bruts</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Employés Payés</h3>
                <div className="value">{paidEmployees}<span className="total">/{employees.length}</span></div>
                <div className="stat-subtitle">Paie traitée</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⏰</div>
              <div className="stat-content">
                <h3>En Attente</h3>
                <div className="value">{employees.filter(emp => emp.status === 'En attente').length}</div>
                <div className="stat-subtitle">À traiter</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⚠️</div>
              <div className="stat-content">
                <h3>Avec Erreurs</h3>
                <div className="value">{employees.filter(emp => emp.status === 'Erreur').length}</div>
                <div className="stat-subtitle">À corriger</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contrôles et filtres */}
        <div className="payroll-controls-section">
          <div className="controls-card card">
            <div className="controls-header">
              <h3>Configuration de la Paie</h3>
              <div className="controls-actions">
                <button 
                  onClick={handleExportPaySlip}
                  className="btn btn-primary"
                  disabled={!selectedEmployee}
                >
                  📤 Exporter les Fiches de Paie
                </button>
              </div>
            </div>

            <div className="controls-content">
              <div className="filters-row">
                {/* Sélection des employés */}
                <div className="filter-group">
                  <label>Sélection de l'employé</label>
                  <select 
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="employee-select"
                  >
                    <option value="">Sélectionnez un employé</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id.toString()}>
                        {employee.name} - {employee.position} ({employee.status})
                      </option>
                    ))}
                  </select>
                  {selectedEmp && (
                    <div className="employee-preview">
                      <div className="preview-info">
                        <strong>{selectedEmp.name}</strong>
                        <span>{selectedEmp.position}</span>
                        <span>Salaire net: {selectedEmp.netSalary.toLocaleString()} FCFA</span>
                      </div>
                      <div className={`preview-status ${selectedEmp.status.toLowerCase().replace(' ', '-')}`}>
                        {selectedEmp.status}
                      </div>
                    </div>
                  )}
                </div>

                {/* Période */}
                <div className="filter-group">
                  <label>Période</label>
                  <div className="period-select-group">
                    <select 
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="period-select"
                    >
                      {months.map(month => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    <select 
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="period-select"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bouton Lancer la paie */}
                <div className="filter-group launch-button-group">
                  <button 
                    onClick={handleLaunchPayroll}
                    className="btn btn-primary btn-lg launch-btn"
                    disabled={!selectedEmployee}
                  >
                    ⚡ Traiter la paie
                  </button>
                  {selectedEmp && (
                    <div className="launch-summary">
                      Salaire net: <strong>{selectedEmp.netSalary.toLocaleString()} FCFA</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des employés */}
        <div className="payroll-table-section">
          <div className="table-header">
            <h3>Détails de la Paie - {currentPeriod}</h3>
            <div className="table-summary">
              {employees.length} employé(s) trouvé(s) • {selectedEmployee ? '1 sélectionné' : 'Aucun sélectionné'}
            </div>
          </div>

          <div className="payroll-table card">
            <table>
              <thead>
                <tr>
                  <th>EMPLOYÉ</th>
                  <th>POSTE</th>
                  <th>SALAIRE BRUT</th>
                  <th>PRÉLÈVEMENTS</th>
                  <th>SALAIRE NET</th>
                  <th>STATUT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr 
                    key={employee.id} 
                    className={`employee-row ${selectedEmployee === employee.id.toString() ? 'selected' : ''}`}
                  >
                    <td className="employee-info">
                      <div className="employee-avatar">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="employee-details">
                        <div className="employee-name">{employee.name}</div>
                        <div className="employee-email">{employee.email}</div>
                      </div>
                    </td>
                    <td className="employee-position">{employee.position}</td>
                    <td className="salary-amount">{employee.grossSalary.toLocaleString()} FCFA</td>
                    <td className="deductions-amount">{employee.deductions.toLocaleString()} FCFA</td>
                    <td className="net-salary-amount">
                      <strong>{employee.netSalary.toLocaleString()} FCFA</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                        <span className="status-dot"></span>
                        {employee.status}
                      </span>
                    </td>
                                      <td>
                      <div className="action-buttons">
                        {employee.status !== 'Traité' && (
                          editingEmployeeId === employee.id ? (
                            <>
                              <input
                                type="number"
                                value={editedGrossSalary}
                                onChange={(e) => setEditedGrossSalary(Number(e.target.value))}
                                placeholder="Salaire brut"
                                className="input-small"
                              />
                              <input
                                type="number"
                                value={editedDeductions}
                                onChange={(e) => setEditedDeductions(Number(e.target.value))}
                                placeholder="Prélèvements"
                                className="input-small"
                              />
                              <button
                                onClick={() => handleSaveEmployee(employee.id)}
                                className="btn btn-sm btn-success"
                              >
                                💾
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => handleModifyEmployee(employee.id)}
                              className="btn btn-sm btn-outline"
                              title="Modifier"
                            >
                              ✏️
                            </button>
                          )
                        )}
                        
                        {/* Télécharger toujours disponible */}
                        <button 
                          onClick={() => handleDownloadPayslip(employee.id)}
                          className="btn btn-sm btn-outline" 
                          title="Télécharger fiche"
                        >
                          📄
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

    </BaseAdminLayout>
  );
};

export default Payroll;