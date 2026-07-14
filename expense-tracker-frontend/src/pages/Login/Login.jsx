import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    if (email.trim() === "") {
      toast.warning("Please enter email");
      return;
    }

    if (password.trim() === "") {
      toast.warning("Please enter password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {

      console.log(error);

      toast.error("Invalid email or password");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">

        <h1 className="text-4xl font-bold text-center mb-2">
          Expense Tracker
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-lg transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;