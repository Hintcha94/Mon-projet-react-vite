import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BaseAdminLayout from '../../AdminLayout/BaseAdminLayout';
import PayslipModal from './PayslipModal'; 
import jsPDF from 'jspdf';

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
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);
  const [showPayslipModal, setShowPayslipModal] = useState(false);

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

  // Fonction pour obtenir la couleur du badge selon le type de contrat
  const getContractStyle = (contractType?: string) => {
    if (!contractType) return { backgroundColor: '#e9ecef', color: '#495057' };
    
    const type = contractType.toLowerCase();
    if (type.includes('cdi')) return { backgroundColor: '#d4edda', color: '#155724' };
    if (type.includes('cdd')) return { backgroundColor: '#fff3cd', color: '#856404' };
    if (type.includes('stage')) return { backgroundColor: '#d1ecf1', color: '#0c5460' };
    return { backgroundColor: '#e9ecef', color: '#495057' };
  };

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusStyle = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'actif') return { backgroundColor: '#d4edda', color: '#155724' };
    if (statusLower === 'inactif') return { backgroundColor: '#f8d7da', color: '#721c24' };
    if (statusLower === 'en cours' || statusLower === 'en-cours') return { backgroundColor: '#fff3cd', color: '#856404' };
    return { backgroundColor: '#e9ecef', color: '#495057' };
  };

  // Fonction pour télécharger une fiche de paie simple
  const downloadSimplePayslip = (payslip: Payslip) => {
    const doc = new jsPDF();
    
    // En-tête
    doc.setFontSize(16);
    doc.text('FICHE DE PAIE', 105, 20, { align: 'center' });
    
    // Informations
    doc.setFontSize(12);
    doc.text(`Période: ${payslip.period}`, 20, 40);
    doc.text(`Date d'émission: ${payslip.issueDate}`, 20, 50);
    doc.text(`Employé: ${employee?.name}`, 20, 60);
    doc.text(`Poste: ${employee?.position}`, 20, 70);
    
    // Salaire
    doc.setFontSize(14);
    doc.setTextColor(0, 100, 0);
    doc.text(`NET À PAYER: ${payslip.netSalary.toLocaleString()} FCFA`, 20, 90);
    
    // Sauvegarder
    doc.save(`fiche-paie-${employee?.name}-${payslip.period}.pdf`);
  };

  if (loading) {
    return (
      <BaseAdminLayout>
        <div style={{ padding: '20px' }}>
          <h1>Chargement...</h1>
        </div>
      </BaseAdminLayout>
    );
  }

  if (!employee) {
    return (
      <BaseAdminLayout>
        <div style={{ padding: '20px' }}>
          <h1>Employé non trouvé</h1>
          <button 
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
            onClick={() => navigate('/admin/employees')}
          >
            Retour à la liste
          </button>
        </div>
      </BaseAdminLayout>
    );
  }

  return (
    <BaseAdminLayout>
      <div style={{ padding: '20px' }}>
        {/* En-tête */}
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>{employee.name}</h1>
          <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '18px' }}>{employee.position}</p>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <span style={{ color: '#666' }}>ID Employé: {employee.id}</span>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <span style={{ color: '#666' }}>Statut:</span>
              <span 
                style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500',
                  ...getStatusStyle(employee.status)
                }}
              >
                {employee.status}
              </span>
            </div>
          </div>
          
          {/* Section Contrat dans l'en-tête */}
          {employee.contractType && (
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px'
            }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Type de contrat:</strong>
                <span 
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'inline-block',
                    ...getContractStyle(employee.contractType)
                  }}
                >
                  {employee.contractType}
                </span>
              </div>
              
              {employee.contractStartDate && (
                <div>
                  <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Début de contrat:</strong>
                  <span>{formatFrenchDate(employee.contractStartDate)}</span>
                </div>
              )}
              
              {employee.salary && (
                <div>
                  <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Salaire:</strong>
                  <span style={{ fontWeight: '600', color: '#28a745' }}>{employee.salary.toLocaleString()} FCFA</span>
                </div>
              )}
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                color: '#007bff',
                border: '1px solid #007bff',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Modifier
            </button>
            <button 
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Archiver
            </button>
          </div>
        </div>

        {/* Onglets */}
        <div style={{ 
          display: 'flex', 
          gap: '1px',
          marginBottom: '20px',
          borderBottom: '1px solid #dee2e6'
        }}>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'info' ? '#007bff' : 'white',
              color: activeTab === 'info' ? 'white' : '#495057',
              border: '1px solid #dee2e6',
              borderBottom: 'none',
              cursor: 'pointer',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
              fontWeight: '500'
            }}
            onClick={() => setActiveTab('info')}
          >
            Informations Personnelles
          </button>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'contracts' ? '#007bff' : 'white',
              color: activeTab === 'contracts' ? 'white' : '#495057',
              border: '1px solid #dee2e6',
              borderBottom: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            onClick={() => setActiveTab('contracts')}
          >
            Contrats
          </button>
          <button 
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'payslips' ? '#007bff' : 'white',
              color: activeTab === 'payslips' ? 'white' : '#495057',
              border: '1px solid #dee2e6',
              borderBottom: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            onClick={() => setActiveTab('payslips')}
          >
            Fiches de Paie
          </button>
        </div>

        {/* Contenu des onglets */}
        <div>
          {activeTab === 'info' && (
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Informations Personnelles</h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 10px 0', color: '#444' }}>Coordonnées</h4>
                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Adresse e-mail:</strong>
                    <a href={`mailto:${employee.email}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                      {employee.email}
                    </a>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Téléphone:</strong>
                    {employee.phone}
                  </div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Département:</strong>
                    {employee.department}
                  </div>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 10px 0', color: '#444' }}>Informations de contrat</h4>
                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Type de contrat:</strong>
                    <span 
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        display: 'inline-block',
                        ...getContractStyle(employee.contractType)
                      }}
                    >
                      {employee.contractType || "Non spécifié"}
                    </span>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Date de début:</strong>
                    {employee.contractStartDate ? formatFrenchDate(employee.contractStartDate) : "Non spécifiée"}
                  </div>
                  {employee.salary && (
                    <div>
                      <strong style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Salaire:</strong>
                      {employee.salary.toLocaleString()} FCFA
                    </div>
                  )}
                </div>

                <div>
                  <h4 style={{ margin: '0 0 10px 0', color: '#444' }}>Adresse</h4>
                  <div style={{ color: '#333' }}>{employee.address}</div>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 10px 0', color: '#444' }}>Date de naissance</h4>
                  <div style={{ color: '#333' }}>{employee.birthDate}</div>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 10px 0', color: '#444' }}>Contact d'urgence</h4>
                  <div style={{ 
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      borderBottom: '1px solid #dee2e6',
                      backgroundColor: '#f8f9fa',
                      padding: '10px',
                      fontWeight: '600',
                      color: '#495057'
                    }}>
                      <div>Nom complet</div>
                      <div>Téléphone</div>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      padding: '10px'
                    }}>
                      <div>{employee.emergencyContact?.name}</div>
                      <div>{employee.emergencyContact?.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{ margin: '0', color: '#333' }}>Contrats</h3>
                <button 
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Nouveau contrat
                </button>
              </div>
              
              <div style={{ 
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  backgroundColor: '#f8f9fa',
                  padding: '12px 16px',
                  fontWeight: '600',
                  color: '#495057',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <div>Type de contrat</div>
                  <div>Date de début</div>
                  <div>Date de fin</div>
                  <div>Statut</div>
                  <div>Signature</div>
                  <div>Actions</div>
                </div>
                
                {contracts.map(contract => (
                  <div 
                    key={contract.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(6, 1fr)',
                      padding: '12px 16px',
                      borderBottom: '1px solid #dee2e6',
                      alignItems: 'center'
                    }}
                  >
                    <div>{contract.type}</div>
                    <div>{contract.startDate}</div>
                    <div>{contract.endDate}</div>
                    <div>
                      <span 
                        style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500',
                          display: 'inline-block',
                          ...getStatusStyle(contract.status)
                        }}
                      >
                        {contract.status}
                      </span>
                    </div>
                    <div>
                      {contract.signed ? (
                        <span style={{ color: '#28a745', fontWeight: '500' }}>Signé</span>
                      ) : (
                        <button 
                          style={{
                            padding: '4px 12px',
                            fontSize: '12px',
                            backgroundColor: '#fff3cd',
                            color: '#856404',
                            border: '1px solid #ffc107',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Signer
                        </button>
                      )}
                    </div>
                    <div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          style={{
                            padding: '6px 12px',
                            fontSize: '13px',
                            backgroundColor: 'white',
                            color: '#007bff',
                            border: '1px solid #007bff',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '70px'
                          }}
                        >
                          Voir
                        </button>
                        <button 
                          style={{
                            padding: '6px 12px',
                            fontSize: '13px',
                            backgroundColor: 'white',
                            color: '#28a745',
                            border: '1px solid #28a745',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '100px'
                          }}
                        >
                          Télécharger
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payslips' && (
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{ margin: '0', color: '#333' }}>Fiches de Paie</h3>
                <button 
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Ajouter une fiche de paie
                </button>
              </div>
              
              <div style={{ 
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  backgroundColor: '#f8f9fa',
                  padding: '12px 16px',
                  fontWeight: '600',
                  color: '#495057',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <div>PÉRIODE</div>
                  <div>Date d'émission</div>
                  <div>Net à payer</div>
                  <div>Actions</div>
                </div>
                
                {payslips.map(payslip => (
                  <div 
                    key={payslip.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      padding: '12px 16px',
                      borderBottom: '1px solid #dee2e6',
                      alignItems: 'center'
                    }}
                  >
                    <div>{payslip.period}</div>
                    <div>{payslip.issueDate}</div>
                    <div>{payslip.netSalary.toLocaleString()} FCFA</div>
                    <div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => downloadSimplePayslip(payslip)}
                          style={{
                            padding: '6px 12px',
                            fontSize: '13px',
                            backgroundColor: 'white',
                            color: '#28a745',
                            border: '1px solid #28a745',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '100px'
                          }}
                        >
                          Télécharger
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedPayslip(payslip);
                            setShowPayslipModal(true);
                          }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '13px',
                            backgroundColor: 'white',
                            color: '#6c757d',
                            border: '1px solid #6c757d',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '90px'
                          }}
                        >
                          Visualiser
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal pour visualiser la fiche de paie */}
        {showPayslipModal && selectedPayslip && employee && (
          <PayslipModal
            isOpen={showPayslipModal}
            onClose={() => {
              setShowPayslipModal(false);
              setSelectedPayslip(null);
            }}
            payslip={{
              ...selectedPayslip,
              employee: {
                name: employee.name,
                position: employee.position,
                department: employee.department,
                id: employee.id
              }
            }}
          />
        )}
      </div>
    </BaseAdminLayout>
  );
};

export default EmployeeDetail;