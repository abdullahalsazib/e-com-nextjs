"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Grid3X3,
  Grid2X2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/Product_card";
import { Product2 } from "@/type/product";
import { getProducts } from "@/services/product.service";
import { getCategorys } from "@/services/category.service";

export default function ShopPage() {
  const [products, setProducts] = useState<Product2[]>([]);
  const [categories, setCategories] = useState<
    { ID: number; Name: string; Slug: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState("default");
  const [gridCols, setGridCols] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewOnly, setShowNewOnly] = useState(false);

  const itemsPerPage = 8;

  // Fetch products & categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await getProducts();
        const categoryRes = await getCategorys();

        setProducts(productRes.data);
        setCategories(categoryRes.data.categories)
      } catch (err) {
        console.error(err);
        setError("Failed to load products or categories");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(categories)

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.includes("All") ||
      selectedCategories.some(
        (catSlug) => product.category && product.category.Slug === catSlug
      );

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesNew = !showNewOnly || !!product.rating; // assuming rating indicates new

    return matchesSearch && matchesCategory && matchesPrice && matchesNew;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "All") {
      setSelectedCategories(checked ? ["All"] : []);
    } else {
      setSelectedCategories((prev) => {
        const newCategories = checked
          ? [...prev.filter((c) => c !== "All"), category]
          : prev.filter((c) => c !== category);
        return newCategories.length === 0 ? ["All"] : newCategories;
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-80 bg-sidebar rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-sidebar-foreground">
            Filters
          </h2>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-sidebar-foreground">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-sidebar-foreground">
              Categories
            </label>
            <div className="space-y-2">
              {["All", ...categories.map((c) => c.Slug)].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={category}
                    className="text-sm text-sidebar-foreground cursor-pointer capitalize"
                  >
                    {category} 
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-sidebar-foreground">
              Price Range
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={5000}
              min={0}
              step={10}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* New Products */}
          <div className="mb-6 flex items-center space-x-2">
            <Checkbox
              id="new-only"
              checked={showNewOnly}
              onCheckedChange={setShowNewOnly}
            />
            <label
              htmlFor="new-only"
              className="text-sm text-sidebar-foreground cursor-pointer"
            >
              Show New Products Only
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6 bg-card rounded-lg p-4">
            <div className="flex items-center gap-4">
              <Button
                variant={sortBy === "default" ? "default" : "outline"}
                onClick={() => setSortBy("default")}
              >
                Default
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={gridCols === 3 ? "default" : "outline"}
                size="sm"
                onClick={() => setGridCols(3)}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={gridCols === 4 ? "default" : "outline"}
                size="sm"
                onClick={() => setGridCols(4)}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div
            className={`grid gap-6 mb-8 ${
              gridCols === 4
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {currentProducts.map((product) => (
              <ProductCard key={product.ID} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
