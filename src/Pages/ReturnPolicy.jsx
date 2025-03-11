import { useState } from "react";
import { ChevronDown, Mail, PhoneCall } from "lucide-react";

const ReturnPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="bg-[#03033d9c] text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Return Policy</h1>
        <p className="text-xl mt-3 max-w-2xl mx-auto">
          Our commitment is to ensure customer satisfaction with every purchase.
        </p>
      </div>

      {/* Return Policy Details */}
      <div className="max-w-3xl mx-auto py-12">
        <h2 className="text-3xl font-semibold text-[#002147] mb-6">Return Guidelines</h2>
        <p className="text-gray-700 leading-relaxed">
          If you're not completely satisfied with your purchase, you may return it within
          7 days of the delivery date. Please ensure that:
        </p>

        <ul className="list-disc pl-5 mt-4 text-gray-700">
          <li>The product is unused and in original packaging.</li>
          <li>Proof of purchase (invoice or order confirmation) is provided.</li>
          <li>Opened or customized products cannot be returned.</li>
          <li>Return shipping costs are the responsibility of the customer.</li>
        </ul>

        {/* Return Process */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-[#002147] mb-6">How to Return a Product?</h2>
          <div className="space-y-6">
            {[
              {
                step: "1. Initiate a Return Request",
                details: "Contact our support team with your order details and reason for return."
              },
              {
                step: "2. Return Approval & Instructions",
                details: "Our team will review your request and provide return instructions."
              },
              {
                step: "3. Ship the Product",
                details: "Pack the item securely and ship it to our return address."
              },
              {
                step: "4. Refund/Exchange Processing",
                details: "Once we receive and inspect the product, we will process your refund or exchange."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 border-l-4 border-[#FF4500] shadow-sm rounded-lg">
                <h3 className="font-semibold text-lg text-[#002147]">{item.step}</h3>
                <p className="text-gray-700 mt-1">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Policy */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-[#002147] mb-6">Refund Policy</h2>
          <p className="text-gray-700">
            Refunds will be processed within **5-7 business days** after the returned item
            has been received and inspected. The refund will be credited to the original
            payment method.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-[#002147] mb-6">Frequently Asked Questions</h2>

          <div className="space-y-5">
            {[
              {
                question: "What if I receive a damaged or defective product?",
                answer: "If you receive a damaged or defective product, please contact us immediately with photos, and we will arrange a replacement or refund."
              },
              {
                question: "Are return shipping costs covered?",
                answer: "Return shipping costs are the responsibility of the customer unless the return is due to a mistake on our part."
              },
              {
                question: "Can I exchange a product instead of a refund?",
                answer: "Yes, we offer exchanges for eligible products. Contact us for assistance."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-300 rounded-lg">
                <button
                  className="flex justify-between items-center w-full p-5 bg-white hover:bg-[#FF4500]/10 transition rounded-lg focus:outline-none"
                  onClick={() => toggleSection(index)}
                >
                  <span className="font-semibold text-[#002147] text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`h-6 w-6 text-[#FF4500] transition-transform ${
                      activeSection === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeSection === index && (
                  <div className="p-5 bg-white border-l-4 border-[#FF4500] rounded-b-lg mt-1 shadow-md">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-[#002147] mb-4">Need Assistance?</h2>
          <p className="text-gray-700">
            If you have any questions or need help with your return, feel free to contact
            our support team.
          </p>

          <div className="mt-6 flex justify-center space-x-6">
            <a
              href="mailto:support@moonaludhyog.com"
              className="text-[#FF4500] hover:text-[#E63E00] flex items-center space-x-2 transition"
            >
              <Mail className="w-6 h-6" />
              <span>support@moonaludhyog.com</span>
            </a>
            <a
              href="tel:+977-123456789"
              className="text-[#FF4500] hover:text-[#E63E00] flex items-center space-x-2 transition"
            >
              <PhoneCall className="w-6 h-6" />
              <span>+977-123456789</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
