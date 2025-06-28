const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let cachedToken = "";
let tokenExpiry = 0;

export const getSpotifyToken = async (): Promise<string> => {
  const now = Date.now();

  // Reuse token if still valid else fetch new one
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const encoded = btoa(`${clientId}:${clientSecret}`);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encoded}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;

  return cachedToken;
};

export const searchSpotifyTracks = async (query: string) => {
  const token = await getSpotifyToken();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data.tracks.items;
};
