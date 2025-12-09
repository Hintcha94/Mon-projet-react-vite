import { Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contacts';
import Solutions from './pages/Solutions';
import ServiceDetail from './pages/ServiceDetail';
import Login from './Admin/Pages/Login';
import ProtectedRoute from './AdminLayout/ProtectedRoute';
import Dashboard from './Admin/Pages/Dashboard';
import Employees from './Admin/Pages/Employees';
//import Accounting from './Admin/Pages/Accounting';//
import Payroll from './Admin/Pages/Payroll';
import Reports from './Admin/Pages/Reports';
import Settings from './Admin/Pages/Settings';
import Cashier from './Admin/Pages/Cashier';
import EmployeeDetail from './Admin/Pages/EmployeeDetail';
import Clients from './Admin/Pages/Clients'; // Import ajouté

export default function App() {
  return (
    <Routes>
      {/* Routes publiques du site web */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:serviceId" element={<ServiceDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/login" element={<Login />} />
      
      {/* Routes protégées de l'administration */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/employees" 
        element={
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        } 
      /> 
     
      <Route 
        path="/admin/payroll" 
        element={
          <ProtectedRoute>
            <Payroll />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/reports" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/cashier" 
        element={
          <ProtectedRoute>
            <Cashier />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/employees/:id" 
        element={
          <ProtectedRoute>
            <EmployeeDetail />
          </ProtectedRoute>
        } 
      />
      {/* Nouvelle route Clients */}
      <Route 
        path="/admin/clients" 
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        } 
      />

      {/* Redirection par défaut */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Composant pour la page 404
const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
    </div>
  );
};