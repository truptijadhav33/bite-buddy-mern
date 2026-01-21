import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { FaClock, FaCheck, FaRotateRight } from "react-icons/fa6";

const mockOrders = [
  {
    id: "#1024",
    date: "Jan 19, 2026",
    status: "Preparing",
    total: 850,
    items: ["Margherita Pizza x1", "Pasta Alfredo x1", "Coke x2"],
  },
  {
    id: "#1023",
    date: "Jan 18, 2026",
    status: "Completed",
    total: 1200,
    items: ["Veg Burger x2", "Tiramisu x2", "Fries x1"],
  },
  {
    id: "#1021",
    date: "Jan 15, 2026",
    status: "Completed",
    total: 450,
    items: ["Caesar Salad x1", "Iced Tea x1"],
  },
];

export default function Orders() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-screen-xl">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Your Orders</h1>
          <p className="text-muted-foreground">Track your active orders and view order history.</p>
        </div>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl bg-[#161718] border border-white/5 p-6 space-y-4 hover:border-primary/20 transition-colors"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <span className="text-xl font-bold text-white">{order.id}</span>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <FaClock className="text-xs" /> {order.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg text-primary">₹{order.total}</span>
                  <Badge variant={order.status === "Completed" ? "success" : "warning"}>
                    {order.status === "Completed" && <FaCheck className="mr-1" />}
                    {order.status}
                  </Badge>
                </div>
              </div>

              {/* Items */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Items ordered:</p>
                <ul className="text-sm text-white space-y-1 ml-4 list-disc marker:text-primary">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="pt-2 flex justify-end">
                {order.status === "Completed" && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <FaRotateRight /> Reorder
                  </Button>
                )}
                {order.status !== "Completed" && (
                  <Button size="sm" className="bg-primary/20 text-primary border-transparent hover:bg-primary/30">
                    Track Order
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
