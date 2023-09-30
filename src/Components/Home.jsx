import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const handleClick=()=>{
    navigate('/orderdetail')
  }
  return (
    <>
    <div style={{marginLeft:"50px",marginTop:"20px"}}>
    <button onClick={handleClick} type="button" className="btn btn-primary">Delivery Order</button>
    </div>
    </>
  );
}

export default Home;