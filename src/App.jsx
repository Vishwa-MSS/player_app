import React, { useState, useEffect } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import AuthPage from './components/AuthPage';

const API_URL = 'https://player-app-ozqz.vercel.app/api/players/';

function App() {
  const [players, setPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'form'
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // Fetch players from Django Backend
  useEffect(() => {
    if (token) {
      fetchPlayers();
    }
  }, [token]);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
  });

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        headers: { 'Authorization': `Token ${token}` }
      });
      if (!response.ok) {
        if (response.status === 401) handleLogout();
        throw new Error('Failed to fetch data from backend');
      }
      const data = await response.json();
      setPlayers(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server. Make sure Django is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlayer = async (playerData) => {
    try {
      if (editingPlayer) {
        // Update existing player
        const response = await fetch(`${API_URL}${editingPlayer.id}/`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(playerData)
        });
        if (!response.ok) throw new Error('Failed to update player');
        const updatedPlayer = await response.json();
        setPlayers(prev => prev.map(p => p.id === editingPlayer.id ? updatedPlayer : p));
        setEditingPlayer(null);
      } else {
        // Create new player
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(playerData)
        });
        if (!response.ok) throw new Error('Failed to register player');
        const newPlayer = await response.json();
        setPlayers(prev => [newPlayer, ...prev]);
      }
      setActiveTab('list');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to save player to the backend.');
    }
  };

  const handleEditPlayer = (player) => {
    setEditingPlayer(player);
    setActiveTab('form');
  };

  const handleDeletePlayer = async (id) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete player');
      setPlayers(prev => prev.filter(p => p.id !== id));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to delete player.');
    }
  };

  const cancelEdit = () => {
    setEditingPlayer(null);
    setActiveTab('list');
  };

  const handleLogout = async () => {
    try {
      await fetch('https://player-app-ozqz.vercel.app/api/auth/logout/', {
        method: 'POST',
        headers: { 'Authorization': `Token ${token}` }
      });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setPlayers([]);
  };

  if (!token) {
    return <AuthPage onLoginSuccess={(t, u) => { setToken(t); setUser(u); }} />;
  }

  return (
    <div className="bg-brand-dark text-white font-sans antialiased bg-[radial-gradient(circle_at_top_right,rgba(230,57,70,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(230,57,70,0.1),transparent_40%)] min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-x-hidden bg-fixed">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10 flex-grow flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              Zenminds
            </span>
            {' '}Cricketing Solutions
          </h1>
          <p className="text-brand-muted text-lg">
            Welcome, {user?.username}
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-1 text-sm bg-brand-accent/20 text-brand-accent border border-brand-accent/50 rounded hover:bg-brand-accent hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Server Connection Error Alert */}
        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center justify-between text-sm backdrop-blur-md">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-white font-bold text-xl ml-4">&times;</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-2 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => {
              setActiveTab('list');
              setEditingPlayer(null);
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'list'
              ? 'bg-brand-accent/20 text-white border border-brand-accent shadow-[0_0_15px_rgba(230,57,70,0.2)]'
              : 'text-brand-muted hover:text-white hover:bg-white/5'
              }`}
          >
            Player Dashboard
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'form'
              ? 'bg-brand-accent/20 text-white border border-brand-accent shadow-[0_0_15px_rgba(230,57,70,0.2)]'
              : 'text-brand-muted hover:text-white hover:bg-white/5'
              }`}
          >
            {editingPlayer ? 'Edit Player' : 'Add New Player'}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="w-full pb-12">
          {activeTab === 'form' ? (
            <div className="max-w-4xl mx-auto">
              <PlayerForm
                initialData={editingPlayer}
                onSubmit={handleSavePlayer}
                onCancel={cancelEdit}
              />
            </div>
          ) : (
            <>
              {loading ? (
                <div className="text-center text-brand-muted py-10 animate-pulse">
                  <div className="inline-block w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p>Connecting to database...</p>
                </div>
              ) : (
                <PlayerList
                  players={players}
                  onEdit={handleEditPlayer}
                  onDelete={handleDeletePlayer}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
