import { motion } from "framer-motion";
import { Lock, ShieldCheck, UserCheck, Eye, Globe, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      
      {/* 🚀 Page Header */}
      <div className="bg-[#03033d9c] text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Privacy & Security Policy</h1>
        <p className="text-lg text-gray-200 mt-2">
          Your privacy matters. We ensure data protection, transparency, and security in all our operations.
        </p>
      </div>

      {/* 🔐 Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-[#002147] text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Protecting Your Privacy & Ensuring Security
          </motion.h2>
          <motion.p
            className="text-gray-700 text-lg max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            At Moonal Udhyog PVT. LTD., we are committed to safeguarding your personal data and ensuring strict confidentiality. Our security policies ensure compliance with global standards and ethical data management.
          </motion.p>
        </div>
      </section>

      {/* 🔒 Privacy Principles */}
      <section className="py-16 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-[#002147] text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Core Privacy Commitments
          </motion.h2>

          {/* Privacy Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Lock className="h-12 w-12 text-white" />, title: "Data Security", desc: "We use advanced encryption to protect your information." },
              { icon: <ShieldCheck className="h-12 w-12 text-white" />, title: "Strict Confidentiality", desc: "Your personal data is never shared without consent." },
              { icon: <UserCheck className="h-12 w-12 text-white" />, title: "User Control", desc: "You have full control over your data and preferences." },
              { icon: <Eye className="h-12 w-12 text-white" />, title: "Transparent Policies", desc: "We ensure clear and honest data collection practices." },
              { icon: <Globe className="h-12 w-12 text-white" />, title: "Compliance & Regulations", desc: "Adhering to GDPR, CCPA, and other privacy standards." },
              { icon: <FileText className="h-12 w-12 text-white" />, title: "Regular Updates", desc: "Our policies are continuously refined to keep your data safe." }
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

      {/* 📜 Detailed Privacy Policy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-[#002147] text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How We Handle Your Data
          </motion.h2>

          <ul className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4">
            <li>✅ Data Collection – We collect only essential information needed for services.</li>
            <li>✅ Data Usage – Your data is used solely for business operations, never misused.</li>
            <li>✅ Third-Party Sharing – We never sell or share personal information without your consent.</li>
            <li>✅ Cookies & Tracking – Used for better user experience but never for personal data tracking.</li>
            <li>✅ Your Rights – Request deletion or access to your stored data at any time.</li>
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
            Your Privacy, Our Responsibility
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            We prioritize your data protection and security. Moonal Udhyog ensures full transparency and compliance with privacy regulations.
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              to="/contact"
              className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
            >
              Contact Us for More Info
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicyPage;
