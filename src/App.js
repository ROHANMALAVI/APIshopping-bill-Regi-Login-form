import './App.css';
import Login from './Components/Login';
import Product from './Components/Product';
import Registration from './Components/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashbord from './Components/Dashbord';


function App() {
  return (
    <div className="App">
      {/* <Product/> */}


      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Registration />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashbord' element={<Dashbord />}></Route>


        </Routes>

      </BrowserRouter>

    </div>
  );
}


export default App;
