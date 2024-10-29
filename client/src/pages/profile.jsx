import { useState, useEffect } from "react";
import { END_POINT } from "../api/endPoint";
import profileIcon from "../assets/menu/user_9505872.png"
import walletIcon from "../assets/menu/wallet_16994123.png"
import termIcon from "../assets/menu/term-condition_17662577.png"
import settingIcon from "../assets/menu/setting.png"
import openIcon from '../assets/icon/menu-burger_3917762.png'
import closeIcon from '../assets/icon/cross-small_4338828.png'
import BreadCrumb from "../components/BreadCrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'

const Profile = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("personalInfo");
  
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };


  const [isAgreed, setIsAgreed] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.freepik.com/256/13450/13450044.png?uid=R168510653&ga=GA1.1.487493721.1726747734&semt=ais_hybrid"
  );
  const [newAvatar, setNewAvatar] = useState(null); // Store new avatar file
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  });
 
  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        // Using Axios to fetch user profile data
        const response = await axios.get(END_POINT.GET_USERINFO_API_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const { userProfile } = response.data; // Extract userProfile directly from response data
       
        setFormData({
          username: userProfile.user_name,
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          email: userProfile.email,
          phoneNumber: userProfile.phone_number,
        });

        const userAvatar = await axios.get(END_POINT.GET_AVATAR, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const { avatar } = userAvatar.data;
        setAvatar(avatar); // Set avatar, using existing default if not provided
      } catch (error) {
        if(error.response.status === 401){
          navigate("/login");
          localStorage.clear()
          
        }
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
    setNewAvatar(file); // Save file for submission
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    if (!token || !newAvatar) return; // Ensure token and avatar are present

    try {
      const formData = new FormData();
      formData.append("avatar", newAvatar);

      await axios.post(END_POINT.UPDATE_AVATAR, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Avatar updated successfully."); // Show success toast
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Failed to update avatar."); // Show error toast
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "personalInfo":
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Avatar Upload</h3>
            <div className="flex flex-col mb-6">
              <div className="w-24 h-24 rounded-full border-2 border-pri flex items-center justify-center mb-4 overflow-hidden relative p-1">
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
            <h3 className="text-2xl font-semibold mb-4">
              Personal Information
            </h3>
            <form className="w-full space-y-4">
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Username:
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    First Name:
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    Last Name:
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    Email:
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    Phone Number:
                  </label>
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
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 border rounded-md hover:bg-gray-300 transition"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        );

      case "wallet":
        return (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Wallet</h3>
            <p className="text-lg">
              Balance: <span className="font-bold">$100</span>
            </p>
          </div>
        );

      case "termAndCondition":
        return (
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-2xl font-semibold mb-4">
              Terms and Conditions
            </h3>
            <div className="overflow-y-auto max-h-60 py-4">
              <p className="text-sm leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
              <p className="text-sm leading-6 mt-2">
                Mauris sit amet odio in lacus tempor laoreet...
              </p>
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
                isAgreed
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
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
 
        <div
          className={`bg-light p-6 flex flex-col space-y-4 shadow-md transition-all duration-300 ease-in-out ${isMenuVisible ? "w-1/4" : "w-26"}`}
        >
 
          <button
            onClick={toggleMenu}
            className="flex items-center p-4  rounded-md text-left transition"
          >
            <img
              src={isMenuVisible ? closeIcon : openIcon}
              alt={isMenuVisible ? "Close Menu" : "Open Menu"}
              className="w-6 h-6"
            />
          </button>
  
          {/* Personal Information Button */}
          <button
            onClick={() => setActiveSection("personalInfo")}
            className={`flex items-center p-4 rounded-md text-left transition ${
              activeSection === "personalInfo"
                ? "bg-primary text-white "
                : "bg-light text-gray-700 hover:bg-gray-200 "
            }`}
          >
            <img src={profileIcon} alt="Profile" className="w-6 h-6 mr-2" />
            {isMenuVisible && <span>Personal Information</span>}
          </button>
  
          {/* Wallet Button */}
          <button
            onClick={() => setActiveSection("wallet")}
            className={`flex items-center p-4 rounded-md text-left transition ${
              activeSection === "wallet"
                ? "bg-primary text-white"
                : "bg-light text-gray-700 hover:bg-gray-200"
            }`}
          >
            <img src={walletIcon} alt="Wallet" className="w-6 h-6 mr-2" />
            {isMenuVisible && <span>Wallet</span>}
          </button>
  
          {/* Terms and Conditions Button */}
          <button
            onClick={() => setActiveSection("termAndCondition")}
            className={`flex items-center p-4 rounded-md text-left transition ${
              activeSection === "termAndCondition"
                ? "bg-primary text-white"
                : "bg-light text-gray-700 hover:bg-gray-200"
            }`}
          >
            <img src={termIcon} alt="Terms" className="w-6 h-6 mr-2" />
            {isMenuVisible && <span>Terms and Conditions</span>}
          </button>
          <button
            onClick={() => setActiveSection("setting")}
            className={`flex items-center p-4 rounded-md text-left transition ${
              activeSection === "setting"
                ? "bg-primary text-white"
                : "bg-light text-gray-700 hover:bg-gray-200"
            }`}
          >
            <img src={settingIcon} alt="setting" className="w-6 h-6 mr-2" />
            {isMenuVisible && <span>Setting</span>}
          </button>

         

        </div>
  
        {/* Main content */}
        <div
          className={`flex-grow p-20 pt-20 transition-all duration-300 ease-in-out ${isMenuVisible ? "w-3/4" : "w-full"}`}
        >
          <div className="w-full max-w-5xl">
            <div className="w-full mb-4">
              <BreadCrumb currentPath="Profile" />
            </div>
            {renderSectionContent()}
          </div>
        </div>
      </div>
      <ToastContainer /> 
    </>
  );
  
};

export default Profile;