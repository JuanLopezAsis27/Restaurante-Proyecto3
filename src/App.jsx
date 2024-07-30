import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import Reserves from "./views/Reserves";
import ReserveForm from "./views/ReserveForm";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import './index.css'
import { AuthProvider } from "./context/AuthContext";
import { ReserveProvider } from "./context/ReserveContext";

function App() {


  return (
    <>
      <AuthProvider>
        <ReserveProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/reserves" element={<Reserves />} />
                <Route path="/add-reserves" element={<ReserveForm />} />
                <Route path="/reserves/:id" element={<ReserveForm />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ReserveProvider>
      </AuthProvider>

    </>
  )
}

export default App
