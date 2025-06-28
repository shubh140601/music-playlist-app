import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface PlaylistCardProps {
  id: string;
  name: string;
  description: string;
  songs: any[];
  onEdit: () => void;
  onDelete: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  name,
  description,
  songs,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  try {
    return (
      <Card sx={{ backgroundColor: "#1e1e1e", color: "white" }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {/* Playlist Info */}
            <Box>
              <Typography variant="h6">{name}</Typography>
              <Typography variant="body2" color="gray">
                {description}
              </Typography>
              <Typography variant="caption" color="gray">
                Songs: {songs.length}
              </Typography>
              <Box mt={2}>
                <Button
                  onClick={() => navigate(`/playlist/${id}`)} // redirec to list of songs
                  variant="outlined"
                  sx={{
                    color: "#1DB954",
                    borderColor: "#1DB954",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "rgba(29,185,84,0.1)",
                      borderColor: "#1ed760",
                    },
                  }}
                >
                  View
                </Button>
              </Box>
            </Box>

            {/* Edit/Delete Buttons */}
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: "#1DB954" }} onClick={onEdit}>
                <FiEdit2 />
              </IconButton>
              <IconButton sx={{ color: "#f44336" }} onClick={onDelete}>
                <FiTrash2 />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  } catch (e) {
    console.log(e);
    return <></>;
  }
};

export default PlaylistCard;
