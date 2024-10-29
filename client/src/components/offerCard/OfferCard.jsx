import React from 'react';

const OfferCard = () => {
  return (
    <div className="flex border border-gray-300 shadow-lg p-4 rounded-lg max-w-2xl">
      {/* Left side (Text) */}
      <div className="w-7/12 pr-4">
        <p className="text-gray-600">Hello world</p>
        <h1 className="text-2xl font-bold">Hello user</h1>
      </div>

      {/* Right side (Image) */}
      <div className="w-5/12">
        <img
          src="https://via.placeholder.com/300"
          alt="Offer"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default OfferCard;
