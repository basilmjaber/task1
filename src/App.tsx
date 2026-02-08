import { useState, useEffect } from 'react';
import imgLoginScreen from "figma:asset/f32fe4174e1388150f662137c9e22e662da20c29.png";
import imgTechnician from "figma:asset/cca11c749268f5dc558d8047385b6793eab98761.png";
import imgScanner from "figma:asset/6070b8e9013d51f52470e48b9fe412320f9f6ef3.png";

// Fake credentials
const FAKE_USERS = {
  user: { password: 'user123', role: 'user' as const, name: 'Utilisateur' },
};

type UserRole = 'user';

interface User {
  username: string;
  role: UserRole;
  name: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // User dashboard search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [showCameraPermission, setShowCameraPermission] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('technicfile_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('technicfile_user');
      }
    }
  }, []);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const userCredentials = FAKE_USERS[username as keyof typeof FAKE_USERS];
    
    if (userCredentials && userCredentials.password === password) {
      setUser({
        username,
        role: userCredentials.role,
        name: userCredentials.name,
      });
      localStorage.setItem('technicfile_user', JSON.stringify({
        username,
        role: userCredentials.role,
        name: userCredentials.name,
      }));
    }
    
    setIsLoading(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
    setError('');
    setSearchQuery('');
    setSearchResults(null);
    localStorage.removeItem('technicfile_user');
  };
  
  const handleSearch = () => {
    // Mock data for demonstration
    setSearchResults({
      machine: 'HITACHI 110',
      client: 'Credit agricole',
      agency: 'HAY HASSANI',
      status: 'warranty' // Can be: 'warranty', 'maintenance', 'out-of-contract', 'not-found'
    });
  };

  const handleScannerClick = async () => {
    // Show camera permission dialog
    setShowCameraPermission(true);
  };

  const handleCameraPermissionConfirm = async () => {
    setShowCameraPermission(false);
    
    // Request camera access
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera for scanning
      });
      
      // Camera access granted - you would normally open a barcode scanner UI here
      // For now, we'll just stop the stream since this is a demo
      stream.getTracks().forEach(track => track.stop());
      
      alert('Caméra activée! Le scanner de code-barres serait maintenant ouvert.');
    } catch (error) {
      alert('Impossible d\'accéder à la caméra. Veuillez vérifier les permissions.');
    }
  };

  const handleCameraPermissionCancel = () => {
    setShowCameraPermission(false);
  };

  // Login Page
  if (!user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
        <div className="bg-white/95 rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={imgLoginScreen} 
              alt="Technicfile Logo" 
              className="h-48 object-contain"
            />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Identifiant"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Mot de passe"
                disabled={isLoading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white font-semibold py-4 px-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: '#232c63' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Connexion...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  S'identifier
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // User Dashboard
  if (user.role === 'user') {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={imgLoginScreen} alt="Logo" className="h-12" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Interface Utilisateur</h1>
                <p className="text-sm text-gray-500">Bienvenue, {user.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              Déconnexion
            </button>
          </div>
        </header>

        {/* Technician Illustration */}
        <div className="flex justify-center py-8">
          <img 
            src={imgTechnician} 
            alt="Technician" 
            className="h-56 object-contain"
          />
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <h3 className="text-sm font-light text-gray-600 mb-1">RECHERCHE DE</h3>
              <h2 className="text-3xl font-light text-gray-800">
                Matériel / Équipement
              </h2>
            </div>

            {/* Search Options */}
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              {/* Manual Entry */}
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Veuillez saisir le numéro de série..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-light"
                />
              </div>

              {/* Barcode Scanner - Only visible on mobile devices */}
              <div 
                onClick={handleScannerClick}
                className="relative w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 transition font-light flex items-center gap-3 md:hidden"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <span className="text-gray-700">Scanner le code barres</span>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: '#232c63' }}
              >
                Rechercher
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Search Results */}
            {searchResults && (
              <div className="mt-8 space-y-6">
                {/* Results Table */}
                <div className="overflow-hidden border-2 border-purple-300 rounded-lg">
                  {/* Table Header */}
                  <div className="grid grid-cols-3 bg-gradient-to-r from-purple-500 to-pink-500">
                    <div className="px-6 py-4 text-left text-lg font-bold text-white border-r-2 border-white">
                      Machine
                    </div>
                    <div className="px-6 py-4 text-left text-lg font-bold text-white border-r-2 border-white">
                      Client
                    </div>
                    <div className="px-6 py-4 text-left text-lg font-bold text-white">
                      Agence
                    </div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="grid grid-cols-3 bg-gray-200">
                    <div className="px-6 py-4 text-left text-base font-semibold text-gray-900 border-r-2 border-white">
                      {searchResults.machine}
                    </div>
                    <div className="px-6 py-4 text-left text-base font-semibold text-gray-900 border-r-2 border-white">
                      {searchResults.client}
                    </div>
                    <div className="px-6 py-4 text-left text-base font-semibold text-gray-900">
                      {searchResults.agency}
                    </div>
                  </div>
                </div>

                {/* Status Label */}
                <div className="flex justify-center">
                  {searchResults.status === 'warranty' && (
                    <div className="flex items-center gap-3 bg-green-600 text-white px-12 py-5 rounded-full shadow-lg">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-2xl font-bold">Garantie</span>
                    </div>
                  )}
                  
                  {searchResults.status === 'maintenance' && (
                    <div className="flex items-center gap-3 bg-green-600 text-white px-12 py-5 rounded-full shadow-lg">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-2xl font-bold">Maintenance</span>
                    </div>
                  )}
                  
                  {searchResults.status === 'out-of-contract' && (
                    <div className="bg-red-600 text-white px-12 py-5 rounded-full shadow-lg border-4 border-black">
                      <span className="text-2xl font-bold">Hors contrat</span>
                    </div>
                  )}
                  
                  {searchResults.status === 'not-found' && (
                    <div className="text-pink-600 text-3xl font-bold">
                      Référence non trouvée
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Camera Permission Dialog */}
        {showCameraPermission && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Accès à la caméra</h3>
                <p className="text-gray-600">Cette application souhaite accéder à votre caméra pour scanner les codes-barres. Voulez-vous autoriser l'accès?</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCameraPermissionCancel}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCameraPermissionConfirm}
                  className="flex-1 px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition"
                  style={{ backgroundColor: '#232c63' }}
                >
                  Autoriser
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}