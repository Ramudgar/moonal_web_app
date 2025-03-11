import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReturnPolicy from "../Pages/ReturnPolicy";
import HSEPolicyPage from "../Pages/HsePolicyPage";
import QualityPolicyPage from "../Pages/QualityPolicyPage";
import PrivacyPolicyPage from "../Pages/PrivacyPolicyPage";
import TermsAndConditions from "../Pages/TermsAndConditionPage";
import FAQPage from "../Pages/FAQPage";

const PolicyTabs = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("return");

  // Policy Categories
  const policies = useMemo(() => [
    { id: "return", name: "Return Policy", component: <ReturnPolicy /> },
    { id: "hse", name: "HSE Policy", component: <HSEPolicyPage /> },
    { id: "quality", name: "Quality Policy", component: <QualityPolicyPage /> },
    { id: "privacy", name: "Privacy & Security", component: <PrivacyPolicyPage /> },
    { id: "terms", name: "Terms & Conditions", component: <TermsAndConditions /> },
    { id: "faq", name: "FAQ", component: <FAQPage /> },
  ], []);

  // ✅ Detect URL hash on load and update active tab
  useEffect(() => {
    const hash = location.hash.replace("#", ""); // Remove #
    if (policies.some((policy) => policy.id === hash)) {
      setActiveTab(hash);
    }
  }, [location,policies]); // Runs when the URL changes

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 📌 Tab Navigation */}
      <div className="flex border-b border-gray-300 justify-center mb-8 overflow-x-auto">
        {policies.map((policy) => (
          <button
            key={policy.id}
            className={`py-3 px-6 font-medium text-lg focus:outline-none transition-all ${
              activeTab === policy.id
                ? "text-[#FF4500] border-b-2 border-[#FF4500]"
                : "text-gray-600 hover:text-[#FF4500]"
            }`}
            onClick={() => setActiveTab(policy.id)}
          >
            {policy.name}
          </button>
        ))}
      </div>

      {/* 📌 Tab Content with Smooth Transition */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // Ensures animation happens when content changes
            initial={{ opacity: 0, y: 10 }} // Start faded out & slightly lower
            animate={{ opacity: 1, y: 0 }} // Fade in & move up smoothly
            exit={{ opacity: 0, y: -10 }} // Fade out & move up slightly
            transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth timing
          >
            {policies.find((policy) => policy.id === activeTab)?.component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PolicyTabs;
