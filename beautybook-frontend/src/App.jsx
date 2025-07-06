import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import StaffPage from "./pages/Dashboard/admin/StaffPage";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <PrivateRoute roles={["admin"]}>
              <StaffPage />
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
       <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
