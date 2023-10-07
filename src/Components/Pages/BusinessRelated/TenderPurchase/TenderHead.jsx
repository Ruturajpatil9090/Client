import React, { useState, useEffect, useRef } from "react";
import "../../../../App.css";
import { useNavigate } from "react-router-dom";
import ApiDataTableModal from "../../../commonFunctions/ApiDataTableModal";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
//import Import Detail Component.........................................;
import ApiAccountHelp from "../../../commonFunctions/ApiAccountHelp";
import BrokerHelp from "../../../commonFunctions/ApiAccountHelp";
import GroupMasterHelper from "../../../commonFunctions/GroupMasterHelper";
import GstStateMasterHelper from "../../../commonFunctions/GstStateMasterHelper";
import CityMasterHelper from "../../../commonFunctions/CityMasterHelper";
import GstRateMasterHelper from "../../../commonFunctions/GstRateMasterHelper";
import ItemMasterHelper from "../../../commonFunctions/ItemMasterHelper"

const TenderHead = () => {
  const navigate = useNavigate();
  const addNewButtonRef = useRef(null);
  const resaleMillDropdownRef = useRef(null);
  const updateButtonRef = useRef(null);
  const saveButtonRef = useRef(null);
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const [addOneButtonEnabled, setAddOneButtonEnabled] = useState(false);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
  const [cancelButtonEnabled, setCancelButtonEnabled] = useState(true);
  const [editButtonEnabled, setEditButtonEnabled] = useState(false);
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
  const [backButtonEnabled, setBackButtonEnabled] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [highlightedButton, setHighlightedButton] = useState(null);
  const [cancelButtonClicked, setCancelButtonClicked] = useState(false);
  const [mill_code, setMill_Code] = useState("");
  const [grade, setGrade] = useState("");
  const [payment_to, setPayment_To] = useState("");
  const [tender_from, setTender_From] = useState("");
  const [tender_do, setTender_DO] = useState("");
  const [voucher_by, setVoucher_By] = useState("");
  const [broker, setBroker] = useState("");
  const [itemcode, setitemcode] = useState("");
  const [gstratecode, setgstratecode] = useState("");
  const [bp_account, setBp_Account] = useState("");
  const [tender_date, setTender_Date] = useState(null);
  const [lifting_date, setLifting_Date] = useState(null);

  const [acType, setAcType] = useState("");
  const [companyCode, setcompanyCode] = useState("");

  const [formData, setFormData] = useState({
    Tender_No: "",
    Company_Code: "",
    Tender_Date: null,
    Lifting_Date: null,
    Mill_Code: "",
    Grade: "",
    Quantal: "",
    Packing: "",
    Bags: "",
    Payment_To: "",
    Tender_From: "",
    Tender_DO: "",
    Voucher_By: "",
    Broker: "",
    Excise_Rate: "",
    Narration: "",
    Mill_Rate: "",
    Created_By: "",
    Modified_By: "",
    Year_Code: "",
    Purc_Rate: "",
    Branch_Id: "",
    Voucher_No: "",
    Sell_Note_No: "",
    Brokrage: "",
    tenderid: "",
    mc: "",
    itemcode: "",
    season: "",
    pt: "",
    tf: "",
    td: "",
    vb: "",
    bk: "",
    ic: "",
    gstratecode: "",
    CashDiff: "",
    TCS_Rate: "",
    TCS_Amt: "",
    commissionid: "",
    Voucher_Type: "",
    Party_Bill_Rate: "",
    TDS_Rate: "",
    TDS_Amt: "",
    Bp_Account: "",
    bp: "",
  });
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
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
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
              backgroundColor: addOneButtonEnabled ? "blue" : "white",
              color: addOneButtonEnabled ? "white" : "black",
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
                backgroundColor: saveButtonEnabled ? "blue" : "white",
                color: saveButtonEnabled ? "white" : "black",
                border: "1px solid #ccc",
                cursor: saveButtonEnabled ? "pointer" : "not-allowed",
                width: "4%",
                height: "35px",
                fontSize: "12px",
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
              backgroundColor: editButtonEnabled ? "blue" : "white",
              color: editButtonEnabled ? "white" : "black",
              border: "1px solid #ccc",
              cursor: editButtonEnabled ? "pointer" : "not-allowed",
              width: "4%",
              height: "35px",
              fontSize: "12px",
            }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={!deleteButtonEnabled}
            style={{
              backgroundColor: deleteButtonEnabled ? "blue" : "white",
              color: deleteButtonEnabled ? "white" : "black",
              border: "1px solid #ccc",
              cursor: deleteButtonEnabled ? "pointer" : "not-allowed",
              width: "4%",
              height: "35px",
              fontSize: "12px",
            }}
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            disabled={!cancelButtonEnabled}
            onKeyDown={(event) => handleKeyDown(event, handleCancel)}
            style={{
              backgroundColor: cancelButtonEnabled ? "blue" : "white",
              color: cancelButtonEnabled ? "white" : "black",
              border: "1px solid #ccc",
              cursor: cancelButtonEnabled ? "pointer" : "not-allowed",
              width: "4%",
              height: "35px",
              fontSize: "12px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleBack}
            disabled={!backButtonEnabled}
            onKeyDown={(event) => handleKeyDown(event, handleBack)}
            style={{
              backgroundColor: backButtonEnabled ? "blue" : "white",
              color: backButtonEnabled ? "white" : "black",
              border: "1px solid #ccc",
              cursor: backButtonEnabled ? "pointer" : "not-allowed",
              width: "4%",
              height: "35px",
              fontSize: "12px",
            }}
          >
            Back
          </button>

          <h5 style={{ marginLeft: "300px" }}>Tender Purchase Head</h5>
        </div>
        <div style={{ float: "right", marginTop: "-40px" }}>
          <button
            style={{
              border: "1px solid #ccc",
              backgroundColor: highlightedButton === "first" ? "black" : "blue",
              color: "white",
              width: "100px",
              height: "35px",
            }}
            onClick={() => handleButtonClick("first")}
          >
            &lt;&lt;
          </button>
          <button
            style={{
              border: "1px solid #ccc",
              backgroundColor:
                highlightedButton === "previous" ? "black" : "blue",
              color: "white",
              width: "100px",
              height: "35px",
            }}
            onClick={() => handleButtonClick("previous")}
          >
            &lt;
          </button>
          <button
            style={{
              border: "1px solid #ccc",
              backgroundColor: highlightedButton === "next" ? "black" : "blue",
              color: "white",
              width: "100px",
              height: "35px",
            }}
            onClick={() => handleButtonClick("next")}
          >
            &gt;
          </button>
          <button
            style={{
              border: "1px solid #ccc",
              backgroundColor: highlightedButton === "last" ? "black" : "blue",
              color: "white",
              width: "100px",
              height: "35px",
            }}
            onClick={() => handleButtonClick("last")}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
      <div className="d-flex">
        <label className="form-label">Mill Code:</label>
        <ApiAccountHelp acType="M" companyCode={1} name="MillCode" />
        <label className="form-label">Broker Code:</label>
        <BrokerHelp acType="B" companyCode={1} name="brokerCode" />
        <label className="form-label">Group Master:</label>
        <GroupMasterHelper   name="groupmasterhelp" />
        <label className="form-label">Gst State Master:</label>
        <GstStateMasterHelper   name="gststatemasterhelper" />
        <label className="form-label">City Master:</label>
        <CityMasterHelper   name="citymasterhelper" />
        <label className="form-label">Gst Rate Master:</label>
        <GstRateMasterHelper   name="gstratemasterhelper" />
        <label className="form-label">Item Master:</label>
        <ItemMasterHelper   name="itemcodemaster" />
      </div>
    </>
  );
};
export default TenderHead;
