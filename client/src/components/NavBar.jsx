import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const [avatar, setAvatar] = useState(""); // User avatar from local storage
  const dropdownRef = useRef(null); // Ref for the dropdown

  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {

    const token = localStorage.getItem("access_token");
    const storedAvatar = localStorage.getItem("avatar");

    if (token) {
      setIsLoggedIn(true);
      if (storedAvatar) {
        setAvatar(storedAvatar);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/login"); 
  };

  const handleLogout = () => {
    // Clear all localStorage items related to user data
    localStorage.removeItem('user_name');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('phone_number');
    localStorage.removeItem('avatar');
    localStorage.removeItem('_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  
    // Redirect to login page
    navigate('/login');
  };
  

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-primary p-4">
      <div className="max-w-7xl mx-auto px-2 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white font-bold text-2xl lg:text-4xl">
            LOGO
          </div>

          {/* Desktop Navigation */}
          <div className="hidden mobile:flex mobile:items-center mobile:ml-6">
            <div className="flex justify-around space-x-10 w-full">
              <a
                href="#"
                className="text-white hover:text-neutral px-3 py-2 rounded-md text-xl font-light"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:text-neutral px-3 py-2 rounded-md text-xl font-light"
              >
                About
              </a>
              <a
                href="#"
                className="text-white hover:text-neutral px-3 py-2 rounded-md text-xl font-light"
              >
                Services
              </a>
              <a
                href="#"
                className="text-white hover:text-neutral px-3 py-2 rounded-md text-xl font-light"
              >
                Contact
              </a>
            </div>

            {/* User Avatar and Dropdown */}
            <div className="relative ml-8 flex items-center">
              {isLoggedIn ? (
                <>
                  <img
                    className="h-12 w-14 rounded-full object-cover border-2 border-white hover:cursor-pointer"
                    src={avatar || "https://via.placeholder.com/150"}
                    alt="Profile of logged-in user"
                    onClick={toggleDropdown}
                  />

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 top-14 right-0 w-40 bg-white rounded-md shadow-lg"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:text-neutral hover:rounded-t-md"
                      >
                        Profile
                      </a>
                      <a
                        href="#"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-700 hover:text-neutral hover:rounded-b-md"
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </>
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
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </a>
            <a
              href="#"
              className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </a>
            {isLoggedIn ? (
              <>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="text-white hover:text-neutral block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </a>
                <div className="px-3 py-3 flex items-center space-x-2">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={avatar || "https://via.placeholder.com/150"}
                    alt="Profile of logged-in user"
                    onClick={toggleDropdown}
                  />
                  <p className="text-white">Shubham Panchal</p>
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
