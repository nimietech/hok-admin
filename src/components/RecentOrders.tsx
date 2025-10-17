import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useAxios } from "@/hooks/api/axios";

// ---------- Types ----------
interface Product {
  _id: string;
  productName: string;
  productGenderType: string;
  productCategoryId: string;
  productPrice: number;
  productImage: string;
  productSize: string;
  productColor: string;
  productGenericId: string;
  productQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CartItem {
  quantity: number;
  product: Product;
}

export interface OrderData {
  _id: string;
  deliveryLocationType: string;
  trackingId: string;
  deliveryLocation: string;
  deliveryStatus: string;
  owner: string;
  cart: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OrderPageData {
  totalItems: number;
  currentPage: number;
  pages: number;
  results: OrderData[];
}

interface OrderResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: OrderPageData;
}

// ---------- Helpers ----------
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed": return "bg-green-100 text-green-800";
    case "processing": return "bg-yellow-100 text-yellow-800";
    case "shipped":    return "bg-blue-100 text-blue-800";
    case "pending":    return "bg-gray-100 text-gray-800";
    default:           return "bg-gray-100 text-gray-800";
  }
};

// ---------- Component ----------
export const RecentOrders = () => {
  const { axios } = useAxios();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get<OrderResponse>(
          "/orders/admin-fetch-orders?page=1&limit=25"
        );

        // Defensive checks
        if (!res.data.success || !res.data.data?.results) {
          throw new Error(res.data.message || "Failed to fetch orders");
        }

        // Sort newest first & take top 5 for dashboard
        const sorted = [...res.data.data.results].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sorted.slice(0, 5));
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [axios]);

  if (loading) return <p className="p-4">Loading top orders…</p>;
  if (error)   return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Recent Orders</h3>
        <a
          href="/orders"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View all
        </a>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Order ID: {order._id}</p>
                <p className="text-sm text-gray-600">Owner: {order.owner}</p>
                <p className="text-sm text-gray-600">
                  Delivery: {order.deliveryLocation}
                </p>
              </div>

              <div className="text-right">
                <Badge className={getStatusColor(order.deliveryStatus)}>
                  {order.deliveryStatus}
                </Badge>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Products inside each order */}
            <div className="mt-3 space-y-1">
              {order.cart.map((item, idx) => (
                item.product
                  ? (
                      <div key={item.product._id || idx} className="flex justify-between text-sm">
                        <span>{item.product.productName} (x{item.quantity})</span>
                        <span>${item.product.productPrice}</span>
                      </div>
                    )
                  : (
                      <p key={idx} className="text-sm text-red-500">
                        Product details unavailable
                      </p>
                    )
              ))}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
