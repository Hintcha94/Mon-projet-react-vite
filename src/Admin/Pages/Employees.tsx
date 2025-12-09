import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BaseAdminLayout from '../../AdminLayout/BaseAdminLayout';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  status: 'Actif' | 'Inactif';
  email: string;
  phone: string;
  contractType: string;
  contractStartDate: string;
  documentType: string;
  documentNumber: string;
  salary?: number;
}

const Employees: React.FC = () => {
  // Charger depuis localStorage
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      return JSON.parse(savedEmployees);
    }
    // Données par défaut
    return [
      {
        id: 1024,
        name: "Amélie Dubois",
        position: "Développeuse Frontend",
        department: "IT",
        status: 'Actif',
        email: "amelie.dubois@example.com",
        phone: "06 12 34 56 78",
        contractType: "CDI",
        contractStartDate: "2024-01-15",
        documentType: "CNI",
        documentNumber: "123456789012",
        salary: 3500
      },
      {
        id: 1025,
        name: "Lucas Martin",
        position: "Chef de Projet",
        department: "Gestion",
        status: 'Actif',
        email: "lucas.martin@example.com",
        phone: "06 23 45 67 89",
        contractType: "CDD",
        contractStartDate: "2024-03-01",
        documentType: "Passport",
        documentNumber: "PA1234567",
        salary: 4200
      }
    ];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  // Date d’aujourd’hui
const today = new Date();
const currentDay = today.getDate().toString();
const currentMonth = (today.getMonth() + 1).toString();
const currentYear = today.getFullYear().toString();

const [newEmployee, setNewEmployee] = useState({
  name: '',
  position: '',
  department: 'IT',
  email: '',
  phone: '',
  contractType: 'CDI',
  contractDay: currentDay,
  contractMonth: currentMonth,
  contractYear: currentYear,
  documentType: 'CNI',
  documentNumber: '',
  salary: 0
});


  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Fonction pour générer un ID unique
  const generateUniqueId = (): number => {
    const maxId = Math.max(...employees.map(emp => emp.id), 1025); // Commence au moins à 1025
    return maxId + 1;
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.email) {
      const contractStartDate = `${newEmployee.contractYear}-${newEmployee.contractMonth.padStart(2, '0')}-${newEmployee.contractDay.padStart(2, '0')}`;
      
      const employee: Employee = {
        id: generateUniqueId(), // Utiliser generateUniqueId() au lieu de Date.now()
        name: newEmployee.name,
        position: newEmployee.position,
        department: newEmployee.department,
        status: 'Actif',
        email: newEmployee.email,
        phone: newEmployee.phone,
        contractType: newEmployee.contractType,
        contractStartDate: contractStartDate,
        documentType: newEmployee.documentType,
        documentNumber: newEmployee.documentNumber,
        salary: newEmployee.salary > 0 ? newEmployee.salary : undefined
      };

      const updatedEmployees = [...employees, employee];
      setEmployees(updatedEmployees);
      
      // Sauvegarder immédiatement dans localStorage
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      
      resetForm();
      setShowAddForm(false);
      alert(`Employé ${employee.name} ajouté avec succès !`);
    } else {
      alert("Veuillez remplir tous les champs obligatoires (Nom, Poste, Email)");
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    const startDate = new Date(employee.contractStartDate);
    setNewEmployee({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      email: employee.email,
      phone: employee.phone,
      contractType: employee.contractType,
      contractDay: startDate.getDate().toString(),
      contractMonth: (startDate.getMonth() + 1).toString(),
      contractYear: startDate.getFullYear().toString(),
      documentType: employee.documentType,
      documentNumber: employee.documentNumber,
      salary: employee.salary || 0
    });
    setShowEditForm(true);
    setShowAddForm(false);
    setShowDetails(null);
  };

  const handleUpdateEmployee = () => {
    if (editingEmployee && newEmployee.name && newEmployee.position && newEmployee.email) {
      const contractStartDate = `${newEmployee.contractYear}-${newEmployee.contractMonth.padStart(2, '0')}-${newEmployee.contractDay.padStart(2, '0')}`;
      
      const updatedEmployee: Employee = {
        ...editingEmployee,
        name: newEmployee.name,
        position: newEmployee.position,
        department: newEmployee.department,
        email: newEmployee.email,
        phone: newEmployee.phone,
        contractType: newEmployee.contractType,
        contractStartDate: contractStartDate,
        documentType: newEmployee.documentType,
        documentNumber: newEmployee.documentNumber,
        salary: undefined
      };

      const updatedEmployees = employees.map(emp => 
        emp.id === editingEmployee.id ? updatedEmployee : emp
      );

      setEmployees(updatedEmployees);
      
      // Sauvegarder immédiatement dans localStorage
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      
      resetForm();
      setShowEditForm(false);
      setEditingEmployee(null);
      alert(`Employé ${updatedEmployee.name} modifié avec succès !`);
    }
  };

  const handleDeleteEmployee = (id: number, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'employé ${name} ?`)) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      setEmployees(updatedEmployees);
      
      // Sauvegarder immédiatement dans localStorage
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      
      alert(`Employé ${name} supprimé avec succès !`);
      setShowDetails(null);
    }
  };

  const resetForm = () => {
  const today = new Date();
  const currentDay = today.getDate().toString();
  const currentMonth = (today.getMonth() + 1).toString();
  const currentYear = today.getFullYear().toString();

  setNewEmployee({
    name: '',
    position: '',
    department: 'IT',
    email: '',
    phone: '',
    contractType: 'CDI',
    contractDay: currentDay,
    contractMonth: currentMonth,
    contractYear: currentYear,
    documentType: 'CNI',
    documentNumber: '',
    salary: 0
  });
};


  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Fonction pour rendre le formulaire (réutilisable)
  const renderForm = (isEdit: boolean) => {
    const title = isEdit ? "Modifier l'employé" : "Nouvel Employé";
    const submitButtonText = isEdit ? "Mettre à jour" : "Ajouter l'employé";
    const submitHandler = isEdit ? handleUpdateEmployee : handleAddEmployee;
    const cancelHandler = () => {
      resetForm();
      if (isEdit) {
        setShowEditForm(false);
        setEditingEmployee(null);
      } else {
        setShowAddForm(false);
      }
    };

    return (
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>{title}</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '15px',
          marginBottom: '20px'
        }}>
          {/* Champs du formulaire */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Nom complet *</label>
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
              placeholder="Nom et prénom"
              required
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Poste *</label>
            <input
              type="text"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
              placeholder="Poste occupé"
              required
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Département *</label>
            <select
              value={newEmployee.department}
              onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Gestion">Gestion</option>
              <option value="RH">RH</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Email *</label>
            <input
              type="email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
              placeholder="email@entreprise.com"
              required
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Téléphone *</label>
            <input
              type="tel"
              value={newEmployee.phone}
              onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
              placeholder="06 12 34 56 78"
              required
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Salaire (FCFA)</label>
            <input
              type="number"
              value={newEmployee.salary}
              onChange={(e) => setNewEmployee({...newEmployee, salary: parseFloat(e.target.value) || 0})}
              placeholder="3500"
              min="0"
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          {/* Documents Administratifs */}
          <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
            <h4 style={{ margin: '10px 0', color: '#444' }}>Documents Administratifs</h4>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Type de document *</label>
            <select
              value={newEmployee.documentType}
              onChange={(e) => setNewEmployee({...newEmployee, documentType: e.target.value})}
              required
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="CNI">Carte Nationale d'Identité (CNI)</option>
              <option value="Passport">Passport</option>
              <option value="Permis">Permis de conduire</option>
              <option value="Carte de séjour">Carte de séjour</option>
              <option value="Autre">Autre document</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Numéro du document *</label>
            <input
              type="text"
              value={newEmployee.documentNumber}
              onChange={(e) => setNewEmployee({...newEmployee, documentNumber: e.target.value})}
              placeholder="N° de la pièce"
              required
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          {/* Contrat */}
          <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
            <h4 style={{ margin: '10px 0', color: '#444' }}>Contrat</h4>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Type de contrat *</label>
            <select
              value={newEmployee.contractType}
              onChange={(e) => setNewEmployee({...newEmployee, contractType: e.target.value})}
              required
              style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="Stage">Stage</option>
              <option value="CDD">CDD</option>
              <option value="CDI">CDI</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '5px', fontWeight: '500', color: '#333' }}>Date de début *</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={newEmployee.contractDay}
                onChange={(e) => setNewEmployee({...newEmployee, contractDay: e.target.value})}
                required
                style={{
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  flex: 1
                }}
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day.toString()}>{day}</option>
                ))}
              </select>
              <select
                value={newEmployee.contractMonth}
                onChange={(e) => setNewEmployee({...newEmployee, contractMonth: e.target.value})}
                required
                style={{
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  flex: 1
                }}
              >
                <option value="1">Janvier</option>
                <option value="2">Février</option>
                <option value="3">Mars</option>
                <option value="4">Avril</option>
                <option value="5">Mai</option>
                <option value="6">Juin</option>
                <option value="7">Juillet</option>
                <option value="8">Août</option>
                <option value="9">Septembre</option>
                <option value="10">Octobre</option>
                <option value="11">Novembre</option>
                <option value="12">Décembre</option>
              </select>
              <select
                value={newEmployee.contractYear}
                onChange={(e) => setNewEmployee({...newEmployee, contractYear: e.target.value})}
                required
                style={{
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  flex: 1
                }}
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
              Date de début : {newEmployee.contractDay}/{newEmployee.contractMonth}/{newEmployee.contractYear}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            onClick={cancelHandler}
            style={{
              padding: '8px 16px',
              backgroundColor: 'white',
              color: '#3b82f6',
              border: '1px solid #3b82f6',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
          <button 
            onClick={submitHandler}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <BaseAdminLayout>
      <div style={{ padding: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ margin: '0', fontSize: '28px', color: '#333' }}>Gestion des Employés</h1>
            <p style={{ margin: '8px 0 0', color: '#666' }}>Liste de tous les employés de l'entreprise</p>
          </div>
          <button 
            onClick={() => {
              resetForm();
              setShowAddForm(true);
              setShowEditForm(false);
              setEditingEmployee(null);
              setShowDetails(null);
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Ajouter un employé
          </button>
        </div>

        {/* Formulaire d'ajout */}
        {showAddForm && renderForm(false)}
        
        {/* Formulaire de modification */}
        {showEditForm && renderForm(true)}

        {/* Liste des employés */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {employees.map(employee => (
            <div key={employee.id} style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ margin: '0', fontSize: '18px', color: '#333' }}>{employee.name}</h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    backgroundColor: employee.status === 'Actif' ? '#d4edda' : '#f8d7da',
                    color: employee.status === 'Actif' ? '#155724' : '#721c24',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {employee.status}
                  </span>
                </div>
                <p style={{ color: '#666', fontSize: '16px', margin: '8px 0' }}>{employee.position}</p>
                <span style={{
                  color: '#3b82f6',
                  fontWeight: '500',
                  backgroundColor: '#f0f9ff',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}>
                  {employee.department}
                </span>
                
                {/* Informations du contrat et document */}
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ color: '#666' }}>Contrat:</span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: employee.contractType === 'CDI' ? '#d4edda' : 
                                      employee.contractType === 'CDD' ? '#fff3cd' : '#d1ecf1',
                      color: employee.contractType === 'CDI' ? '#155724' : 
                            employee.contractType === 'CDD' ? '#856404' : '#0c5460'
                    }}>
                      {employee.contractType}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ color: '#666' }}>Début:</span>
                    <span>{formatDate(employee.contractStartDate)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ color: '#666' }}>Document:</span>
                    <span style={{ fontWeight: '500', color: '#555' }}>{employee.documentType} - {employee.documentNumber}</span>
                  </div>
                  {employee.salary && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: '#666' }}>Salaire:</span>
                      <span>{employee.salary.toLocaleString()} FCFA</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{ paddingTop: '12px', borderTop: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ color: '#666' }}>📧</span>
                  <span style={{ color: '#333' }}>{employee.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#666' }}>📞</span>
                  <span style={{ color: '#333' }}>{employee.phone}</span>
                </div>
              </div>

              {/* Section détails développée */}
              {showDetails === employee.id && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '6px',
                  border: '1px solid #eee',
                  marginTop: '10px'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Détails supplémentaires</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                    <div>
                      <strong style={{ color: '#666' }}>ID Employé:</strong> {employee.id}
                    </div>
                    <div>
                      <strong style={{ color: '#666' }}>Statut:</strong> {employee.status}
                    </div>
                    <div>
                      <strong style={{ color: '#666' }}>Type de contrat:</strong> {employee.contractType}
                    </div>
                    <div>
                      <strong style={{ color: '#666' }}>Date de début:</strong> {employee.contractStartDate}
                    </div>
                    <div>
                      <strong style={{ color: '#666' }}>Type de document:</strong> {employee.documentType}
                    </div>
                    <div>
                      <strong style={{ color: '#666' }}>Numéro document:</strong> {employee.documentNumber}
                    </div>
                    {employee.salary && (
                      <div>
                        <strong style={{ color: '#666' }}>Salaire mensuel:</strong> {employee.salary.toLocaleString()} FCFA
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div style={{ paddingTop: '12px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
                <Link 
                  to={`/admin/employees/${employee.id}`}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    textDecoration: 'none',
                    textAlign: 'center',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Voir détails
                </Link>
                <button 
                  onClick={() => handleEditEmployee(employee)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Modifier
                </button>
                <button 
                  onClick={() => handleDeleteEmployee(employee.id, employee.name)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseAdminLayout>
  );
};

export default Employees;