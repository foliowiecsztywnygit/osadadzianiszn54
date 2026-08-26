import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../components/Calendar';
import { format, addDays } from 'date-fns';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

const AdminDashboard = () => {
  const [cabins, setCabins] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectionStart, setSelectionStart] = useState({ cabinId: null, date: null });
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const fetchData = async () => {
    try {
      const cabinsRes = await fetch(`${API_URL}/api/cabins`);
      const cabinsData = await cabinsRes.json();
      setCabins(cabinsData);

      const blocksRes = await fetch(`${API_URL}/api/admin/blocks`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (blocksRes.status === 401 || blocksRes.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
      const blocksData = await blocksRes.json();
      setBlocks(blocksData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const refreshSession = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/refresh`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('adminToken', data.token);
        }
      } catch (err) {
        console.error('Failed to refresh session', err);
      }
    };

    refreshSession();
    fetchData();

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleDateToggle = async (cabinId, date) => {
    if (selectionStart.cabinId === cabinId && selectionStart.date) {
      // Range selection complete
      const start = selectionStart.date < date ? selectionStart.date : date;
      const end = selectionStart.date > date ? selectionStart.date : date;
      
      const datesToToggle = [];
      let current = start;
      while (current <= end) {
        datesToToggle.push(format(current, 'yyyy-MM-dd'));
        current = addDays(current, 1);
      }

      const startStr = format(selectionStart.date, 'yyyy-MM-dd');
      const wasBlocked = blocks.some(b => b.cabin_id === cabinId && b.start_date === startStr);

      try {
        if (wasBlocked) {
          // Unblock range
          for (const d of datesToToggle) {
            const b = blocks.find(x => x.cabin_id === cabinId && x.start_date === d);
            if (b) {
              await fetch(`${API_URL}/api/admin/blocks/${b.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
              });
            }
          }
        } else {
          // Block range
          for (const d of datesToToggle) {
            const b = blocks.find(x => x.cabin_id === cabinId && x.start_date === d);
            if (!b) {
              await fetch(`${API_URL}/api/admin/blocks`, {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                  cabin_id: cabinId,
                  start_date: d,
                  end_date: d,
                  reason: 'manual'
                })
              });
            }
          }
        }
      } catch (err) {
        console.error('Error toggling dates:', err);
      }

      setSelectionStart({ cabinId: null, date: null });
      fetchData();
    } else {
      // First click: start selection OR single click
      // If we just want to select a single day, they can click it twice, or we can just start selection.
      // Click once -> selects start. Click same date again -> toggles that single day.
      setSelectionStart({ cabinId, date });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300 p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-stone-800 pb-4">
          <h1 className="text-3xl font-serif text-amber-500">Panel Administratora</h1>
          <div>
            <p className="text-sm text-stone-400 mb-2 mr-4 inline-block">Instrukcja: Kliknij datę początkową i końcową, by zablokować/odblokować zakres (lub kliknij dwukrotnie ten sam dzień).</p>
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-950 hover:bg-red-900 text-red-200 border border-red-900 rounded-xl transition-all font-medium text-sm shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Wyloguj
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cabins.map(cabin => {
            const cabinBlocks = blocks
              .filter(b => b.cabin_id === cabin.id)
              .map(b => b.start_date);

            const selectedDates = selectionStart.cabinId === cabin.id && selectionStart.date 
              ? [selectionStart.date] 
              : [];

            return (
              <div key={cabin.id} className="bg-stone-900 p-6 rounded-2xl border border-stone-800">
                <h2 className="text-xl font-medium text-white mb-4 text-center">{cabin.name}</h2>
                <Calendar 
                  blockedDates={cabinBlocks}
                  selectedDates={selectedDates}
                  onChange={(date) => handleDateToggle(cabin.id, date)}
                  allowAdminBlocks={true}
                  monthsCount={isMobile ? 1 : 2}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
