import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  PieChart,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">

      <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">

        {/* Logo */}

        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
        >

          <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center">

            <Wallet size={24} color="white" />

          </div>

          <div>

            <h1 className="font-bold text-xl text-slate-800">
              ExpenseTracker
            </h1>

            <p className="text-xs text-slate-500">
              Personal Finance Manager
            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="hidden lg:flex items-center gap-2">

          <NavLink
            to="/dashboard"
            className={linkClass}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/expenses"
            className={linkClass}
          >
            <Wallet size={18} />
            Expenses
          </NavLink>

          <NavLink
            to="/analytics"
            className={linkClass}
          >
            <BarChart3 size={18} />
            Analytics
          </NavLink>

          <NavLink
            to="/charts"
            className={linkClass}
          >
            <PieChart size={18} />
            Charts
          </NavLink>

          <NavLink
            to="/budget"
            className={linkClass}
          >
            <PiggyBank size={18} />
            Budget
          </NavLink>

        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-300"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;