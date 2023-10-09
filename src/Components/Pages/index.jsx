import React from "react";
import CreateCompany from "./Company/CreateCompany";
import TenderPurchase from "./BusinessRelated/TenderPurchase/TenderPurchaseHead";
import TenderUtility from "./BusinessRelated/TenderPurchase/TenderPurchaseUtility";
import { Route, Routes } from "react-router-dom";
import UserCreationUtility from "../Pages/UtilitiesMaster/User Creation/UserUtility"
import UserCreationHead from "../Pages/UtilitiesMaster/User Creation/UserCreationHead"

const index = () => {
  return (
    <>
      <Routes>
        <Route path="/business/tender_purchase" Component={TenderPurchase} />
        <Route path="/business/tender_utility" Component={TenderUtility} />
        <Route path="/company/create_company" Component={CreateCompany} />
        <Route path="/utilities/user_creation_utility" Component={UserCreationUtility} />
        <Route path="/business/User_creation" Component={UserCreationHead} />
      </Routes>
    </>
  );
};

export default index;
