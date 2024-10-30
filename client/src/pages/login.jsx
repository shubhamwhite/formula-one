import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { END_POINT } from '../api/endPoint';
import banner from '../assets/banner/f1_car.jpg';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  // Function to handle navigation to the registration page
  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  // Function to handle form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(END_POINT.LOGIN_API_URL, {
        email,
        password,
      });

      // Check if login is successful
      if (response.data && response.data.message === "Login successful") {
        const userData = response.data.data.user;

        // Store user information in local storage
        localStorage.setItem('user_name', userData.user_name);
        localStorage.setItem('first_name', userData.first_name);
        localStorage.setItem('last_name', userData.last_name);
        localStorage.setItem('phone_number', userData.phone_number);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('avatar', userData.avatar);
        localStorage.setItem('_id', userData._id);
        localStorage.setItem('access_token', response.data.data.access_token);
        localStorage.setItem('refresh_token', response.data.data.refresh_token);
        
        // Navigate to the home page
        navigate('/');
      } else {
        // Handle unexpected response structure
        toast.error('Unexpected response. Please try again.'); // Use toast for error message
      }
    } catch (error) {
      // Handle errors (e.g., invalid login)
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.data?.message || 'Login failed. Please try again.'; // Show error message
        toast.error(errorMessage); // Use toast for error message
      } else {
        toast.error('An error occurred. Please try again.'); // Generic error message
      }
    }
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left Side Image */}
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Right Side Login Form */}
      <div className="w-full h-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form className="space-y-4 w-full max-w-sm" onSubmit={handleLoginSubmit}>
          <div>
            <input
              type="email"
              className="mt-1 block w-full p-4 border border-gray-800 rounded-md"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="mt-1 block w-full p-4 border border-gray-800 rounded-md"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" className="px-4 py-3 bg-primary text-white rounded-md">
              Login
            </button>
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button onClick={handleRegisterClick} className="text-blue-600 hover:underline">
              Register here
            </button>
          </p>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
    </div>
  );
};

export default Login;
