import { useEffect, useState } from "react";
import api from "../../services/api";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function Charts() {
  const [categoryData, setCategoryData] = useState([]);
  const [monthData, setMonthData] = useState([]);

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316",
  ];

  useEffect(() => {
    fetchCategoryChart();
    fetchMonthlyChart();
  }, []);

  async function fetchCategoryChart() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/expenses/chart/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Category Response:", response.data);

      if (Array.isArray(response.data)) {
        setCategoryData(response.data);
      } else {
        setCategoryData([]);
      }
    } catch (error) {
      console.log(error);
      setCategoryData([]);
    }
  }

  async function fetchMonthlyChart() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/expenses/chart/month", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Month Response:", response.data);

      if (Array.isArray(response.data)) {
        setMonthData(response.data);
      } else {
        setMonthData([]);
      }
    } catch (error) {
      console.log(error);
      setMonthData([]);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Expense Charts
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Pie Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-center mb-6">
            Expenses By Category
          </h2>

          {categoryData.length === 0 ? (
            <p className="text-center text-gray-500">
              No Category Data Found
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="amount"
                  nameKey="category"
                  outerRadius={120}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>
            </ResponsiveContainer>
          )}

        </div>

        {/* Monthly Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-center mb-6">
            Monthly Expenses
          </h2>

          {monthData.length === 0 ? (
            <p className="text-center text-gray-500">
              No Monthly Data Found
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>

              <BarChart data={monthData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="amount"
                  fill="#3B82F6"
                />

              </BarChart>

            </ResponsiveContainer>
          )}

        </div>

      </div>

    </div>
  );
}

export default Charts;