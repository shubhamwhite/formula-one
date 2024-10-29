import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { END_POINT } from '../api/endPoint';
import banner from '../assets/banner/wp10415959-f1-driver-wallpapers.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    repeat_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(END_POINT.REGISTRATION_API_URL, formData);

      if (response.status === 201) {
        const token = response.data.data.access_token; 
        localStorage.setItem('token', token);
        navigate('/login'); 
        toast.success('Signup successful!');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.data?.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);
      console.error('Signup failed:', errorMessage);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left Section with Background Image */}
      <div
        className="w-full md:w-1/2 h-[50vh] md:h-screen bg-cover"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Right Section with Sign Up Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10 bg-white min-h-screen">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Sign Up</h2>

        {/* Form */}
        <form className="space-y-3 md:space-y-4 w-full max-w-sm " onSubmit={handleSubmit}>
          {[
            { name: 'user_name', placeholder: 'Username' },
            { name: 'first_name', placeholder: 'First Name' },
            { name: 'last_name', placeholder: 'Last Name' },
            { name: 'email', placeholder: 'Email', type: 'email' },
            { name: 'phone_number', placeholder: 'Phone Number' },
            { name: 'password', placeholder: 'Password', type: 'password' },
            { name: 'repeat_password', placeholder: 'Repeat Password', type: 'password' },
          ].map((field, index) => (
            <div key={index}>
              <input
                type={field.type || 'text'}
                name={field.name}
                className="mt-1 block w-full p-2 md:p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="px-4 py-3 w-full bg-blue-600 text-white rounded-md md:w-auto md:px-6 hover:bg-blue-700 focus:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Redirect */}
        <div className="mt-3 md:mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={handleLoginRedirect} 
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Login here
            </button>
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default Signup;
