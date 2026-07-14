import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
import Navbar from "../../components/Navbar";
import api from "../../services/api";

function Charts() {

  const [categoryData, setCategoryData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    loadCharts();
  }, []);

  async function loadCharts() {

    try {

      setLoading(true);

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

      if (Array.isArray(categoryResponse.data)) {

        setCategoryData(categoryResponse.data);

      } else {

        setCategoryData([]);

      }

      if (Array.isArray(monthResponse.data)) {

        setMonthData(monthResponse.data);

      } else {

        setMonthData([]);

      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to load charts");

      setCategoryData([]);
      setMonthData([]);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-center mb-10">
          Expense Charts
        </h1>

        {loading ? (

          <div className="bg-white rounded-xl shadow-lg p-20 text-center">

            <h2 className="text-2xl font-semibold text-gray-600">
              Loading Charts...
            </h2>

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Pie Chart */}

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">

              <h2 className="text-2xl font-bold text-center mb-6">
                Expenses By Category
              </h2>

              {categoryData.length === 0 ? (

                <div className="text-center py-20">

                  <div className="text-6xl mb-4">
                    📊
                  </div>

                  <p className="text-gray-500">
                    No Category Data Found
                  </p>

                </div>

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

            {/* Bar Chart */}

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">

              <h2 className="text-2xl font-bold text-center mb-6">
                Monthly Expenses
              </h2>

              {monthData.length === 0 ? (

                <div className="text-center py-20">

                  <div className="text-6xl mb-4">
                    📈
                  </div>

                  <p className="text-gray-500">
                    No Monthly Data Found
                  </p>

                </div>

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
                      radius={[8, 8, 0, 0]}
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