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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Plus, Edit, Trash2, Menu, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "@/hooks/api/axios";

// import { useAxios } from "@/hooks/api/axios"; // ✅ useAxios hook

// Interfaces
interface Product {
  _id: string;
  productName: string;
  productGenderType: string;
  productCategoryId: string;
  productPrice: string;
  productImage: string;
  productSize: string;
  productColor: string;
  productQuantity: string;
  productVolume: string;
  productGenericId?: string;
  createdAt?: string;
  availableColors: string[];
  availableSizes: string[];
  relativeSizes?: { _id: string; size: string }[];
  relativeColors?: { _id: string; color: string }[];
  discountedPrice?: string | null;
  discountPercentage?: string | null;
}

const Products = () => {
  // const { axios, loading: axiosLoading } = useAxios(); // ✅ get axios + global loading
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // local loading
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string>("");
  const [categories, setCategories] = useState<{ _id: string; categoryName: string }[]>([]);


  const [formData, setFormData] = useState({
    productName: "",
    productGenderType: "MALE",
    productCategoryId: "",
    productPrice: "",
    productImage: "",
    productImageFile: null as File | null, // local file
    productSize: "",
    productColor: "",
    productVolume: "0",
  });

  // Fetch products with pagination
  const fetchProducts = async (page: number = 1) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `/product/fetch-products?page=${page}&limit=20`
      );

      console.log("Fetched products:", data)

      if (data.success && data.data) {
        console.log(data.data)
        console.log(data.data.results)
        setProducts(Array.isArray(data.data) ? data.data
        : data.data.results); //always be an array

        setTotalPages(data.data.totalPages || 1);
        setCurrentPage(page);
      } else {
        setError(data.message || "Failed to fetch products");
        console.log(data.message)
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single product
  const fetchProductById = async (productId: string) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `/product/fetch-a-product?productId=${productId}`
      );

      if (data) setViewingProduct(data);

      console.log("Fetched a product:", data)

      if (data) {
        setViewingProduct(data);
      } else {
        setError("Failed to fetch product details");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create product
  const createProduct = async (formData: any) => {
    setLoading(true);
    setError("");
    try { 
      const { data } = await axios.post(
        "/product/create-product",
        formData, 
      )
      
       console.log("Created product:", data)

         if (data.success) {
      await fetchProducts(currentPage); // ✅ refresh product list
      setShowForm(false);               // ✅ close the form
      resetForm();                      // ✅ reset form fields
    } else {
      setError(data.message || "Failed to create product");
    }
    
    } catch (err) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Network error. Please try again.");
        }
          console.error("Error creating product:", err)
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update product
    const updateProduct = async (productId: string, updatedData: typeof formData) => {
      setLoading(true);
      setError("");
      try {
        console.log("Updating product with:", updatedData);

        const payload = {
      ...updatedData,
        productPrice: String(updatedData.productPrice),
      };

      console.log("Updating product with:", payload);

        const { data } = await axios.put(
          `/product/update-a-product?productId=${productId}`,
          payload
        );

        console.log(data)

        if (data.success) {
          await fetchProducts(currentPage);   // refresh list
          setShowForm(false);                 // close form
          setEditingProduct(null);            // reset edit state
          resetForm();                        // clear fields
        } else {
          setError(data.message || "Failed to update product");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Network error. Please try again.");
        console.error("Error updating product:", err);
      } finally {
        setLoading(false);
      }
    };


  // Handle Edit
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      productGenderType: product.productGenderType,
      productCategoryId: product.productCategoryId,
      productPrice: product.productPrice,
      productImage: product.productImage,
      productImageFile: null as File | null, // local file
      productSize: product.productSize,
      productColor: product.productColor,
      productVolume: product.productVolume,
    });
    setShowForm(true);
  };

  // Delete product
  const deleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    setError("");
    try {
      const { data } = await axios.delete(
        `/product/delete-a-product?productId=${productId}`
      );

      console.log("successfully deleted:", data)
      if (data.success) {
        await fetchProducts(currentPage);
      } else {
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Error deleting product:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete all products
  const deleteAllProducts = async () => {
    if (!confirm("Are you sure you want to delete ALL products?")) return;

    setLoading(true);
    setError("");
    try {
      const { data } = await axios.delete(
        "/product/delete-all-products"
      );

      if (data.success) {
        await fetchProducts(1);
      } else {
        setError(data.message || "Failed to delete all products");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Error deleting all products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      productName: "",
      productGenderType: "MALE",
      productCategoryId: "",
      productPrice: "",
      productImage: "",
      productImageFile: null as File | null, // local file
      productSize: "",
      productColor: "",
      productVolume: "0",
    });
  };

 
  
// select file → show preview only
const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setPreviewImage(URL.createObjectURL(file));
  setFormData(prev => ({ ...prev, productImageFile: file }));
};


  // Handle form submission
  const handleSubmit = async () => {
     if (!formData.productName || !formData.productCategoryId) {
    setError("Product name and category are required");
    return;
  }

  setLoading(true);
  try {
    let imageUrl = formData.productImage;

    // only upload if user picked a new file
    if (formData.productImageFile) {
      const form = new FormData();
      form.append("file", formData.productImageFile);
      form.append("upload_preset", UPLOAD_PRESET);

      const plainAxios = axios.create();
      const res = await plainAxios.post(
        "https://api.cloudinary.com/v1_1/dwfvec1ne/image/upload",
        form,
         {
            withCredentials: false, // 👈 important
            headers: { "Content-Type": "multipart/form-data" }
          }
      );
      console.log(res)
      imageUrl = res.data.secure_url;
      console.log(imageUrl)
    }

    const payload = { ...formData, productImage: imageUrl };
    delete (payload as any).productImageFile; // don’t send raw File

    editingProduct
      ? await updateProduct(editingProduct._id, payload)
      : await createProduct(payload);

    setPreviewImage("");
  } catch (err) {
    setError("Error saving product");
    console.error(err);
  } finally {
    setLoading(false);
  }
  };


  // Handle View
  const handleView = (product: Product) => {
    fetchProductById(product._id);
  };

  // Handle Search
  const filteredProducts = Array.isArray(products)
  ? products.filter(
      (p) =>
        p.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.productCategoryId.toLowerCase().includes(search.toLowerCase())
    )
  : [];

  // ✅ Determine stock status based on productQuantity
  const getStockStatus = (product: string | number) => {
    const stock = typeof product === "string" ? parseInt(product, 10) : product;

    if (isNaN(stock) || stock <= 0) {
      return { text: "Out of Stock", color: "bg-red-100 text-red-800" };
    }

    if (stock <= 10) {
      return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    }

    return { text: "In Stock", color: "bg-green-100 text-green-800" };
  };

  // For the categories section
  useEffect(() => {
    const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/category/fetch-categories?limit=50&page=1");
      console.log("categories:", data)
      if (data.success && data.data?.results) {
        setCategories(data.data.results);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }

  };

  fetchCategories();
    
  fetchProducts(1);
  },[]);

  // Pagination controls
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => fetchProducts(i)}
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
              onClick={() => currentPage > 1 && fetchProducts(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {pages}
          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && fetchProducts(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  
    // 🔑 replace with your real values
    const CLOUD_NAME = "dwfec1ne";
    const UPLOAD_PRESET = "hok-files";


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
        {/* Sidebar */}
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
                    Products
                  </h1>
                  <p className="text-sm lg:text-base text-gray-600 hidden sm:block">
                    Manage your product inventory
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="relative hidden sm:block">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 w-48 lg:w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button
                  size="sm"
                  className="lg:size-default"
                  onClick={() => {
                    setShowForm(true);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  disabled={loading}
                >
                  <Plus size={16} className="mr-2" />
                  <span className="hidden sm:inline">Add Product</span>
                  <span className="sm:hidden">Add</span>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="lg:size-default"
                  onClick={deleteAllProducts}
                  disabled={loading}
                >
                  <Trash2 size={16} className="mr-2" />
                  <span className="hidden sm:inline">Delete All</span>
                  <span className="sm:hidden">Clear</span>
                </Button>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6">
            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            {/* Form for Add/Edit */}
            {showForm && (
              <div className="bg-white p-4 mb-4 rounded-xl border">
                <h2 className="font-bold mb-2">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Product Name"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                  />
                 <select
                    className="border rounded-md px-3 py-2 text-sm"
                    value={formData.productCategoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, productCategoryId: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>

                  <Input
                    placeholder="Product Price"
                    type="text"
                    value={formData.productPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productPrice:String(e.target.value)
                      })
                    }
                  />

                {/* Image Upload with Preview */}
                  <div className="space-y-2">
                    {previewImage && (
                      <div className="relative w-32 h-32">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => { setPreviewImage(""); setFormData(prev => ({ ...prev, productImageFile: null
                          })); }}
                          className="absolute top-1 right-1 bg-white rounded-full shadow p-1"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    <span className="mr-3 font-medium">Product Image:</span>
                    <Input
                      id="productImageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => document.getElementById("productImageUpload")?.click()}
                    >
                      {previewImage ? "Change Image" : "Select Image"}
                    </Button>
                  </div>


                  <select
                    className="border rounded-md px-3 py-2 text-sm"
                    value={formData.productGenderType}
                    onChange={(e) =>
                      setFormData({ ...formData, productGenderType: e.target.value })
                    }
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="UNISEX">Unisex</option>
                  </select>

                  <Input
                    placeholder="Color"
                    value={formData.productColor}
                    onChange={(e) =>
                      setFormData({ ...formData, productColor: e.target.value })
                    }
                  />
                  <Input 
                    placeholder="Size"
                    value={formData.productSize}
                    onChange={(e) =>
                      setFormData({ ...formData, productSize: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Product Volume"
                    type="number"
                    value={formData.productVolume}
                    onChange={(e) =>
                      setFormData({ ...formData, productVolume: e.target.value })
                    }
                  />
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" onClick={handleSubmit} disabled={loading}>
                    {loading ? (editingProduct ? "Updating..." : "Saving...") : (editingProduct ? "Update" : "Save")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowForm(false);
                      setEditingProduct(null);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {loading && !showForm ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading products...</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Product</TableHead>
                        <TableHead className="min-w-[100px]">Gender Type</TableHead>
                        <TableHead className="min-w-[80px]">Price</TableHead>
                        <TableHead className="min-w-[60px]">Stock</TableHead>
                        <TableHead className="min-w-[100px]">Status</TableHead>
                        <TableHead className="min-w-[150px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => {
                        const stockStatus = getStockStatus(product.productQuantity);

                        return (
                          <TableRow key={product._id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.productImage}
                                  alt={product.productName}
                                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg object-cover"
                                />
                                <span className="font-medium text-sm lg:text-base">
                                  {product.productName}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm lg:text-base">
                              {product.productGenderType}
                            </TableCell>
                            <TableCell className="font-semibold text-sm lg:text-base">
                              ${product.productPrice}
                            </TableCell>
                            <TableCell className="text-sm lg:text-base">
                              {product.productQuantity}
                            </TableCell>
                            <TableCell>
                              <Badge className={`text-xs ${stockStatus.color}`}>
                                {stockStatus.text}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1 lg:space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleView(product)}
                                  disabled={loading}
                                >
                                  <Eye size={14} className="lg:w-4 lg:h-4" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(product)}   // ✅ enable edit
                                  disabled={loading}
                                >
                                  <Edit size={14} className="lg:w-4 lg:h-4" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteProduct(product._id)}
                                  disabled={loading}
                                >
                                  <Trash2 size={14} className="lg:w-4 lg:h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {renderPagination()}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!viewingProduct} onOpenChange={() => setViewingProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>Detailed view of the product.</DialogDescription>
          </DialogHeader>
          
          {viewingProduct && (() => {
  // ✅ Find the category object that matches the product
  const productCategory = categories.find(
    (cat) => cat._id === viewingProduct.productCategoryId
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left - Image */}
      <div>
        <img
          src={viewingProduct.productImage}
          alt={viewingProduct.productName}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Right - Details */}
      <div>
        <h2 className="text-2xl font-bold mb-2">{viewingProduct.productName}</h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Category:</span>{" "}
            {productCategory?.categoryName || "Unknown"}
          </p>
          <p><span className="font-semibold">Gender:</span> {viewingProduct.productGenderType}</p>
          <p><span className="font-semibold">Price:</span> ${viewingProduct.productPrice}</p>
          <p><span className="font-semibold">Current Size:</span> {viewingProduct.productSize}</p>
          <p><span className="font-semibold">Color:</span> {viewingProduct.productColor}</p>
          <p><span className="font-semibold">Quantity:</span> {viewingProduct.productQuantity}</p>
        </div>

        <div className="mt-2">
                      <span>
                  <h3 className="font-semibold">Available Colors</h3>
                
                  <ul className="flex gap-2">
                    {viewingProduct.availableColors.map((color) => (
                      <li key={color}>{color}</li>
                    ))}
                  </ul>
                  </span>

                  <h3 className="font-semibold mt-2">Available Sizes</h3>
                  <ul className="flex gap-2">
                    {viewingProduct.availableSizes.map((size) => (
                      <li key={size}>{size}</li>
                    ))}
                  </ul>
                  </div>

                   {viewingProduct.createdAt && (
                    <p><span className="font-semibold">Created:</span> {new Date(viewingProduct.createdAt).toLocaleDateString()}</p>
                  )}

        {/* ...rest of your details */}
      </div>
    </div>
  );
})()}
                    </DialogContent>
                  </Dialog>
                </div>
  );
};

export default Products;