import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { END_POINT } from "../api/endPoint";
import axios from "axios";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const tokenExpiry = localStorage.getItem("token_expiry");
  
    if (token && tokenExpiry) {
      const isExpired = Date.now() > Number(tokenExpiry);
      if (isExpired) {
        handleLogout();
        return;
      }
    }
  
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(token);
    } else {
      setLoading(false); // No token means not loading
    }
  }, []);
  
  const fetchUserInfo = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(END_POINT.GET_USERINFO_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { userProfile } = response.data;
      
      if (userProfile) {
        setAvatar(userProfile.avatar);
        setUserName(userProfile.user_name);
        localStorage.setItem("avatar", userProfile.avatar);
        localStorage.setItem("user_name", userProfile.user_name);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/login");
  };
  
  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage items
    setIsLoggedIn(false);
    navigate("/login");
  };
  
  const handleHome = () => {
    navigate("/");
  };
  
  const profileVisit = () => {
    if (!localStorage.access_token) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };
  
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="bg-primary p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-2 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 font-bold text-2xl lg:text-4xl bg-gradient-to-r from-sky-500 via-purple-600 to-red-500 bg-clip-text text-transparent">
            TurboBets
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden mobile:flex mobile:items-center mobile:ml-6 absolute inset-x-0 justify-center">
            <div className="flex justify-around space-x-10">
              <a
                href="#"
                className="text-white hover:text-accent px-3 py-2 rounded-md text-xl font-light"
                onClick={handleHome}
              >
                Home
              </a>
              <a href="#" className="text-white hover:text-accent px-3 py-2 rounded-md text-xl font-light">About</a>
              <a href="#" className="text-white hover:text-accent px-3 py-2 rounded-md text-xl font-light">Services</a>
              <a href="#" className="text-white hover:text-accent px-3 py-2 rounded-md text-xl font-light">Contact</a>
            </div>
          </div>

          {/* Right: User Avatar and Dropdown */}
          <div className="flex items-center">
            {loading ? (
              <div className="text-white">Loading...</div> // Display loading state
            ) : isLoggedIn ? (
              <div className="relative flex items-center space-x-2">
                <div className="relative items-center space-x-2 hidden md:flex">
                  <img
                    className="h-12 w-12 rounded-full object-cover border border-white hover:cursor-pointer p-1"
                    src={avatar || "https://via.placeholder.com/150"}
                    alt="Profile of logged-in user"
                    onClick={toggleDropdown}
                  />
                  <span
                    className="text-white font-small hover:cursor-pointer font-light"
                    onClick={toggleDropdown}
                  >
                    {userName}
                  </span>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 top-16 right-0 w-40 bg-white rounded-md shadow-lg border"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:text-neutral hover:bg-primary hover:rounded-t-md"
                      onClick={profileVisit}
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:text-neutral hover:bg-primary hover:rounded-b-md"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="#"
                onClick={handleLogin}
                className="text-white hover:text-neutral px-3 py-2 rounded-md text-xl font-light"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 right-0 flex items-center mobile:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:text-neutral focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 ">
            <a
              href="#"
              className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium"
              onClick={handleHome}
            >
              Home
            </a>
            <a href="#" className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#" className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="#" className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            {isLoggedIn ? (
              <>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </a>
                <div
                  className="px-3 py-2 rounded-md text-base font-medium flex items-center"
                  onClick={profileVisit}
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover mr-2"
                    src={avatar || "https://via.placeholder.com/150"}
                    alt="Profile of logged-in user"
                  />
                  <span className="text-white">{userName}</span>
                </div>
              </>
            ) : (
              <a
                href="#"
                onClick={handleLogin}
                className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
