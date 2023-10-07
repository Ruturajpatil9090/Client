import "./App.css";
import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import Index from "./Components/Pages/index";
import OrderDetail from "./Components/OrderDetail/OrderDetail";
import Header from "./Layout/Header/Header";
 import TenderHead from "./Components/Pages/BusinessRelated/TenderPurchase/TenderHead"

function App() {
  return (
    <div className="App">
      <Header />
      <Index />
      <Routes>
        <Route path="/" Component={TenderHead} />
        <Route path="/orderdetail" Component={OrderDetail} />
      </Routes>
    </div>
  );
}

export default App;
