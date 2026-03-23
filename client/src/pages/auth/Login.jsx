import { useState, useContext } from "react";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);
      login(data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-(--color-background)">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-lg rounded-2xl w-80 border border-gray-200"
      >
        <h2 className="text-2xl mb-6 text-center text-(--color-primary) font-semibold">
          Welcome Back
        </h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
        />

        <button className="w-full bg-(--color-primary) text-white py-2 rounded hover:opacity-90 transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
