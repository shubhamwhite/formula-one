import { useEffect, useState } from "react";
import { END_POINT } from "../../api/endPoint";
import fakeDrivers from "../../data/scoreCard/fakeCurrentScore"; // Import JSON data

const ScoreCard = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScoreboard = async () => {
      setLoading(true);
      try {
        const response = await fetch(END_POINT.GET_CURRENT_SCOREBOARD);
        const data = await response.json();

        // Check if valid data is received
        if (data && data.length > 0) {
          const transformedDrivers = data.map((driver) => ({
            id: driver.id,
            name: driver.displayName,
            carName: driver.vehicle.manufacturer,
            score: parseInt(driver.score, 10),
            time: driver.behindTime || driver.time || "DNF",
            image:
              driver.headshot ||
              "https://img.freepik.com/free-vector/user-groups-with-add-delete-heart-question-mark_78370-4734.jpg?t=st=1730810637~exp=1730814237~hmac=d274ebaf7e54e2a69428478ef8dfc59c49147135e300c25ec5e765e285c293d9&w=740",
            flag: driver.logo,
            position: driver.place,
            profileLink:
              driver.profileLink ||
              `http://localhost:3003/api/f1/drivers/${driver.id}`,
          }));
          setDrivers(transformedDrivers);
        } else {
          console.error("No valid driver data received, using fake data.");
          setDrivers(fakeDrivers); // Use fake data as fallback
        }
      } catch (error) {
        console.error("Error fetching the scoreboard data:", error);
        setDrivers(fakeDrivers); // Use fake data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchScoreboard();
  }, []);

  return (
    <div className="m-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-black mb-6">
        Current Scoreboard
      </h1>
      <div className="h-96 overflow-y-scroll p-4 bg-gray-800 rounded-lg shadow-lg w-full hide-scrollbar">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader">
              <svg
                className="animate-spin h-10 w-10 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 108 8 8 8 0 00-8-8zm1.414 4.586A6 6 0 116 12a6 6 0 019.586 4.586z"
                />
              </svg>
            </div>
          </div>
        ) : (
          drivers.map((driver) => (
            <div
              key={driver.position}
              className="relative flex items-center my-4 p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-600"
            >
              <div
                className={`absolute top-4 right-4 rounded-full w-8 h-8 flex items-center justify-center ${
                  driver.position === 1
                    ? "bg-yellow-500"
                    : driver.position === 2
                    ? "bg-gray-400"
                    : "bg-gray-600"
                } text-white font-bold text-xs`}
              >
                #{driver.position}
              </div>
              <div className="mr-4">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="w-20 h-20 rounded-full border-4 border-gray-600 object-cover" // Add object-cover to maintain aspect ratio
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h2 className="text-lg font-bold text-white">
                    {driver.name}
                  </h2>
                  <img
                    src={driver.flag}
                    alt={`${driver.name}'s flag`}
                    className="w-6 h-6 ml-2"
                  />
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  Car: {driver.carName}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  Score: {driver.score}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  Time: {driver.time}
                </p>
                <a
                  href={driver.profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 mt-2 hover:underline"
                >
                  More Info
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
