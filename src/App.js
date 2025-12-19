import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./pages/products";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/myorders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
