import { useEffect, useState } from "react";
import api from "../../services/api";

function Budget() {

  const [budgetId, setBudgetId] = useState(null);
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [spentAmount, setSpentAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [editMode, setEditMode] = useState(false);

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

      setMonthlyBudget(response.data.monthlyBudget);
      setSpentAmount(response.data.spentAmount);
      setRemainingAmount(response.data.remainingAmount);

      if (response.data.id) {
        setBudgetId(response.data.id);
      }

    } catch (error) {
      console.log(error);
    }

  }

  async function handleBudget(e) {

    e.preventDefault();

    if (monthlyBudget === "") {
      alert("Please enter budget");
      return;
    }

    try {

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

        alert("Budget Added Successfully");

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

        alert("Budget Updated Successfully");
        setEditMode(false);

      }

      fetchBudget();

    } catch (error) {

      console.log(error);

      alert("Operation Failed");

    }

  }

  async function deleteBudget() {

    if (budgetId == null) {
      alert("No Budget Found");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/budget/${budgetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Budget Deleted Successfully");

      setBudgetId(null);
      setMonthlyBudget("");
      setSpentAmount(0);
      setRemainingAmount(0);
      setEditMode(false);

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

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

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-[600px]">

        <h1 className="text-4xl font-bold text-center mb-8">

          Budget Management

        </h1>

        <form onSubmit={handleBudget}>

          <label className="block font-semibold mb-2">

            Monthly Budget

          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3 mb-5"
            placeholder="Enter Monthly Budget"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
          />

          <button
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            {editMode ? "Update Budget" : "Save Budget"}
          </button>

        </form>

        {editMode && (

          <button
            onClick={cancelEdit}
            className="w-full mt-3 bg-gray-600 text-white p-3 rounded-lg"
          >
            Cancel
          </button>

        )}

        <hr className="my-8" />

        <div className="space-y-4">

          <div className="bg-blue-100 p-4 rounded-lg">

            <h2 className="font-bold text-lg">

              Monthly Budget

            </h2>

            <p className="text-2xl">

              ₹ {monthlyBudget}

            </p>

          </div>

          <div className="bg-red-100 p-4 rounded-lg">

            <h2 className="font-bold text-lg">

              Spent Amount

            </h2>

            <p className="text-2xl">

              ₹ {spentAmount}

            </p>

          </div>

          <div className="bg-green-100 p-4 rounded-lg">

            <h2 className="font-bold text-lg">

              Remaining Amount

            </h2>

            <p className="text-2xl">

              ₹ {remainingAmount}

            </p>

          </div>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={editBudget}
            className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={deleteBudget}
            className="flex-1 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}

export default Budget;