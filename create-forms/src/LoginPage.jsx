// LoginPage.jsx
import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
  e.preventDefault();

  const validEmail = "rukku1304@gmail.com";
  const validPassword = "12345";

  if (
    (email === validEmail && password === validPassword) ||
    (email === "meghana@nutrinium.in" && password === "12345") ||
    (email === "tej@nutrinium.in" && password === "12345")
  ) {
    onLogin();
  } else {
    alert("Invalid credentials. Hint: rukku1304@gmail.com / 12345");
  }
};
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>D.E.C. INFRA</h1>
          <p style={styles.subtitle}>Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input 
              type="email" 
              placeholder="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input} 
              required 
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
  },
  card: {
    background: '#ffffff',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid rgba(255,255,255,0.8)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a'
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155'
  },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  button: {
    marginTop: '10px',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    background: '#2563eb', /* Modern Indigo/Blue */
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s ease, transform 0.1s ease',
  }
};

export default LoginPage;