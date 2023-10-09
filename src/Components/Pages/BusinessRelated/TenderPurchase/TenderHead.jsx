import React, { useState, useEffect, useRef } from "react";
import "../../../../App.css";
import { useNavigate } from "react-router-dom";
import ApiDataTableModal from "../../../commonFunctions/ApiDataTableModal";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import ApiMill_Code from "../../../commonFunctions/ApiAccountHelp";
import Apiitemcode from "../../../commonFunctions/ApiAccountHelp";
import ApiGrade from "../../../commonFunctions/ApiAccountHelp";
import ApiBp_Account from "../../../commonFunctions/ApiAccountHelp";
import ApiPayment_To from "../../../commonFunctions/ApiAccountHelp";
import ApiTender_From from "../../../commonFunctions/ApiAccountHelp";
import ApiTender_DO from "../../../commonFunctions/ApiAccountHelp";
import ApiVoucher_By from "../../../commonFunctions/ApiAccountHelp";
import ApiBroker from "../../../commonFunctions/ApiAccountHelp";
import Apigstratecode from "../../../commonFunctions/ApiAccountHelp";
//import Import Detail Component.........................................;

const Text1 = () => {
const navigate = useNavigate();
const  addNewButtonRef = useRef(null);
const  resaleMillDropdownRef = useRef(null);
const  updateButtonRef = useRef(null);
const  saveButtonRef = useRef(null);
const  [updateButtonClicked, setUpdateButtonClicked] = useState(false);
const  [saveButtonClicked, setSaveButtonClicked] = useState(false);
const  [addOneButtonEnabled, setAddOneButtonEnabled] = useState(false);
const  [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
const  [cancelButtonEnabled, setCancelButtonEnabled] = useState(true);
const  [editButtonEnabled, setEditButtonEnabled] = useState(false);
const  [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
const  [backButtonEnabled, setBackButtonEnabled] = useState(true);
const  [isEditMode, setIsEditMode] = useState(false);
const  [highlightedButton, setHighlightedButton] = useState(null);
const  [cancelButtonClicked, setCancelButtonClicked] = useState(false);
const  [mill_code, setMill_Code] = useState("");
const  [itemcode, setitemcode] = useState("");
const  [grade, setGrade] = useState("");
const  [bp_account, setBp_Account] = useState("");
const  [payment_to, setPayment_To] = useState("");
const  [tender_from, setTender_From] = useState("");
const  [tender_do, setTender_DO] = useState("");
const  [voucher_by, setVoucher_By] = useState("");
const  [broker, setBroker] = useState("");
const  [gstratecode, setgstratecode] = useState("");
const  [tender_date, setTender_Date] = useState(null);
const  [lifting_date, setLifting_Date] = useState(null);
 const [formData, setFormData] = useState({
Tender_No:"",
Tender_Date:null,
Lifting_Date:null,
Mill_Code:"",
season:"",
itemcode:"",
Grade:"",
Quantal:"",
Packing:"",
Bags:"",
Mill_Rate:"",
Purc_Rate:"",
Party_Bill_Rate:"",
Bp_Account:"",
CashDiff:"",
Payment_To:"",
Tender_From:"",
Tender_DO:"",
Voucher_By:"",
Broker:"",
Brokrage:"",
gstratecode:"",
Excise_Rate:"",
Sell_Note_No:"",
Narration:"",
TCS_Rate:"",
TCS_Amt:"",
TDS_Rate:"",
TDS_Amt:"",
Company_Code:"",
Created_By:"",
Modified_By:"",
Year_Code:"",
Branch_Id:"",
Voucher_No:"",
tenderid:"",
mc:"",
pt:"",
tf:"",
td:"",
vb:"",
bk:"",
ic:"",
commissionid:"",
Voucher_Type:"",
bp:"",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 const handleTender_DateChange = (date) => {
    setTender_Date(date.target.value);
  };
 const handleLifting_DateChange = (date) => {
    setLifting_Date(date.target.value);
  };
  const handleAddOne = () => {
    setAddOneButtonEnabled(false);
    setSaveButtonEnabled(true);
    setCancelButtonEnabled(true);
    setEditButtonEnabled(false);
    setDeleteButtonEnabled(false);
    setIsEditMode(false);
     if (resaleMillDropdownRef.current) {
      resaleMillDropdownRef.current.focus();
     }
  };
  const handleEdit = () => {
    setIsEditMode(true);
    setAddOneButtonEnabled(false);
    setSaveButtonEnabled(true);
    setCancelButtonEnabled(true);
    setEditButtonEnabled(false);
    setDeleteButtonEnabled(false);
    setBackButtonEnabled(true);
     if (resaleMillDropdownRef.current) {
      resaleMillDropdownRef.current.focus();
     }
  };
  const handleSaveOrUpdate = () => {
    if (isEditMode) {
    setIsEditMode(false);
    setAddOneButtonEnabled(true);
    setEditButtonEnabled(true);
    setDeleteButtonEnabled(true);
    setBackButtonEnabled(true);
    setSaveButtonEnabled(false);
    setCancelButtonEnabled(false);
    setUpdateButtonClicked(true);
     } else {
    setIsEditMode(false);
    setAddOneButtonEnabled(true);
    setEditButtonEnabled(true);
    setDeleteButtonEnabled(true);
    setBackButtonEnabled(true);
    setSaveButtonEnabled(false);
    setCancelButtonEnabled(false);
      addNewButtonRef.current.focus();
    setSaveButtonClicked(true);
     }
  };
  const handleBack = () => {
    navigate("/business/tender_utility");
  };
  const handleDelete = () => {
    setIsEditMode(false);
    setAddOneButtonEnabled(true);
    setEditButtonEnabled(true);
    setDeleteButtonEnabled(true);
    setBackButtonEnabled(true);
    setSaveButtonEnabled(false);
    setCancelButtonEnabled(false);
  };
  const handleCancel = () => {
    setIsEditMode(false);
    setAddOneButtonEnabled(true);
    setEditButtonEnabled(true);
    setDeleteButtonEnabled(true);
    setBackButtonEnabled(true);
    setSaveButtonEnabled(false);
    setCancelButtonEnabled(false);
    setCancelButtonClicked(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleButtonClick = (button) => {
    setHighlightedButton(button);
  };
  const handleKeyDown = (event, handler) => {
    if (event.key === "Enter") {
      handler();
      addNewButtonRef.current.focus();
      if (handler === handleAddOne || handler === handleEdit) {
     if (resaleMillDropdownRef.current) {
      resaleMillDropdownRef.current.focus();
     }
     }
     }
  };
return (
<>
<div>

        <div
          style={{
            marginTop:"10px",
            marginBottom:"10px",
            display:"flex",
            gap: "10px",
          }}
        >
          <button
            onClick={handleAddOne}
            ref={addNewButtonRef}
            disabled={!addOneButtonEnabled}
            onKeyDown={(event) => handleKeyDown(event, handleAddOne)}
            tabIndex={0}
            style={{
              backgroundColor: addOneButtonEnabled ?"blue" :"white",
              color: addOneButtonEnabled ?"white" :"black",
             border: "1px solid #ccc",
              cursor: "pointer",
              width: "4%",
              height: "35px",
              fontSize: "12px",
            }}
          >
            Add New
          </button>
          {isEditMode ? (
            <button
              onClick={handleSaveOrUpdate}
              onKeyDown={(event) => handleKeyDown(event, handleSaveOrUpdate)}
              style={{
                backgroundColor: "blue",
                color: "white",
             border: "1px solid #ccc",
              cursor: "pointer",
              width: "4%",
              height: "35px",
                fontSize: "12px",
              }}
            >
              update
            </button>
          ) : (
            <button
              onClick={handleSaveOrUpdate}
              disabled={!saveButtonEnabled}
              onKeyDown={(event) => handleKeyDown(event, handleSaveOrUpdate)}
              style={{
                backgroundColor: saveButtonEnabled ?"blue" :"white",
                color: saveButtonEnabled ?"white" :"black",
             border: "1px solid #ccc",
                cursor: saveButtonEnabled ?"pointer" :"not-allowed",
              width: "4%",
              height: "35px",
                fontSize:"12px",
              }}
            >
              Save
            </button>
          )}
          <button
            onClick={handleEdit}
            disabled={!editButtonEnabled}
            onKeyDown={(event) => handleKeyDown(event, handleEdit)}
            style={{
              backgroundColor: editButtonEnabled ?"blue" :"white",
              color: editButtonEnabled ?"white" :"black",
              border:"1px solid #ccc",
              cursor: editButtonEnabled ?"pointer" :"not-allowed",
              width: "4%",
              height:"35px",
              fontSize:"12px",
            }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={!deleteButtonEnabled}
            style={{
              backgroundColor: deleteButtonEnabled ?"blue" :"white",
              color: deleteButtonEnabled ?"white" :"black",
             border:"1px solid #ccc",
              cursor: deleteButtonEnabled ?"pointer" :"not-allowed",
              width: "4%",
              height:"35px",
              fontSize:"12px",
            }}
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            disabled={!cancelButtonEnabled}
            onKeyDown={(event) => handleKeyDown(event, handleCancel)}
            style={{
              backgroundColor: cancelButtonEnabled ?"blue" :"white",
              color: cancelButtonEnabled ?"white" :"black",
             border:"1px solid #ccc",
              cursor: cancelButtonEnabled ?"pointer" :"not-allowed",
              width: "4%",
              height:"35px",
              fontSize:"12px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleBack}
            disabled={!backButtonEnabled}
            onKeyDown={(event) => handleKeyDown(event, handleBack)}
            style={{
              backgroundColor: backButtonEnabled ?"blue" :"white",
              color: backButtonEnabled ?"white" :"black",
             border:"1px solid #ccc",
              cursor: backButtonEnabled ?"pointer" :"not-allowed",
              width: "4%",
              height:"35px",
              fontSize:"12px",
            }}
          >
            Back
          </button>
          
          <h5 style={{marginLeft:"300px"}}>Tender Purchase Head</h5>
      
        </div>
        <div style={{ float:"right", marginTop:"-40px" }}>
          <button
            style={{
             border:"1px solid #ccc",
              backgroundColor: highlightedButton ==="first" ?"black" :"blue",
              color:"white",
              width:"100px",
              height:"35px",
            }}
            onClick={() => handleButtonClick("first")}
          >
            &lt;&lt;
          </button>
          <button
            style={{
             border:"1px solid #ccc",
backgroundColor:
                highlightedButton ==="previous" ?"black" :"blue",
              color:"white",
              width:"100px",
              height:"35px",
            }}
            onClick={() => handleButtonClick("previous")}
          >
            &lt;
          </button>
          <button
            style={{
             border:"1px solid #ccc",
              backgroundColor: highlightedButton ==="next" ?"black" :"blue",
              color:"white",
              width:"100px",
              height:"35px",
            }}
            onClick={() => handleButtonClick("next")}
          >
            &gt;
          </button>
          <button
            style={{
             border:"1px solid #ccc",
              backgroundColor: highlightedButton ==="last" ?"black" :"blue",
              color:"white",
              width:"100px",
              height:"35px",
            }}
            onClick={() => handleButtonClick("last")}
          >
            &gt;&gt;
          </button>
  </div>
  </div>
<div className="d-flex">
<div className="col-md-1 d-flex align-items-center">
<label className="form-label">Tender No:</label>
 <input type="text" className="form-control" name="Tender_No" value={formData.Tender_No} onChange={handleInputChange} autoComplete="off"/></div> <label className="form-label ms-1">Resale/Mill:</label>
 <div className="col-md-1 d-flex ">
   <select name="type" className="form-select" value={formData.type} onChange={handleInputChange}  autoComplete="off" style={{ width: "50", height: "35px" }}>
     <option value="R">Resale/Mill</option>
   </select>
 </div>
 <label className="form-label ms-1">Temp Tender:</label>
 <div className="col-md-1 d-flex ">
   <select name="Temptender" className="form-select" value={formData.type} onChange={handleInputChange}  autoComplete="off" style={{ width: "50", height: "35px" }}>
     <option value="R">Temp Tender</option>
   </select>
 </div>
 <label className="form-label ms-1">Auto Purchase Bill:</label>
 <div className="col-md-1 d-flex ">
   <select name="AutoPurchaseBill" className="form-select" value={formData.type} onChange={handleInputChange}  autoComplete="off" style={{ width: "50", height: "35px" }}>
     <option value="R">Auto Purchase Bill</option>
   </select>
 </div>
       <label >Date:</label>
 <div className="form-group">
  <div className="col-sm-12">
     <input
       type="date"
       className = "form-control"
       id = "datePicker"
       onChange={handleTender_DateChange}
       value={formData.Tender_Date}
       Min = "2023-04-01"
       Max = "2024-03-31"
     />
   </div>
 </div>
       <label >Payment Date:</label>
 <div className="form-group">
  <div className="col-sm-12">
     <input
       type="date"
       className = "form-control"
       id = "datePicker"
       onChange={handleLifting_DateChange}
       value={formData.Lifting_Date}
       Min = "2023-04-01"
       Max = "2024-03-31"
     />
   </div>
 </div>
</div>
<div className="d-flex">
<label className="form-label">Mill Code:</label>
<ApiMill_Code acType='M' companyCode={1} name="Mill_Code"/>
<div className="col-md-1 d-flex align-items-center">
<label className="form-label">Season:</label>
 <input type="text" className="form-control" name="season" value={formData.season} onChange={handleInputChange} autoComplete="off"/></div><label className="form-label">Item Code:</label>
<Apiitemcode acType='M' companyCode={1} name="itemcode"/>
</div>
<div className="d-flex">
<label className="form-label">Grade:</label>
<ApiGrade acType='M' companyCode={1} name="Grade"/>
<div className="col-md-1 d-flex align-items-center">
<label className="form-label">Quintal:</label>
 <input type="text" className="form-control" name="Quantal" value={formData.Quantal} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">Packing:</label>
 <input type="text" className="form-control" name="Packing" value={formData.Packing} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">Bags:</label>
 <input type="text" className="form-control" name="Bags" value={formData.Bags} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">Mill Rate:</label>
 <input type="text" className="form-control" name="Mill_Rate" value={formData.Mill_Rate} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">Purchase Rate:</label>
 <input type="text" className="form-control" name="Purc_Rate" value={formData.Purc_Rate} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">Party Bill Rate:</label>
 <input type="text" className="form-control" name="Party_Bill_Rate" value={formData.Party_Bill_Rate} onChange={handleInputChange} autoComplete="off"/></div></div>
<div className="d-flex">
<label className="form-label">Bp Account:</label>
<ApiBp_Account acType='M' companyCode={1} name="Bp_Account"/>
<div className="col-md-1 d-flex align-items-center">
<label className="form-label">B.P:</label>
 <input type="text" className="form-control" name="CashDiff" value={formData.CashDiff} onChange={handleInputChange} autoComplete="off"/></div></div>
<div className="d-flex">
<label className="form-label">Payment To:</label>
<ApiPayment_To acType='M' companyCode={1} name="Payment_To"/>
<label className="form-label">Tender From:</label>
<ApiTender_From acType='M' companyCode={1} name="Tender_From"/>
</div>
<div className="d-flex">
<label className="form-label">Tender DO:</label>
<ApiTender_DO acType='M' companyCode={1} name="Tender_DO"/>
<label className="form-label">Voucher By:</label>
<ApiVoucher_By acType='M' companyCode={1} name="Voucher_By"/>
</div>
<div className="d-flex">
<label className="form-label">Broker:</label>
<ApiBroker acType='M' companyCode={1} name="Broker"/>
<div className="col-md-1 d-flex align-items-center">
<label className="form-label">Brokrage:</label>
 <input type="text" className="form-control" name="Brokrage" value={formData.Brokrage} onChange={handleInputChange} autoComplete="off"/></div><label className="form-label">Gst Rate Code:</label>
<Apigstratecode acType='M' companyCode={1} name="gstratecode"/>
<div className="col-md-1 d-flex align-items-center">
<label className="form-label">Gst Rate:</label>
 <input type="text" className="form-control" name="Excise_Rate" value={formData.Excise_Rate} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">Sale Note Number:</label>
 <input type="text" className="form-control" name="Sell_Note_No" value={formData.Sell_Note_No} onChange={handleInputChange} autoComplete="off"/></div></div>
<div className="d-flex">
<div className="col-md-1 d-flex align-items-center">
<label className="form-label">Narration:</label>
 <input type="text" className="form-control" name="Narration" value={formData.Narration} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">TCS:</label>
 <input type="text" className="form-control" name="TCS_Rate" value={formData.TCS_Rate} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">TCS Amount:</label>
 <input type="text" className="form-control" name="TCS_Amt" value={formData.TCS_Amt} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">TDS :</label>
 <input type="text" className="form-control" name="TDS_Rate" value={formData.TDS_Rate} onChange={handleInputChange} autoComplete="off"/></div><div className="col-md-1 d-flex align-items-center">
<label className="form-label">TDS Amount:</label>
 <input type="text" className="form-control" name="TDS_Amt" value={formData.TDS_Amt} onChange={handleInputChange} autoComplete="off"/></div></div>
</>
);
};
export default Text1

