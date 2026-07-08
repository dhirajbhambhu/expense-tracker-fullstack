import { useEffect, useState } from "react";
import api from "../../services/api";

function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

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
  console.log(error.response);
  console.log(error.response.data);
}
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function handleExpense(event) {
    event.preventDefault();

    if (title === "") {
      alert("Please enter title");
      return;
    }

    if (amount === "") {
      alert("Please enter amount");
      return;
    }

    if (description === "") {
      alert("Please enter description");
      return;
    }

    try {
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

        alert("Expense Added Successfully");
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

        alert("Expense Updated Successfully");
        setEditId(null);
      }

      setTitle("");
      setAmount("");
      setDescription("");

      fetchExpenses();
    } catch (error) {
      console.log(error);
      console.log(error.response);
      alert("Operation Failed");
    }
  }

  async function deleteExpense(id) {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense Deleted Successfully");

      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Expense");
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          {editId === null ? "Add Expense" : "Update Expense"}
        </h1>

        <form onSubmit={handleExpense}>
          {/* Title */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter Title"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter Amount"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              placeholder="Enter Description"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            {editId === null ? "Add Expense" : "Update Expense"}
          </button>

          {editId !== null && (
            <button
              type="button"
              onClick={cancelEdit}
              className="w-full mt-3 bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </form>

        <hr className="my-6" />

        <h2 className="text-2xl font-bold mb-4">
          All Expenses
        </h2>

        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses found.</p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="border rounded-lg p-4 mb-3 shadow-sm"
            >
              <h3 className="text-lg font-bold">
                {expense.title}
              </h3>

              <p>
                <strong>Amount:</strong> ₹{expense.amount}
              </p>

              <p>
                <strong>Description:</strong> {expense.description}
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => editExpense(expense)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Expenses;