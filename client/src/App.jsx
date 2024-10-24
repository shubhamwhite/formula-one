
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';  // Import your Home component
import Login from './pages/login'; // Import your Login component
import Signup from './pages/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
