import React, { useState, useEffect } from "react";
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
import { Search, Eye, X, Menu } from "lucide-react";
import { format } from "date-fns";
import axios from "@/hooks/api/axios";

// import { useAxios } from "@/hooks/api/axios";

/* ---------- Types ---------- */
interface Product {
  productName?: string;
  productPrice?: number;
  productQuantity?: number;

}
interface CartItem {
  product?: Product;
  quantity: number;
}
interface Order {
  _id: string;
  trackingId?: string;
  owner: string;
  deliveryStatus: string;
  deliveryLocationType?: "DOOR" | "PICKUP" | string;
  deliveryLocation?: string;
  pickUpLocation?: string;
  customerEmail: string;
  createdAt: string;
  updatedAt: string;
  cart: CartItem[];
}

/* ---------- Helpers ---------- */
const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "PROCESSING":
      return "bg-yellow-100 text-yellow-800";
    case "IN_TRANSIT":
      return "bg-blue-100 text-blue-800";
    case "PENDING":
    case "PAID":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const statusTabs = ["All", "PENDING", "PAID", "PROCESSING", "IN_TRANSIT", "DELIVERED"];
const statusOptions = ["PENDING", "PROCESSING", "IN_TRANSIT", "PAID", "DELIVERED"];

/* ---------- Component ---------- */
const Orders = () => {
  // const { axios } = useAxios();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [newPickUpLocation, setNewPickUpLocation] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // ✅ Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  /** Fetch orders with pagination */
  const fetchOrders = async (pageNumber: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/orders/admin-fetch-orders?page=${pageNumber}&limit=25`
      );
      
      console.log("Fetched orders:", data)

      // Adjust to API shape
      const results = data?.data?.results || [];
      setOrders(results);
      setTotalPages(data?.data?.pages || 1);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  //UPDATE ORDER
  const updateOrder = async (
    orderId: string,
    userId: string,
    deliveryStatus: string,
    pickUpLocation?: string
  ) => {
    try {
      setUpdating(true);
      await axios.put("/orders/admin-update-order", {
        orderId,
        userId,
        deliveryStatus,
        pickUpLocation,
      });
      await fetchOrders(page); // refresh current page
      setSelectedOrder(null);
    } catch (err) {
      console.error("❌ Error updating order:", err);
      
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
      order.cart.some((c) =>
        c.product?.productName?.toLowerCase().includes(search.toLowerCase())
      );
    const matchesStatus =
      filterStatus === "All"
        ? true
        : order.deliveryStatus?.toUpperCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
        <div
          className={`fixed inset-y-0 left-0 z-50 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <AdminSidebar />
        </div>

        {/* Main */}
        <div className="flex-1 overflow-hidden relative">
          <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                <p className="text-gray-600">Track and manage customer orders</p>
              </div>
            </div>

            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Search by tracking ID or product..."
                className="pl-10 w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </header>

          {/* Status Filter */}
          <div className="flex space-x-4 mt-4 px-4 lg:px-6">
            {statusTabs.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filterStatus === status
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <main className="p-4 lg:p-6">
            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            <div className="bg-white rounded-xl border border-gray-200">
              {loading ? (
                <p className="p-6 text-center">Loading orders...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Email</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Product Quantity</TableHead>
                      <TableHead>Product Price</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => {
                        const totalAmount = order.cart.reduce(
                          (sum, item) =>
                            sum +
                            (Number(item.product?.productPrice || 0) *
                              (item.quantity || 1)),
                          0
                        );

                        return (
                          <TableRow key={order._id}>
                            <TableCell className="font-medium">
                              {order.customerEmail}
                            </TableCell>
                            <TableCell>
                              {order.cart.map((c, i) => (
                                <div key={i} className=" flex-row">
                                  {c.product?.productName  || "Deleted product"}
                                </div>
                              ))}
                            </TableCell>
                            <TableCell>
                              {order.cart.map((c, i) => (
                                <div key={i} className=" flex-row">
                                  {c.quantity  || "Deleted Product"}
                                </div>
                              ))}
                            </TableCell>
                            <TableCell className="">
                              {order.cart.map((c, i) => (
                                <div key={i} className=" flex-row">
                                  {c.product?.productPrice  || "Deleted Product"}
                                </div>
                              ))}
                            </TableCell>
                            <TableCell className="font-medium">
                              ${totalAmount}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.deliveryStatus)}>
                                {order.deliveryStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {format(new Date(order.createdAt), "MMM dd, yyyy")}
                            </TableCell>
                            <TableCell className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setNewStatus(order.deliveryStatus || "");
                                  setNewPickUpLocation(
                                    order.pickUpLocation || ""
                                  );
                                }}
                              >
                                <Eye size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-4 text-gray-500"
                        >
                          No matching orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>

            {/* ✅ Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </Button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setSelectedOrder(null)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Order Details</h2>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Tracking ID:</strong> {selectedOrder.trackingId}
              </p>
              <p>
                <strong>Customer Email:</strong> {selectedOrder.customerEmail}
              </p>

              {selectedOrder.deliveryLocationType === "DOOR" && (
                <p>
                  <strong>Delivery Location:</strong>{" "}
                  {selectedOrder.deliveryLocation}
                </p>
              )}

              <p>
                <strong>Delivery Type:</strong>{" "}
                {selectedOrder.deliveryLocationType}
              </p>
              
              <p>
                <strong>Order Status:</strong> {selectedOrder.deliveryStatus}
              </p>
            
             
              {selectedOrder.deliveryLocationType === "PICKUP" && (
                <p>
                  <strong>PickUp Location:</strong>{" "}
                  {selectedOrder.pickUpLocation}
                </p>
              )}
              <p>
                <strong>Created At:</strong>{" "}
                {format(new Date(selectedOrder.createdAt), "PPpp")}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {format(new Date(selectedOrder.updatedAt), "PPpp")}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <label className="block text-sm font-medium">
                Update Delivery Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border p-2 rounded w-full"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              {selectedOrder.deliveryLocationType === "PICKUP" && (
                <div>
                  <label className="block text-sm font-medium mt-3">
                    PickUp Location
                  </label>
                  <Input
                    value={newPickUpLocation}
                    onChange={(e) => setNewPickUpLocation(e.target.value)}
                    placeholder="Enter pick up location"
                  />
                </div>
              )}

              <Button
                className="mt-4 w-full"
                disabled={updating}
                onClick={() =>
                  updateOrder(
                    selectedOrder._id,
                    selectedOrder.owner,
                    newStatus,
                    newPickUpLocation || selectedOrder.pickUpLocation
                  )
                }
              >
                {updating ? "Updating..." : "Update Order"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
