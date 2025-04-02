import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, ChevronRight } from "lucide-react";
import { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Product categories
  const categories = [
    { id: "all", name: "All Products" },
    { id: "engine", name: "Engine Oils" },
    { id: "gear", name: "Gear Oils" },
    { id: "hydraulic", name: "Hydraulic Oils" },
    { id: "grease", name: "Greases" },
    { id: "specialty", name: "Specialty Lubricants" },
  ];

  // Sample products data
  const allProducts = [
    {
      id: 1,
      name: "Premium Engine Oil 5W-30",
      category: "engine",
      description:
        "Synthetic engine oil for passenger cars and light-duty vehicles",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZY1OITEOljZwS1Gc12GPdoVvKgf5pZrGVxw&s",
      vehicleTypes: ["Passenger Cars", "SUVs"],
    },
    {
      id: 2,
      name: "Heavy Duty Engine Oil 15W-40",
      category: "engine",
      description: "For commercial vehicles and heavy machinery",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZY1OITEOljZwS1Gc12GPdoVvKgf5pZrGVxw&s",
      vehicleTypes: ["Trucks", "Buses", "Construction Equipment"],
    },
    {
      id: 3,
      name: "Synthetic Gear Oil 75W-90",
      category: "gear",
      description:
        "Advanced protection for manual transmissions and differentials",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZY1OITEOljZwS1Gc12GPdoVvKgf5pZrGVxw&s",
      vehicleTypes: ["All Vehicles"],
    },
    {
      id: 4,
      name: "Industrial Hydraulic Oil ISO 46",
      category: "hydraulic",
      description:
        "High-performance hydraulic fluid for industrial applications",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZY1OITEOljZwS1Gc12GPdoVvKgf5pZrGVxw&s",
      vehicleTypes: ["Industrial Machinery"],
    },
    {
      id: 5,
      name: "Multi-Purpose Grease NLGI 2",
      category: "grease",
      description: "Lithium-based grease for general lubrication",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZY1OITEOljZwS1Gc12GPdoVvKgf5pZrGVxw&s",
      vehicleTypes: ["All Vehicles", "Industrial Equipment"],
    },
    {
      id: 6,
      name: "High-Temperature Grease",
      category: "grease",
      description: "Specially formulated for high-temperature applications",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZY1OITEOljZwS1Gc12GPdoVvKgf5pZrGVxw&s",
      vehicleTypes: ["Industrial Equipment"],
    },
    {
      id: 7,
      name: "Automatic Transmission Fluid",
      category: "specialty",
      description: "For smooth operation of automatic transmissions",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZY1OITEOljZwS1Gc12GPdoVvKgf5pZrGVxw&s",
      vehicleTypes: ["Passenger Cars", "SUVs"],
    },
    {
      id: 8,
      name: "Motorcycle Engine Oil 10W-40",
      category: "engine",
      description: "Specially formulated for motorcycles",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZY1OITEOljZwS1Gc12GPdoVvKgf5pZrGVxw&s",
      vehicleTypes: ["Motorcycles"],
    },
  ];

  // Filter products based on search term and category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="relative  py-20 md:py-24 text-white text-center bg-gradient-to-r from-[#001F3F] via-[#002147] to-[#001F3F]">
          {/* Overlay Content */}
          <div className="relative  z-10 px-4 max-w-5xl  mx-auto">
            {/* Heading with Responsive Font Size */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl  font-extrabold tracking-wide drop-shadow-lg leading-tight ">
              Premium <span className="text-[#FF4500]">Engine Oils</span> for Ultimate Performance
              <br className="hidden sm:block text-2xl" /> 
            </h1>

            {/* Subtitle with Adjusted Line Height */}
            <p className="mt-4 text-sm sm:text-lg md:text-xl font-medium opacity-90 leading-relaxed">
              Engineered for{" "}
              <span className="text-[#FF4500] font-semibold">durability</span>,
              <span className="text-[#FF4500] font-semibold"> efficiency</span>,
              and{" "}
              <span className="text-[#FF4500] font-semibold">
                top performance
              </span>
              .
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/dealership"
                className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-sm sm:text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
              >
                Become a Dealer
              </Link>
              <Link
                to="/contact"
                className="border-2 border-[#FF4500] text-[#FF4500] px-6 py-3 rounded-lg text-sm sm:text-lg font-semibold shadow-md hover:bg-[#FF4500] hover:text-white transition transform hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
        {/* Search and Filter Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* 🔍 Search Bar */}
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#002147]" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4500] transition duration-300 shadow-sm text-[#002147]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* 🔽 Category Filter Dropdown */}
              <div className="relative w-full md:w-64">
                <Filter className="absolute left-4 top-3.5 h-5 w-5 text-[#002147]" />
                <select
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF4500] bg-white text-[#002147] font-semibold cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="" className="bg-white text-[#002147]">
                    All Categories
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="bg-white text-[#002147] "
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Product Image */}
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 rounded-lg mix-blend-multiply hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#FF4500] text-white rounded-full shadow-sm">
                        {
                          categories.find((cat) => cat.id === product.category)
                            ?.name
                        }
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl font-semibold text-[#002147] mb-2">
                      {product.name}
                    </h3>

                    {/* Product Description */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Suitable For */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Suitable for:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product.vehicleTypes.map((type, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 text-xs bg-[#002147] text-white rounded-full shadow-sm"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-flex items-center text-[#FF4500] hover:text-red-600 font-medium transition-colors"
                    >
                      View Details <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              /* No Products Found Message */
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 text-[#FF4500] hover:text-red-600 font-medium transition"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
