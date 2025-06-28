import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/usersSlice";
import { login } from "../redux/slices/authSlice";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import type { RootState } from "../redux/store";
import { passwordRegex } from "../config/constants";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users);

  // to toggle passwords show/hide
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .matches(
          passwordRegex,
          "Min 8 chars, uppercase, lowercase, number & special char"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      const userExists = users.some(
        (user) => user.username === values.username
      );

      // validation for user already exists
      if (userExists) {
        toast.error("Username already exists.");
        return;
      }

      const hashedPassword = bcrypt.hashSync(values.password, 10);
      const newUser = {
        username: values.username,
        password: hashedPassword,
      };

      dispatch(addUser(newUser));
      dispatch(login({ user: values.username, token: "mock-token" }));
      toast.success("Account created! You are now logged in.");
      // after register done redirect user to dashboard page
      navigate("/dashboard");
    },
  });
  try {
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
            Create Account
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            {/* Username field */}
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              InputProps={{ sx: { color: "white" } }}
              InputLabelProps={{ sx: { color: "#aaa" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                },
              }}
            />

            {/* password field */}
            <TextField
              label="Password"
              name="password"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
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
                      sx={{ color: "#aaa" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ sx: { color: "#aaa" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                },
              }}
            />

            {/* confirm password field */}
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              fullWidth
              margin="normal"
              type={showConfirm ? "text" : "password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                sx: { color: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm(!showConfirm)}
                      sx={{ color: "#aaa" }}
                    >
                      {showConfirm ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ sx: { color: "#aaa" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#333" },
                },
              }}
            />

            {/* submit button */}
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
                Register & Login
              </Button>

              {/* login page button */}
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/")}
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
                Back to Login
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    );
  } catch (e) {
    console.log(e);
    return <></>;
  }
};

export default Register;
