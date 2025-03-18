import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  return (
    <header className="bg-[#001F3F] text-white p-4 flex justify-between items-center shadow-md">
      <button onClick={toggleSidebar} className="text-2xl">
        <i className="ri-menu-line"></i>
      </button>
      <div>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-300">
          <span className="text-white">Admin</span>
          {paths.slice(1).map((path, index) => (
            <span key={index} className="mx-2">
              / <span className="text-[#FF4500]">{path.replace("-", " ")}</span>
            </span>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <i className="ri-notification-3-fill text-xl"></i>
        <i className="ri-user-3-fill text-xl"></i>
      </div>
    </header>
  );
};
Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
