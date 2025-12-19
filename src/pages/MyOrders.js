import { useEffect, useState } from "react";
import api from "../api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/orders/myorders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
          >
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total:</b> ₹ {order.totalPrice}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
