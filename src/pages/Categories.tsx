import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Plus, Edit, Trash2, Menu, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useAxios } from "@/hooks/api/axios";
import axios from "axios";

interface Category {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  createdAt?: string;
}

const Categories = () => {
  const { axios } = useAxios();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [viewingCategory, setViewingCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [previewImage, setPreviewImage] = useState<string>("");
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryImage: "", 
    categoryImageFile: null as File | null, // 👈 local uploaded file
  });

  // ✅ Fetch Categories
  const fetchCategories = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `/category/fetch-categories?page=${page}&limit=20`
      );

      console.log(data)
      if (data.success) {
        const results = Array.isArray(data.data)
          ? data.data
          : data.data.results;
        setCategories(results);
        setTotalPages(data.data.pages || 1);
        setCurrentPage(page);
      } else {
        setError(data.message || "Failed to fetch categories");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setPreviewImage(URL.createObjectURL(file));
  setFormData(prev => ({ ...prev, categoryImageFile: file }));
  };

  const CLOUD_NAME = "dwfvec1ne"; 
const UPLOAD_PRESET = "hok-files";

const handleSubmit = async () => {
  if (!formData.categoryName) {
    setError("Category name is required");
    return;
  }

  setLoading(true);
  try {
    let imageUrl = formData.categoryImage;

    if (formData.categoryImageFile) {
      const form = new FormData();
      form.append("file", formData.categoryImageFile);
      form.append("upload_preset", UPLOAD_PRESET);

      // 👇 create plain axios (no auth headers, no cookies)
      const plainAxios = axios.create({ withCredentials: false });

      const res = await plainAxios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      imageUrl = res.data.secure_url;
    }

    const payload = {
      categoryName: formData.categoryName,
      categoryDescription: formData.categoryDescription,
      categoryImage: imageUrl,
    };

    if (editingCategory) {
      await updateCategory(editingCategory._id, payload);
    } else {
      await createCategory(payload);
    }

    setPreviewImage("");
    resetForm();
    setShowForm(false);
  } catch (err) {
    setError("Error saving category");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

// ✅ Create Category
const createCategory = async (payload: {
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
}) => {
  setLoading(true);
  setError("");
  try {
    const { data } = await axios.post("/category/create-category", payload);
    if (data.success) {
      await fetchCategories(currentPage);
      setShowForm(false);
      resetForm();
    } else {
      setError(data.message || "Failed to create category");
    }
  } catch (err: any) {
    setError(err.response?.data?.message || "Network error");
  } finally {
    setLoading(false);
  }
};

// ✅ Update Category
const updateCategory = async (
  id: string,
  payload: {
    categoryName: string;
    categoryDescription: string;
    categoryImage: string;
  }
) => {
  setLoading(true);
  setError("");
  try {
    const { data } = await axios.put(
      `/category/update-a-category?categoryId=${id}`,
      payload
    );
    if (data.success) {
      await fetchCategories(currentPage);
      setShowForm(false);
      setEditingCategory(null);
      resetForm();
    } else {
      setError(data.message || "Failed to update category");
    }
  } catch (err: any) {
    setError(err.response?.data?.message || "Network error");
  } finally {
    setLoading(false);
  }
};


  // ✅ Delete Category
  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `/category/delete-category?categoryId=${id}`
      );
      if (data.success) {
        await fetchCategories(currentPage);
      } else {
        setError(data.message || "Failed to delete category");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset
  const resetForm = () => {
    setFormData({ categoryName: "", categoryDescription: "", categoryImage: "",
    categoryImageFile: null});
  };


  // ✅ Load once
  useEffect(() => {
    fetchCategories(1);
  }, []);

  const filtered = categories.filter((c) =>
    c.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Pagination
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => fetchCategories(i)}
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
              onClick={() =>
                currentPage > 1 && fetchCategories(currentPage - 1)
              }
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {pages}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && fetchCategories(currentPage + 1)
              }
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex w-full">
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
          <header className="bg-white border-b px-4 lg:px-6 py-4 flex justify-between items-center">
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
                  Categories
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  Manage your product categories
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search categories..."
                  className="pl-10 w-48 lg:w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setShowForm(true);
                  setEditingCategory(null);
                  resetForm();
                }}
                disabled={loading}
              >
                <Plus size={16} className="mr-2" />
                Add Category
              </Button>
            </div>
          </header>

          <main className="p-4 lg:p-6">
            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            {/* Form */}
            {showForm && (
              <div className="bg-white p-4 mb-4 rounded-xl border">
                <h2 className="font-bold mb-2">
                  {editingCategory ? "Edit Category" : "Add Category"}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder="Category Name"
                    value={formData.categoryName}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryName: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Description"
                    value={formData.categoryDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryDescription: e.target.value,
                      })
                    }
                  />
                  
                  {/* Image upload */}
                <div>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageSelect} 
                  />
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="mt-2 w-20 h-20 rounded-md object-cover" 
                    />
                  ) : formData.categoryImage ? (
                    <img 
                      src={formData.categoryImage} 
                      alt="Current" 
                      className="mt-2 w-20 h-20 rounded-md object-cover" 
                    />
                  ) : null}
                </div>

                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" onClick={handleSubmit} disabled={loading}>
                    {loading
                      ? editingCategory
                        ? "Updating..."
                        : "Saving..."
                      : editingCategory
                      ? "Update"
                      : "Save"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowForm(false);
                      setEditingCategory(null);
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
                <p>Loading categories...</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl border overflow-x-auto mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[180px]">Category Image</TableHead>
                        <TableHead className="min-w-[200px]">Category Name</TableHead>
                        <TableHead className="min-w-[200px]">Description</TableHead>
                        <TableHead className="min-w-[150px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((cat) => (
                        <TableRow key={cat._id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              {cat.categoryImage && (
                                <img
                                  src={cat.categoryImage}
                                  alt={cat.categoryName}
                                  className="w-16 h-16 rounded-lg object-cover ml-4"
                                />
                              )}
                            </div>
                          </TableCell>

                          <TableCell className="text-sm text-gray-700">
                                {cat.categoryName}        {/* 👈 NEW: the category’s unique ID */}
                            </TableCell>

                          <TableCell>{cat.categoryDescription}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewingCategory(cat)}
                              >
                                <Eye size={14} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingCategory(cat);
                                  setFormData({
                                    categoryName: cat.categoryName,
                                    categoryDescription: cat.categoryDescription,
                                    categoryImage: cat.categoryImage,
                                    categoryImageFile: null
                                  });
                                  setShowForm(true);
                                }}
                              >
                                <Edit size={14} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteCategory(cat._id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </TableCell>
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

      {/* Detail Dialog */}
      <Dialog open={!!viewingCategory} onOpenChange={() => setViewingCategory(null)}>
        <DialogContent className="max-w-md h-[85%]">
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
            <DialogDescription>Detailed information.</DialogDescription>
          </DialogHeader>
          {viewingCategory && (
            <div className="space-y-2">
              {viewingCategory.categoryImage && (
                <img
                  src={viewingCategory.categoryImage}
                  alt={viewingCategory.categoryName}
                  className="w-full h-[350px] rounded-2xl mb-7"
                />
              )}
              <p><strong>Category Name:</strong> {viewingCategory.categoryName}</p>
              <p><strong>Description:</strong> {viewingCategory.categoryDescription}</p>
              {viewingCategory.createdAt && (
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(viewingCategory.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;


