import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

type View = 'landing' | 'login' | 'register' | 'dashboard'|'adminlogin';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  subscription: string;
  progress: {
    completedLessons: number[];
    quizScores: number[];
    currentLevel: number;
  };
  portfolio: {
    cash: number;
    positions: any[];
    history: any[];
  };
  watchlist: any[];
  alerts: any[];
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
 

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('stocklearn_user');
    if (savedUser) {
      try {
        const user: User = JSON.parse(savedUser);
        setCurrentUser(user);
        setCurrentView('dashboard');
      } catch (error) {
        localStorage.removeItem('stocklearn_user');
        localStorage.removeItem('stocklearn_session');
      }
    }
  }, []);

  // Full login logic
  const handleLogin = (email: string, password: string): boolean => {
    // Admin check
    if (email === 'admin@mse-vantage.com' && password === 'razack123') {
      const adminUser: User = {
        id: 'admin',
        name: 'Admin User',
        email,
        role: 'admin',
        subscription: 'premium', // unlock all tiers
        progress: {
          completedLessons: Array.from({ length: 24 }, (_, i) => i + 1),
          quizScores: Array.from({ length: 24 }, () => 100),
          currentLevel: 3
        },
        portfolio: { cash: 1000000, positions: [], history: [] },
        watchlist: [],
        alerts: []
      };
      setCurrentUser(adminUser);
      localStorage.setItem('stocklearn_user', JSON.stringify(adminUser));
      localStorage.setItem('stocklearn_session', Date.now().toString());
      setCurrentView('dashboard');
      return true;
    }
  
    const users = JSON.parse(localStorage.getItem('stocklearn_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      const loggedInUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        subscription: user.subscription || 'free',
        progress: user.progress || {
          completedLessons: [],
          quizScores: [],
          currentLevel: 1
        },
        portfolio: user.portfolio || {
          cash: 100000,
          positions: [],
          history: []
        },
        watchlist: user.watchlist || [],
        alerts: user.alerts || []
      };
      setCurrentUser(loggedInUser);
      localStorage.setItem('stocklearn_user', JSON.stringify(loggedInUser));
      localStorage.setItem('stocklearn_session', Date.now().toString());
      setCurrentView('dashboard');
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      return true;
    }

    return false;
  };


  const handleRegister = (name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('stocklearn_users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, this should be hashed
      role: 'user',
      subscription: 'free',
      progress: {
        completedLessons: [],
        quizScores: [],
        currentLevel: 1
      },
      portfolio: {
        cash: 100000,
        positions: [],
        history: []
      },
      watchlist: [],
      alerts: []
    };
    
    users.push(newUser);
    localStorage.setItem('stocklearn_users', JSON.stringify(users));
    
    // Auto login after registration
    handleLogin(email, password);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('stocklearn_user');
    localStorage.removeItem('stocklearn_session');
    setCurrentView('landing');
    toast.success('Logged out successfully');
  };

  return (
    
    <>
      <Toaster position="top-right" />
      
      {currentView === 'landing' && (
        <LandingPage
          onNavigateToLogin={() => setCurrentView('login')}
          onNavigateToRegister={() => setCurrentView('register')} 
          onNavigateToAdmin={()=>setCurrentView('adminlogin')}

          />
      )}
      
      {currentView === 'login' && (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentView('register')}
          onBackToHome={() => setCurrentView('landing')}
        />
      )}
      
      {currentView === 'register' && (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentView('login')}
          onBackToHome={() => setCurrentView('landing')}
        />
      )}
      
      {currentView === 'dashboard' && currentUser && (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
      
    </>
  );
}