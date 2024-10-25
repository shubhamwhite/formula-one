import { Link } from 'react-router-dom';

const BreadCrumb = ({ currentPath }) => {
  return (
    <nav className="z-10 pb-11"> {/* Remove fixed positioning */}
      <Link to="/" className="text-blue-600 hover:underline">Home</Link> / 
      <span className="text-gray-600"> {currentPath}</span>
    </nav>
  );
};

export default BreadCrumb;
