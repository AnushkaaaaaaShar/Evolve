import React, { useState, useEffect } from 'react';

const Habit = () => {
    const [showOptions, setShowOptions] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [monthlyTasks, setMonthlyTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newWeeklyTask, setNewWeeklyTask] = useState('');
  const [newMonthlyTask, setNewMonthlyTask] = useState('');
  
  const days = ['1', '2', '3', '4', '5', '6', '7'];
  
  // Get current month info
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  
  // Create array of days for the current month
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTable = localStorage.getItem('selectedTable');
    if (storedTable) {
      setSelectedTable(storedTable);
      
      // Load tasks based on the selected table
      const storedDailyTasks = JSON.parse(localStorage.getItem('dailyTasks') || '[]');
      const storedWeeklyTasks = JSON.parse(localStorage.getItem('weeklyTasks') || '[]');
      const storedMonthlyTasks = JSON.parse(localStorage.getItem('monthlyTasks') || '[]');
      
      setDailyTasks(storedDailyTasks);
      setWeeklyTasks(storedWeeklyTasks);
      setMonthlyTasks(storedMonthlyTasks);
    }
  }, []);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedTable', selectedTable || '');
    localStorage.setItem('dailyTasks', JSON.stringify(dailyTasks));
    localStorage.setItem('weeklyTasks', JSON.stringify(weeklyTasks));
    localStorage.setItem('monthlyTasks', JSON.stringify(monthlyTasks));
  }, [selectedTable, dailyTasks, weeklyTasks, monthlyTasks]);
  
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  
  const selectTable = (tableType) => {
    console.log(`Selected table: ${tableType}`);
    setSelectedTable(tableType);
    setShowOptions(false);
  };
  
  const addDailyTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setDailyTasks([...dailyTasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };
  
  const addWeeklyTask = (e) => {
    e.preventDefault();
    if (newWeeklyTask.trim() !== '') {
      // Create a new weekly task with completion status for each day
      const newTask = {
        text: newWeeklyTask,
        days: days.map(() => false) // Array of 7 false values for each day
      };
      setWeeklyTasks([...weeklyTasks, newTask]);
      setNewWeeklyTask('');
    }
  };
  
  const addMonthlyTask = (e) => {
    e.preventDefault();
    if (newMonthlyTask.trim() !== '') {
      // Create a new monthly task with completion status for each day of the month
      const newTask = {
        text: newMonthlyTask,
        days: Array(daysInMonth).fill(false), // Array of false values for each day of the month
        month: `${currentMonth} ${currentYear}` // Store the month and year
      };
      setMonthlyTasks([...monthlyTasks, newTask]);
      setNewMonthlyTask('');
    }
  };
  
  const toggleDailyTask = (index) => {
    const updatedTasks = [...dailyTasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setDailyTasks(updatedTasks);
  };
  
  const toggleWeeklyTask = (taskIndex, dayIndex) => {
    const updatedTasks = [...weeklyTasks];
    updatedTasks[taskIndex].days[dayIndex] = !updatedTasks[taskIndex].days[dayIndex];
    setWeeklyTasks(updatedTasks);
  };
  
  const toggleMonthlyTask = (taskIndex, dayIndex) => {
    const updatedTasks = [...monthlyTasks];
    updatedTasks[taskIndex].days[dayIndex] = !updatedTasks[taskIndex].days[dayIndex];
    setMonthlyTasks(updatedTasks);
  };
  
  const removeDailyTask = (index) => {
    const updatedTasks = dailyTasks.filter((_, i) => i !== index);
    setDailyTasks(updatedTasks);
  };
  
  const removeWeeklyTask = (index) => {
    const updatedTasks = weeklyTasks.filter((_, i) => i !== index);
    setWeeklyTasks(updatedTasks);
  };
  
  const removeMonthlyTask = (index) => {
    const updatedTasks = monthlyTasks.filter((_, i) => i !== index);
    setMonthlyTasks(updatedTasks);
  };
  
  // Filter monthly tasks for the current month
  const currentMonthTasks = monthlyTasks.filter(task => 
    task.month === `${currentMonth} ${currentYear}` || !task.month
  );
  
  // Updated color classes with black background
  const colors = {
    bg: "bg-black", // Black background
    primary: "bg-[#292124]", // Dark shade for cards
    secondary: "bg-[#66545E]", // Dark mauve
    accent: "bg-[#EEA990]", // Peach as accent
    highlight: "bg-[#F6E0B5]", // Cream for highlights
    text: "text-[#F6E0B5]", // Cream text for contrast on dark
    textMuted: "text-[#A39193]", // Dusty rose for muted text
    buttonBg: "bg-[#AA6F73]", // Rosy brown for buttons
    buttonHover: "hover:bg-[#EEA990]", // Peach on hover
    buttonText: "text-black", // Black text on buttons
    inputBg: "bg-[#1a1a1a]", // Very dark gray for inputs
    inputBorder: "border-[#66545E]", // Dark mauve for borders
    tableBorder: "border-[#66545E]", // Dark mauve for table borders
    tableHeaderBg: "bg-[#66545E]", // Dark mauve for table headers
    tableRowBg: "bg-[#1a1a1a]", // Very dark gray for table rows
    tableRowAlt: "bg-[#292124]", // Slightly lighter for alternating rows
    taskCard: "bg-[#292124]", // Dark shade for task cards
    taskBorder: "border-l-4 border-[#AA6F73]", // Rosy brown for task borders
    checkboxAccent: "accent-[#EEA990]", // Peach for checkboxes
  };
  
  return ( 
    <>
    {/* navbar */}
    <nav className="bg-black text-[#F6E0B5] w-full z-10 overflow-hidden font-silvergarden border-b-2 border-[#AA6F73]">
      <div className="container mx-auto px-4 py-2 flex flex-col items-center">
        {/* EVOLVE in the center */}
        <div className="relative group text-center w-full">
          <h1 className="text-2xl md:text-4xl mt-4 mb-4 md:mt-6 font-bold tracking-wider transition-all duration-300 relative py-2 flex items-center justify-center">
            <span className="absolute group-hover:opacity-0 group-hover:scale-90 transition-all duration-300">
              HABIT TRACKER
            </span>
            <span className="absolute opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-300 whitespace-nowrap text-[#EEA990]">
              EVOLVE
            </span>
          </h1>
        </div>
      </div>
    </nav>
    <div className={`flex flex-col items-center min-h-screen p-4 ${colors.bg} ${colors.text}`}>
      {/* Add button */}
      <div className="relative mb-6 mt-6">
        <button 
          onClick={toggleOptions}
          className={`${colors.buttonBg} ${colors.buttonHover} font-medium py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 ${colors.buttonText}`}
        >
          <i className="fa-solid fa-plus"></i>
          Add Habit
        </button>
        
        {showOptions && (
          <div className={`absolute mt-2 w-48 ${colors.primary} rounded-lg shadow-lg overflow-hidden z-10 border border-[#AA6F73]`}>
            <ul className="py-1">
              <li 
                className={`px-4 py-2 ${colors.buttonHover} cursor-pointer ${colors.text} hover:text-black transition-colors duration-200`}
                onClick={() => selectTable('daily')}
              >
                Daily Tasks Table
              </li>
              <li 
                className={`px-4 py-2 ${colors.buttonHover} cursor-pointer ${colors.text} hover:text-black transition-colors duration-200`}
                onClick={() => selectTable('weekly')}
              >
                Weekly Table
              </li>
              <li 
                className={`px-4 py-2 ${colors.buttonHover} cursor-pointer ${colors.text} hover:text-black transition-colors duration-200`}
                onClick={() => selectTable('monthly')}
              >
                Monthly Table
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Daily Tasks Table */}
      {selectedTable === 'daily' && (
        <div className={`${colors.primary} p-6 w-full max-w-md rounded-lg shadow-2xl border border-[#66545E]`}>
          <h2 className="text-center mb-6 text-xl font-bold text-[#EEA990]">your daily tasks &lt;3 &lt;3</h2>
          
          {/* Task list */}
          <div className="mb-6 space-y-3">
            {dailyTasks.map((task, index) => (
              <div key={index} className={`flex items-center justify-between p-3 ${colors.taskCard} rounded-md shadow-md ${colors.taskBorder} transition-all duration-200 hover:shadow-lg`}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleDailyTask(index)}
                    className={`w-4 h-4 mr-3 ${colors.checkboxAccent} bg-black border-[#AA6F73] rounded-sm`}
                  />
                  <span className={task.completed ? "line-through text-[#A39193]" : ""}>
                    {task.text}
                  </span>
                </div>
                <button 
                  onClick={() => removeDailyTask(index)}
                  className="text-[#A39193] hover:text-[#EEA990] px-2 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            ))}
            {dailyTasks.length === 0 && (
              <div className="text-center text-[#A39193] italic p-4">No tasks yet. Add one below!</div>
            )}
          </div>
          
          {/* Add task form */}
          <form onSubmit={addDailyTask} className="flex flex-col sm:flex-row w-full">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className={`flex-grow p-3 ${colors.inputBg} ${colors.inputBorder} border rounded-l-md text-[#F6E0B5] placeholder-[#A39193] focus:outline-none focus:ring-1 focus:ring-[#EEA990]`}
            />
            <button 
              type="submit"
              className={`${colors.buttonBg} ${colors.buttonHover} p-3 rounded-r-md ${colors.buttonText} font-medium transition-colors duration-200`}
            >
              Add
            </button>
          </form>
        </div>
      )}
      
      {/* Weekly Tasks Table */}
      {selectedTable === 'weekly' && (
        <div className={`${colors.primary} p-6 w-full max-w-3xl rounded-lg shadow-2xl border border-[#66545E]`}>
          <h2 className="text-center mb-6 text-xl font-bold text-[#EEA990]">your weekly tasks &lt;3 &lt;3</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`${colors.tableHeaderBg}`}>
                  <th className={`border ${colors.tableBorder} p-3 text-left text-[#F6E0B5]`}>Task</th>
                  {days.map(day => (
                    <th key={day} className={`border ${colors.tableBorder} p-2 text-center text-[#F6E0B5]`}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeklyTasks.map((task, taskIndex) => (
                  <tr key={taskIndex} className={taskIndex % 2 === 0 ? colors.tableRowBg : colors.tableRowAlt}>
                    <td className={`border ${colors.tableBorder} p-3 flex justify-between items-center`}>
                      <span>{task.text}</span>
                      <button 
                        onClick={() => removeWeeklyTask(taskIndex)}
                        className="text-[#A39193] hover:text-[#EEA990] text-sm transition-colors duration-200"
                      >
                        ✕
                      </button>
                    </td>
                    {task.days.map((completed, dayIndex) => (
                      <td key={dayIndex} className={`border ${colors.tableBorder} p-2 text-center`}>
                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => toggleWeeklyTask(taskIndex, dayIndex)}
                          className={`w-4 h-4 ${colors.checkboxAccent} bg-black border-[#AA6F73] rounded-sm`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {weeklyTasks.length === 0 && (
            <div className="text-center text-[#A39193] italic mb-6 p-4">No weekly tasks yet. Add one below!</div>
          )}
          
          {/* Add weekly task form */}
          <form onSubmit={addWeeklyTask} className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="text"
              value={newWeeklyTask}
              onChange={(e) => setNewWeeklyTask(e.target.value)}
              placeholder="Add a new weekly task..."
              className={`flex-grow p-3 ${colors.inputBg} ${colors.inputBorder} border rounded-l-md text-[#F6E0B5] placeholder-[#A39193] focus:outline-none focus:ring-1 focus:ring-[#EEA990]`}
            />
            <button 
              type="submit"
              className={`${colors.buttonBg} ${colors.buttonHover} p-3 rounded-r-md ${colors.buttonText} font-medium transition-colors duration-200`}
            >
              Add
            </button>
          </form>
        </div>
      )}
      
     {/* Monthly Tasks Table */}
     {selectedTable === 'monthly' && (
       <div className={`${colors.primary} ${colors.text} p-4 w-full max-w-6xl rounded-lg shadow-2xl border border-[#66545E]`}>
         <h2 className="text-center mb-4 text-xl font-bold text-[#EEA990]">your monthly tasks &lt;3 &lt;3</h2>
         <h3 className="text-center mb-4 font-bold text-[#F6E0B5]">{currentMonth} {currentYear}</h3>
         
         <div className="overflow-x-auto mb-4">
           <table className="w-full border-collapse">
             <thead>
               <tr>
                 <th className={`border ${colors.tableBorder} ${colors.tableHeaderBg} p-2 w-1/6 text-[#F6E0B5]`}>Task</th>
                 {monthDays.map(day => (
                   <th key={day} className={`border ${colors.tableBorder} ${colors.tableHeaderBg} p-1 text-xs text-[#F6E0B5]`}>{day}</th>
                 ))}
               </tr>
             </thead>
             <tbody>
               {currentMonthTasks.map((task, taskIndex) => (
                 <tr key={taskIndex} className={taskIndex % 2 === 0 ? colors.tableRowBg : colors.tableRowAlt}>
                   <td className={`border ${colors.tableBorder} p-2 flex justify-between items-center`}>
                     <span className="truncate pr-2">{task.text}</span>
                     <button
                       onClick={() => removeMonthlyTask(taskIndex)}
                       className="text-[#A39193] hover:text-[#EEA990] text-sm transition-colors duration-200"
                     >
                       ✕
                     </button>
                   </td>
                   {task.days.map((completed, dayIndex) => (
                     <td key={dayIndex} className={`border ${colors.tableBorder} p-1 text-center`}>
                       <input
                         type="checkbox"
                         checked={completed}
                         onChange={() => toggleMonthlyTask(taskIndex, dayIndex)}
                         className={`w-3 h-3 ${colors.checkboxAccent} bg-black border-[#AA6F73] rounded-sm`}
                       />
                     </td>
                   ))}
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         
         {currentMonthTasks.length === 0 && (
           <div className={`text-center text-[#A39193] italic mb-4`}>No monthly tasks yet. Add one below!</div>
         )}
         
         {/* Add monthly task form */}
         <form onSubmit={addMonthlyTask} className="flex flex-col sm:flex-row w-full gap-2">
           <input
             type="text"
             value={newMonthlyTask}
             onChange={(e) => setNewMonthlyTask(e.target.value)}
             placeholder="Add a new monthly task..."
             className={`flex-grow p-3 ${colors.inputBg} ${colors.inputBorder} border rounded-l-md text-[#F6E0B5] placeholder-[#A39193] focus:outline-none focus:ring-1 focus:ring-[#EEA990]`}
           />
           <button
             type="submit"
             className={`${colors.buttonBg} ${colors.buttonHover} ${colors.buttonText} font-medium p-3 rounded-r-md w-full sm:w-auto transition-colors duration-200`}
           >
             Add
           </button>
         </form>
       </div>
     )}

    {/* No table selected state */}
    {!selectedTable && (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-[#EEA990] text-5xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-[#F6E0B5] mb-2">Welcome to your Habit Tracker</h2>
        <p className="text-[#A39193] mb-8">Click "Add Habit" to get started with tracking your daily, weekly, or monthly habits</p>
        <button 
          onClick={toggleOptions}
          className={`${colors.buttonBg} ${colors.buttonHover} font-medium py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 ${colors.buttonText}`}
        >
          <i className="fa-solid fa-plus"></i>
          Add Habit
        </button>
      </div>
    )}

    </div>
    </>
  );
};

export default Habit;