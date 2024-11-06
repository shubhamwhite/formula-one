import { useEffect, useState } from 'react';
import axios from 'axios';
import fakeData from '../../data/scoreCard/fakeUpcomingMatch.json';

const UpCommingMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch data from API
    const fetchUpcomingRaces = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get('http://localhost:3003/api/f1/upcoming-race');
        setMatches(response.data);
      } catch (error) {
        console.error("Failed to fetch upcoming races:", error);
        // Use fake data if API call fails
        setMatches(fakeData);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUpcomingRaces();
  }, []);

  return (
    <div className="m-8">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Upcoming Matches</h1>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="loader">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 108 8 8 8 0 00-8-8zm1.414 4.586A6 6 0 116 12a6 6 0 019.586 4.586z" />
            </svg>
          </div>
        </div>
      ) : (
        /* Scrollable Match List with Hidden Scrollbar */
        <div className="h-96 overflow-y-auto p-4 bg-gray-700 rounded-lg shadow-lg hide-scrollbar">
          <div className="grid grid-cols-1 gap-4">
            {matches.map((match, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h2 className="text-xl font-bold text-white">{match.grandPrix} - {match.circuit}</h2>
                <p className="text-gray-300 mt-2">Date: {new Date(match.startDate).toLocaleDateString()}</p>
                <p className="text-gray-300">Time: {new Date(match.startDate).toLocaleTimeString()}</p>
                <p className={`mt-2 text-sm ${match.completed ? 'text-red-500' : 'text-green-500'}`}>
                  Status: {match.completed ? 'Completed' : 'Scheduled'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpCommingMatch;
