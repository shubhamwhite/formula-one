import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { END_POINT } from '../api/endPoint';
import banner  from '../assets/banner/f1_car.jpg'
import axios from 'axios'; // Import axios for making API calls

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 

  // Function to handle navigation to the registration page
  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the register page
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

        localStorage.setItem('user_name', userData.user_name);
        localStorage.setItem('first_name', userData.first_name);
        localStorage.setItem('last_name', userData.last_name);
        localStorage.setItem('phone_number', userData.phone_number);
        localStorage.setItem('avatar', userData.avatar);
        localStorage.setItem('_id', userData._id);
        localStorage.setItem('access_token', response.data.data.access_token);
        localStorage.setItem('refresh_token', response.data.data.refresh_token);
        
        // Navigate to the home page
        navigate('/');
      } else {
        // Handle unexpected response structure
        setError('Unexpected response. Please try again.');
      }
    } catch (error) {
      // Handle errors (e.g., invalid login)
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login failed. Please try again.'); // Show error message
      } else {
        setError('An error occurred. Please try again.'); // Generic error message
      }
    }
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover', // Ensures the image covers the div
          backgroundPosition: 'center', // Centers the image
        }}
      >
    
      </div>

      {/* Right Side Login Form */}
      <div className="w-full h-full md:w-1/2 flex flex-col justify-center items-center p-10 ">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <form className="space-y-4 w-full max-w-sm" onSubmit={handleLoginSubmit}>
          <div>
            <input
              type="email"
              className="mt-1 block w-full p-4 border border-gray-800  rounded-md"
              placeholder="Email"
              value={email} // Bind email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="mt-1 block w-full p-4 border border-gray-800  rounded-md"
              placeholder="Password"
              value={password} // Bind password state
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
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
    </div>
  );
};

export default Login;
