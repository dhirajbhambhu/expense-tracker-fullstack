import {
  BarChart3,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "../../components/LoadingSpinner";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import api from "../../services/api";

function Analytics() {

  const [analytics, setAnalytics] = useState({
    totalExpense: 0,
    highestExpense: 0,
    averageExpense: 0,
    totalTransactions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/expenses/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load analytics");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <PageHeader
          title="Expense Analytics"
          subtitle="Understand your spending through key financial metrics."
        />

        {loading ? (

          <LoadingSpinner text="Loading analytics..." />

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="Total Expense"
              value={`₹ ${analytics.totalExpense}`}
              icon={<Wallet size={28} />}
              color="bg-blue-600"
            />

            <StatCard
              title="Highest Expense"
              value={`₹ ${analytics.highestExpense}`}
              icon={<TrendingUp size={28} />}
              color="bg-red-600"
            />

            <StatCard
              title="Average Expense"
              value={`₹ ${analytics.averageExpense}`}
              icon={<BarChart3 size={28} />}
              color="bg-green-600"
            />

            <StatCard
              title="Transactions"
              value={analytics.totalTransactions}
              icon={<Receipt size={28} />}
              color="bg-violet-600"
            />

          </div>

        )}

      </div>

    </div>

  );

}

export default Analytics;