import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-lg rounded-xl p-10 w-[500px]">

        <h1 className="text-4xl font-bold text-center mb-10">
          Dashboard
        </h1>

        <div className="grid gap-4">

          <button
            onClick={() => navigate("/expenses")}
            className="bg-blue-600 text-white p-4 rounded-lg"
          >
            Expenses
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="bg-green-600 text-white p-4 rounded-lg"
          >
            Analytics
          </button>

          <button
            onClick={() => navigate("/budget")}
            className="bg-yellow-500 text-white p-4 rounded-lg"
          >
            Budget
          </button>

          <button
            onClick={() => navigate("/charts")}
            className="bg-purple-600 text-white p-4 rounded-lg"
          >
            Charts
          </button>

          <button
            onClick={logout}
            className="bg-red-600 text-white p-4 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;