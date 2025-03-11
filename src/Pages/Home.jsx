import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Award,
  Droplets,
  TrendingUp,
  Users,
  Calendar,
  ChevronRight,
  Star,
  MapPin,
} from "lucide-react";
import MainLayout from "../Layouts/MainLayout";
import moonalBanner from "../assets/images/moonalBanner.jpeg";

const Home = () => {
  // Testimonial slider settings
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Engine Oil",
      description: "High-performance engine oil for all vehicle types",
      image:
        "https://www.millersoils.co.uk/wp-content/uploads/2020/11/XF-ECO-5w30-grouped-1.png",
      price: 1000,
    },
    {
      id: 2,
      name: "Synthetic Gear Oil",
      description: "Advanced protection for gears and transmissions",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYc6fQLRInXFpzoGBoLFg9R9zuJ8s59Bv53Q&s",
      price: 1000,
    },
    {
      id: 3,
      name: "Industrial Hydraulic Oil",
      description: "Reliable performance for industrial machinery",
      image:
        "https://www.millersoils.co.uk/wp-content/uploads/2020/11/XF-ECO-5w30-grouped-1.png",
      price: 1000,
    },
    {
      id: 4,
      name: "Multi-Purpose Grease",
      description: "Long-lasting lubrication for multiple applications",
      image:
        "https://www.millersoils.co.uk/wp-content/uploads/2020/11/XF-ECO-5w30-grouped-1.png",
      price: 1000,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      company: "Himalayan Transport Co.",
      text: "We've been using Moonal Udhyog lubricants for our entire fleet for over 3 years. The quality is exceptional and our maintenance costs have significantly reduced.",
      rating: 5,
      image:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
    {
      id: 2,
      name: "Sunita Sharma",
      company: "Everest Machinery",
      text: "The industrial hydraulic oils from Moonal Udhyog have proven to be extremely reliable for our heavy machinery. Excellent product backed by great technical support.",
      rating: 5,
      image:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
    {
      id: 3,
      name: "Binod Thapa",
      company: "Mountain Auto Service",
      text: "As a service center, we recommend Moonal lubricants to all our customers. The performance speaks for itself, and we've had zero complaints.",
      rating: 4,
      image:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
  ];

  // Upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Automotive Expo 2025",
      date: "March 15-17, 2025",
      location: "Bhrikuti Mandap, Kathmandu",
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Dealer Training Program",
      date: "April 5, 2025",
      location: "Hotel Himalaya, Lalitpur",
      image:
        "https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-[#002147] text-white">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={moonalBanner}
              alt="Lubricants"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 z-10 text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Powering Performance with Premium Lubricants
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Trusted by industries and vehicle owners across Nepal for superior
              quality lubricants
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/products"
                className="bg-[#FF4500] hover:bg-[#E63E00] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                View Products
              </Link>
              <Link
                to="/dealership"
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Apply for Dealership
              </Link>
              <Link
                to="/contact"
                className="bg-white text-[#001F3F] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 bg-[#F2F2F2]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[#002147] mb-4 relative inline-block">
                Featured Products
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-8px] w-16 h-[4px] bg-[#FF4500] rounded-full"></span>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Explore our premium range of high-quality lubricants, crafted
                for optimal performance and superior protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-56 flex items-center justify-center bg-[#E8E8E8] rounded-lg overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-48 h-48 object-contain p-4 rounded-lg mix-blend-multiply"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#002147] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <span className="flex items-center justify-between">
                      <Link
                        to={`/products/${product.id}`}
                        className="inline-flex items-center text-[#FF4500] hover:text-[#E63E00] font-medium"
                      >
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                      {/* product price */}
                      <p className="text-md font-semibold text-cyan-900 mb-2 ">
                        Rs.{product.price} / L
                      </p>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center bg-[#FF4500] hover:bg-[#E63E00] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                View All Products <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#002147] mb-6">
                Why Choose Us?
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                At{" "}
                <span className="font-semibold text-[#FF4500]">
                  Moonal Udhyog
                </span>
                , we are committed to delivering{" "}
                <strong>top-tier lubrication solutions</strong>
                for optimal performance and reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Droplets className="h-10 w-10 text-[#FF4500]" />,
                  title: "Premium Quality",
                  description:
                    "Formulated with high-grade base oils and additives to ensure long-lasting protection.",
                },
                {
                  icon: <Award className="h-10 w-10 text-[#FF4500]" />,
                  title: "Industry Expertise",
                  description:
                    "Backed by years of experience, we provide expert lubrication solutions.",
                },
                {
                  icon: <Users className="h-10 w-10 text-[#FF4500]" />,
                  title: "Nationwide Network",
                  description:
                    "Extensive dealership network ensures easy availability of our products.",
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-[#FF4500]" />,
                  title: "Proven Results",
                  description:
                    "Trusted by professionals for outstanding performance in vehicles & machinery.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-8 bg-[#eeeef0] rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-20 h-20 bg-[#FFF0E0] flex items-center justify-center rounded-full mx-auto mb-5 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#002147] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-md">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#F2F2F2]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#002147] mb-6">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                See how{" "}
                <span className="font-semibold text-[#FF4500]">
                  Moonal Udhyog
                </span>{" "}
                has made a difference for our customers worldwide.
              </p>
            </div>

            <div className="max-w-5xl mx-auto relative">
              <Slider {...testimonialSettings}>
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    className="px-6"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-200 hover:shadow-2xl transition-all duration-300">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${
                              i < testimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                        {testimonial.text}
                      </p>
                      <div className="mt-4 flex items-center justify-center flex-col ">
                        <img
                          src={testimonial.image}
                          className="rounded-full w-25 h-25 object-cover "
                          alt=""
                        />
                        <h4 className="font-bold text-xl p-2 text-[#002147]">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600  ">{testimonial.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Slider>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/reviews"
                className="inline-flex items-center bg-[#FF4500] hover:bg-[#E63E00] text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
              >
                View All Reviews <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#002147] mb-6">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Be part of our{" "}
                <span className="font-semibold text-[#FF4500]">
                  exclusive events
                </span>
                and stay ahead in the world of high-performance lubricants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-3 border border-gray-200 relative"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Image Section with Overlay */}
                  <div className="relative h-56">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-semibold text-[#002147] mb-3">
                      {event.title}
                    </h3>
                    <div className="flex items-center justify-center text-gray-600 mb-3">
                      <Calendar className="h-5 w-5 text-[#FF4500] mr-2" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center justify-center text-gray-600 mb-5">
                      <MapPin className="h-5 w-5 text-[#FF4500] mr-2" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <Link
                      to="/event"
                      className="inline-flex items-center bg-[#FF4500] hover:bg-[#E63E00] text-white font-semibold py-2 px-6 rounded-full transition-colors shadow-md"
                    >
                      Learn More <ChevronRight className="h-5 w-5 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/event"
                className="inline-flex items-center bg-[#FF4500] hover:bg-[#E63E00] text-white font-semibold py-4 px-10 rounded-lg transition-colors text-lg shadow-md"
              >
                View All Events <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-800 text-white relative">
          <div className="absolute inset-0 "></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Become a Dealer?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
              Join our network of dealers and grow your business with premium
              oil products from Moonal Udhyog.
            </p>

            <Link
              to="/dealership"
              className="inline-flex items-center bg-white text-gray-800 hover:bg-[#E63E00] text-[] font-semibold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-md"
            >
              Apply for Dealership <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
