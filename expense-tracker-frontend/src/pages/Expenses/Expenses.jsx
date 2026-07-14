import {
  Filter,
  Pencil,
  Plus,
  Receipt,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "../../components/LoadingSpinner";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import api from "../../services/api";

function Expenses() {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [editId, setEditId] = useState(null);

  const [keyword, setKeyword] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  async function fetchExpenses() {

    try {

      setPageLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.get("/expenses/page", {

        params: {
          page: 0,
          size: 5,
          sortBy: "id",
          direction: "asc",
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

      setExpenses(response.data.content);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load expenses");

    } finally {

      setPageLoading(false);

    }

  }

  async function fetchCategories() {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/category", {

        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

      setCategories(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load categories");

    }

  }

  async function searchExpenses() {

    if (keyword.trim() === "") {

      fetchExpenses();

      return;

    }

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/expenses/search", {

        params: {
          keyword,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Search Failed");

    }

  }

  async function filterExpenses() {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/expenses/filter", {

        params: {

          categoryId: selectedCategory || null,
          startDate: startDate || null,
          endDate: endDate || null,

        },

        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Filter Failed");

    }

  }

  function resetFilters() {

    setSelectedCategory("");
    setStartDate("");
    setEndDate("");

    fetchExpenses();

  }

  async function handleExpense(event) {

    event.preventDefault();

    if (title.trim().length < 3) {

      toast.warning("Title must be at least 3 characters");

      return;

    }

    if (amount === "" || Number(amount) <= 0) {

      toast.warning("Amount must be greater than 0");

      return;

    }

    if (description.trim().length < 5) {

      toast.warning("Description must be at least 5 characters");

      return;

    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      if (editId === null) {

        await api.post(
          "/expenses",
          {
            title,
            amount,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Expense Added Successfully");

      } else {

        await api.put(
          `/expenses/${editId}`,
          {
            title,
            amount,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Expense Updated Successfully");

        setEditId(null);

      }

      setTitle("");
      setAmount("");
      setDescription("");

      fetchExpenses();

    } catch (error) {

      console.log(error);

      toast.error("Operation Failed");

    } finally {

      setLoading(false);

    }

  }

  async function deleteExpense(id) {

    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/expenses/${id}`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

      toast.success("Expense Deleted Successfully");

      fetchExpenses();

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");

    }

  }

  function editExpense(expense) {

    setEditId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setDescription(expense.description);

  }

  function cancelEdit() {

    setEditId(null);
    setTitle("");
    setAmount("");
    setDescription("");

  }

  return (
    <div className="min-h-screen bg-slate-100">

  <Navbar />

  <div className="max-w-7xl mx-auto px-8 py-10">

    <PageHeader
      title="Expense Management"
      subtitle="Add, update, search and organize all your expenses."
    />

    {pageLoading ? (

      <LoadingSpinner text="Loading Expenses..." />

    ) : (

      <>

        {/* Expense Form */}

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            {editId === null ? "Add New Expense" : "Update Expense"}
          </h2>

          <form onSubmit={handleExpense}>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block font-medium mb-2">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Expense Title"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

              </div>

              <div>

                <label className="block font-medium mb-2">
                  Amount
                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Expense Amount"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

              </div>

            </div>

            <div className="mt-6">

              <label className="block font-medium mb-2">
                Description
              </label>

              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Expense Description"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            <div className="flex gap-4 mt-8">

              <button
                type="submit"
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl text-white p-3 transition ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >

                <Plus size={20} />

                {loading
                  ? editId === null
                    ? "Saving..."
                    : "Updating..."
                  : editId === null
                  ? "Add Expense"
                  : "Update Expense"}

              </button>

              {editId !== null && (

                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white rounded-xl p-3"
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </div>

        {/* Filter Section */}

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <div className="flex items-center gap-2 mb-6">

            <Filter
              size={22}
              className="text-indigo-600"
            />

            <h2 className="text-2xl font-bold">
              Filter Expenses
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-xl p-3"
            >

              <option value="">
                All Categories
              </option>

              {categories.map((category) => (

                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>

              ))}

            </select>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-xl p-3"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-xl p-3"
            />

          </div>

          <div className="flex gap-4 mt-6">

            <button
              type="button"
              onClick={filterExpenses}
              className="flex-1 flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-3"
            >

              <Filter size={18} />

              Apply Filter

            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="flex-1 flex justify-center items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl p-3"
            >

              <RotateCcw size={18} />

              Reset

            </button>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Search expenses..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 border rounded-xl p-3"
            />

            <button
              type="button"
              onClick={searchExpenses}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl"
            >

              <Search size={18} />

              Search

            </button>

            <button
              type="button"
              onClick={() => {

                setKeyword("");

                fetchExpenses();

              }}
              className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-6 rounded-xl"
            >

              <RotateCcw size={18} />

              Reset

            </button>

          </div>

        </div>
                {expenses.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <Receipt
              size={70}
              className="mx-auto text-slate-400 mb-5"
            />

            <h2 className="text-3xl font-bold text-slate-700">
              No Expenses Found
            </h2>

            <p className="text-gray-500 mt-3">
              Add your first expense to start tracking your spending.
            </p>

          </div>

        ) : (

          <div className="grid gap-5">

            {expenses.map((expense) => (

              <div
                key={expense.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border"
              >

                <div className="flex justify-between items-start">

                  <div className="space-y-3">

                    <h2 className="text-2xl font-bold text-slate-800">
                      {expense.title}
                    </h2>

                    <p className="text-lg text-indigo-600 font-semibold">
                      ₹ {expense.amount}
                    </p>

                    <p className="text-gray-600">
                      {expense.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">

                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                        {expense.categoryName ?? "No Category"}
                      </span>

                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                        {expense.date ?? "No Date"}
                      </span>

                    </div>

                  </div>

                  <div className="flex flex-col gap-3">

                    <button
                      onClick={() => editExpense(expense)}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
                    >

                      <Pencil size={18} />

                      Edit

                    </button>

                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
                    >

                      <Trash2 size={18} />

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </>

    )}

  </div>

</div>
);

}

export default Expenses;