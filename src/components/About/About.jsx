import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { BsCheckCircle } from 'react-icons/bs'; // New icon for bullet points

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#D8B7A1] via-[#F5E1A4] to-[#F3D9B1] p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">Welcome to Evolve</h2>
          <p className="mt-3 text-lg text-gray-600">
            Evolve is more than just a productivity app. It's your personal growth companion, helping you track habits, stay focused, and boost your self-improvement journey.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Our Mission */}
          <div className="flex flex-col justify-center items-center space-y-6 bg-white shadow-lg rounded-lg p-6">
            <div className="w-20 h-20 bg-[#F6C9C6] rounded-full flex items-center justify-center">
              <FaInfoCircle className="text-4xl text-[#8b0000]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
            <p className="text-gray-600 text-center">
              At Evolve, we aim to create a seamless experience that empowers individuals to manage their time effectively, develop productive habits, and unlock their full potential. Whether you're looking to improve your focus or track your personal growth, we’ve got you covered.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col justify-center items-center space-y-6 bg-white shadow-lg rounded-lg p-6">
            <div className="w-20 h-20 bg-[#F6C9C6] rounded-full flex items-center justify-center">
              <BsCheckCircle className="text-4xl text-[#8b0000]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Key Features</h3>
            <ul className="list-inside space-y-3 text-gray-600">
              <li className="flex items-center">
                <BsCheckCircle className="mr-2 text-[#8b0000]" /> Track your daily habits and routines
              </li>
              <li className="flex items-center">
                <BsCheckCircle className="mr-2 text-[#8b0000]" /> Pomodoro timer for focus and productivity
              </li>
              <li className="flex items-center">
                <BsCheckCircle className="mr-2 text-[#8b0000]" /> Password-Manager to keep all your passwords safe in one place. 
              </li>
              <li className="flex items-center">
                <BsCheckCircle className="mr-2 text-[#8b0000]" /> Easy-to-use interface for all ages
              </li>
            </ul>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-center text-gray-800">Why Choose Evolve?</h3>
          <p className="text-center text-lg text-gray-600 mt-4">
            Evolve isn’t just about getting tasks done, it's about developing a growth mindset that will help you in every aspect of life. By using the tools we provide, you'll not only improve your time management but also become more consistent, disciplined, and motivated to achieve your goals.
          </p>
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Evolve. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

