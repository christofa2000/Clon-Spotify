import Image from 'next/image';
import { useState } from 'react';

const Navbar = () => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirigir a /search con query
    window.location.href = `/search?q=${encodeURIComponent(search)}`;
  };

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-gray-900 flex items-center justify-between px-4">
      {/* Logo de Spotify */}
      <div className="flex items-center space-x-4">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 placeholder-gray-400 rounded-full py-1 px-4 w-64 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            aria-label="Buscar"
          >🔍</button>
        </form>
      </div>
      {/* Usuario */}
      <div className="flex items-center space-x-2">
        <Image src="/user-avatar.png" alt="User" width={32} height={32} className="rounded-full" />
        <span>Usuario</span>
      </div>
    </header>
  );
};

export default Navbar;