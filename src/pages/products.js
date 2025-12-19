import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    api.get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      alert("Product already in cart");
      return;
    }

    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MERN E-Commerce</h1>

      <button
        onClick={() => navigate("/cart")}
        style={{ marginBottom: "20px" }}
      >
        Go to Cart
      </button>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                width: "220px",
              }}
            >
              <h3>{product.name}</h3>
              <p>₹ {product.price}</p>
              <p style={{ fontSize: "14px" }}>
                {product.description}
              </p>

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
