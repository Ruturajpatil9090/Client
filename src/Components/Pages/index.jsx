import React from 'react'
import CreateCompany from "./Company/CreateCompany";
import TenderPurchase from "./BusinessRelated/TenderPurchase/TenderPurchaseHead"
import TenderUtility from "./BusinessRelated/TenderPurchase/TenderPurchaseUtility"
import { Route,Routes } from 'react-router-dom';

const index = () => {
  return (
    <>   
    <Routes>
         <Route path="/business/tender_purchase" Component={TenderPurchase} />
         <Route path="/business/tender_utility" Component={TenderUtility} /> 
        <Route path="/company/create_company" Component={CreateCompany} />
        
    
      </Routes>
    </>
    
  )
}

export default index