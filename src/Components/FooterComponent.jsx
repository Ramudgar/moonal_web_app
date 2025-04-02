import { motion } from "framer-motion";
import support from "../assets/images/support.jpg";
import competitiveprice from "../assets/images/competitiveprice.jpg";
import highdelivery from "../assets/images/fastdelivery.jpg";
import geniuneProduct from "../assets/images/premium.jpg";
import satisfaction from "../assets/images/satisfaction.jpg";
import { Link } from "react-router-dom";


const FooterComponent = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white py-10 box-border mx-auto px-8"
    >
      <div className="flex flex-wrap justify-center gap-4 md:justify-around text-center px-12">
        {[
          { img: satisfaction, text: "CUSTOMER SATISFACTION" },
          { img: highdelivery, text: "HIGH-DELIVERY SPEED" },
          { img: geniuneProduct, text: "PREMIUM QUALITY PRODUCTS" },
          { img: support, text: "24x7 SUPPORT" },
          { img: competitiveprice, text: "COMPETITIVE PRICES" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="w-40  "
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={item.img}
              className="w-full h-1/2 rounded-2xl mb-4"
              alt={item.text}
            />
            <p className="text-sm ">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-4">
        <div className="col-span-1 md:col-span-2  md:px-8">
          <h6 className="font-bold uppercase mb-4">About Us</h6>
          <p className="text-md text-gray-400">
            Moonal Engine Oil is a leading manufacturer of premium quality
            engine oils and lubricants. We are committed to providing the best
            products to our customers.
          </p>
          <div className="mt-4 bg-white rounded-full flex items-center px-4 py-2 w-auto  md:px-4 md:py-2 md:w-88">
            <input
              type="text"
              className="text-black border-0 outline-0 focus:ring-0 w-full"
              placeholder="enter your email"
            />
            <motion.button
              whileHover={{ scale: 1.025 }}
              className="bg-gray-800 text-white py-1 px-2 md:px-6 md:py-2 rounded-full md:me-2  hover:bg-red-600  cursor-pointer "
            >
              Subscribe
            </motion.button>
          </div>
        </div>

        {[
          {
            title: "Quick Links",
            links: [
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Products", path: "/products" },
              { name: "Dealership", path: "/dealership" },
              { name: "Contact", path: "/contact" },
              { name: "Event", path: "/event#upcoming" },
              { name: "Gallery", path: "/event#gallery" },
            ],
          },
          {
            title: "Policies and Reviews",
            links: [
              { name: "Return Policy", path: "/policy#return" },
              { name: "HSE Policy", path: "/policy#hse" },
              { name: "Quality Policy", path: "/policy#quality" },
              { name: "Privacy & Security", path: "/policy#privacy" },
              { name: "Terms & Conditions", path: "/policy#terms" },
              { name: "FAQ", path: "/policy#faq" },
              { name: "Reviews", path: "/reviews" },
            ],
          },
        ].map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase mb-4">{section.title}</h6>
            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <motion.li key={i} whileHover={{ scale: 1.025 }}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#FF4500] flex items-center gap-2"
                  >
                    <i className="ri-arrow-right-wide-fill"></i> {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}

        {/* contact info */}

        <div className="col-span-1 md:col-span-1">
          <h6 className=" font-bold uppercase"> Contact Us</h6>
          <ul className="space-y-2 text-gray-400 mt-4">
            <li>
              <i className="ri-map-pin-line"></i>{" "}
              <span className="px-2">
                {" "}
                Ayodhyanagar, Golbazar-4, <br />
                &emsp;&emsp; Siraha, Nepal <br />{" "}
              </span>
            </li>
            <li>
              <i className="ri-phone-line"></i>{" "}
              <span className="px-2">+977-9742865121, 9816732358</span>
            </li>
            <li>
              <i className="ri-mail-line"></i>
              <a href="mailto:moonaludhyog@gmail.com">
                <span className="px-2"> moonaludhyog@gmail.com</span>
              </a>
            </li>
          </ul>
          <ul className="flex gap-6 mt-4 text-center justify-start">
            <li className="flex gap-4 mt-4 bg-slate-400  rounded-full">
              <a
                className=" bg-gray-600 p-2 font-bold rounded-full hover:bg-orange-500"
                href="https://www.instagram.com/moonalengineoil"
              >
                <i className="ri-facebook-fill text-xl"></i>
              </a>
            </li>
            <li className="flex gap-4 mt-4">
              <a
                className=" bg-gray-600 p-2 font-bold rounded-full hover:bg-orange-500"
                href="https://www.facebook.com/moonalengineoil"
              >
                <i className="ri-instagram-fill text-xl"></i>
              </a>
            </li>
            <li className="flex gap-4 mt-4">
              <a
                className=" bg-gray-600 p-2 font-bold rounded-full hover:bg-orange-500"
                href="https://www.facebook.com/moonalengineoil"
              >
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </li>
            <li className="flex gap-4 mt-4">
              <a
                className=" bg-gray-600 p-2 font-bold rounded-full hover:bg-orange-500"
                href="https://www.twitter.com/moonalengineoil"
              >
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-200 my-6" />
      <div className="flex flex-wrap justify-around text-gray-400 py-2 text-sm">
        <p>© 2023 Moonal Engine Oil. All rights reserved.</p>
        <p>
          Designed & Developed by{" "}
          <a href="https://nexpioneer.com/" className="text-[#FF4500]">
            Nexpioneer
          </a>
        </p>
      </div>
    </motion.footer>
  );
};

export default FooterComponent;
