import React from 'react'
import Slid from './Slid';
import BreakSlider from './BreakSlider';
import Backbtn from './Backbtn';
import { useContext } from 'react';
import SettingsContext from './SettingContext';
const SettingsOp = () => {
  const SettingsInfo = useContext(SettingsContext);
  return (
    <>
    <div className='text-left '> 
    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center sm:text-left whitespace-nowrap">
  Set your plan!
</h1>

      <label className='block mb-20 mt-14'><Slid/> </label>
      
      <label className='block '><BreakSlider/> </label>
      
    </div>
    <Backbtn onClick={() => SettingsInfo.setshowSettings(false)}/>
    </>
  )
}

export default SettingsOp