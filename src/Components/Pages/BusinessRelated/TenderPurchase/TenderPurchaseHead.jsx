import React, { useState, useEffect } from "react";
import FormButtons from "../../../common/CommonButtons";
import "../../../../App.css";
import { useNavigate } from "react-router-dom";
import ApiDataTableModal from "../../../commonFunctions/ApiDataTableModal";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TenderPurchaseDetail from "./TenderPurchaseDetail";

const TenderPurchaseHead = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [millCode, setMillCode] = useState("");
  const [bpAccount, setBpAccount] = useState("");
  const [brokerCode, setBrokerCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [paymentDate, setPaymentDate] = useState(null);

  const [addOneButtonEnabled, setAddOneButtonEnabled] = useState(false);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
  const [cancelButtonEnabled, setCancelButtonEnabled] = useState(true);
  const [editButtonEnabled, setEditButtonEnabled] = useState(false);
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
  const [backButtonEnabled, setBackButtonEnabled] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);

  const [highlightedButton, setHighlightedButton] = useState(null);

  const defaultSelectedDate = selectedDate || new Date();

  const minDate = new Date(2023, 3, 1);
  const maxDate = new Date(2024, 2, 31);

  const [formData, setFormData] = useState({
    Tender_No: "",
    Company_Code: 1,
    type: "R",
    Temptender: "Y",
    millCode: "",
    Year_Code: 3,
    AutoPurchaseBill: "Y",
    bpAccount: "",
    brokerCode: "",
  });

  useEffect(() => {
    getLatestTenderNo();
  }, []);

  const getLatestTenderNo = () => {
    axios
      .get("http://localhost:5000/groupmaster/getalltender")
      .then((response) => {
        const lastTenderNo = response.data.latestTenderNo;
        console.log(lastTenderNo);

        setFormData((prevFormData) => ({
          ...prevFormData,
          Tender_No: lastTenderNo ? lastTenderNo + 1 : 1,
        }));
      })
      .catch((error) => {
        console.error("Error fetching last Tender_No:", error);
      });
  };

  const handleDateChange = (date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    setSelectedDate(date);
  };

  const handlePaymentDateChange = (date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    setPaymentDate(date);
  };

  const handleMillCodeClick = (code) => {
    setMillCode(code);
    console.log("Mill code clicked:", code);
  };

  const handleItemCodeClick = (code) => {
    setBpAccount(code);
    console.log("Bp_Account:", code);
  };

  const handleBrokerCodeClick = (data) => {
    setBrokerCode(data);
    console.log("Broker:", data);
  };

  const handleAddOne = () => {
    setAddOneButtonEnabled(false);
    setSaveButtonEnabled(true);
    setCancelButtonEnabled(true);
    setEditButtonEnabled(false);
    setDeleteButtonEnabled(false);
    setIsEditMode(false);
  };
  const handleSave = () => {
    axios
      .get("http://localhost:5000/groupmaster/getalltender")
      .then((response) => {
        const lastTenderNo = response.data.latestTenderNo;
        console.log(lastTenderNo);
        const nextTenderNo = lastTenderNo ? lastTenderNo + 1 : 1;

        const updatedFormData = {
          ...formData,
          millCode,
          bpAccount,
          brokerCode,
          Tender_No: nextTenderNo,
        };

        const payload = {
          headData: {
            ...updatedFormData,
            Tender_Date: selectedDate
              ? selectedDate.toISOString().split("T")[0]
              : null,
            Lifting_Date: paymentDate
              ? paymentDate.toISOString().split("T")[0]
              : null,
            Mill_Code: millCode,
            Bp_Account: bpAccount,
            Broker: brokerCode,
          },
          detailData: [],
        };

        axios
          .post("http://localhost:5000/groupmaster/inserttender", payload)
          .then((response) => {
            console.log("API Response:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching last Tender_No:", error);
      });
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setAddOneButtonEnabled(false);
    setSaveButtonEnabled(true);
    setCancelButtonEnabled(true);
    setEditButtonEnabled(false);
    setDeleteButtonEnabled(false);
    setBackButtonEnabled(true);
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
    } else {
      setIsEditMode(false);
      setAddOneButtonEnabled(true);
      setEditButtonEnabled(true);
      setDeleteButtonEnabled(true);
      setBackButtonEnabled(true);
      setSaveButtonEnabled(false);
      setCancelButtonEnabled(false);
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFirst = () => {};

  const handleLast = () => {};

  const handlePrevious = () => {};

  const handleNext = () => {};

  const handleButtonClick = (button) => {
    setHighlightedButton(button);
  };

  const handleKeyDown = (event, handler) => {
    if (event.key === "Enter") {
      handler();
    }
  };

  return (
    <div>
      <div>
        <center>
          <h4>Tender Purchase Head</h4>
        </center>
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
              onKeyDown={(event) => handleKeyDown(event,handleSaveOrUpdate)}
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
              Update
            </button>
          ) : (
            <button
              onClick={handleSaveOrUpdate}
              disabled={!saveButtonEnabled}
              onKeyDown={(event) => handleKeyDown(event,handleSaveOrUpdate)}
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
        
        </div>
        <div style={{ float: 'right', marginTop: '-40px' }}>
      <button
        style={{
          border: '1px solid #ccc',
          backgroundColor: highlightedButton === 'first' ? 'black' : 'blue',
          color: 'white',
          width: "100px",
              height: "35px",
        }}
        onClick={() => handleButtonClick('first')}
      >
        &lt;&lt; 
      </button>
      <button
        style={{
          border: '1px solid #ccc',
          backgroundColor: highlightedButton === 'previous' ? 'black' : 'blue',
          color: 'white',
          width: "100px",
          height: "35px",
        }}
        onClick={() => handleButtonClick('previous')}
      >
        &lt; 
      </button>
      <button
        style={{
          border: '1px solid #ccc',
          backgroundColor: highlightedButton === 'next' ? 'black' : 'blue',
          color: 'white',
          width: "100px",
          height: "35px",
        }}
        onClick={() => handleButtonClick('next')}
      >
        &gt;
      </button>
      <button
        style={{
          border: '1px solid #ccc',
          backgroundColor: highlightedButton === 'last' ? 'black' : 'blue',
          color: 'white',
          width: "100px",
          height: "35px",
        }}
        onClick={() => handleButtonClick('last')}
      >
        &gt;&gt;
      </button>
    </div>

        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <label htmlFor="code" className="form-label ">
              Tender No:
            </label>
            <div className="col-md-1 d-flex ">
              <input
                type="text"
                className="form-control "
                name="Tender_No"
                value={formData.Tender_No}
                onChange={handleInputChange}
                autoComplete="off"
                readOnly
                style={{ width: "50", height: "35px" }}
              />
            </div>
            <label htmlFor="state" className="form-label ms-1">
              Resale/Mill:
            </label>
            <div className="col-md-1 d-flex ">
              <select
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleInputChange}
                autoComplete="off"
                style={{ width: "50", height: "35px" }}
              >
                <option value="R">Resale</option>
                <option value="M">Mill</option>
                <option value="W">With Payment</option>
                <option value="P">Party Bill Rate</option>
              </select>
            </div>

            <label htmlFor="state" className="form-label ms-1">
              Temp Tender:
            </label>
            <div className=" d-flex ">
              <select
                name="Temptender"
                className="form-select"
                value={formData.Temptender}
                onChange={handleInputChange}
                autoComplete="off"
                style={{ width: "50", height: "35px" }}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>
            <label htmlFor="state" className="form-label ms-1 ">
              Auto Purchase Bill:
            </label>
            <div className=" d-flex ">
              <select
                name="AutoPurchaseBill"
                className="form-select"
                value={formData.AutoPurchaseBill}
                onChange={handleInputChange}
                autoComplete="off"
                style={{ width: "50", height: "35px" }}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>

            <label htmlFor="state" className="form-label ms-2">
              Date:
            </label>
            <div className="col-md-1 d-flex ">
              <DatePicker
                selected={defaultSelectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                className="form-control"
                autoComplete="off"
                minDate={minDate}
                maxDate={maxDate}
                style={{ width: "50px", height: "35px" }}
              />
            </div>

            <label htmlFor="state" className="form-label ms-2">
              Payment Date:
            </label>
            <div className="col-md-1 d-flex">
              <DatePicker
                selected={paymentDate}
                onChange={handlePaymentDateChange}
                dateFormat="dd-MM-yyyy"
                className="form-control"
                autoComplete="off"
                style={{ width: "50", height: "35px" }}
              />
            </div>
          </div>
          <div className="row">
            <ApiDataTableModal
              onAcCodeClick={handleMillCodeClick}
              onBrokerButtonClick={handleItemCodeClick}
              onIdClick={handleBrokerCodeClick}
            />
          </div>
        </form>
      </div>
      <br></br>

      <div style={{ borderBottom: "2px dotted black", marginBottom: "10px" }} />
      <TenderPurchaseDetail />
    </div>
  );
};

export default TenderPurchaseHead;
