import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { User, LogOut, Search, ScanBarcode } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [serialNumber, setSerialNumber] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!serialNumber.trim()) {
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c3210e8f/equipment/search?serial_number=${encodeURIComponent(serialNumber)}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      
      if (data.error) {
        console.error('Error searching equipment:', data.error);
        alert('Erreur lors de la recherche');
        setSearchResults([]);
      } else {
        setSearchResults(data.equipment || []);
      }
    } catch (error) {
      console.error('Error searching equipment:', error);
      alert('Erreur lors de la recherche');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleScanBarcode = () => {
    // Placeholder for barcode scanning functionality
    alert('Fonctionnalité de scan de code-barres à implémenter. Cette fonction nécessiterait l\'accès à la caméra de l\'appareil.');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Bienvenue, {user?.username}</h1>
              <p className="text-sm text-gray-500">Utilisateur</p>
            </div>
          </div>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                RECHERCHE DE
              </h2>
              <h3 className="text-xl font-semibold text-gray-700 mt-1">
                Matériel / Équipement
              </h3>
            </div>

            {/* Search Form */}
            <div className="space-y-4">
              {/* Serial Number Input */}
              <div>
                <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de série
                </label>
                <Input
                  id="serialNumber"
                  type="text"
                  placeholder="Veuillez saisir le numéro de série..."
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-base"
                />
              </div>

              {/* Scan Barcode Option */}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleScanBarcode}
                >
                  <ScanBarcode className="h-5 w-5" />
                  Scanner le code barres
                </Button>
              </div>

              {/* Search Button */}
              <div>
                <Button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleSearch}
                  disabled={!serialNumber.trim() || isSearching}
                >
                  <Search className="h-5 w-5" />
                  {isSearching ? 'Recherche...' : 'Rechercher'}
                </Button>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Résultats de recherche ({searchResults.length})
                </h4>
                <div className="space-y-3">
                  {searchResults.map((item) => (
                    <div
                      key={item.serialNumber}
                      className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-gray-900">{item.name}</h5>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Disponible'
                              ? 'bg-green-100 text-green-800'
                              : item.status === 'En service'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">N° de série:</span> {item.serialNumber}
                        </div>
                        <div>
                          <span className="font-medium">Catégorie:</span> {item.category}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">Localisation:</span> {item.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results Message */}
            {serialNumber && searchResults.length === 0 && !isSearching && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600">
                  Aucun équipement trouvé avec le numéro de série "{serialNumber}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">ℹ</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Aide à la recherche</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Entrez le numéro de série complet ou partiel</li>
                  <li>• Utilisez le scanner de code-barres pour une saisie rapide</li>
                  <li>• Les résultats afficheront les détails de l'équipement</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}