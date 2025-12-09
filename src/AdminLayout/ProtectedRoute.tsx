import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Vérifier si l'utilisateur est authentifié
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');

  console.log('ProtectedRoute - Token:', token);
  console.log('ProtectedRoute - User:', user);

  // Si pas de token ou utilisateur, rediriger vers la page de connexion
  if (!token || !user) {
    console.log('Redirection vers /login');
    return <Navigate to="/login" replace />;
  }

  // Si authentifié, afficher le contenu protégé
  console.log('Accès autorisé');
  return <>{children}</>;
};

export default ProtectedRoute;