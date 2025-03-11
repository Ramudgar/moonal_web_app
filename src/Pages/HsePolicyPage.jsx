import { motion } from "framer-motion";
import { ShieldCheck, Users, TrendingUp, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HSEPolicyPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      
      {/* 🚀 Page Header */}
      <div className="bg-[#03033d9c] text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Health, Safety & Environmental (HSE) Policy</h1>
        <p className="text-lg text-gray-200 mt-2">
          Our commitment to maintaining the highest safety and environmental standards.
        </p>
      </div>

      {/* 🌍 Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-[#002147] text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Commitment to Health, Safety, and Environment
          </motion.h2>
          <motion.p
            className="text-gray-700 text-lg max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            At Moonal Udhyog PVT. LTD., we are dedicated to ensuring a safe workplace, 
            reducing environmental impact, and promoting sustainability in all our operations.
            Our HSE policy ensures the well-being of our employees, partners, and communities 
            while striving for continuous improvement in safety and environmental practices.
          </motion.p>
        </div>
      </section>

      {/* 🔹 HSE Commitments Section */}
      <section className="py-16 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-[#002147] text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our HSE Commitments
          </motion.h2>

          {/* Commitments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck className="h-12 w-12 text-white" />, title: "Workplace Safety", desc: "Ensuring safe working conditions and reducing occupational hazards." },
              { icon: <Users className="h-12 w-12 text-white" />, title: "Employee Training", desc: "Providing regular safety and environmental training for all employees." },
              { icon: <TrendingUp className="h-12 w-12 text-white" />, title: "Risk Management", desc: "Identifying and mitigating risks through proactive assessment." },
              { icon: <Award className="h-12 w-12 text-white" />, title: "Regulatory Compliance", desc: "Following all national and international HSE laws and guidelines." },
              { icon: <CheckCircle className="h-12 w-12 text-white" />, title: "Emergency Preparedness", desc: "Implementing effective response plans for potential emergencies." },
              { icon: <ShieldCheck className="h-12 w-12 text-white" />, title: "Environmental Responsibility", desc: "Minimizing waste, emissions, and promoting eco-friendly practices." }
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

                {/* Commitment Title */}
                <h3 className="text-xl font-semibold text-[#002147] mb-2">{item.title}</h3>

                {/* Commitment Description */}
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ HSE Goals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-[#002147] text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Health, Safety & Environmental Goals
          </motion.h2>

          <ul className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4">
            <li>✅ Zero workplace injuries and accidents.</li>
            <li>✅ Compliance with all national and international safety regulations.</li>
            <li>✅ Continuous reduction of carbon footprint and waste generation.</li>
            <li>✅ Encouraging a culture of safety and accountability among employees.</li>
            <li>✅ Conducting regular audits and improvements in HSE practices.</li>
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
            Join Us in Building a Safer Future
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            At Moonal Udhyog, we believe that safety and environmental protection are everyone's responsibility.
            Together, we can create a better and more sustainable future.
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
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HSEPolicyPage;
