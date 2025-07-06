import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <PrivateRoute roles={["admin","staff"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <PrivateRoute roles={["customer"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
