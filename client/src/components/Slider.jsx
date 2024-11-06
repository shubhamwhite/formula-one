import { useState, useEffect } from 'react';
import ReactImg from '../assets/slider/Grand-Prix-Store-McLaren-2024-jpg.webp'; // Replace with your actual path
import VueImg from '../assets/slider/8636141.jpg'; // Replace with your actual path
import AngularImg from '../assets/slider/8636367.jpg'; // Replace with your actual path

const Slider = () => {
  const slides = [
    {
      image: ReactImg,
      text: 'React is a popular JavaScript library for building user interfaces, especially for single-page applications.'
    },
    {
      image: VueImg,
      text: 'Vue is an open-source model–view–viewmodel JavaScript framework for building user interfaces and single-page applications.'
    },
    {
      image: AngularImg,
      text: 'Angular is a platform for building mobile and desktop web applications using TypeScript/JavaScript and other languages.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="my-6 px-6 flex flex-col items-center justify-center w-full">
      <div className="relative w-full h-[70vh] overflow-hidden shadow-lg rounded-lg group cursor-pointer transition-all duration-300 ease-in-out"> 
        {/* Slide image */}
        <img
          src={slides[currentSlide].image}
          alt="Slide"
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105" 
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 ease-in-out"></div>
        {/* Slide text */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
          <p className="text-lg font-semibold">{slides[currentSlide].text}</p>
        </div>
      </div>

      {/* Dash indicators */}
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-10 mx-1 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
