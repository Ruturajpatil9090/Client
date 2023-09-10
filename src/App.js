import './App.css';
import Header from "./Components/Header"
import Home from "./Components/Home"
import { Route,Routes } from 'react-router-dom';
import Index from "./Components/Pages/index";
import OrderDetail from './Components/OrderDetail/OrderDetail';

function App() {
  return (
    <div className="App">
      <Header/>
      <Index/>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/orderdetail" Component={OrderDetail} />
      </Routes>
    </div>
  );
}

export default App;
