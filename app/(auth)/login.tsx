import React, { useState } from 'react';
import { Platform, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('andryjimmyras@gmail.com');
  const [password, setPassword] = useState('');

  const handleLogin = (e: any) => {
    e.preventDefault();
    console.log('Tentative de connexion...');
    
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('auth-storage', JSON.stringify({
          state: { user: data.user, token: data.token }
        }));
        window.location.href = '/(tabs)';
      } else {
        alert('Erreur: ' + (data.message || 'Identifiants invalides'));
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('Erreur de connexion au serveur');
    });
  };

  if (Platform.OS === 'web') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#0077B6', marginBottom: '10px' }}>LifeCare</h1>
          <p style={{ color: '#666', marginBottom: '30px' }}>Votre santé, notre priorité</p>
          
          <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#444' }}>Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#444' }}>Mot de passe</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '25px',
                backgroundColor: '#0077B6',
                color: 'white',
                border: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <View />;
}
