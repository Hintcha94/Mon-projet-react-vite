import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulation d'authentification
      if (email === 'admin@2comsystems.com' && password === 'admin123') {
        // Stocker les informations d'authentification
        localStorage.setItem('authToken', 'fake-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          name: 'Adama Doumbia',
          email: 'admin@2comsystems.com',
          role: 'Administrateur'
        }));
        
        // Rediriger vers le dashboard admin
        navigate('/admin/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="company-logo">
            <img src="/images/logo1.png" alt="2COMSYSTEMS" />
          </div>
          <h1>2COMSYSTEMS</h1>
          <p>Connectez-vous à votre espace administrateur</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@2comsystems.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <div className="login-info">
            <p><strong>Compte de test :</strong></p>
            <p>Email: admin@2comsystems.com</p>
            <p>Mot de passe: admin123</p>
          </div>
        </form>

        <div className="login-footer">
          <p>&copy; 2024 2COMSYSTEMS. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;