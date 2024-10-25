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
      <div
        className="hidden md:block w-full md:w-1/2 bg-cover"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="w-full h-full md:w-1/2 flex flex-col justify-center items-center p-10 ">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
          {[
            { name: 'user_name', placeholder: 'Username' },
            { name: 'first_name', placeholder: 'First name' },
            { name: 'last_name', placeholder: 'Last name' },
            { name: 'email', placeholder: 'Email', type: 'email' },
            { name: 'phone_number', placeholder: 'Phone number' },
            { name: 'password', placeholder: 'Password', type: 'password' },
            { name: 'repeat_password', placeholder: 'Repeat password', type: 'password' },
          ].map((field, index) => (
            <div key={index}>
              <input
                type={field.type || 'text'}
                name={field.name}
                className="mt-1 block w-full p-4 border border-gray-800 rounded-md"
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-3 bg-primary text-white rounded-md">
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4">
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

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default Signup;
