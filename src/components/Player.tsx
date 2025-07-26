const Player = () => (
  <footer className="fixed bottom-0 left-60 right-0 h-24 bg-gray-800 text-white p-4 flex items-center justify-between">
    {/* Controles de reproducción */}
    <div className="flex items-center space-x-4">
      <button aria-label="Anterior" className="p-2 hover:text-green-500">⏮️</button>
      <button aria-label="Reproducir/Pausa" className="p-2 hover:text-green-500">▶️/⏸️</button>
      <button aria-label="Siguiente" className="p-2 hover:text-green-500">⏭️</button>
    </div>
    {/* Barra de progreso */}
    <div className="flex-1 mx-4">
      <div className="bg-gray-600 h-1 rounded">
        <div className="bg-green-500 h-1 rounded w-1/3" />
      </div>
    </div>
    {/* Volumen */}
    <div className="flex items-center space-x-2">
      <span>🔊</span>
      <input type="range" min="0" max="100" className="w-24" />
    </div>
  </footer>
);

export default Player;