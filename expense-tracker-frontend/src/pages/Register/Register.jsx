import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    if (name.trim() === "") {
      toast.warning("Please enter your name");
      return;
    }

    if (name.trim().length < 3) {
      toast.warning("Name must be at least 3 characters");
      return;
    }

    if (email.trim() === "") {
      toast.warning("Please enter your email");
      return;
    }

    if (password.trim() === "") {
      toast.warning("Please enter your password");
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration Successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {

      console.log(error);

      if (error.response?.status === 409) {
        toast.error("Email already exists");
      } else if (error.response?.status === 400) {
        toast.error("Invalid details");
      } else {
        toast.error("Registration Failed");
      }

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">

        <h1 className="text-4xl font-bold text-center mb-2">
          Register
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create your account
        </p>

        <form onSubmit={handleRegister}>

          {/* Name */}

          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          {/* Email */}

          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* Password */}

          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-lg transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:scale-105"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;