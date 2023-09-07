import './App.css';
import Header from "./Components/Header"
import Home from "./Components/Home"
// import frontend from './Components/Pages/Company/frontend';
// import backend from "./Components/Pages/Company/backend"
import { Route,Routes } from 'react-router-dom';
import Index from "./Components/Pages/index"

function App() {
  return (
    <div className="App">
      <Header/>
      <Index/>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
      {/* <Home/> */}
    </div>
  );
}

export default App;
