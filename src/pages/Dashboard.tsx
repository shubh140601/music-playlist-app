import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { Box, Typography, Button, Stack } from "@mui/material";
import { v4 as uuid } from "uuid";
import {
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
} from "../redux/slices/playlistSlice";
import { logout } from "../redux/slices/authSlice";
import CreatePlaylistModal from "../components/CreatePlayListModal";
import PlaylistCard from "../components/PlaylistCard";
import WarningModal from "../components/WarningModal";
import { toast } from "react-toastify";
import SearchSpotify from "../components/SearchSpotify";

const Dashboard: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.user);
  // filter playlis by logged in user
  const allPlaylists = useSelector((state: RootState) => state.playlists);
  const playlists = allPlaylists.filter((p) => p.userId === username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to open/close playlist modal
  const [modalOpen, setModalOpen] = useState(false);
  // is editing playlis modal or not
  const [isEditing, setIsEditing] = useState(false);
  // to store editing playlist data
  const [editingPlaylist, setEditingPlaylist] = useState<any>(null);
  // to handle delete playlist modao warning
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<any>(null);

  // to create a playlist
  const handleCreatePlaylist = (name: string, description: string) => {
    const newPlaylist = {
      id: uuid(), // generatess random id everytime
      name,
      description,
      songs: [],
      userId: username,
    };
    dispatch(addPlaylist(newPlaylist));
    toast.success("Playlist created!");
  };

  // to update the name/ description of playlist
  const handleUpdatePlaylist = (name: string, description: string) => {
    if (editingPlaylist) {
      dispatch(
        updatePlaylist({ playlistId: editingPlaylist.id, name, description })
      );
      toast.success("Playlist updated");
      setEditingPlaylist(null);
    }
  };

  // delete the playlist
  const handleDeletePlaylist = () => {
    if (playlistToDelete) {
      dispatch(deletePlaylist(playlistToDelete.id));
      toast.error("Playlist deleted");
      setDeleteModalOpen(false);
      setPlaylistToDelete(null);
    }
  };

  // handle logout use - remove auth from local storage
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // to generae random name every time for create only
  const generateUniquePlaylistName = (existingNames: string[]): string => {
    let index = 1;
    let name = `My Playlist #${index}`;
    while (existingNames.includes(name)) {
      index++;
      name = `My Playlist #${index}`;
    }
    return name;
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setEditingPlaylist(null);
  };

  try {
    return (
      <Box
        sx={{ p: 4, bgcolor: "#121212", minHeight: "100vh", color: "white" }}
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              My Playlists
            </Typography>
            {username && (
              <Typography variant="subtitle1" color="gray" mt={0.5}>
                Welcome, {username} 👋
              </Typography>
            )}
          </Box>

          {/* logout button */}
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: "#1DB954",
              color: "#1DB954",
              "&:hover": {
                bgcolor: "rgba(29,185,84,0.1)",
                borderColor: "#1ed760",
              },
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Logout
          </Button>
        </Stack>

        {/* Add Playlist Button */}
        <Button
          variant="contained"
          sx={{ mb: 3, bgcolor: "#1DB954", "&:hover": { bgcolor: "#1ed760" } }}
          onClick={() => {
            setIsEditing(false);
            setModalOpen(true);
          }}
        >
          + Add Playlist
        </Button>

        {/* Playlist Cards */}
        <Box display="flex" flexWrap="wrap" gap={3} justifyContent="flex-start">
          {!playlists?.length ? (
            <Typography color="gray" variant="h6">
              No playlists created yet. Start by creating one!
            </Typography>
          ) : (
            playlists.map((playlist) => (
              <Box
                key={playlist.id}
                sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}
              >
                <PlaylistCard
                  id={playlist.id}
                  name={playlist.name}
                  description={playlist.description}
                  songs={playlist.songs}
                  onEdit={() => {
                    setEditingPlaylist(playlist);
                    setIsEditing(true);
                    setModalOpen(true);
                  }}
                  onDelete={() => {
                    setPlaylistToDelete(playlist);
                    setDeleteModalOpen(true);
                  }}
                />
              </Box>
            ))
          )}
        </Box>

        {/* Spotify Search */}
        <SearchSpotify />

        {/* Create/Edit Modal */}
        <CreatePlaylistModal
          open={modalOpen}
          onClose={closeModal}
          onCreate={isEditing ? handleUpdatePlaylist : handleCreatePlaylist}
          defaultName={
            isEditing
              ? editingPlaylist?.name
              : generateUniquePlaylistName(playlists.map((p) => p.name))
          }
          defaultDescription={isEditing ? editingPlaylist?.description : ""}
          isEditing={isEditing}
        />

        {/* Warning Modal for Deletion */}
        {playlistToDelete && (
          <WarningModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDeletePlaylist}
            name={playlistToDelete.name}
            description={playlistToDelete.description}
            songCount={playlistToDelete.songs.length}
          />
        )}
      </Box>
    );
  } catch (e) {
    console.log(e);
    return <></>;
  }
};

export default Dashboard;
