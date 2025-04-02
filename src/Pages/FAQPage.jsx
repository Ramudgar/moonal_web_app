import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What are the benefits of becoming a Moonal Udhyog dealer?",
    answer:
      "As a dealer, you get competitive margins, marketing support, and exclusive distribution rights. You also receive technical training and access to premium lubricant products.",
  },
  {
    question: "What is the return policy for your products?",
    answer:
      "We accept returns within 7 days for defective or damaged products. Please refer to our Return Policy page for detailed information.",
  },
  {
    question: "How do I apply for a dealership?",
    answer:
      "You can apply for a dealership by filling out the online application form on our website. Our team will review your application and get back to you within 5-7 business days.",
  },
  {
    question: "What makes Moonal Udhyog lubricants unique?",
    answer:
      "Our lubricants are formulated with high-quality base oils and advanced additives, ensuring optimal performance, engine protection, and longer lifespan.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach out to our customer support team via email at support@moonaludhyog.com or call us at +977-XXXXXXXXXX.",
  },
];

const FAQPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-[#03033d9c] text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Find answers to common questions about our products, policies, and dealership opportunities.
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-5">
              {/* FAQ Question Button */}
              <button
                className="flex justify-between items-center w-full p-5 bg-white hover:bg-[#FF4500]/10 border border-gray-300 rounded-lg text-left focus:outline-none shadow-sm transition"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-semibold text-[#002147] text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-6 w-6 text-[#FF4500] transition-transform ${
                    activeAccordion === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* FAQ Answer */}
              {activeAccordion === index && (
                <div className="p-5 bg-white border-l-4 border-[#FF4500] rounded-b-lg mt-2 shadow-md">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12">
          <p className="text-gray-700 text-lg font-medium mb-4">
            Still have questions?  
            <a
              href="/contact"
              className="text-[#FF4500] hover:text-[#E63E00] transition"
            >
              &nbsp; Contact Our Support Team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
