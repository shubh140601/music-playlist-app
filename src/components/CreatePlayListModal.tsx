import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

interface CreatePlaylistModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
  defaultName: string;
  defaultDescription?: string;
  isEditing?: boolean;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  open,
  onClose,
  onCreate,
  defaultName,
  defaultDescription = "",
  isEditing = false, // to handle editing cases
}) => {
  const formik = useFormik({
    initialValues: {
      name: defaultName,
      description: defaultDescription,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Playlist name is required"),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      onCreate(values.name, values.description);
      formik.resetForm();
      onClose();
    },
  });

  // Reset form when modal is closed
  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  try {
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
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
            {isEditing ? "Edit Playlist" : "Create New Playlist"}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              {/* playlist name field */}
              <TextField
                label="Playlist Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                InputProps={{
                  sx: {
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#555",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#888",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1DB954",
                    },
                  },
                }}
                InputLabelProps={{ sx: { color: "#aaa" } }}
              />

              {/* Description field */}
              <TextField
                label="Description (optional)"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                multiline
                rows={3}
                fullWidth
                InputProps={{
                  sx: {
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#555",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#888",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1DB954",
                    },
                  },
                }}
                InputLabelProps={{ sx: { color: "#aaa" } }}
              />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                {/* cancel button */}
                <Button onClick={onClose} variant="outlined" color="inherit">
                  Cancel
                </Button>
                {/* submit button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#1DB954" }}
                >
                  {isEditing ? "Update" : "Create"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
    );
  } catch (e) {
    return <></>;
  }
};

export default CreatePlaylistModal;
