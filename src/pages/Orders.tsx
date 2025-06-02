
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Eye } from "lucide-react";

const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Hoodies Up And Down",
    amount: "$50.00",
    status: "completed",
    date: "2024-06-01"
  },
  {
    id: "#ORD-002",
    customer: "Sarah Smith",
    email: "sarah@example.com",
    product: "Black Signature Pant",
    amount: "$30.00",
    status: "processing",
    date: "2024-06-01"
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "Signature Hofkam Cap",
    amount: "$10.99",
    status: "shipped",
    date: "2024-05-31"
  },
  {
    id: "#ORD-004",
    customer: "Emily Brown",
    email: "emily@example.com",
    product: "Black On Black Signature",
    amount: "$50.00",
    status: "pending",
    date: "2024-05-31"
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

const Orders = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AdminSidebar />
      
      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600">Track and manage customer orders</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search orders..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell className="font-semibold">{order.amount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
