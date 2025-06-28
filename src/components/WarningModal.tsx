import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

interface WarningModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  description: string;
  songCount: number;
}

const WarningModal: React.FC<WarningModalProps> = ({
  open,
  onClose,
  onConfirm,
  name,
  description,
  songCount,
}) => {
  try {
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#1e1e1e",
            color: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" mb={2}>
            Delete Playlist
          </Typography>
          <Typography variant="body1" mb={1}>
            Are you sure you want to delete <strong>{name}</strong>?
          </Typography>
          <Typography variant="body2" color="gray">
            {description}
          </Typography>
          <Typography variant="body2" color="gray" mb={2}>
            Total Songs: {songCount}
          </Typography>
          <Typography variant="body2" color="error" mb={3}>
            This action is permanent and cannot be undone.
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={onClose} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button onClick={onConfirm} variant="contained" color="error">
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  } catch (e) {
    console.log(e);
    return <></>;
  }
};

export default WarningModal;
