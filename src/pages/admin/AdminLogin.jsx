import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError('Nieprawidłowe hasło');
      }
    } catch (err) {
      setError('Błąd połączenia z serwerem');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-stone-900 border border-amber-900/30 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-serif text-amber-500 mb-6 text-center">Logowanie Administratora</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-stone-400 mb-2 text-sm">Hasło</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-600 transition-colors"
              placeholder="Wprowadź hasło..."
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-600 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
