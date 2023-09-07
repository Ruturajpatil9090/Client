import React from 'react'
import CreateCompany from "./Company/CreateCompany"
import { Route,Routes } from 'react-router-dom';

const index = () => {
  return (
    <>   
    <Routes>
        <Route path="/company/create_company" Component={CreateCompany} />
        {/* <Route path="/backend" Component={Backend} /> */}
    
      </Routes>
    </>
    
  )
}

export default index