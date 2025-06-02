
import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    product: "Wireless Headphones",
    amount: "$89.99",
    status: "completed",
    date: "2 hours ago"
  },
  {
    id: "#ORD-002",
    customer: "Sarah Smith",
    product: "Smart Watch",
    amount: "$299.99",
    status: "processing",
    date: "4 hours ago"
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    product: "Laptop Stand",
    amount: "$45.50",
    status: "shipped",
    date: "6 hours ago"
  },
  {
    id: "#ORD-004",
    customer: "Emily Brown",
    product: "Phone Case",
    amount: "$19.99",
    status: "pending",
    date: "8 hours ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'processing': return 'bg-yellow-100 text-yellow-800';
    case 'shipped': return 'bg-blue-100 text-blue-800';
    case 'pending': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const RecentOrders = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View all
        </a>
      </div>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{order.product}</p>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">{order.amount}</p>
              <Badge className={`mt-1 ${getStatusColor(order.status)}`}>
                {order.status}
              </Badge>
            </div>
            
            <div className="text-right ml-4">
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
