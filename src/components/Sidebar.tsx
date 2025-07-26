import Link from 'next/link';

const Sidebar = () => (
  <aside className="fixed left-0 top-0 w-60 h-screen bg-gray-900 text-white p-5">
    <nav>
      <ul className="space-y-4">
        <li>
          <Link href="/" className="block px-2 py-1 rounded hover:bg-gray-800">
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/search" className="block px-2 py-1 rounded hover:bg-gray-800">
            Buscar
          </Link>
        </li>
        <li>
          <Link href="/library" className="block px-2 py-1 rounded hover:bg-gray-800">
            Tu Biblioteca
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;