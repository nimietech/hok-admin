import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Menu, Eye } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useAxios } from "@/hooks/api/axios";

// Interfaces
interface Transaction {
  _id: string;
  email: string;
  amount: number;
  status: string;
  reference: string;
  updatedAt: string;
  trackingId: string;
  transactionOrderStatus:string;
  transactionTime:string;
  currency:string;
  owner:string;

}

const Transactions = () => {
  const { axios } = useAxios();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch transactions with pagination
  const fetchTransactions = async (page: number = 1) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `/transaction/fetch-transactions?page=${page}&limit=20&email=williamsalexjr@gmail.com`
      );

      console.log("Fetched transactions:", data);

      if (data.success && data.data) {
        setTransactions(Array.isArray(data.data) ? data.data : data.data.results);
        setTotalPages(data.data.totalPages || 1);
        setCurrentPage(page);
      } else {
        setError(data.message || "Failed to fetch transactions");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filtered transactions by search
  const filteredTransactions = Array.isArray(transactions)
    ? transactions.filter(
        (t) =>
          t.email.toLowerCase().includes(search.toLowerCase()) ||
          t.reference.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Pagination UI
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => fetchTransactions(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && fetchTransactions(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {pages}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && fetchTransactions(currentPage + 1)
              }
              className={
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex w-full">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <AdminSidebar />
        </div>

        <div className="flex-1 overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu size={20} />
                </Button>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    Transactions
                  </h1>
                  <p className="text-sm lg:text-base text-gray-600 hidden sm:block">
                    View all user transactions
                  </p>
                </div>
              </div>

              <div className="relative hidden sm:block">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Search by email or reference..."
                  className="pl-10 w-48 lg:w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6">
            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading transactions...</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer Email</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Transaction Status</TableHead>
                        <TableHead>Transaction Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((txn) => (
                        <TableRow key={txn._id}>
                          <TableCell className="font-medium">{txn.email}</TableCell>
                          <TableCell>{txn.trackingId}</TableCell>
                          <TableCell>
                            {txn.currency === "USD"
                              ? `$${txn.amount.toLocaleString()}`
                              : `₦${txn.amount.toLocaleString()}`}
                          </TableCell>

                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                txn.status === "success"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {txn.status}
                            </span>
                          </TableCell>
                          
                          <TableCell>{txn.transactionOrderStatus}</TableCell>
                          <TableCell>
                             {format(new Date(txn.transactionTime), "MMM dd,yyyy,  HH:mma")}
                          </TableCell>
                      
                          {/* <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye size={14} />
                            </Button>
                          </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {renderPagination()}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
