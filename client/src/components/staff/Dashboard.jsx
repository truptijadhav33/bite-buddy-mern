export default function StaffDashboard() {
  // Mocked staff-specific stats
  const stats = [
    { title: "Assigned Orders", value: 18, color: "secondary" },
    { title: "Preparing", value: 6, color: "accent" },
    { title: "Ready to Serve", value: 4, color: "primary" },
    { title: "Completed Today", value: 12, color: "primary" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--primary)]">
        Staff Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-card shadow-md rounded-lg p-6 flex flex-col"
          >
            <p className="text-gray-500">{stat.title}</p>
            <h2
              className={`mt-2 text-2xl font-bold ${
                stat.color === "secondary"
                  ? "text-[var(--secondary)]"
                  : stat.color === "accent"
                  ? "text-accent"
                  : "text-[var(--primary)]"
              }`}
            >
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Orders Section */}
      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center border-b pb-2">
            <span>Order #1023</span>
            <span className="text-accent">Preparing</span>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <span>Order #1024</span>
            <span className="text-[var(--secondary)]">Ready</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Order #1025</span>
            <span className="text-gray-400">Pending</span>
          </div>
        </div>
      </div>

      {/* Placeholder */}
      <div className="bg-card p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-gray-400">
        Live Order Updates / Kitchen View
      </div>
    </div>
  );
}
