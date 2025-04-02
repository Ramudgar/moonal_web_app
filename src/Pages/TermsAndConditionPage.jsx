import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-[#03033d9c] text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using our services.
            </p>
          </div>
        </div>

        {/* Terms & Conditions Content */}
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#002147] mb-6">1. Introduction</h2>
            <p className="text-gray-700 mb-6">
              Welcome to Moonal Udhyog PVT. LTD. These terms and conditions outline the rules and
              regulations for using our website and purchasing our products.
            </p>
            
            <h2 className="text-2xl font-bold text-[#002147] mb-6">2. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing this website and/or making a purchase, you agree to comply with these
              Terms and Conditions. If you do not agree, please do not use our website.
            </p>

            <h2 className="text-2xl font-bold text-[#002147] mb-6">3. Use of Services</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Users must be at least 18 years old or have parental permission.</li>
              <li>Our products must be used in accordance with manufacturer guidelines.</li>
              <li>Unauthorized distribution or reselling of products is strictly prohibited.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#002147] mb-6">4. Intellectual Property Rights</h2>
            <p className="text-gray-700 mb-6">
              All content, logos, trademarks, and product designs are the exclusive property of
              Moonal Udhyog PVT. LTD. You may not use, copy, or distribute our materials without
              written permission.
            </p>

            <h2 className="text-2xl font-bold text-[#002147] mb-6">5. Pricing & Payment</h2>
            <p className="text-gray-700 mb-6">
              All prices are listed in the local currency and are subject to change without notice.
              We accept multiple payment methods, and all transactions must be completed before
              product dispatch.
            </p>

            <h2 className="text-2xl font-bold text-[#002147] mb-6">6. Warranty Disclaimer</h2>
            <p className="text-gray-700 mb-6">
              Our products come with a manufacturer’s warranty. However, Moonal Udhyog is not liable
              for damages caused by improper usage or negligence.
            </p>

            <h2 className="text-2xl font-bold text-[#002147] mb-6">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              Moonal Udhyog shall not be held responsible for indirect damages, including loss of
              profits, business interruption, or damage due to product misuse.
            </p>

            <h2 className="text-2xl font-bold text-[#002147] mb-6">8. Privacy & Data Protection</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please read our <a href="/privacy-policy" className="text-[#FF4500] font-medium">Privacy Policy</a>
              &nbsp;to understand how we collect, use, and protect your personal information.
            </p>

            <h2 className="text-2xl font-bold text-[#002147] mb-6">9. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              Moonal Udhyog reserves the right to update these Terms & Conditions at any time. Users
              will be notified of any significant changes via our website.
            </p>

            <h2 className="text-2xl font-bold text-[#002147] mb-6">10. Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <p className="text-gray-800 font-semibold mt-2">📩 support@moonaludhyog.com</p>
            <p className="text-gray-800 font-semibold">📞 +977-01-XXXXXXX</p>
          </motion.div>
        </div>
      </div>
  );
};

export default TermsAndConditions;
