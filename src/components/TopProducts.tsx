import { useEffect, useState } from "react";
import axios from "@/hooks/api/axios";

// import { useAxios } from "@/hooks/api/axios";

// ---------- Types ----------
interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productQuantity: number; // stock left
  totalSales?: number;     // optional if backend provides
  createdAt: string;
  updatedAt: string;
}

interface ProductPageData {
  totalItems: number;
  currentPage: number;
  pages: number;
  results: Product[];
}

interface ProductResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ProductPageData;
}

// ---------- Component ----------
export const TopProducts = () => {
  // const { axios } = useAxios();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<ProductResponse>(
          "/product/fetch-products?page=1&limit=20"
        );

        if (!res.data.success || !res.data.data?.results) {
          throw new Error(res.data.message || "Failed to fetch products");
        }

        // Use sales if provided, otherwise fallback to sorting by createdAt
        const sorted = [...res.data.data.results].sort((a, b) => {
          const salesA = a.totalSales ?? 0;
          const salesB = b.totalSales ?? 0;
          return salesB - salesA;
        });

        setProducts(sorted.slice(0, 5)); // top 5 products
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axios]);

  if (loading) return <p className="p-4">Loading top products…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
        <a
          href="/products"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View all
        </a>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {/* Product image */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {product.productImage ? (
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <span className="text-lg text-gray-400">📦</span>
                )}
              </div>

              <div>
                <p className="font-medium text-gray-900">
                  {product.productName}
                </p>
                <p className="text-sm text-gray-600">
                  {(product.totalSales ?? 0)} sales • ${product.productPrice}
                </p>
              </div>
            </div>

            {/* Right section */}
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ${(product.totalSales ?? 0) * product.productPrice}
              </p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Top
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
