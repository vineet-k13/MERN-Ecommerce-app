import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const placeOrderHandler = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: 1,
        })),
        totalPrice: getTotalPrice(),
      };

      await api.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear cart after successful order
      localStorage.removeItem("cart");
      alert("Order placed successfully");

      navigate("/myorders");
    } catch (error) {
      alert("Failed to place order");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
              }}
            >
              <p><b>{item.name}</b></p>
              <p>₹ {item.price}</p>

              <button onClick={() => removeFromCart(item._id)}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹ {getTotalPrice()}</h3>

          <button onClick={placeOrderHandler}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
