import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#222",
        color: "white",
      }}
    >
      <div>
        <Link to="/" style={{ color: "white", marginRight: "15px" }}>
          Home
        </Link>

        {token && (
          <Link to="/myorders" style={{ color: "white", marginRight: "15px" }}>
            My Orders
          </Link>
        )}
      </div>

      <div>
        <Link to="/cart" style={{ color: "white", marginRight: "15px" }}>
          Cart ({cart.length})
        </Link>

        {!token ? (
          <>
            <Link to="/login" style={{ color: "white", marginRight: "10px" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "white" }}>
              Register
            </Link>
          </>
        ) : (
          <button onClick={logoutHandler}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
