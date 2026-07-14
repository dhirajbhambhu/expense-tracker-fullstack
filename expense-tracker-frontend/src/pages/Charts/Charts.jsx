import { BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { useEffect, useState } from "react";
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

import LoadingSpinner from "../../components/LoadingSpinner";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import api from "../../services/api";

function Charts() {

  const [categoryData, setCategoryData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#2563EB",
    "#16A34A",
    "#EA580C",
    "#DC2626",
    "#7C3AED",
    "#0891B2",
    "#E11D48",
    "#CA8A04",
  ];

  useEffect(() => {
    loadCharts();
  }, []);

  async function loadCharts() {
    

    try {

      const token = localStorage.getItem("token");

      const [categoryResponse, monthResponse] = await Promise.all([

        api.get("/expenses/chart/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        api.get("/expenses/chart/month", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

      ]);

     console.log("Category API:", categoryResponse.data);
console.log("Month API:", monthResponse.data);

setCategoryData(
  Array.isArray(categoryResponse.data) ? categoryResponse.data : []
);

setMonthData(
  Array.isArray(monthResponse.data) ? monthResponse.data : []
);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  console.log("Category Data:", categoryData);
console.log("Category Array:", Array.isArray(categoryData));

console.log("Month Data:", monthData);
console.log("Month Array:", Array.isArray(monthData));

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <PageHeader
          title="Expense Charts"
          subtitle="Visualize your expenses using category and monthly reports."
        />

        {loading ? (

          <LoadingSpinner text="Loading Charts..." />

        ) : (

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-white rounded-2xl shadow-md p-8">

              <div className="flex items-center gap-3 mb-6">

                <PieChartIcon
                  size={24}
                  className="text-indigo-600"
                />

                <h2 className="text-2xl font-bold">
                  Category Wise Expenses
                </h2>

              </div>

              {categoryData.length === 0 ? (

                <div className="text-center text-gray-500 py-20">

                  No Category Data Found

                </div>

              ) : (

                <ResponsiveContainer
                  width="100%"
                  height={350}
                >

                  <PieChart>

                    <Pie
                      data={categoryData}
                      dataKey="amount"
                      nameKey="category"
                      outerRadius={120}
                      label
                    >

                      {categoryData.map((item, index) => (

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

            <div className="bg-white rounded-2xl shadow-md p-8">

              <div className="flex items-center gap-3 mb-6">

                <BarChart3
                  size={24}
                  className="text-indigo-600"
                />

                <h2 className="text-2xl font-bold">
                  Monthly Expenses
                </h2>

              </div>

              {monthData.length === 0 ? (

                <div className="text-center text-gray-500 py-20">

                  No Monthly Data Found

                </div>

              ) : (

                <ResponsiveContainer
                  width="100%"
                  height={350}
                >

                  <BarChart data={monthData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="amount"
                      fill="#4F46E5"
                    />

                  </BarChart>

                </ResponsiveContainer>

              )}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Charts;