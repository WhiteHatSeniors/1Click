import { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import logo from "../assets/logo.png";
import { useAuthContext } from "../context/AuthContext";
import useLogout from '../hooks/useLogout';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);
  const  navigate = useNavigate()
  const { dispatch, state } = useAuthContext();

  const logout = useLogout();

  const handleLogout = (e) => {
    e.preventDefault();
    const response = fetch('/api/logout', {
      method: 'POST',
      credentials: 'same-origin'
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    dispatch({ type: 'LOGOUT' });
   navigate('/login')
  };


  // console.log("USER: ", state)

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

    console.log(state.user)

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-semibold text-lg">
            <img src={logo} alt="Logo" className="w-32 h-32 mx-auto" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
            <NavLink to="/recommended" label="Events For you" />
              <NavLink to="/search" label="Find An Event" />
              {state.user && <NavLink to="/create" label="List your Event" />}
              {state.user && <NavLink to="/my-events" label="My Events" />}
              {state.user && <NavLink to="/list" label="Event Manager" /> }
              {state.user && <NavLink to="/network" label="Your Network" />}
              {/* {state.user && <NavLink to="/blogs" label="Blogs" />} */}
              {state.user && <NavLink to="/edit-profile" label="Edit Profile" />}
              {!(state.user) && <NavLink to="/" label="Home"/>}
              {!(state.user) ? <NavLink to="/login" label="Login" /> : 
              <button
              onClick={handleLogout}
              type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-2 mr-2 m-2 dark:bg-red-600 dark:hover:bg-red-700 text-center">
              Logout
            </button>}
              {/* {!(state.user) && <NavLink to="/signup" label="Sign Up" />} */}
          </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Responsive Hamburger Menu */}
       {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/recommended" label="Events For you" />
              <NavLink to="/search" label="Find An Event" />
              {state.user && <NavLink to="/create" label="List your Event" />}
              {state.user && <NavLink to="/create" label="My Events" />}
              {state.user && <NavLink to="/list" label="Event Manager" /> }
              {state.user && <NavLink to="/network" label="Your Network" />}
              {/* {state.user && <NavLink to="/blogs" label="Blogs" />} */}
              {state.user && <NavLink to="/edit-profile" label="Edit Profile" />}
              {!(state.user) && <NavLink to="/" label="Home"/>}
              {!(state.user) ? <NavLink to="/login" label="Login" /> : 
              <button
              onClick={handleLogout}
              type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-2 mr-2 m-2 dark:bg-red-600 dark:hover:bg-red-700 text-center">
              Logout
            </button>}
              {!(state.user) && <NavLink to="/signup" label="Sign Up" />}
          </div>
        </div>
      )} 
    </nav>
  );
};

export default Navbar;
