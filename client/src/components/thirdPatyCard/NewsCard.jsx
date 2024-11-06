import { useEffect, useState } from 'react';
import { END_POINT } from '../../api/endPoint';
import axios from 'axios';
import fakeNewsData from '../../data/scoreCard/fakeNewsData'; // Import fake data

const NewsCard = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(END_POINT.NEWS_REPORT);
        if (response.data.length === 0) {
          throw new Error('No news data available');
        }
        setNews(response.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNews(fakeNewsData); // Use imported fake data on failure
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="m-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">F1 News</h1>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="loader">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 108 8 8 8 0 00-8-8zm1.414 4.586A6 6 0 116 12a6 6 0 019.586 4.586z"/>
            </svg>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentNews.map((item) => (
            <div key={item.dataSourceIdentifier} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {item.images && item.images.length > 0 && (
                <img src={item.images[0].url} alt={item.images[0].alt || item.headline} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold text-white">{item.headline}</h2>
                <p className="text-gray-300 mt-2">{item.description}</p>
                <a href={item.link} className="text-blue-400 mt-4 inline-block" target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-4 mt-6 items-center justify-center">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1} 
          className={`flex items-center justify-center py-2 px-4 rounded-md text-white transition-colors duration-200 
          ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          <span className="mr-2">Previous</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className={`flex items-center justify-center py-2 px-4 rounded-md text-white transition-colors duration-200 
          ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          <span className="mr-2">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
