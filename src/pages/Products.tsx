
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
import { Search, Plus, Edit, Trash2, Menu } from "lucide-react";
import { useState } from "react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex w-full">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>
        
        {/* Mobile sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
          <AdminSidebar />
        </div>
        
        <div className="flex-1 overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu size={20} />
                </Button>
                
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Products</h1>
                  <p className="text-sm lg:text-base text-gray-600 hidden sm:block">Manage your product inventory</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-10 w-48 lg:w-64"
                  />
                </div>
                <Button size="sm" className="lg:size-default">
                  <Plus size={16} className="mr-2" />
                  <span className="hidden sm:inline">Add Product</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Product</TableHead>
                    <TableHead className="min-w-[100px]">Category</TableHead>
                    <TableHead className="min-w-[80px]">Price</TableHead>
                    <TableHead className="min-w-[60px]">Stock</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-lg flex items-center justify-center text-sm lg:text-lg">
                            {product.image}
                          </div>
                          <span className="font-medium text-sm lg:text-base">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm lg:text-base">{product.category}</TableCell>
                      <TableCell className="font-semibold text-sm lg:text-base">{product.price}</TableCell>
                      <TableCell className="text-sm lg:text-base">{product.stock}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${product.status === 'Low Stock' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1 lg:space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit size={14} className="lg:w-4 lg:h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 size={14} className="lg:w-4 lg:h-4" />
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
    </div>
  );
};

export default Products;
