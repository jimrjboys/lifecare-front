import React from 'react';
import { Platform } from 'react-native';

export default function Index() {
  if (Platform.OS === 'web') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <h1 style={{ color: '#0077B6', fontSize: '3rem', marginBottom: '2rem' }}>LifeCare</h1>
        <button 
          onClick={() => window.location.href = '/login'}
          style={{
            backgroundColor: '#0077B6',
            padding: '15px 30px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ACCÉDER À LA CONNEXION
        </button>
      </div>
    );
  }

  return null;
}
