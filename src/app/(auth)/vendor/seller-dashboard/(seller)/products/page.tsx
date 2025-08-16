/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Control, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { getCategorys } from "@/services/category.service";
import {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
} from "@/services/product.service";
import { useAuth } from "@/app/context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a number",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Stock must be a number",
  }),
  image_url: z.string().optional(),
  category_id: z.string().min(1, "Category is required"),
  status: z.string().default("draft"),
});

type FormSchema = z.infer<typeof formSchema>;

interface Category {
  ID: number;
  Name: string;
}

interface Product {
  ID: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  category_id: number;
  Category: {
    Name: string;
  };
  user_id?: number;
  status?: string;
}

const ProductForm = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      image_url: "",
      category_id: "",
      status: "draft",
    },
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategorys();
        setCategories(res.data.categories);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Fetch products for logged-in user/vendor
  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const res = await getProducts();
      const filtered = res.data.filter((p: Product) => p.user_id === user?.id);
      setProducts(filtered);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchProducts();
  }, [user?.id]);

  // Form submit handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description ?? "",
        price: Number(data.price),
        stock: Number(data.stock),
        image_url: data.image_url ?? "",
        category_id: Number(data.category_id),
        status: data.status ?? "draft",
      };

      if (isEditing && editingId) {
        await updateProduct(editingId, payload);
        toast.success("Product updated successfully");
      } else {
        await createProduct(payload);
        toast.success("Product created successfully");
      }

      fetchProducts();
      form.reset();
      setIsEditing(false);
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    form.setValue("name", product.name);
    form.setValue("description", product.description ?? "");
    form.setValue("price", String(product.price));
    form.setValue("stock", String(product.stock));
    form.setValue("image_url", product.image_url ?? "");
    form.setValue("category_id", String(product.category_id));
    form.setValue("status", product.status ?? "draft");

    setEditingId(product.ID);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="p-6 dark:text-white text-black">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      {/* Product Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 dark:bg-slate-900 bg-white p-6 rounded-lg shadow"
        >
          <h1 className="text-lg font-bold">
            {isEditing ? "Edit Product" : "Create New Product"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control as unknown as Control<FormSchema>}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as Control<FormSchema>}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Short description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as Control<FormSchema>}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price *</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as Control<FormSchema>}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock *</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as Control<FormSchema>}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://image.url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as Control<FormSchema>}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.ID} value={String(cat.ID)}>
                          {cat.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {isEditing ? "Update Product" : "Add Product"}
            </Button>
            {isEditing && (
              <Button
                type="button"
                variant="ghost"
                className="text-red-500"
                onClick={() => {
                  form.reset();
                  setIsEditing(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>

      {/* Products Table */}
      <div className="mt-8 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Product</TableHead>
              <TableHead className="text-left">Price</TableHead>
              <TableHead className="text-left">Stock</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              [...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-gray-500"
                >
                  No products available
                </TableCell>
              </TableRow>
            ) : (
              products.map((p) => (
                <TableRow key={p.ID} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      )}
                      <div className="w-1/2 overflow-hidden">
                        <div className="font-medium">{p.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${p.price.toFixed(2)}</TableCell>
                  <TableCell>{p.stock} in stock</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="link"
                        className="text-indigo-600 px-0"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        className="text-red-600 px-0"
                        onClick={() => handleDelete(p.ID)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductForm;
