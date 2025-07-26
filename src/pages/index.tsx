import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import TrackList from '../components/TrackList';

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: { total: number };
}

const Home: NextPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await fetch('/api/spotify/playlists?limit=20', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPlaylists(data.items);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylists();
  }, []);

  const handleLogin = () => {
    window.location.href = '/api/spotify/auth';
  };

  if (loading) return <p className="p-6">Cargando playlists...</p>;
  if (error) {
    if (error.includes('401')) {
      return (
        <div className="p-6">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleLogin}
          >
            Conéctate con Spotify
          </button>
        </div>
      );
    }
    return <p className="p-6 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Tus Playlists</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {playlists.map((pl) => (
          <div
            key={pl.id}
            className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700"
            onClick={() => setSelectedPlaylist(pl.id)}
          >
            {pl.images[0] && (
              <img
                src={pl.images[0].url}
                alt={pl.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-lg font-semibold truncate">{pl.name}</h2>
            <p className="text-sm text-gray-400">
              {pl.tracks.total} canciones
            </p>
          </div>
        ))}
      </div>
      {selectedPlaylist && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Contenido de la playlist</h2>
          <TrackList tracks={[]} /> {/* TODO: fetch tracks by playlist id */}
        </div>
      )}
    </div>
  );
};

export default Home;
