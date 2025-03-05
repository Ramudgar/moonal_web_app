import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, Download, Share2 } from "lucide-react";
import MainLayout from "../Layouts/MainLayout";
import ProductNotFound from "./ProductNotFound";

const ProductDetailPage = () => {
  const { id } = useParams();

  // Sample product data
  const products = [
    {
      id: "1",
      name: "Premium Engine Oil 5W-30",
      category: "engine",
      description:
        "Synthetic engine oil for passenger cars and light-duty vehicles",
      longDescription:
        "Our Premium Engine Oil 5W-30 is a fully synthetic engine oil designed to provide exceptional protection and performance for modern passenger cars and light-duty vehicles.",
      image:
        "https://i.pinimg.com/736x/ef/71/38/ef71385badb9faffe8defc1659601c2d.jpg",
         vehicleTypes: ["Passenger Cars", "SUVs"],
      specifications: [
        "API SN/CF",
        "ACEA A3/B4",
        "MB 229.5",
        "VW 502.00/505.00",
      ],
      benefits: [
        "Excellent engine cleanliness",     
        "Superior wear protection",
        "Enhanced fuel economy",
        "Extended drain intervals",
        "Excellent low-temperature performance",
      ],
      packagingSizes: ["1L", "4L", "5L", "20L", "208L"],
    },
  ];

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <MainLayout>
        <ProductNotFound />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-gray-500 hover:text-[#FF4500]">
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link
                to="/products"
                className="text-gray-500 hover:text-[#FF4500]"
              >
                Products
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-700">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Product Image */}
              <div className="md:w-1/2">
                <div className="h-96 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-lg mix-blend-multiply hover:scale-105"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="md:w-1/2 p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#FF4500] text-white rounded-full shadow-sm">
                    Engine Oil
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-[#002147] mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.longDescription}
                </p>

                {/* Suitable For */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Suitable for:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.vehicleTypes.map((type, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-sm bg-[#002147] text-white rounded-full shadow-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Packaging Sizes */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Available Packaging:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.packagingSizes.map((size, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex space-x-4 mb-8">
                  <button className="flex-1 bg-[#FF4500] hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-transform hover:scale-105 flex items-center justify-center">
                    <Download className="h-5 w-5 mr-2" /> Download Datasheet
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                <Link
                  to="/contact"
                  className="block w-full bg-[#002147] hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-transform hover:scale-105 text-center"
                >
                  Contact for More Information
                </Link>
              </div>
            </div>

            {/* Additional Details */}
            <div className="border-t border-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Specifications
                  </h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-[#FF4500] mr-2" /> {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-green-600 mr-2" /> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Products */}
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-flex items-center text-[#FF4500] hover:text-red-600 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
