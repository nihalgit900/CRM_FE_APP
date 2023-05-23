
import './App.css';
import Login from './pages/Login';

import Engineer from './pages/Engineer';

import Admin from './pages/Admin';
import Customer from './pages/Customer';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"

function App() {
  return (
    <div >
     <Router>
      <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/engineer" element={<Engineer />} />
      <Route path='/customer' element={<Customer />} />
      <Route path='/admin' element={<Admin />} />

      </Routes>
     </Router>
 
    </div>
  );
}

export default App;
