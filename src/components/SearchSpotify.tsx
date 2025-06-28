import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addSongToPlaylist } from "../redux/slices/playlistSlice";
import { searchSpotifyTracks } from "../utils/spotify";
import type { RootState } from "../redux/store";

const SearchSpotify = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.user);
  const allPlaylists = useSelector((state: RootState) => state.playlists);
  const playlists = allPlaylists.filter((p) => p.userId === username);

  // to store searchtext
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  // to store selected playlist
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");

  // to add song into playlist
  const handleAddToPlaylist = (track: any) => {
    if (!selectedPlaylistId) {
      toast.warning("Please select a playlist before adding a song.");
      return;
    }

    const song = {
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      album: track.album.name,
      image: track.album.images?.[0]?.url || "",
    };

    dispatch(addSongToPlaylist({ playlistId: selectedPlaylistId, song }));
    toast.success("Song added to playlist!");
  };

  // debounced searcg by 500 ms
  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }
      const tracks = await searchSpotifyTracks(searchTerm);
      setResults(tracks);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  try {
    return (
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Search Songs on Spotify
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter song name or artist"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{ sx: { color: "#ccc" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
              },
            }}
          />
        </Stack>

        {playlists.length > 0 ? (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#aaa" }}>Select Playlist</InputLabel>
            <Select
              value={selectedPlaylistId}
              onChange={(e) => setSelectedPlaylistId(e.target.value)}
              sx={{
                color: "#ccc",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#666",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1DB954",
                },
              }}
            >
              {playlists.map((playlist) => (
                <MenuItem key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Typography variant="body2" color="gray" mb={2}>
            No playlists found. Please create one to start adding songs.
          </Typography>
        )}

        <List>
          {results.map((track) => {
            const selectedPlaylist = playlists.find(
              (playlist) => playlist.id === selectedPlaylistId
            );

            // to hide + icon if song in already added into that playlist
            const isAlreadyAdded = selectedPlaylist?.songs?.some(
              (song: any) => song.id === track.id
            );

            return (
              <ListItem
                key={track.id}
                sx={{
                  borderBottom: "1px solid #333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                {/* Album Image */}
                <Avatar
                  src={track.album?.images?.[0]?.url}
                  alt={track.name}
                  variant="rounded"
                  sx={{ width: 56, height: 56, mr: 2 }}
                />

                {/* Track Info */}
                <ListItemText
                  primary={
                    <Typography fontWeight="bold" color="white">
                      {track.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="gray">
                        Artist:{" "}
                        {track.artists.map((a: any) => a.name).join(", ")}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        Album: {track.album.name}
                      </Typography>
                    </>
                  }
                />

                {/* Add Button / Disabled / Hidden */}
                {isAlreadyAdded ? null : (
                  <IconButton
                    onClick={() => handleAddToPlaylist(track)}
                    sx={{ color: "#1DB954" }}
                    title="Add to Playlist"
                  >
                    <FiPlus />
                  </IconButton>
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  } catch (e) {
    console.log(e);
    return <></>;
  }
};

export default SearchSpotify;
