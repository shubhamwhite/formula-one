import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { END_POINT } from '../api/endPoint';
import banner from '../assets/banner/f1_car.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
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
      {/* Left Side Image */}
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Right Side Sign Up Form */}
      <div className="w-full h-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="user_name"
              className="mt-1 block w-full p-4 border border-gray-800 rounded-md"
              placeholder="Username"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full p-4 border border-gray-800 rounded-md"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full p-4 border border-gray-800 rounded-md"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="repeat_password"
              className="mt-1 block w-full p-4 border border-gray-800 rounded-md"
              placeholder="Repeat Password"
              value={formData.repeat_password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" className="px-4 py-3 bg-primary text-white rounded-md">
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Redirect */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={handleLoginRedirect} className="text-blue-600 hover:underline">
              Login here
            </button>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default Signup;
