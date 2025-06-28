import { createSlice } from "@reduxjs/toolkit";
import type { Playlist, Song } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";

// get all playlist from localstorage if avaliable else use []
const initialState: Playlist[] = JSON.parse(
  localStorage.getItem("playlists") || "[]"
);

// to store playlist in localstorage
const saveToLocalStorage = (state: Playlist[]) => {
  localStorage.setItem("playlists", JSON.stringify(state));
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    // CREATE
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },

    // ADD SONG TO PLAYLIST
    addSongToPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; song: Song }>
    ) => {
      const { playlistId, song } = action.payload;
      const playlist = state.find((p) => p.id === playlistId);
      if (playlist) {
        playlist.songs.push(song);
        saveToLocalStorage(state);
      }
    },

    // UPDATE PLAYLIST
    updatePlaylist: (
      state,
      action: PayloadAction<{
        playlistId: string;
        name: string;
        description: string;
      }>
    ) => {
      const { playlistId, name, description } = action.payload;
      const playlist = state.find((p) => p.id === playlistId);
      if (playlist) {
        playlist.name = name;
        playlist.description = description;
        saveToLocalStorage(state);
      }
    },

    // DELETE PLAYLIST - take id in payload
    deletePlaylist: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter((p) => p.id !== action.payload);
      saveToLocalStorage(updatedState);
      return updatedState;
    },

    // remove song from playlist
    removeSongFromPlaylist: (
      state,
      action: PayloadAction<{ playlistId: string; songId: string }>
    ) => {
      const playlist = state.find((p) => p.id === action.payload.playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(
          (song) => song.id !== action.payload.songId
        );
      }
    },
  },
});

export const {
  addPlaylist,
  addSongToPlaylist,
  updatePlaylist,
  deletePlaylist,
  removeSongFromPlaylist
} = playlistSlice.actions;

export default playlistSlice.reducer;
