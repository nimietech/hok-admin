
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
import { Search, UserPlus, Mail, Phone } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    totalSpent: "$450.00",
    status: "Active",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+1 (555) 987-6543",
    orders: 8,
    totalSpent: "$320.00",
    status: "Active",
    joinDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 456-7890",
    orders: 5,
    totalSpent: "$180.00",
    status: "Inactive",
    joinDate: "2024-03-10"
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@example.com",
    phone: "+1 (555) 654-3210",
    orders: 15,
    totalSpent: "$680.00",
    status: "VIP",
    joinDate: "2023-12-05"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'VIP': return 'bg-purple-100 text-purple-800';
    case 'Active': return 'bg-green-100 text-green-800';
    case 'Inactive': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Customers = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AdminSidebar />
      
      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
              <p className="text-gray-600">Manage your customer relationships</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search customers..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <UserPlus size={16} className="mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm flex items-center">
                          <Mail size={14} className="mr-1" />
                          {customer.email}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Phone size={14} className="mr-1" />
                          {customer.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell className="font-semibold">{customer.totalSpent}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View Details
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

export default Customers;
