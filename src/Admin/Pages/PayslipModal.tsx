import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface PayslipModalProps {
  isOpen: boolean;
  onClose: () => void;
  payslip: {
    id: number;
    period: string;
    issueDate: string;
    netSalary: number;
    employee: {
      name: string;
      position: string;
      department: string;
      id: number;
    };
  };
}

const PayslipModal: React.FC<PayslipModalProps> = ({ isOpen, onClose, payslip }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Logo et en-tête de l'entreprise
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102);
    doc.text('2COMSYSTEMS', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Business Solutions Géo-Mobiles', 105, 27, { align: 'center' });
    doc.text('Créé depuis 2016', 105, 32, { align: 'center' });
    doc.text('Yamoussoukro, Nanan Carréfour garage Ciera', 105, 37, { align: 'center' });
    doc.text('Tél: (+225) 27 33 75 18 38 • Email: societe2coms@yahoo.com', 105, 42, { align: 'center' });
    doc.text('SIRET: 123 456 789 00012 • NAF: 6201Z', 105, 47, { align: 'center' });
    
    // Titre principal
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102);
    doc.text('FICHE DE PAIE', 105, 60, { align: 'center' });
    
    // Ligne séparatrice
    doc.setDrawColor(0, 51, 102);
    doc.setLineWidth(0.5);
    doc.line(20, 65, 190, 65);
    
    // Informations période
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Période : ${payslip.period}`, 20, 75);
    doc.text(`Date d'émission : ${payslip.issueDate}`, 20, 80);
    doc.text(`Date de paiement : 05/${payslip.issueDate.split('/')[1] || 'MM'}/${payslip.issueDate.split('/')[2] || 'YYYY'}`, 20, 85);
    
    // Informations employé
    doc.setFontSize(11);
    doc.setTextColor(0, 51, 102);
    doc.text('INFORMATIONS DE L\'EMPLOYÉ', 20, 95);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom : ${payslip.employee.name}`, 20, 102);
    doc.text(`Poste : ${payslip.employee.position}`, 20, 107);
    doc.text(`Département : ${payslip.employee.department}`, 20, 112);
    doc.text(`ID Employé : ${payslip.employee.id}`, 20, 117);
    
    // Tableau des gains - SEULEMENT SALAIRE DE BASE
    const salary = payslip.netSalary;
    const brut = salary / 0.77; // Approximation pour calcul brut
    const cotisations = brut * 0.23;
    
    const gainsData = [
      ['Salaire de base', `${brut.toFixed(2)} FCFA`, '100%']
    ];
    
    (doc as any).autoTable({
      startY: 125,
      head: [['ÉLÉMENTS', 'MONTANT BRUT', 'TAUX']],
      body: gainsData,
      theme: 'grid',
      headStyles: { 
        fillColor: [0, 51, 102],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      margin: { left: 20, right: 20 }
    });
    
    // Tableau des cotisations - SIMPLIFIÉ
    const lastY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.setTextColor(102, 0, 0);
    doc.text('COTISATIONS SOCIALES', 20, lastY);
    
    const cotisationsData = [
      ['CNPS (Retraite)', `${(cotisations * 0.08).toFixed(2)} FCFA`, '8%'],
      ['Assurance maladie', `${(cotisations * 0.06).toFixed(2)} FCFA`, '6%'],
      ['Précompte professionnel', `${(cotisations * 0.04).toFixed(2)} FCFA`, '4%'],
      ['Autres contributions', `${(cotisations * 0.05).toFixed(2)} FCFA`, '5%'],
    ];
    
    (doc as any).autoTable({
      startY: lastY + 5,
      head: [['COTISATIONS', 'MONTANT', 'TAUX']],
      body: cotisationsData,
      theme: 'grid',
      headStyles: { 
        fillColor: [102, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      margin: { left: 20, right: 20 }
    });
    
    // Récapitulatif
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 102);
    doc.text('RÉCAPITULATIF', 20, finalY);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    const totalGains = brut; // SEULEMENT le salaire de base
    const totalCotisations = cotisations;
    
    doc.text(`Salaire brut : ${totalGains.toFixed(2)} FCFA`, 20, finalY + 8);
    doc.text(`Total cotisations sociales : ${totalCotisations.toFixed(2)} FCFA`, 20, finalY + 13);
    doc.text(`Salaire net imposable : ${payslip.netSalary.toFixed(2)} FCFA`, 20, finalY + 18);
    
    // Net à payer avec cadre
    const netPayY = finalY + 28;
    doc.setDrawColor(40, 167, 69);
    doc.setFillColor(220, 248, 220);
    doc.roundedRect(20, netPayY - 5, 170, 15, 3, 3, 'FD');
    
    doc.setFontSize(14);
    doc.setTextColor(40, 167, 69);
    
    doc.text('NET À PAYER :', 25, netPayY + 3);
    doc.text(`${payslip.netSalary.toFixed(2)} FCFA`, 170, netPayY + 3, { align: 'right' });
    
    // Pied de page
    const footerY = 280;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Document certifié conforme - Fiche de paie générée par 2COMSYSTEMS', 105, footerY, { align: 'center' });
    doc.text('Pour toute réclamation : service.paie@2comsystems.com - Tél: (+225) 27 33 75 18 38', 105, footerY + 5, { align: 'center' });
    doc.text('Ce document fait foi auprès des administrations fiscales et sociales', 105, footerY + 10, { align: 'center' });
    
    // Signature
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text('Le Directeur Administratif et Financier', 150, footerY + 20, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(130, footerY + 25, 170, footerY + 25);
    doc.text('Signature et cachet', 150, footerY + 30, { align: 'center' });
    
    // Sauvegarder le PDF
    doc.save(`2comsystems-fiche-paie-${payslip.employee.name.replace(/\s+/g, '-')}-${payslip.period}.pdf`);
  };

  if (!isOpen) return null;

  const salary = payslip.netSalary;
  const brut = salary / 0.77;
  const cotisations = brut * 0.23;
  const totalGains = brut; // SEULEMENT salaire de base

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '20px'
      }}>
        {/* En-tête avec logo de l'entreprise */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '20px',
          borderBottom: '2px solid #003366',
          paddingBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#003366',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <img 
                src="/images/team2.jpg" 
                alt="Logo 2COMSYSTEMS" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </div>
            <div>
              <h2 style={{ color: '#003366', margin: '0', fontSize: '24px' }}>2COMSYSTEMS</h2>
              <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '14px' }}>
                Business Solutions Géo-Mobiles • Créé depuis 2016
              </p>
            </div>
          </div>
          
          <h1 style={{ 
            color: '#003366', 
            margin: '20px 0 10px 0',
            fontSize: '28px',
            fontWeight: 'bold'
          }}>
            FICHE DE PAIE
          </h1>
          <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>
            Yamoussoukro, Nanan Carréfour garage Ciera • Tél: (+225) 27 33 75 18 38
          </p>
          <p style={{ color: '#666', fontSize: '12px', margin: '5px 0 0 0' }}>
            Email: societe2coms@yahoo.com • SIRET: 123 456 789 00012
          </p>
        </div>

        {/* Informations période et employé */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '30px',
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <div>
            <h4 style={{ color: '#003366', marginBottom: '15px', borderBottom: '1px solid #dee2e6', paddingBottom: '8px' }}>PÉRIODE DE PAIE</h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              <div>
                <strong style={{ color: '#666', display: 'inline-block', width: '140px' }}>Mois :</strong>
                <span style={{ color: '#333', fontWeight: '500' }}>{payslip.period}</span>
              </div>
              <div>
                <strong style={{ color: '#666', display: 'inline-block', width: '140px' }}>Date d'émission :</strong>
                <span style={{ color: '#333', fontWeight: '500' }}>{payslip.issueDate}</span>
              </div>
              <div>
                <strong style={{ color: '#666', display: 'inline-block', width: '140px' }}>Date de paiement :</strong>
                <span style={{ color: '#333', fontWeight: '500' }}>05/{payslip.issueDate.split('/')[1] || 'MM'}/{payslip.issueDate.split('/')[2] || 'YYYY'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 style={{ color: '#003366', marginBottom: '15px', borderBottom: '1px solid #dee2e6', paddingBottom: '8px' }}>INFORMATIONS EMPLOYÉ</h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              <div>
                <strong style={{ color: '#666', display: 'inline-block', width: '120px' }}>Nom :</strong>
                <span style={{ color: '#333', fontWeight: '500' }}>{payslip.employee.name}</span>
              </div>
              <div>
                <strong style={{ color: '#666', display: 'inline-block', width: '120px' }}>Poste :</strong>
                <span style={{ color: '#333', fontWeight: '500' }}>{payslip.employee.position}</span>
              </div>
              <div>
                <strong style={{ color: '#666', display: 'inline-block', width: '120px' }}>Département :</strong>
                <span style={{ color: '#333', fontWeight: '500' }}>{payslip.employee.department}</span>
              </div>
              <div>
                <strong style={{ color: '#666', display: 'inline-block', width: '120px' }}>ID Employé :</strong>
                <span style={{ color: '#333', fontWeight: '500' }}>{payslip.employee.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gains - SEULEMENT SALAIRE DE BASE */}
        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ 
            color: '#003366', 
            marginBottom: '15px',
            backgroundColor: '#f0f8ff',
            padding: '12px 15px',
            borderRadius: '6px',
            borderLeft: '4px solid #003366'
          }}>
            <i className="fas fa-money-bill-wave" style={{ marginRight: '10px' }}></i>
            GAINS ET RÉMUNÉRATIONS
          </h4>
          <div style={{ 
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              backgroundColor: '#003366',
              color: 'white',
              padding: '12px 16px',
              fontWeight: '600'
            }}>
              <div>ÉLÉMENTS</div>
              <div>MONTANT BRUT</div>
              <div>TAUX</div>
            </div>
            
            {/* SEULEMENT SALAIRE DE BASE */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                padding: '12px 16px',
                borderBottom: '1px solid #eee',
                backgroundColor: '#f9f9f9',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f9ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
            >
              <div>Salaire de base</div>
              <div style={{ fontWeight: '500' }}>{brut.toFixed(2)} FCFA</div>
              <div style={{ color: '#666' }}>100%</div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              padding: '15px 16px',
              backgroundColor: '#e8f4f8',
              fontWeight: '600',
              borderTop: '2px solid #003366'
            }}>
              <div>TOTAL GAINS BRUTS</div>
              <div>{totalGains.toFixed(2)} FCFA</div>
              <div>100%</div>
            </div>
          </div>
        </div>

        {/* Cotisations */}
        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ 
            color: '#660000', 
            marginBottom: '15px',
            backgroundColor: '#fff0f0',
            padding: '12px 15px',
            borderRadius: '6px',
            borderLeft: '4px solid #660000'
          }}>
            <i className="fas fa-hand-holding-usd" style={{ marginRight: '10px' }}></i>
            COTISATIONS SOCIALES
          </h4>
          <div style={{ 
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              backgroundColor: '#660000',
              color: 'white',
              padding: '12px 16px',
              fontWeight: '600'
            }}>
              <div>COTISATIONS</div>
              <div>MONTANT</div>
              <div>TAUX</div>
            </div>
            
            {[
              { cotisation: 'CNPS (Retraite)', montant: `${(cotisations * 0.08).toFixed(2)} FCFA`, taux: '8%' },
              { cotisation: 'Assurance maladie', montant: `${(cotisations * 0.06).toFixed(2)} FCFA`, taux: '6%' },
              { cotisation: 'Précompte professionnel', montant: `${(cotisations * 0.04).toFixed(2)} FCFA`, taux: '4%' },
              { cotisation: 'Autres contributions', montant: `${(cotisations * 0.05).toFixed(2)} FCFA`, taux: '5%' },
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  padding: '12px 16px',
                  borderBottom: '1px solid #eee',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff0f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : 'white'}
              >
                <div>{item.cotisation}</div>
                <div style={{ fontWeight: '500' }}>{item.montant}</div>
                <div style={{ color: '#666' }}>{item.taux}</div>
              </div>
            ))}
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              padding: '15px 16px',
              backgroundColor: '#ffeaea',
              fontWeight: '600',
              borderTop: '2px solid #660000'
            }}>
              <div>TOTAL COTISATIONS SOCIALES</div>
              <div>{cotisations.toFixed(2)} FCFA</div>
              <div>23%</div>
            </div>
          </div>
        </div>

        {/* Récapitulatif */}
        <div style={{ 
          backgroundColor: '#f0f9ff',
          padding: '25px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #cce5ff'
        }}>
          <h4 style={{ 
            color: '#003366', 
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '18px'
          }}>
            <i className="fas fa-calculator" style={{ marginRight: '10px' }}></i>
            RÉCAPITULATIF DE LA PAIE
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h5 style={{ color: '#003366', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                  DÉTAIL DES MONTANTS
                </h5>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#666' }}>Salaire brut :</span>
                    <span style={{ fontWeight: '600', color: '#333' }}>{totalGains.toFixed(2)} FCFA</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#666' }}>Total cotisations sociales :</span>
                    <span style={{ fontWeight: '600', color: '#dc3545' }}>- {cotisations.toFixed(2)} FCFA</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '10px',
                    paddingTop: '10px',
                    borderTop: '1px solid #eee'
                  }}>
                    <span style={{ color: '#666', fontWeight: '500' }}>Salaire net imposable :</span>
                    <span style={{ fontWeight: '600', color: '#28a745' }}>{payslip.netSalary.toFixed(2)} FCFA</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '8px',
              border: '2px solid #28a745',
              boxShadow: '0 4px 8px rgba(40, 167, 69, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h3 style={{ 
                color: '#28a745',
                margin: '0 0 15px 0',
                textAlign: 'center',
                fontSize: '20px'
              }}>
                <i className="fas fa-hand-holding-usd" style={{ marginRight: '10px' }}></i>
                NET À PAYER
              </h3>
              <div style={{ 
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#28a745',
                textAlign: 'center',
                marginBottom: '10px'
              }}>
                {payslip.netSalary.toFixed(2)} FCFA
              </div>
              <div style={{ 
                fontSize: '14px',
                color: '#666',
                textAlign: 'center',
                marginTop: '10px',
                borderTop: '1px solid #eee',
                paddingTop: '10px',
                width: '100%'
              }}>
                <i className="fas fa-info-circle" style={{ marginRight: '5px' }}></i>
                Montant à virer sur le compte de l'employé
              </div>
            </div>
          </div>
        </div>

        {/* Informations légales */}
        <div style={{ 
          borderTop: '1px solid #dee2e6',
          paddingTop: '15px',
          color: '#666',
          fontSize: '12px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <p style={{ margin: '5px 0' }}>
            <i className="fas fa-file-certificate" style={{ marginRight: '5px' }}></i>
            Document certifié conforme - Fiche de paie générée par 2COMSYSTEMS
          </p>
          <p style={{ margin: '5px 0' }}>
            <i className="fas fa-phone" style={{ marginRight: '5px' }}></i>
            Pour toute réclamation : service.paie@2comsystems.com - Tél: (+225) 27 33 75 18 38
          </p>
          <p style={{ margin: '5px 0' }}>
            <i className="fas fa-shield-alt" style={{ marginRight: '5px' }}></i>
            Ce document fait foi auprès des administrations fiscales et sociales
          </p>
        </div>

        {/* Signature */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
          paddingTop: '15px',
          borderTop: '1px solid #dee2e6'
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ 
                width: '200px', 
                height: '1px', 
                backgroundColor: '#000', 
                marginBottom: '5px' 
              }}></div>
              <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                Le Directeur Administratif et Financier
              </p>
              <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
                Signature et cachet
              </p>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #dee2e6'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              color: '#666',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.borderColor = '#999';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#ddd';
            }}
          >
            <i className="fas fa-times"></i>
            Fermer
          </button>
          <button
            onClick={generatePDF}
            style={{
              padding: '10px 25px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#218838';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#28a745';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <i className="fas fa-download"></i>
            Télécharger PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayslipModal;