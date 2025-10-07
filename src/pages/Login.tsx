import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { login } from "../redux/slices/authSlice";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import type { RootState } from "../redux/store";

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#333" },
  },
};

const inputLabelStyles = { sx: { color: "#aaa" } };

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const foundUser = users.find((u) => u.username === values.username);

      if (!foundUser) {
        toast.error("Invalid username or password");
        return;
      }

      const isAdmin = foundUser.admin === true;
      const isPasswordValid = isAdmin
        ? foundUser.password === values.password
        : bcrypt.compareSync(values.password, foundUser.password);

      if (isPasswordValid) {
        dispatch(
          login({
            user: values.username,
            token: "mock-token",
            admin: isAdmin,
          })
        );
        toast.success(isAdmin ? "Admin login successful!" : "Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid username or password");
      }
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#121212"
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: "90%",
          maxWidth: 400,
          borderRadius: 2,
          backgroundColor: "#1E1E1E",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          align="center"
          sx={{ color: "#1DB954" }}
        >
          Music App
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            InputProps={{ sx: { color: "white" } }}
            InputLabelProps={inputLabelStyles}
            sx={inputStyles}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              sx: { color: "white" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    sx={{ color: "#aaa" }}
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={inputLabelStyles}
            sx={inputStyles}
          />

          <Stack spacing={2} mt={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#1DB954",
                "&:hover": { bgcolor: "#1ed760" },
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/register")}
              sx={{
                color: "#1DB954",
                borderColor: "#1DB954",
                "&:hover": {
                  bgcolor: "rgba(29,185,84,0.1)",
                  borderColor: "#1ed760",
                },
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Create Account
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
