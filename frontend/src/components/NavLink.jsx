import { Link } from "react-router-dom";

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
  >
    {label}
  </Link>
);

export default NavLink;
