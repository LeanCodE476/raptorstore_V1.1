import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import Home from "./components/Home";
import Detalle from "./components/Detalle";
import products from "./productos.json";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartProvider from "./Contexts/CartContext";
import Preloader from "./components/Preloader";
import InstagramIcon from "@mui/icons-material/Instagram";
import Envios from "./components/Envios";
import Add from "./pages/Add";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);


  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="contenedor-fondo">
            {loading ? (
              <Preloader loading />
            ) : (
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/detalle/:codigo" element={<Detalle products={products} />} />
                  <Route path="/Envios" element={<Envios />} />
                  <Route path="/add" element={<ProtectedRoute><Add/></ProtectedRoute>} />
                  <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
              </>
            )}
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
