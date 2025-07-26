import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Player from '../components/Player';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="ml-60 mb-24 p-4">
        <Component {...pageProps} />
      </main>
      <Player />
    </>
  );
}