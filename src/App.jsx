import './App.css';
import Home from './components/Home';
import Habit from './components/HabitT/Habit';
import { Routes, Route } from 'react-router-dom';
import PasswordManager from './components/Password/PasswordManager';
import Front from './components/Pomodoro/Front';
import About from './components/About/About';
import TodoApp from './components/Todo.jsx/Todo';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/habit-tracker" element={<Habit />} />
      <Route path="/password-manager" element={<PasswordManager />} />
      <Route path="/pomodoro" element={<Front />} />
      <Route path="/evolve" element={<About />} />
      <Route path="/todo" element={<TodoApp />} />

    </Routes>
  );
}

export default App;
