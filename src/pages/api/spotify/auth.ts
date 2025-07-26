import { NextApiRequest, NextApiResponse } from 'next';
import * as queryString from 'query-string';
import { serialize, parse } from 'cookie';
import crypto from 'crypto';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;

function generateRandomString(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, error, state } = req.query;
  if (error) {
    res.redirect(`/?error=${error}`);
    return;
  }
  // Paso 1: Solicitar autorización
  if (!code) {
    const stateStr = generateRandomString();
    res.setHeader(
      'Set-Cookie',
      serialize('spotify_auth_state', stateStr, { httpOnly: true, path: '/' })
    );
    const scope = 'user-read-private user-read-email playlist-read-private streaming';
    const authParams = new URLSearchParams({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state: stateStr,
    });
    res.redirect(`https://accounts.spotify.com/authorize?${authParams.toString()}`);
    return;
  }
  // Paso 2: Manejar callback y exchange de tokens
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const storedState = cookies.spotify_auth_state;
  if (state !== storedState) {
    res.redirect(`/?error=state_mismatch`);
    return;
  }
  const tokenParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code as string,
    redirect_uri,
    client_id,
    client_secret,
  });
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: tokenParams.toString(),
  });
  const data = await tokenRes.json();
  res.setHeader('Set-Cookie', [
    serialize('spotify_access_token', data.access_token, {
      httpOnly: true,
      path: '/',
      maxAge: data.expires_in,
    }),
    serialize('spotify_refresh_token', data.refresh_token, {
      httpOnly: true,
      path: '/',
    }),
  ]);
  res.redirect('/');
}