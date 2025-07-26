import { FC } from 'react';

interface Track {
  id: string;
  name: string;
  album: { name: string; images: { url: string }[] };
  artists: { name: string }[];
  duration_ms: number;
  preview_url: string | null;
}

interface TrackListProps {
  tracks: Track[];
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const TrackList: FC<TrackListProps> = ({ tracks }) => (
  <table className="w-full text-left">
    <thead>
      <tr className="border-b border-gray-700">
        <th>#</th>
        <th>Título</th>
        <th>Álbum</th>
        <th>Duración</th>
      </tr>
    </thead>
    <tbody>
      {tracks.map((track, idx) => (
        <tr key={track.id} className="hover:bg-gray-800">
          <td className="px-2 py-1">{idx + 1}</td>
          <td className="flex items-center space-x-2 px-2 py-1">
            {track.album.images[0] && (
              <img
                src={track.album.images[0].url}
                alt={track.album.name}
                className="w-8 h-8 object-cover rounded"
              />
            )}
            <div>
              <p className="truncate w-48">{track.name}</p>
              <p className="text-xs text-gray-400">
                {track.artists.map((a) => a.name).join(', ')}
              </p>
            </div>
          </td>
          <td className="px-2 py-1">{track.album.name}</td>
          <td className="px-2 py-1">{formatDuration(track.duration_ms)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TrackList;
