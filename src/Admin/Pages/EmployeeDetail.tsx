import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BaseAdminLayout from '../../AdminLayout/BaseAdminLayout';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  status: 'Actif' | 'Inactif';
  email: string;
  phone: string;
  address?: string;
  birthDate?: string;
  emergencyContact?: {
    name: string;
    phone: string;
  };
  contractType?: string;
  contractStartDate?: string;
  salary?: number;
}

interface Contract {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  signed: boolean;
}

interface Payslip {
  id: number;
  period: string;
  issueDate: string;
  netSalary: number;
}

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'contracts' | 'payslips'>('info');
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<Contract[]>([]);

  // Charger les données de l'employé
  useEffect(() => {
    if (id) {
      loadEmployeeData();
    }
  }, [id]);

  const loadEmployeeData = () => {
    setLoading(true);
    
    // Récupérer les employés depuis localStorage
    const savedEmployees = localStorage.getItem('employees');
    
    if (savedEmployees) {
      const employees: Employee[] = JSON.parse(savedEmployees);
      const employeeId = parseInt(id!);
      const foundEmployee = employees.find(emp => emp.id === employeeId);
      
      if (foundEmployee) {
        // Compléter avec des données par défaut si manquantes
        const completeEmployee: Employee = {
          ...foundEmployee,
          address: foundEmployee.address || "Adresse non renseignée",
          birthDate: foundEmployee.birthDate || "Non renseignée",
          emergencyContact: foundEmployee.emergencyContact || {
            name: "Non renseigné",
            phone: "Non renseigné"
          }
        };
        setEmployee(completeEmployee);
        
        // Créer les contrats à partir des données de l'employé
        generateContractsFromEmployeeData(completeEmployee);
      } else {
        // Employé non trouvé
        console.error('Employé non trouvé avec ID:', employeeId);
        navigate('/admin/employees');
      }
    } else {
      // Aucun employé enregistré
      navigate('/admin/employees');
    }
    
    setLoading(false);
  };

  const generateContractsFromEmployeeData = (emp: Employee) => {
    const generatedContracts: Contract[] = [];
    
    // Si l'employé a des informations de contrat, créer un contrat à partir de ces données
    if (emp.contractType && emp.contractStartDate) {
      const contractId = emp.id * 1000 + 1; // ID unique basé sur l'ID de l'employé
      
      // Déterminer la date de fin en fonction du type de contrat
      let endDate = "N/A";
      let status = "Actif";
      
      if (emp.contractType === "CDD") {
        // Pour un CDD, ajouter 6 mois à la date de début
        const startDate = new Date(emp.contractStartDate);
        const endDateObj = new Date(startDate);
        endDateObj.setMonth(startDate.getMonth() + 6);
        endDate = endDateObj.toLocaleDateString('fr-FR');
        status = "En cours";
      } else if (emp.contractType === "Stage") {
        // Pour un stage, ajouter 3 mois à la date de début
        const startDate = new Date(emp.contractStartDate);
        const endDateObj = new Date(startDate);
        endDateObj.setMonth(startDate.getMonth() + 3);
        endDate = endDateObj.toLocaleDateString('fr-FR');
        status = "En cours";
      }
      
      generatedContracts.push({
        id: contractId,
        type: emp.contractType,
        startDate: formatDateForDisplay(emp.contractStartDate),
        endDate: endDate,
        status: status,
        signed: true
      });
    }
    
    // Ajouter des contrats par défaut si aucun contrat n'a été généré
    if (generatedContracts.length === 0) {
      generatedContracts.push(
        {
          id: 1,
          type: "CDI",
          startDate: "01/09/2021",
          endDate: "N/A",
          status: "Actif",
          signed: true
        },
        {
          id: 2,
          type: "CDD",
          startDate: "15/07/2024",
          endDate: "14/01/2025",
          status: "En cours",
          signed: false
        }
      );
    }
    
    setContracts(generatedContracts);
  };

  const formatDateForDisplay = (dateString: string) => {
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

  // Fonction pour formater la date en français
  const formatFrenchDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const payslips: Payslip[] = [
    {
      id: 1,
      period: "Juin 2024",
      issueDate: "28/06/2024",
      netSalary: employee?.salary || 2540.50
    },
    {
      id: 2,
      period: "Mai 2024",
      issueDate: "30/05/2024",
      netSalary: employee?.salary || 2540.50
    }
  ];

  if (loading) {
    return (
      <BaseAdminLayout>
        <div className="employee-detail-page">
          <div className="page-header">
            <h1>Chargement...</h1>
          </div>
        </div>
      </BaseAdminLayout>
    );
  }

  if (!employee) {
    return (
      <BaseAdminLayout>
        <div className="employee-detail-page">
          <div className="page-header">
            <h1>Employé non trouvé</h1>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/admin/employees')}
            >
              Retour à la liste
            </button>
          </div>
        </div>
      </BaseAdminLayout>
    );
  }

  return (
    <BaseAdminLayout>
      <div className="employee-detail-page">
        <div className="page-header">
          <div className="employee-main-info">
            <h1>{employee.name}</h1>
            <p>{employee.position}</p>
            <div className="employee-details">
              <span>ID Employé: {employee.id}</span>
              <div className="status-badge">
                Statut: <span className={`status ${employee.status.toLowerCase()}`}>
                  {employee.status}
                </span>
              </div>
            </div>
            
            {/* Section Contrat dans l'en-tête */}
            {employee.contractType && (
              <div className="contract-summary">
                <div className="contract-info-item">
                  <strong>Type de contrat:</strong>
                  <span className={`contract-type ${employee.contractType.toLowerCase()}`}>
                    {employee.contractType}
                  </span>
                </div>
                {employee.contractStartDate && (
                  <div className="contract-info-item">
                    <strong>Début de contrat:</strong>
                    <span>{formatFrenchDate(employee.contractStartDate)}</span>
                  </div>
                )}
                {employee.salary && (
                  <div className="contract-info-item">
                    <strong>Salaire:</strong>
                    <span className="salary-amount">{employee.salary.toLocaleString()} FCFA</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="action-buttons">
              <button className="btn btn-outline">Modifier</button>
              <button className="btn btn-danger">Archiver</button>
            </div>
          </div>
        </div>

        <div className="employee-tabs">
          <button 
            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Informations Personnelles
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contracts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contracts')}
          >
            Contrats
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payslips' ? 'active' : ''}`}
            onClick={() => setActiveTab('payslips')}
          >
            Fiches de Paie
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'info' && (
            <div className="personal-info card">
              <h3>Informations Personnelles</h3>
              <div className="info-grid">
                <div className="info-section">
                  <h4>Coordonnées</h4>
                  <div className="info-item">
                    <strong>Adresse e-mail:</strong>
                    <a href={`mailto:${employee.email}`}>{employee.email}</a>
                  </div>
                  <div className="info-item">
                    <strong>Téléphone:</strong>
                    {employee.phone}
                  </div>
                  <div className="info-item">
                    <strong>Département:</strong>
                    {employee.department}
                  </div>
                </div>

                <div className="info-section">
                  <h4>Informations de contrat</h4>
                  <div className="info-item">
                    <strong>Type de contrat:</strong>
                    <span className={`contract-type ${employee.contractType?.toLowerCase()}`}>
                      {employee.contractType || "Non spécifié"}
                    </span>
                  </div>
                  <div className="info-item">
                    <strong>Date de début:</strong>
                    {employee.contractStartDate ? formatFrenchDate(employee.contractStartDate) : "Non spécifiée"}
                  </div>
                  {employee.salary && (
                    <div className="info-item">
                      <strong>Salaire:</strong>
                      {employee.salary.toLocaleString()} FCFA
                    </div>
                  )}
                </div>

                <div className="info-section">
                  <h4>Adresse</h4>
                  <div className="info-item">
                    {employee.address}
                  </div>
                </div>

                <div className="info-section">
                  <h4>Date de naissance</h4>
                  <div className="info-item">
                    {employee.birthDate}
                  </div>
                </div>

                <div className="info-section">
                  <h4>Contact d'urgence</h4>
                  <table className="contact-table">
                    <thead>
                      <tr>
                        <th>Nom complet</th>
                        <th>Téléphone</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{employee.emergencyContact?.name}</td>
                        <td>{employee.emergencyContact?.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="contracts-section card">
              <div className="section-header">
                <h3>Contrats</h3>
                <button className="btn btn-primary">+ Nouveau contrat</button>
              </div>
              <table className="contracts-table">
                <thead>
                  <tr>
                    <th>Type de contrat</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Statut</th>
                    <th>Signature</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map(contract => (
                    <tr key={contract.id}>
                      <td>{contract.type}</td>
                      <td>{contract.startDate}</td>
                      <td>{contract.endDate}</td>
                      <td>
                        <span className={`status ${contract.status.toLowerCase().replace(' ', '-')}`}>
                          {contract.status}
                        </span>
                      </td>
                      <td>
                        {contract.signed ? (
                          <span className="signed">Signé</span>
                        ) : (
                          <button className="btn btn-sm btn-primary">Signer</button>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline">Voir</button>
                        <button className="btn btn-sm btn-outline">Télécharger</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payslips' && (
            <div className="payslips-section card">
              <div className="section-header">
                <h3>Fiches de Paie</h3>
                <button className="btn btn-primary">+ Ajouter une fiche de paie</button>
              </div>
              <table className="payslips-table">
                <thead>
                  <tr>
                    <th>PÉRIODE</th>
                    <th>Date d'émission</th>
                    <th>Net à payer</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payslips.map(payslip => (
                    <tr key={payslip.id}>
                      <td>{payslip.period}</td>
                      <td>{payslip.issueDate}</td>
                      <td>{payslip.netSalary.toLocaleString()} FCFA</td>
                      <td>
                        <button className="btn btn-sm btn-outline">Télécharger</button>
                        <button className="btn btn-sm btn-outline">Visualiser</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </BaseAdminLayout>
  );
};

export default EmployeeDetail;