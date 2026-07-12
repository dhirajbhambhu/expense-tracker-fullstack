import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-10 w-[900px]">

        <h1 className="text-4xl font-bold text-center mb-10">
          Expense Tracker Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <button
            onClick={() => navigate("/expenses")}
            className="bg-blue-600 text-white text-xl p-6 rounded-xl hover:bg-blue-700 transition"
          >
            💰 Expenses
          </button>

          <button
            onClick={() => navigate("/categories")}
            className="bg-green-600 text-white text-xl p-6 rounded-xl hover:bg-green-700 transition"
          >
            📂 Categories
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="bg-purple-600 text-white text-xl p-6 rounded-xl hover:bg-purple-700 transition"
          >
            📊 Analytics
          </button>

          <button
            onClick={() => navigate("/budget")}
            className="bg-yellow-500 text-white text-xl p-6 rounded-xl hover:bg-yellow-600 transition"
          >
            💵 Budget
          </button>

          <button
            onClick={handleLogout}
            className="col-span-2 bg-red-600 text-white text-xl p-5 rounded-xl hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;