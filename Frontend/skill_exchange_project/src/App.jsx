import React, { useState } from 'react';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Upgrade from './Upgrade';

function App() {
  const [view, setView] = useState('home'); 
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <>
      {view === 'home' && <Home onStart={() => setView('login')} />}
      {view === 'login' && <Login onSignup={() => setView('register')} onBack={() => setView('home')} />}
      {view === 'register' && <Register onLogin={() => setView('login')} onBack={() => setView('home')} />}
    </>
  );


  // Logic for Guests
  return (
    <>
      {view === 'home' && <Home onStart={() => setView('login')} onLogin={() => setView('login')} onSignup={() => setView('register')} />}
      
      {view === 'login' && (
          <Login 
            onSignup={() => setView('register')} 
            onBack={() => setView('home')} 
          />
      )}

      {view === 'register' && (
          <Register 
            onLogin={() => setView('login')} 
            onBack={() => setView('home')} 
          />
      )}
    </>
  );
}

export default App;