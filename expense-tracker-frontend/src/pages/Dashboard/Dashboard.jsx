import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Dashboard() {

  const navigate = useNavigate();

  const cards = [
    {
      title: "Expenses",
      description: "Add, edit and manage your daily expenses.",
      path: "/expenses",
      color: "bg-blue-600",
      icon: "💰",
    },
    {
      title: "Analytics",
      description: "Track spending with detailed statistics.",
      path: "/analytics",
      color: "bg-emerald-600",
      icon: "📊",
    },
    {
      title: "Charts",
      description: "Visualize your expenses using charts.",
      path: "/charts",
      color: "bg-violet-600",
      icon: "📈",
    },
    {
      title: "Budget",
      description: "Set and monitor your monthly budget.",
      path: "/budget",
      color: "bg-amber-500",
      icon: "💵",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow-md p-10 mb-10">

          <h1 className="text-4xl font-bold text-slate-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Manage your expenses, monitor your budget and understand your
            spending with one dashboard.
          </p>

        </div>

        {/* Quick Actions */}

        <div className="mb-6">

          <h2 className="text-3xl font-bold text-slate-800">
            Quick Actions
          </h2>

          <p className="text-gray-500 mt-1">
            Choose a module to continue.
          </p>

        </div>

        {/* Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">

          {cards.map((card) => (

            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className={`${card.color}
                rounded-2xl
                p-7
                text-white
                cursor-pointer
                shadow-lg
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
                duration-300`}
            >

              <div className="text-5xl mb-6">
                {card.icon}
              </div>

              <h2 className="text-2xl font-bold mb-3">
                {card.title}
              </h2>

              <p className="text-white/90 leading-6">
                {card.description}
              </p>

            </div>

          ))}

        </div>

        {/* Footer */}

        <div className="bg-white rounded-2xl shadow-md p-8 mt-12">

          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Expense Tracker
          </h2>

          <p className="text-gray-600 leading-7">
            Keep track of your daily expenses, monitor your monthly budget,
            analyze spending patterns and make smarter financial decisions.
          </p>

        </div>

      </div>

    </div>
  );

}

export default Dashboard;