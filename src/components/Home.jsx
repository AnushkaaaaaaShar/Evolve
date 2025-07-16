import React from "react";
import Bentobox from "./Bentobox";
import logo from "/images/logo.png";
import { SlSocialInstagram, SlSocialGithub , SlSocialLinkedin } from "react-icons/sl";

const Home = () => {
  return (
    <div className="w-full min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Top Logo */}
        <div className="h-24">
          <Bentobox 
          
            className="col-span-12 h-24 "
            imgSrc={logo}
            bgColor="#EEA990"
          />
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-12 gap-6 h-56">
          <Bentobox 
            className="col-span-4 h-56 font-sans text-4xl" 
            title="Habit Tracker"
            bgColor="#C48388"
            to="/habit-tracker"
          />
<Bentobox className="col-span-4 h-56 relative overflow-hidden rounded-2xl" to="/evolve">
  {/* Radial Red Blur */}
  <div className="absolute inset-0 z-0 flex items-center justify-center">
  <div className="w-[150%] h-[150%] bg-[radial-gradient(circle,_rgba(139,0,0,1)_0%,_#F5E1A4_80%)] blur-3xl opacity-90" />

  </div>

  {/* Title */}
  <div className="absolute inset-0 z-10 flex items-center justify-center">
    <h3 className="text-2xl font-bold font-sans text-[#8b0000]"> What is Evolve?</h3>
  </div>
</Bentobox>

 
          <Bentobox 
            className="col-span-4 h-56" 
            title="Pomodoro"
            bgColor="#D17868"
            to="https://evolve-pomodoro-timer.vercel.app/"
          />
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-12 gap-6 h-56">
          <Bentobox 
            className="col-span-3 h-56" 
            title="Password manager"
            bgColor="#EEA990"
            to="/password-manager"
          />
          <Bentobox 
            className="col-span-4 h-56" 
            title="TO-DO LIST"
            bgColor="#C48388"
            to="/todo"
          />

<Bentobox 
            className="col-span-5 h-56" 
            title="Notes"
            bgColor="#EEA990"
            to="/notes"
          />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-6">
        <Bentobox 
          className="col-span-12 h-24 flex flex-col items-center justify-center text-center"
          title="Small steps every day lead to big changes."
          text="© 2025 Evolve. All rights reserved."
          bgColor="#E38B6C"
          to="/settings"
          icon={[<SlSocialInstagram />, <SlSocialGithub/>, <SlSocialLinkedin />]}
        />


        </div>
      </div>
    </div>
  );
};

export default Home;
