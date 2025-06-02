
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
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Hoodies Up And Down",
    category: "Hoodies",
    price: "$50.00",
    stock: 45,
    status: "In Stock",
    image: "👕"
  },
  {
    id: 2,
    name: "Black On Black Signature",
    category: "Jackets",
    price: "$50.00",
    stock: 23,
    status: "In Stock",
    image: "🧥"
  },
  {
    id: 3,
    name: "Signature Hofkam Cap",
    category: "Accessories",
    price: "$10.99",
    stock: 78,
    status: "In Stock",
    image: "🧢"
  },
  {
    id: 4,
    name: "Black Signature Pant",
    category: "Pants",
    price: "$30.00",
    stock: 12,
    status: "Low Stock",
    image: "👖"
  }
];

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AdminSidebar />
      
      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600">Manage your product inventory</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button>
                <Plus size={16} className="mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                          {product.image}
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-semibold">{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge className={product.status === 'Low Stock' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 size={16} />
                        </Button>
                      </div>
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

export default Products;
