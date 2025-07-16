import React from 'react';

const Backbtn = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-white bg-pink-950 hover:bg-gray-900 
        focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-full 
        text-sm px-5 py-3 sm:mt-16 mb-2 mt-2c
         transition-all duration-300"
    >
      Back
    </button>
  );
};

export default Backbtn;
