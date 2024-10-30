import { useState, useEffect } from 'react';
import ReactImg from '../assets/slider/Grand-Prix-Store-McLaren-2024-jpg.webp'; // Replace with your actual path
import VueImg from '../assets/slider/8636141.jpg';   // Replace with your actual path
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
    <div className="my-6 px-6 flex flex-col items-center justify-center w-full overflow-hidden cursor-pointer">
      <div className="relative w-full h-[70vh] overflow-hidden shadow-lg transform transition-transform duration-500 rounded-lg"> {/* Duration set to 500ms for smoother transition */}
        {/* Blue overlay and image */}
        <div className="relative h-full transition-opacity duration-1000 ease-in-out"> {/* Added transition for opacity */}
          <img
            src={slides[currentSlide].image}
            alt="Slide"
            className="w-full h-full object-cover rounded-lg opacity-100 transition-opacity duration-1000 ease-in-out" // Add opacity transition
          />
          <div className="absolute inset-0 bg-primary opacity-10"></div>
        </div>
      </div>

      {/* Dash indicators */}
      <div className="flex justify-center mt-4 rounded-full">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-10 mx-1 rounded-full ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
