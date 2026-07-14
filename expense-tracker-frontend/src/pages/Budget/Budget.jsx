import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Budget() {

  const [budgetId, setBudgetId] = useState(null);
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [spentAmount, setSpentAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBudget();
  }, []);

  async function fetchBudget() {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMonthlyBudget(response.data.monthlyBudget || "");
      setSpentAmount(response.data.spentAmount || 0);
      setRemainingAmount(response.data.remainingAmount || 0);

      if (response.data.id) {
        setBudgetId(response.data.id);
      }

    } catch (error) {

      console.log(error);

      setBudgetId(null);
      setMonthlyBudget("");
      setSpentAmount(0);
      setRemainingAmount(0);

    }

  }

  async function handleBudget(e) {

    e.preventDefault();

    if (monthlyBudget === "" || Number(monthlyBudget) <= 0) {

      toast.warning("Budget must be greater than 0");

      return;

    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      if (!editMode) {

        await api.post(
          "/budget",
          {
            monthlyBudget,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Budget Added Successfully");

      } else {

        await api.put(
          `/budget/${budgetId}`,
          {
            monthlyBudget,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Budget Updated Successfully");

        setEditMode(false);

      }

      fetchBudget();

    } catch (error) {

      console.log(error);

      toast.error("Operation Failed");

    } finally {

      setLoading(false);

    }

  }

  async function deleteBudget() {

    if (budgetId == null) {

      toast.warning("No Budget Found");

      return;

    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget?"
    );

    if (!confirmDelete) {

      return;

    }

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/budget/${budgetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Budget Deleted Successfully");

      setBudgetId(null);
      setMonthlyBudget("");
      setSpentAmount(0);
      setRemainingAmount(0);
      setEditMode(false);

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");

    }

  }

  function editBudget() {

    setEditMode(true);

  }

  function cancelEdit() {

    setEditMode(false);

    fetchBudget();

  }

    return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto p-8">

        <div className="bg-white shadow-xl rounded-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-8">
            Budget Management
          </h1>

          <form onSubmit={handleBudget}>

            <label className="block font-semibold mb-2">
              Monthly Budget
            </label>

            <input
              type="number"
              placeholder="Enter Monthly Budget"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="w-full border rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white p-3 rounded-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:scale-105"
              }`}
            >
              {loading
                ? editMode
                  ? "Updating..."
                  : "Saving..."
                : editMode
                ? "Update Budget"
                : "Save Budget"}
            </button>

          </form>

          {editMode && (

            <button
              onClick={cancelEdit}
              className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>

          )}

          <hr className="my-8" />

          <div className="grid gap-5">

            <div className="bg-blue-100 rounded-xl p-5 shadow">

              <h2 className="text-lg font-bold mb-2">
                Monthly Budget
              </h2>

              <p className="text-3xl font-bold text-blue-700">
                ₹ {monthlyBudget || 0}
              </p>

            </div>

            <div className="bg-red-100 rounded-xl p-5 shadow">

              <h2 className="text-lg font-bold mb-2">
                Spent Amount
              </h2>

              <p className="text-3xl font-bold text-red-700">
                ₹ {spentAmount}
              </p>

            </div>

            <div className="bg-green-100 rounded-xl p-5 shadow">

              <h2 className="text-lg font-bold mb-2">
                Remaining Amount
              </h2>

              <p className="text-3xl font-bold text-green-700">
                ₹ {remainingAmount}
              </p>

            </div>

          </div>

          <div className="flex gap-4 mt-8">

            <button
              onClick={editBudget}
              disabled={budgetId == null}
              className={`flex-1 text-white p-3 rounded-lg transition-all duration-300 ${
                budgetId == null
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
              }`}
            >
              Edit
            </button>

            <button
              onClick={deleteBudget}
              disabled={budgetId == null}
              className={`flex-1 text-white p-3 rounded-lg transition-all duration-300 ${
                budgetId == null
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 hover:scale-105"
              }`}
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Budget;