import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-xl shadow-xl w-[700px]">

        <h1 className="text-4xl font-bold text-center mb-10">
          Expense Tracker Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <button
            onClick={() => navigate("/expenses")}
            className="bg-blue-600 text-white text-xl p-6 rounded-xl hover:bg-blue-700"
          >
            💰 Expenses
          </button>

          <button
            onClick={() => navigate("/categories")}
            className="bg-green-600 text-white text-xl p-6 rounded-xl hover:bg-green-700"
          >
            📂 Categories
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="bg-purple-600 text-white text-xl p-6 rounded-xl hover:bg-purple-700"
          >
            📊 Analytics
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white text-xl p-6 rounded-xl hover:bg-red-700"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;