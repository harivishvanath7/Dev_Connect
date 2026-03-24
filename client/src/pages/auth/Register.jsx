import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-(--color-background)">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-lg rounded-2xl w-80 border border-gray-200"
      >
        <h2 className="text-2xl mb-6 text-center text-(--color-primary) font-semibold">
          Create Account
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
        />

        <input
          name="username"
          placeholder="Username (unique)"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
        />

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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
