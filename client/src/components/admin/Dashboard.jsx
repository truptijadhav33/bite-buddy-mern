export default function Dashboard() {
  // Example stats (mocked)
  const stats = [
    { title: "Total Orders", value: 128, color: "secondary" },
    { title: "Pending Orders", value: 32, color: "accent" },
    { title: "Completed Orders", value: 96, color: "primary" },
    { title: "Total Revenue", value: "₹12,450", color: "accent" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--primary)">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`bg-card shadow-md rounded-lg p-6 flex flex-col`}
          >
            <p className="text-gray-500">{stat.title}</p>
            <h2
              className={`mt-2 text-2xl font-bold ${
                stat.color === "secondary"
                  ? "text-[var(--secondary)"
                  : stat.color === "accent"
                  ? "text-accent"
                  : "text-[var(--primary)"
              }`}
            >
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Placeholder for charts / future widgets */}
      <div className="bg-card p-6 rounded-lg shadow-md h-64 flex items-center justify-center text-gray-400">
        Charts & Analytics will appear here
      </div>
    </div>
  );
}
