import {
  ArrowRight,
  BarChart3,
  PieChart,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";

function Dashboard() {

  const navigate = useNavigate();

  const modules = [
    {
      title: "Expenses",
      description: "Add, update and manage your daily expenses.",
      icon: <Wallet size={42} />,
      color: "bg-blue-600",
      path: "/expenses",
    },
    {
      title: "Analytics",
      description: "Track spending with real-time statistics.",
      icon: <BarChart3 size={42} />,
      color: "bg-emerald-600",
      path: "/analytics",
    },
    {
      title: "Charts",
      description: "Visualize spending using interactive charts.",
      icon: <PieChart size={42} />,
      color: "bg-violet-600",
      path: "/charts",
    },
    {
      title: "Budget",
      description: "Set your monthly budget and monitor spending.",
      icon: <PiggyBank size={42} />,
      color: "bg-amber-500",
      path: "/budget",
    },
  ];

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        <PageHeader
          title="Dashboard"
          subtitle="Manage your expenses, monitor your budget and analyze your spending from one place."
        />

        {/* Quick Access */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">

          {modules.map((module) => (

            <div
              key={module.title}
              onClick={() => navigate(module.path)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
            >

              <div
                className={`${module.color} h-28 flex items-center justify-center text-white`}
              >
                {module.icon}
              </div>

              <div className="p-6">

                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                  {module.title}
                </h2>

                <p className="text-gray-500 leading-6 mb-6">
                  {module.description}
                </p>

                <button
                  className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all"
                >
                  Open Module

                  <ArrowRight size={18} />

                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Information */}

        <div className="mt-12 bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Expense Tracker
          </h2>

          <p className="text-gray-600 leading-8">

            This application helps you record expenses, organize them by
            category, manage monthly budgets, analyze spending habits and
            visualize financial data through interactive charts.

          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;