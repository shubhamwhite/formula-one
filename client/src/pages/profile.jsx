import { useState, useEffect } from "react";
import { END_POINT } from "../api/endPoint";
import dots from '../assets/icon/dots.png';
import BreadCrumb from "../components/BreadCrumb";
import profile from '../assets/menu/account.png'
import wallet from '../assets/menu/wallet.png'
import termcondition from '../assets/menu/info.png'

const Profile = () => {
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [isMenuOpen, setIsMenuOpen] = useState(true); // New state for menu open/close
  const [isAgreed, setIsAgreed] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.freepik.com/256/13450/13450044.png?uid=R168510653&ga=GA1.1.487493721.1726747734&semt=ais_hybrid"
  );
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(END_POINT.GET_USERINFO_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        const { userProfile } = data;
        setFormData({
          username: userProfile.user_name,
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          email: userProfile.email,
          phoneNumber: userProfile.phone_number,
        });
        setAvatar(userProfile.avatar);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "personalInfo":
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4 ">Avatar Upload</h3>
            <div className="flex flex-col mb-6">
              <div className="w-24 h-24 rounded-full border-2 border-pri flex items-center justify-center mb-4 overflow-hidden relative p-2">
                <input
                  type="file"
                  accept="image/*"
                  id="imageUpload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleAvatarUpload}
                />
                <img
                  id="avatar-preview"
                  src={avatar}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover rounded-full"
                />
                <label
                  htmlFor="imageUpload"
                  className="absolute right-0 bottom-0 bg-white rounded-full border border-gray-300 p-1 shadow cursor-pointer hover:bg-gray-100 transition"
                >
                  <i className="fas fa-camera text-blue-500"></i>
                </label>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
            <form className="w-full space-y-4">
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label className="block text-sm font-medium mb-1">Username:</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label className="block text-sm font-medium mb-1">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label className="block text-sm font-medium mb-1">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label className="block text-sm font-medium mb-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label className="block text-sm font-medium mb-1">Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
                  Discard
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  Save
                </button>
              </div>
            </form>
          </div>
        );

        case "wallet":
                return (
                  <div className="bg-gray-50 rounded-lg shadow-lg w-1/3 p-6">
                    <h3 className="text-2xl font-semibold mb-4">Wallet</h3>
                    <p className="text-lg">
                      Balance: <span className="font-bold">$100</span>
                    </p>
                  </div>
                );
        
              case "termAndCondition":
                return (
                  <div className="flex flex-col items-start space-y-4">
                    <h3 className="text-2xl font-semibold mb-4">Terms and Conditions</h3>
                    <div className="overflow-y-auto max-h-60 p-2">
                      <p className="text-sm leading-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                      <p className="text-sm leading-6 mt-2">Mauris sit amet odio in lacus tempor laoreet...</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={isAgreed}
                        onChange={() => setIsAgreed(!isAgreed)}
                        className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="agree" className="text-sm">
                        I agree to the Terms and Conditions
                      </label>
                    </div>
                    <button
                      type="button"
                      disabled={!isAgreed}
                      className={`px-4 py-2 rounded-md transition ${
                        isAgreed ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Accept
                    </button>
                  </div>
                );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Left-side menu */}
        <div className={`bg-primary h-full p-6 flex flex-col space-y-4 transition-all duration-300 ${isMenuOpen ? "w-1/4" : "w-26"}`}>
          {/* Toggle Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center mb-4">
            <img src={isMenuOpen ? dots : dots} alt="Menu Toggle" className="w-10 h-10 ml-2" />
          </button>
  
          {/* Menu Items */}
          <div className="flex flex-col">
            <button
              onClick={() => setActiveSection("personalInfo")}
              className={`flex items-center mb-3 p-4 rounded-full text-left transition ${activeSection === "personalInfo" ? "bg-blue-500 text-white " : "bg-gray text-gray-700 hover:bg-gray-200"}`}
            >
              <img src={profile} alt="Profile Icon" className={`w-6 h-6 mr-2 ${isMenuOpen ? '' : 'text-blue-500'}`} />
              {isMenuOpen && <span>Personal Information</span>}
            </button>
  
            <button
              onClick={() => setActiveSection("wallet")}
              className={`flex items-center p-4 mb-3 rounded-full text-left transition  ${activeSection === "wallet" ? "bg-blue-500 text-white" : "bg-gray text-gray-700 hover:bg-gray-200"}`}
            >
              <img src={wallet} alt="Wallet Icon" className={`w-6 h-6 mr-2 ${isMenuOpen ? '' : 'text-blue-500'}`} />
              {isMenuOpen && <span>Wallet</span>}
            </button>
  
            <button
              onClick={() => setActiveSection("termAndCondition")}
              className={`flex items-center p-4 rounded-full text-left transition ${activeSection === "termAndCondition" ? "bg-blue-500 text-white" : "bg-gray text-gray-700 hover:bg-gray-200"}`}
            >
              <img src={termcondition} alt="Terms Icon" className={`w-6 h-6 mr-2 ${isMenuOpen ? '' : 'text-blue-500'}`} />
              {isMenuOpen && <span>Terms and Conditions</span>}
            </button>

          </div>
        </div>
  
        {/* Right-side content */}
        <div className="w-3/4 flex flex-col h-full w-full">
          <div className="flex-grow flex flex-col justify-start items-center p-6 pt-20 overflow-auto">
            <div className="w-full max-w-5xl">
              <div className="w-full mb-4">
                <BreadCrumb currentPath="Profile" />
              </div>
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  
  
};

export default Profile;
