
const products = [
  {
    name: "Hoodies Up And Down",
    sales: 245,
    revenue: "$12,250",
    price: "$50.00",
    image: "👕"
  },
  {
    name: "Black On Black Signature",
    sales: 189,
    revenue: "$9,450",
    price: "$50.00",
    image: "🧥"
  },
  {
    name: "Signature Hofkam Cap",
    sales: 156,
    revenue: "$1,710",
    price: "$10.99",
    image: "🧢"
  },
  {
    name: "Black Signature Pant",
    sales: 134,
    revenue: "$4,020",
    price: "$30.00",
    image: "👖"
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
                <p className="text-sm text-gray-600">{product.sales} sales • {product.price}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{product.revenue}</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                New
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
