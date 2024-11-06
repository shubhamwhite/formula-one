import React, { useState, useEffect } from 'react';
// Import the fake betting data
import bettingData from '../../data/userBetting/bettingShow';

const BettingShow = () => {
  const [bettingInfo, setBettingInfo] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    // Simulate loading data from the JSON file
    setBettingInfo(bettingData);
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="m-8 rounded-md min-h-screen bg-gray-900 py-12 px-4">
      <div className="flex flex-wrap gap-6 justify-center">
        {bettingInfo.map((event, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-80 md:w-96 flex flex-col justify-between"
          >
            <h2 className="text-3xl font-bold text-white">{event.race}</h2>
            <p className="text-gray-400 mt-2">Event Date: {event.eventDate}</p>
            <p className="text-gray-400 mt-2 font-semibold">{event.category}</p>

            <div className="mt-4 flex-grow">
              <h3 className="text-xl font-semibold text-white">Betting Odds</h3>
              <ul className="text-gray-300 mt-2 space-y-2">
                {event.teams.map((team, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{team}</span>
                    <span className="font-bold">
                      {team === 'Red Bull Racing'
                        ? event.odds.redBullOdds
                        : team === 'Ferrari'
                        ? event.odds.ferrariOdds
                        : team === 'Mercedes'
                        ? event.odds.mercedesOdds
                        : event.odds.alpineOdds}{' '}
                      x
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-gray-400">Min Bet: ${event.odds.minBet}</p>
              <p className="text-gray-400">Max Bet: ${event.odds.maxBet}</p>
            </div>

            {expandedIndex === index && (
              <div className="mt-4 text-gray-300">
                {/* Displaying Additional Info */}
                <h4 className="text-xl font-semibold text-white">Additional Information</h4>
                <p><strong>Current Odds:</strong> {event.additionalInfo.currentOdds}</p>
                <div>
                  <h5 className="text-lg font-semibold text-white">Team Rankings:</h5>
                  <ul className="space-y-1">
                    {Object.entries(event.additionalInfo.teamRankings).map(([team, rank], idx) => (
                      <li key={idx} className="text-gray-300">
                        {team}: Rank {rank}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-300 mt-2"><strong>Note:</strong> {event.additionalInfo.note}</p>
              </div>
            )}

            <div className="flex items-center gap-4 mt-10">
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300">
                Place Bet
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                onClick={() => toggleExpand(index)}
              >
                {expandedIndex === index ? 'Show Less' : 'More Info'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BettingShow;
