import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const accessToken = cookies.spotify_access_token;
  if (!accessToken) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  try {
    const limit =
      Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit || '20';
    const offset =
      Array.isArray(req.query.offset) ? req.query.offset[0] : req.query.offset || '0';
    const response = await fetch(
      `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching playlists:', err);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
}