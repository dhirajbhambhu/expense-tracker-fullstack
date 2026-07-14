import {
  Pencil,
  PiggyBank,
  Trash2,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "../../components/LoadingSpinner";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import api from "../../services/api";

function Budget() {

  const [budgetId, setBudgetId] = useState(null);
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [spentAmount, setSpentAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchBudget();
  }, []);

  async function fetchBudget() {

    try {

      setPageLoading(true);

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
      } else {
        setBudgetId(null);
      }

    } catch (error) {

      console.log(error);

      setBudgetId(null);
      setMonthlyBudget("");
      setSpentAmount(0);
      setRemainingAmount(0);

    } finally {

      setPageLoading(false);

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
          { monthlyBudget },
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
          { monthlyBudget },
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

    if (!window.confirm("Delete this budget?")) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/budget/${budgetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Budget Deleted");

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

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <PageHeader
          title="Budget Management"
          subtitle="Manage your monthly budget and monitor your spending."
        />

        {pageLoading ? (

          <LoadingSpinner text="Loading Budget..." />

        ) : (

          <>

            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

              <form onSubmit={handleBudget}>

                <label className="block font-semibold mb-2">
                  Monthly Budget
                </label>

                <input
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                  placeholder="Enter Monthly Budget"
                  className="w-full border rounded-xl p-3 mb-6 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white rounded-xl p-3 transition ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
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
                  className="w-full mt-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl p-3"
                >
                  Cancel
                </button>

              )}

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <StatCard
                title="Monthly Budget"
                value={`₹ ${monthlyBudget || 0}`}
                icon={<Wallet size={28} />}
                color="bg-indigo-600"
              />

              <StatCard
                title="Spent Amount"
                value={`₹ ${spentAmount}`}
                icon={<TrendingDown size={28} />}
                color="bg-red-600"
              />

              <StatCard
                title="Remaining Budget"
                value={`₹ ${remainingAmount}`}
                icon={<PiggyBank size={28} />}
                color="bg-green-600"
              />

            </div>

            <div className="flex gap-4 mt-8">

              <button
                onClick={editBudget}
                disabled={budgetId == null}
                className={`flex-1 flex justify-center items-center gap-2 rounded-xl p-3 text-white transition ${
                  budgetId == null
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <Pencil size={18} />
                Edit Budget
              </button>

              <button
                onClick={deleteBudget}
                disabled={budgetId == null}
                className={`flex-1 flex justify-center items-center gap-2 rounded-xl p-3 text-white transition ${
                  budgetId == null
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                <Trash2 size={18} />
                Delete Budget
              </button>

            </div>

          </>

        )}

      </div>

    </div>

  );

}

export default Budget;