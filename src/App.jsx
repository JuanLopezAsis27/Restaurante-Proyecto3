import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import Reserves from "./views/Reserves";
import ReserveForm from "./views/ReserveForm";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ManageReserves from "./views/ManageReserves"
import ManageUsers from "./views/ManageUsers"
import Navbar from "./components/Navbar";
import AboutUs from "./views/AboutUs";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedRouteAdmin from "./routes/ProtectedRoutesAdmin";
import './index.css'
import { AuthProvider } from "./context/AuthContext";
import { ReserveProvider } from "./context/ReserveContext";
import Footer from "./components/Footer";
import Images from "./views/Images";
import Contact from "./views/Contact";

function App() {


  return (
    <>
      <AuthProvider>
        <ReserveProvider>
          <BrowserRouter>
          <Navbar />
            <main className="container px-6 min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/images" element={<Images/>} />
                <Route path="/nosotros" element={<AboutUs />} />
                <Route path="/contacto" element={<Contact/>} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/reserves" element={<Reserves />} />
                  <Route path="/add-reserves" element={<ReserveForm />} />
                  <Route path="/reserves/:id" element={<ReserveForm />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route element={<ProtectedRouteAdmin/>}>
                  <Route path="/manage-users" element={<ManageUsers />} />
                  <Route path="/manage-reserves" element={<ManageReserves/>} />
                </Route>
              </Routes>
            </main>
            <Footer/>
          </BrowserRouter>
        </ReserveProvider>
      </AuthProvider>

    </>
  )
}

export default App
