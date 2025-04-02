import { motion } from "framer-motion";
import { CheckCircle, Award, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const QualityPolicyPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      
      {/* 🚀 Page Header */}
      <div className="bg-[#03033d9c] text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Quality Policy</h1>
        <p className="text-lg text-gray-200 mt-2">
          Our commitment to delivering the highest quality lubricants for superior performance and reliability.
        </p>
      </div>

      {/* 🌟 Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-[#002147] text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Commitment to Unmatched Quality
          </motion.h2>
          <motion.p
            className="text-gray-700 text-lg max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            At Moonal Udhyog PVT. LTD., we adhere to the highest industry standards in manufacturing 
            high-performance lubricants. Our unwavering focus on quality, innovation, and customer 
            satisfaction ensures that our products exceed expectations in durability, efficiency, 
            and reliability.
          </motion.p>
        </div>
      </section>

      {/* 🏆 Quality Assurance Section */}
      <section className="py-16 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-[#002147] text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Quality Assurance Principles
          </motion.h2>

          {/* Quality Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck className="h-12 w-12 text-white" />, title: "ISO-Certified Manufacturing", desc: "Strict adherence to global ISO quality management standards." },
              { icon: <Award className="h-12 w-12 text-white" />, title: "Premium Raw Materials", desc: "Using only high-grade base oils and advanced additives." },
              { icon: <TrendingUp className="h-12 w-12 text-white" />, title: "Continuous Improvement", desc: "Regular R&D and innovation for superior performance." },
              { icon: <CheckCircle className="h-12 w-12 text-white" />, title: "Rigorous Testing", desc: "Every batch undergoes extensive quality control checks." },
              { icon: <ShieldCheck className="h-12 w-12 text-white" />, title: "Customer Satisfaction", desc: "Feedback-driven improvements to meet customer needs." },
              { icon: <Award className="h-12 w-12 text-white" />, title: "Sustainability Focus", desc: "Eco-friendly production and reduced environmental impact." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center transition hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                {/* Icon Container */}
                <div className="w-16 h-16 bg-[#FF4500] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {item.icon}
                </div>

                {/* Principle Title */}
                <h3 className="text-xl font-semibold text-[#002147] mb-2">{item.title}</h3>

                {/* Principle Description */}
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏅 Certifications & Compliance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-[#002147] text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Certifications & Compliance
          </motion.h2>

          <ul className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4">
            <li>✅ ISO 9001: Quality Management Certification</li>
            <li>✅ API & OEM Approvals: Certified by major automotive brands</li>
            <li>✅ Environmental Standards Compliance: Sustainable manufacturing</li>
            <li>✅ Continuous Lab Testing: Ensuring top-tier product performance</li>
          </ul>
        </div>
      </section>

      {/* 🚀 CTA Section */}
      <section className="py-16 bg-[#002147] text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Choose Uncompromised Quality
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            With Moonal Udhyog’s superior quality lubricants, you ensure reliability, 
            efficiency, and long-lasting performance. Trust in excellence, trust in quality.
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              to="/products"
              className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
            >
              Explore Our Products
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default QualityPolicyPage;
