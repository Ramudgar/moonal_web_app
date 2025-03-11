import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Users,
  TrendingUp,
  Quote,
  Flag,
  Rocket,
  CheckCircle,
  Leaf,
  Globe,
  Factory,
} from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import mission from "../assets/images/mission.png";

const AboutUs = () => {
  const timeline = [
    {
      year: "2005",
      title: "Foundation of Moonal Udhyog",
      description:
        "Started as a small-scale lubricant manufacturer, driven by a passion for quality and innovation.",
      icon: <Flag className="h-8 w-8 text-white" />,
    },
    {
      year: "2010",
      title: "Breakthrough in Engine Lubrication",
      description:
        "Introduced high-performance synthetic lubricants that extended engine life and reduced wear.",
      icon: <TrendingUp className="h-8 w-8 text-white" />,
    },
    {
      year: "2015",
      title: "National Expansion & Dealer Network",
      description:
        "Expanded operations across Nepal, partnering with 100+ dealers and distributors.",
      icon: <Award className="h-8 w-8 text-white" />,
    },
    {
      year: "2023",
      title: "Pioneering Sustainable Lubricants",
      description:
        "Launched an eco-friendly lubricant range, reducing carbon footprint and enhancing efficiency.",
      icon: <Rocket className="h-8 w-8 text-white" />,
    },
  ];

  // our teams
  const teamMembers = [
    {
      name: "Rajesh Sharma",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
      description:
        "Rajesh Sharma founded Moonal Udhyog with a vision to redefine lubricant quality in Nepal. With over 20 years of experience, he drives innovation and sustainability in the industry.",
      linkedin: "#",
      email: "ceo@moonaludhyog.com",
    },
    {
      name: "Aarav Joshi",
      position: "Chief Technical Officer",
      image: "https://images.unsplash.com/photo-1604072367756-f77cf7c8d815",
      description:
        "An expert in lubricant technology, Aarav leads our R&D team, ensuring the highest quality standards and cutting-edge formulations.",
      linkedin: "#",
      email: "cto@moonaludhyog.com",
    },
    {
      name: "Priya Karki",
      position: "Head of Sales & Marketing",
      image: "https://images.unsplash.com/photo-1522091066250-665186289043",
      description:
        "Priya spearheads Moonal Udhyog’s market expansion, forging partnerships and driving customer engagement strategies.",
      linkedin: "#",
      email: "priya@moonaludhyog.com",
    },
    {
      name: "Kiran Shrestha",
      position: "Operations Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      description:
        "Kiran ensures smooth supply chain operations and efficient production, making Moonal Udhyog a trusted name in lubricants.",
      linkedin: "#",
      email: "ops@moonaludhyog.com",
    },
  ];
  return (
    <MainLayout>
      {/* page header or hero section */}
      <div className=" min-h-screen bg-gray-50">
        <div className="relative py-20 md:py-24 text-white text-center bg-gradient-to-r from-[#001F3F] via-[#002147] to-[#001F3F]">
          <motion.div
            className="relative z-10 px-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="container mx-auto px-6 lg:px-12 relative text-center">
              {/* Company Name & Intro */}
              <h2 className="text-5xl font-bold text-white drop-shadow-lg">
                Welcome to{" "}
                <span className="text-[#FF4500]">Moonal Udhyog PVT. LTD.</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4 leading-relaxed">
                A leading manufacturer of high-performance lubricants, committed
                to quality, innovation, and sustainability. We specialize in
                advanced automotive and industrial lubrication solutions that
                enhance performance, efficiency, and reliability.
              </p>

              {/* Business Overview - Key Highlights */}
              <div className="mt-10 flex flex-wrap justify-center gap-12 text-center">
                <div>
                  <h3 className="text-3xl font-semibold text-[#FF4500]">
                    100+
                  </h3> 
                  <p className="text-gray-300">Dealers Nationwide</p>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold text-[#FF4500]">25+</h3>
                  <p className="text-gray-300">Premium Lubricant Products</p>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold text-[#FF4500]">
                    5+ Years
                  </h3>
                  <p className="text-gray-300">Industry Experience</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* our story and mission section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Company Image */}
              <motion.div
                className="relative rounded-lg overflow-hidden shadow-lg  "
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={mission}
                  alt="Company Story"
                  className="w-full h-96 object-cover"
                />
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-[#002147] mb-6">
                  Our Story & Mission
                </h2>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  Founded with a vision to redefine the lubrication industry,
                  <span className="text-[#FF4500] font-semibold">
                    {" "}
                    Moonal Udhyog
                  </span>{" "}
                  has been at the forefront of innovation and excellence. We
                  specialize in high-performance lubricants that enhance
                  efficiency, protect machinery, and extend longevity.
                </p>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  Our mission is simple:
                  <span className="text-[#FF4500] font-semibold">
                    {" "}
                    To deliver premium quality lubricants
                  </span>{" "}
                  that empower businesses, ensuring sustainability and maximum
                  productivity.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  With a commitment to excellence, trust, and innovation, we
                  continue to evolve, meeting industry demands and customer
                  expectations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/*Company journey   */}
        <section className="py-24 bg-[#F9FAFB]">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.h2
              className="text-4xl font-extrabold text-[#002147] mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our <span className="text-[#FF4500]">Journey</span>
            </motion.h2>

            {/* 🏆 Timeline Layout */}
            <div className="relative border-l-4 border-[#FF4500] pl-6 space-y-10">
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white shadow-md rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* 📅 Year Badge */}
                  <span className="absolute -left-12 top-6 bg-[#FF4500] text-white font-semibold px-4 py-2 rounded-lg shadow-lg">
                    {event.year}
                  </span>

                  {/* 🏆 Event Title & Description */}
                  <div className="flex items-center gap-4">
                    <div className="bg-[#FF4500] p-3 rounded-full shadow-lg">
                      {event.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#002147] mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core value and why choose us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Section Heading */}
            <motion.h2
              className="text-4xl font-bold text-[#002147] mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our <span className="text-[#FF4500]">Core Values</span> & Why
              Choose Us?
            </motion.h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Uncompromised Quality",
                  desc: "Our lubricants are rigorously tested to ensure maximum performance and reliability in extreme conditions.",
                  icon: <ShieldCheck className="h-12 w-12 text-white" />,
                },
                {
                  title: "Industry Expertise",
                  desc: "With years of experience, we provide expert lubrication solutions for automotive, industrial, and marine applications.",
                  icon: <Award className="h-12 w-12 text-white" />,
                },
                {
                  title: "Innovative Technology",
                  desc: "We continuously invest in R&D to bring the latest advancements, reducing friction and enhancing engine efficiency.",
                  icon: <TrendingUp className="h-12 w-12 text-white" />,
                },
                {
                  title: "Customer-Centric Approach",
                  desc: "Our customer-first policy ensures seamless service with technical support and personalized consultation.",
                  icon: <Users className="h-12 w-12 text-white" />,
                },
                {
                  title: "Eco-Friendly Manufacturing",
                  desc: "We are committed to sustainability by using biodegradable additives and reducing carbon emissions.",
                  icon: <Leaf className="h-12 w-12 text-white" />,
                },
                {
                  title: "Global Standards",
                  desc: "Our products meet international quality certifications, ensuring reliability across global markets.",
                  icon: <Globe className="h-12 w-12 text-white" />,
                },
                {
                  title: "Advanced Production Facility",
                  desc: "State-of-the-art manufacturing units equipped with automation and AI-driven quality control.",
                  icon: <Factory className="h-12 w-12 text-white" />,
                },
                {
                  title: "Sustainability & Safety",
                  desc: "We prioritize safety at every level—from raw material sourcing to final product delivery.",
                  icon: <CheckCircle className="h-12 w-12 text-white" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                  whileHover={{ y: -5 }}
                >
                  {/* Icon Box */}
                  <div className="w-16 h-16 bg-[#FF4500] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {item.icon}
                  </div>

                  {/* Value Title */}
                  <h3 className="text-xl font-semibold text-[#002147] mb-2">
                    {item.title}
                  </h3>

                  {/* Value Description */}
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ceo section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center">
            {/* 📸 CEO Image with Stylish Frame */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center md:justify-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="https://via.placeholder.com/400x450" // Replace with real CEO image
                  alt="CEO of Moonal Udhyog"
                  className="rounded-lg shadow-lg w-80 md:w-96 border-4 border-[#FF4500]"
                />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FF4500] rounded-full flex items-center justify-center shadow-md">
                  <Quote className="h-8 w-8 text-white" />
                </div>
              </div>
            </motion.div>

            {/* 🏆 CEO Message Content */}
            <motion.div
              className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10 text-center md:text-left"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-4xl font-extrabold text-[#002147] mb-4 leading-snug">
                A Message from <span className="text-[#FF4500]">Our CEO</span>
              </h2>

              {/* 🌍 Vision & Mission */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                At <span className="font-bold text-xl">Moonal</span>, we are not just manufacturers; we are &nbsp;
                 <span className="font-semibold">engineering trust</span> and shaping the future of lubrication.
                Every drop of our product reflects innovation, quality, and
                sustainability.
              </p>

              {/* 🚀 Business Philosophy */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Our journey began with a simple yet powerful goal: To
                deliver high-performance lubricants that solve real industry
                challenges—enhancing efficiency, reducing wear, and maximizing
                productivity. Today, we are proud to be a trusted name in the lubrication industry, driven by a passion for excellence and a commitment to customer satisfaction.
              </p>

              {/* 🔬 Research & Innovation */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Our team of experts and engineers continuously innovates
                to provide cutting-edge lubrication solutions for
                automobiles, heavy machinery, and industrial applications.
              </p>

              {/* 🌍 Sustainability & Global Impact */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                We are committed to sustainability, reducing environmental
                impact while optimizing engine and machine performance. Our
                focus remains on delivering excellence and building
                lasting partnerships.
              </p>

              {/* ✍ CEO Name & Signature */}
              <div className="mt-6 border-l-4 border-[#FF4500] pl-4">
                <p className="text-xl font-bold text-gray-800">[CEO Name]</p>
                <p className="text-gray-600">CEO & Founder, Moonal Udhyog</p>
              </div>
            </motion.div>
          </div>
        </section>
        {/* 🤝 Meet Our Team (Optional) */}
        <section className="py-24 bg-gray-100">
          <div className="container mx-auto px-6 lg:px-12">
            {/* 🏆 Section Title */}
            <motion.h2
              className="text-4xl font-extrabold text-[#002147] mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Meet Our <span className="text-[#FF4500]">Leadership</span> Team
            </motion.h2>

            {/* 👨‍💼 Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* 🔹 Profile Image */}
                  <div className="w-32 h-32 mx-auto overflow-hidden rounded-full border-4 border-[#FF4500]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 🏆 Name & Position */}
                  <h3 className="text-xl font-bold text-[#002147] mt-4 text-center">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-center text-sm font-medium">
                    {member.position}
                  </p>

                  {/* 📄 Description */}
                  <p className="text-gray-700 text-sm mt-4 text-center">
                    {member.description}
                  </p>

                  {/* 🔗 Contact & Social Links */}
                  <div className="mt-4 flex justify-center space-x-4">
                    {/* LinkedIn (Remix Icon) */}
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF4500] hover:text-[#E63E00] transition"
                    >
                      <i className="ri-linkedin-box-fill text-2xl"></i>
                    </a>

                    {/* Email (Remix Icon) */}
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[#FF4500] hover:text-[#E63E00] transition"
                    >
                      <i className="ri-mail-fill text-2xl"></i>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔥 Call-To-Action */}
        <section className="py-20  bg-[#002147] text-white text-center relative overflow-hidden">
          {/* 🌟 Animated Background Overlay */}
          <motion.div
            className="absolute inset-0 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            {/* 📢 CTA Heading */}
            <motion.h2
              className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Grow With <span className="text-[#FF4500]">Moonal Udhyog</span>
            </motion.h2>

            {/* 💡 CTA Subheading */}
            <motion.p
              className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 opacity-90 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Become a dealer and join our expanding network of partners driving
              the <span className="font-bold">future of lubricants</span>. Let's
              build success together!
            </motion.p>

            {/* 🚀 CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* 🎯 Apply for Dealership */}
              <Link
                to="/dealership#apply"
                className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#E63E00] transition transform hover:scale-105"
              >
                Apply for Dealership
              </Link>

              {/* 📩 Contact Us */}
              <Link
                to="/contact"
                className="border-2 border-[#FF4500] text-[#FF4500] px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#FF4500] hover:text-white transition transform hover:scale-105"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
