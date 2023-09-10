import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const handleClick=()=>{
    navigate('/orderdetail')
  }
  return (
    <>
    <div style={{"margin-left":"50px","margin-top":"20px"}}>
    <button onClick={handleClick} type="button" class="btn btn-primary">Delivery Order</button>
    </div>
    </>
  );
}

export default Home;