import { useState } from "react";
import api from "../../services/api";

function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

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

    setTitle("");
    setAmount("");
    setDescription("");

  } catch (error) {
    console.log(error);
    console.log(error.response);

    alert("Failed to Add Expense");
  }
}
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Add Expense
        </h1>

        <form onSubmit={handleExpense}>

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
            className="w-full bg-green-600 text-white p-3 rounded-lg"
          >
            Add Expense
          </button>

        </form>

      </div>
    </div>
  );
}

export default Expenses;