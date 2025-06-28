import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import { FiTrash2 } from "react-icons/fi";
import { removeSongFromPlaylist } from "../redux/slices/playlistSlice";
import { toast } from "react-toastify";

const PlaylistDetail: React.FC = () => {
  // get id from param
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // find playlist using params id
  const playlist = useSelector((state: RootState) =>
    state.playlists.find((p) => p.id === id)
  );

  // to remove the added song from playlist
  const handleRemoveSong = (songId: string) => {
    if (!id) return;
    dispatch(removeSongFromPlaylist({ playlistId: id, songId }));
    toast.success("Song removed from playlist.");
  };

  // to handle errors
  if (!playlist) {
    return (
      <Box p={4} color="white">
        <Typography variant="h6">Playlist not found.</Typography>
        <Button onClick={() => navigate("/dashboard")} sx={{ mt: 2 }}>
          Back
        </Button>
      </Box>
    );
  }

  try {
    return (
      <Box
        sx={{ p: 4, bgcolor: "#121212", minHeight: "100vh", color: "white" }}
      >
        <Button
          onClick={() => navigate("/dashboard")}
          variant="outlined"
          sx={{
            mb: 3,
            color: "#1DB954",
            borderColor: "#1DB954",
            "&:hover": {
              bgcolor: "rgba(29,185,84,0.1)",
              borderColor: "#1ed760",
            },
          }}
        >
          ← Back to Dashboard
        </Button>

        <Typography variant="h4" fontWeight="bold" mb={1}>
          {playlist.name}
        </Typography>
        <Typography variant="subtitle1" color="gray" mb={3}>
          {playlist.description}
        </Typography>

        {playlist.songs.length === 0 ? (
          <Typography variant="body1" color="gray">
            No songs added yet.
          </Typography>
        ) : (
          playlist.songs.map((song) => (
            <Card
              key={song.id}
              sx={{ mb: 2, bgcolor: "#1e1e1e", color: "white" }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={song.image}
                      alt={song.title}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                    <Box>
                      <Typography fontWeight="bold">{song.title}</Typography>
                      <Typography variant="body2" color="gray">
                        {song.artist}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        {song.album}
                      </Typography>
                    </Box>
                  </Stack>

                  <IconButton
                    sx={{ color: "#f44336" }}
                    onClick={() => handleRemoveSong(song.id)}
                    title="Remove song"
                  >
                    <FiTrash2 />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    );
  } catch (e) {
    console.log(e);
    return <></>;
  }
};

export default PlaylistDetail;
