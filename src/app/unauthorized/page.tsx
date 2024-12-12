'use client';

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '48px', color: 'red' }}>😡 Accesso Negato!</h1>
      <p style={{ fontSize: '20px', margin: '20px 0' }}>
        Ma che ci fai qui?! Non hai i permessi per vedere questa pagina.
      </p>
      <p style={{ fontSize: '16px', marginBottom: '30px' }}>
        Se pensi sia un errore, riprova il login. Altrimenti, torna dove hai accesso!
      </p>
      <button
        onClick={() => router.push('/auth/login')}
        style={{
          margin: '0 10px',
          padding: '12px 24px',
          fontSize: '18px',
          backgroundColor: '#ff0000',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#cc0000';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#ff0000';
        }}
      >
        Torna al Login
      </button>
      <button
        onClick={() => router.push('/')}
        style={{
          margin: '0 10px',
          padding: '12px 24px',
          fontSize: '18px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#333';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#000';
        }}
      >
        Vai alla Home
      </button>
      <div style={{ marginTop: '40px', fontSize: '14px', color: '#666' }}>
        <p>Non fare il furbo... Se non hai accesso, qui non ci puoi entrare!</p>
      </div>
    </div>
  );
}
