import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Playbtn from './Playbtn';
import Pausebtn from './Pausebtn';
import Settingbtn from './Settingbtn';
import { useContext, useState, useEffect, useRef} from 'react';
import SettingsContext from './SettingContext';
import Resetbtn from './Resetbtn';

const Clock = () => {
  const SettingsInfo = useContext(SettingsContext);
  const[isPaused, setisPaused] = useState(true);
  const[SecondsLeft, setSecondsLeft] = useState(0);
  const[mode, setMode] = useState('work');//work, break, nulll

  const SecondsLeftRef = useRef(SecondsLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  function tick(){
    SecondsLeftRef.current--; 
    setSecondsLeft(SecondsLeftRef.current);
  }

  function SwitchMode(){
    const nextMode = modeRef.current ==='work' ? 'break': 'work';
    const NextSeconds = (nextMode === 'work'? SettingsInfo.WorkMinutes: SettingsInfo.BreakMinutes)*60; 
    //
    setMode(nextMode);
    modeRef.current = nextMode;
    //
    setSecondsLeft(NextSeconds);
    SecondsLeftRef.current = NextSeconds
  }
  function initTimer(){
    const initialTime = SettingsInfo.WorkMinutes * 60;
    setSecondsLeft(initialTime); 
    SecondsLeftRef.current = initialTime;
  }

  const playsound = () => {
    const audio = new Audio("/audio.wav"); // File in public folder
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reset to the beginning
    }, 5000);
  };

  function resetTimer() {
    const initialTime = mode === "work" 
      ? SettingsInfo.WorkMinutes * 60 
      : SettingsInfo.BreakMinutes * 60;
  
    setSecondsLeft(initialTime); 
    SecondsLeftRef.current = initialTime;
  }
  

  useEffect(()=>{
    initTimer();
    const interval =  setInterval(()=> {
     
      if(isPausedRef.current){
        return;
      }
      if(SecondsLeftRef.current === 0){
        playsound();
        return SwitchMode();
      }

      tick();
     
      }, 1000);
      return ()=> clearInterval(interval);
  }, [SettingsInfo])

  const TotalSec = mode ==='work' 
        ? SettingsInfo.WorkMinutes * 60
        : SettingsInfo.BreakMinutes * 60 ; 

  const Percentage = Math.round((SecondsLeft / TotalSec) * 100);
  const minutes = Math.floor(SecondsLeft/60); 

  let Seconds = SecondsLeft % 60; 
  if(Seconds < 10) Seconds = '0'+ Seconds; 

  return (
    
    <>
    <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto'>
    
     <CircularProgressbar value={Percentage} text={minutes + ':'+ Seconds} styles={buildStyles({
    // Colors
    pathColor:  mode ==='work'? '#E16A54': 	'#008000',
    trailColor: '#FAFFC5',
    textColor: ' #FAFFC5',
    strokeLinecap: 'butt',
  })}
  />   
    </div >
    <div className='flex flex-col sm:flex-row items-center justify-center mt-4' >
   {isPaused 
   ?  <Playbtn onClick={()=> {setisPaused(false); isPausedRef.current = false;}} /> 
   : <Pausebtn onClick={()=> {setisPaused(true); isPausedRef.current = true;}} />
   }
   <Resetbtn  onClick={resetTimer}/>
    
      </div>

      <div className='mt-4 '> 
         <Settingbtn onClick={() => SettingsInfo.setshowSettings(true)} /> 



      </div>
    </>

  )
}

export default Clock