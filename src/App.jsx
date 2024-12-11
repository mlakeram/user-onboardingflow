import './App.css';
import Home from './components/Home';
import Admin from './components/Admin';
import Data from './components/Data';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div id='appContainer'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/data' element={<Data />} />
      </Routes>
    </div>
  );
}

export default App;
