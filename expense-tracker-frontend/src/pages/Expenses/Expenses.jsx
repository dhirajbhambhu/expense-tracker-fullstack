import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
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

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  async function fetchExpenses() {
    try {
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

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) {
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

      toast.error("Failed to Delete Expense");

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
  <div className="min-h-screen bg-gray-100">

    <Navbar />

    <div className="max-w-6xl mx-auto p-8">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          {editId === null ? "Add Expense" : "Update Expense"}
        </h1>

        <form onSubmit={handleExpense}>

          {/* Title */}

          <div className="mb-5">

            <label className="block font-semibold mb-2">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter Title"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          </div>

          {/* Amount */}

          <div className="mb-5">

            <label className="block font-semibold mb-2">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter Amount"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

          </div>

          {/* Description */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Description
            </label>

            <textarea
              rows="3"
              placeholder="Enter Description"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>

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
              className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg transition"
            >
              Cancel
            </button>

          )}

        </form>

        <hr className="my-8" />

        <h2 className="text-3xl font-bold mb-6">
          All Expenses
        </h2>

        {/* Filter Section */}

        <div className="bg-gray-50 border rounded-xl p-5 mb-6">

          <h3 className="text-xl font-bold mb-4">
            Filter Expenses
          </h3>

          <div className="grid md:grid-cols-3 gap-4">

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg p-3"
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
              className="border rounded-lg p-3"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg p-3"
            />

          </div>

          <div className="flex gap-4 mt-5">

            <button
              type="button"
              onClick={filterExpenses}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition"
            >
              Apply Filter
            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg transition"
            >
              Clear Filter
            </button>

          </div>

        </div>

        {/* Search Section */}

        <div className="flex gap-3 mb-8">

          <input
            type="text"
            placeholder="Search by title..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 border rounded-lg p-3"
          />

          <button
            type="button"
            onClick={searchExpenses}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => {
              setKeyword("");
              fetchExpenses();
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 rounded-lg transition"
          >
            Reset
          </button>

        </div>
                {expenses.length === 0 ? (

          <div className="bg-gray-50 border rounded-xl p-10 text-center">

            <div className="text-6xl mb-4">
              📄
            </div>

            <h3 className="text-2xl font-bold">
              No Expenses Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Start by adding your first expense.
            </p>

          </div>

        ) : (

          <div className="grid gap-4">

            {expenses.map((expense) => (

              <div
                key={expense.id}
                className="bg-white border rounded-xl shadow-md p-5 hover:shadow-xl transition-all"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-2xl font-bold mb-3">
                      {expense.title}
                    </h3>

                    <p className="mb-2">
                      <strong>Amount:</strong> ₹ {expense.amount}
                    </p>

                    <p className="mb-2">
                      <strong>Description:</strong> {expense.description}
                    </p>

                    <p className="mb-2">
                      <strong>Category:</strong>{" "}
                      {expense.categoryName ?? "Not Assigned"}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {expense.date ?? "N/A"}
                    </p>

                  </div>

                  <div className="flex flex-col gap-3">

                    <button
                      onClick={() => editExpense(expense)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  </div>
);

}

export default Expenses;