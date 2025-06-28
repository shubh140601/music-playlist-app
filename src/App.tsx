import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
import PlaylistDetail from "./components/PlaylistDetail";
import HomeRedirect from "./routes/HomeRedirect";
import NotFound from "./components/NotFound";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* to handle the change in url */}
        <Route path="/" element={<HomeRedirect />} />
        {/* login page */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* register page */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* dashboard of user */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* playlist detail page */}
        <Route
          path="/playlist/:id"
          element={
            <ProtectedRoute>
              <PlaylistDetail />
            </ProtectedRoute>
          }
        />
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
