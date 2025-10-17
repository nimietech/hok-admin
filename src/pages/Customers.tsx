
import { useEffect, useState } from "react";
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
import { Menu, Search, Eye } from "lucide-react"; // 👁️ added Eye icon
import { toast } from "react-hot-toast";
import { useAxios } from "@/hooks/api/axios";
import { format } from "date-fns";
    

interface Customer {
  _id: string;
  username: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  verified: boolean;
  location: string;
  role: string;

}

export default function Customers() {
  const { axios, loading } = useAxios();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // ✅ pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /** Fetch paginated customers list */
  const fetchCustomers = async (p: number = page) => {
    try {
      const { data } = await axios.get(
        `/user/fetch-users?page=${p}&limit=25`
      );
      console.log(data)
      console.log(data?.data?.data.results)
      // adjust to actual API shape if nested
      setCustomers(data?.data?.data.results || []);
      setTotalPages(data?.data?.data.pages || 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch customers");
    }
  };

  /** Fetch single customer by email | _id | username  */
  const fetchCustomerDetail = async (params: {
    email?: string;
    _id?: string;
    username?: string;
  }) => {
    try {
      setDetailLoading(true);
      const { data } = await axios.get("/user/fetch-user", { params });
      
      console.log(data)
      setSelectedCustomer(data?.data || data?.user);
    } catch (error) {
      console.error(error);
      toast.error("Could not fetch customer details");
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(page);
  }, [page]);

  /** Filter for client-side search (username or email) */
  const filtered = Array.isArray(customers) ? customers.filter((c) =>
      `${c.username} ${c.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex w-full">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        {/* Mobile sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <AdminSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {/* Top bar */}
          <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>

            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              Customers
            </h1>
          </header>

          <main className="p-4 lg:p-6">
            {/* Search bar */}
            <div className="flex items-center mb-4 gap-2">
              <Input
                placeholder="Search by username or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => fetchCustomers()}
                disabled={loading}
              >
                <Search size={18} />
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Customer Email</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Date Of Birth</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c._id}>
                      <TableCell className="font-medium">{c.username}</TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{c.gender}</Badge>
                      </TableCell>
                      <TableCell>
                      {format(new Date(c.dateOfBirth), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                         {/* 👁️ changed to Eye icon button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => fetchCustomerDetail({ _id: c._id })}
                        >
                          <Eye size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {loading && (
                <p className="p-4 text-center text-gray-500">Loading...</p>
              )}
              {!loading && filtered.length === 0 && (
                <p className="p-4 text-center text-gray-500">
                  No customers found
                </p>
              )}
            </div>

             {/* ✅ Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                Prev
              </Button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                Next
              </Button>
            </div>

            {/* Detail Drawer / Modal */}
            {selectedCustomer && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>

                  <h2 className="text-lg font-bold mb-4">
                    Customer Details
                  </h2>

                  {detailLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                  ) : (
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">Username:</span>{" "}
                        {selectedCustomer.username}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {selectedCustomer.email}
                      </p>

                      <p>
                        <span className="font-semibold">Gender:</span>{" "}
                        {selectedCustomer.gender}
                      </p>
                      
                      <p>
                        <span className="font-semibold">Verified:</span>
                        <Badge className={selectedCustomer.verified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {selectedCustomer.verified ? "Verified" : "Not Verified"}
                        </Badge>
                      </p>
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {selectedCustomer.location}
                      </p>
                      <p>
                        <span className="font-semibold">Contact info:</span>{" "}
                        {selectedCustomer.phoneNumber}
                      </p>
                      <p>
                        <span className="font-semibold">Role:</span>{" "}
                        {selectedCustomer.role}
                      </p>
                      <p>
                        <span className="font-semibold">Date Of Birth:</span>{" "}
                        {format(new Date(selectedCustomer.dateOfBirth), "MMM dd, yyyy")}
                      </p>
                      
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
