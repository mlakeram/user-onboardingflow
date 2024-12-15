import './App.css';
import Home from './components/Home';
import AdminSettings from './components/Admin';
import Data from './components/Data';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div id='appContainer'>
      <div id='headerContainer'>
        <header>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/admin'>Admin</Link>
              </li>
              <li>
                <Link to='/data'>Data</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <div id='mainContainer'>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/admin' element={<AdminSettings />} />
            <Route path='/data' element={<Data />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
