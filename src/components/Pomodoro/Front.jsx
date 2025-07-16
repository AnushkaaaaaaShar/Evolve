
import { useState } from 'react'
import Clock from './Clock'
import SettingsOp from './SettingsOp';
import SettingsContext from './SettingContext';


function Front() {
  const [showSettings, setshowSettings] = useState(false);
  const[WorkMinutes, setWorkMinutes] = useState(25);
  const[BreakMinutes, setBreakMinutes] = useState(5);

  return (
    <main> 
      <SettingsContext.Provider value={{
        showSettings,
        setshowSettings,
        WorkMinutes, 
        BreakMinutes, 
        setBreakMinutes,
        setWorkMinutes,

      }}>
      {showSettings ?<SettingsOp/> : <Clock/>}
      </SettingsContext.Provider>
      
    </main>
  )
}

export default Front