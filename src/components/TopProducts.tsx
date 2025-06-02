
const products = [
  {
    name: "Wireless Headphones",
    sales: 245,
    revenue: "$21,975",
    image: "🎧"
  },
  {
    name: "Smart Watch",
    sales: 189,
    revenue: "$56,671",
    image: "⌚"
  },
  {
    name: "Laptop Stand",
    sales: 156,
    revenue: "$7,098",
    image: "💻"
  },
  {
    name: "Phone Case",
    sales: 134,
    revenue: "$2,679",
    image: "📱"
  }
];

export const TopProducts = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View all
        </a>
      </div>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                {product.image}
              </div>
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.sales} sales</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{product.revenue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
