// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home"; // Import your Home component
import Login from "./pages/login"; // Import your Login component
import Signup from "./pages/signup"; // Import your Signup component
import Profile from "./pages/profile"; // Import your Profile component
import AuthGuard from "./components/AuthGuard"; // Adjust the import path as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
