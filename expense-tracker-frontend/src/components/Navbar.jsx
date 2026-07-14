import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 cursor-pointer"
          >

            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl">

              💰

            </div>

            <div>

              <h1 className="font-bold text-xl text-slate-800">
                ExpenseTracker
              </h1>

              <p className="text-xs text-slate-500">
                Personal Finance
              </p>

            </div>

          </div>

          {/* Navigation */}

          <div className="hidden md:flex items-center gap-2">

            <NavLink
              to="/dashboard"
              className={linkClass}
            >
              🏠 Dashboard
            </NavLink>

            <NavLink
              to="/expenses"
              className={linkClass}
            >
              💳 Expenses
            </NavLink>

            <NavLink
              to="/analytics"
              className={linkClass}
            >
              📊 Analytics
            </NavLink>

            <NavLink
              to="/charts"
              className={linkClass}
            >
              📈 Charts
            </NavLink>

            <NavLink
              to="/budget"
              className={linkClass}
            >
              💰 Budget
            </NavLink>

          </div>

          {/* Right Section */}

          <div className="flex items-center gap-4">

            <div className="hidden lg:block text-right">

              <p className="font-semibold text-slate-800">
                Welcome 👋
              </p>

              <p className="text-xs text-slate-500">
                Expense Tracker
              </p>

            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-300"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;