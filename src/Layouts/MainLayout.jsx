import PropTypes from "prop-types";
import NavbarComponent from "../Components/NavbarComponent";
import FooterComponent from "../Components/FooterComponent";

export default function MainLayout({ children }) {
  return (
    <>
      <NavbarComponent /> {/* Sticky Navbar */}
      <main className="min-h-screen">{children}</main> {/* Page Content */}
      {/* <Footer />  */}
      <FooterComponent /> 
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
