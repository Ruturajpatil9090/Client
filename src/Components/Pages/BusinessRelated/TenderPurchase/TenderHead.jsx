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

var newTenderid = ""
var MillCodeNew = ""
const Text1 = ({millData}) => {
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
  const [tender_date, setTender_Date] = useState(null);
  const [lifting_date, setLifting_Date] = useState(null);
  const [millCode, setMillCode] = useState("");

  const [tenderId, setTenderId] = useState("");


  const [records, setRecords] = useState([]); 
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0); 

  const [formData, setFormData] = useState({
    Tender_No: "",
    Tender_Date: null,
    Lifting_Date: null,
    Mill_Code: "",
    season: "",
    itemcode: "",
    Grade: "",
    Quantal: "",
    Packing: "",
    Bags: "",
    Mill_Rate: "",
    Purc_Rate: "",
    Party_Bill_Rate: "",
    Bp_Account: "",
    CashDiff: "",
    Payment_To: "",
    Tender_From: "",
    Tender_DO: "",
    Voucher_By: "",
    Broker: "",
    Brokrage: "",
    gstratecode: "",
    Excise_Rate: "",
    Sell_Note_No: "",
    Narration: "",
    TCS_Rate: "",
    TCS_Amt: "",
    TDS_Rate: "",
    TDS_Amt: "",
    Company_Code: "",
    Created_By: "",
    Modified_By: "",
    Year_Code: "",
    Branch_Id: "",
    Voucher_No: "",
    tenderid: "",
    mc: "",
    pt: "",
    tf: "",
    td: "",
    vb: "",
    bk: "",
    ic: "",
    commissionid: "",
    Voucher_Type: "",
    bp: "",
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
    getLatestTenderNo();
    setFormData(prevFormData => ({ ...prevFormData, Bags: "" }));
    MillCodeNew=""
   
    
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


  const getData = async () => {
    const Company_Code = 1;
    const Year_Code = 3;
  
    try {
      const response = await axios.get(`http://localhost:5000/groupmaster/getTenderone?Company_Code=${Company_Code}&Year_Code=${Year_Code}`);
      const lastRecord = response.data[0];
      console.log("data",lastRecord.TDS_Amt)
      console.log("data",lastRecord.Mill_Code)
      console.log("data",lastRecord.tenderid)
        newTenderid = lastRecord.tenderid
        MillCodeNew = lastRecord.Mill_Code
  
        setFormData({
          millCode: lastRecord.Mill_Code || "",
          TDS_Amt: lastRecord.TDS_Amt || "",
          Tender_No: lastRecord.Tender_No || "",
          Bags: lastRecord.Bags || "",
          
        });
      console.log("tender",newTenderid)
      
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  


  const handleSaveOrUpdate = () => {
    const apiUrlSaveOrUpdate = "http://localhost:5000/groupmaster/inserttender";
  
    if (isEditMode) {
      const updateApiUrl = `http://localhost:5000/groupmaster/updatetender?tenderid=${newTenderid}`; 
      console.log(updateApiUrl)

      const postData = {
        headData: {
          Tender_No: formData.Tender_No,
          Company_Code: 1,
          Year_Code: 3,
          Mill_Code: millCode,
          Bags: formData.Bags
        
        },
        detailData: [
          {
            Tender_No: formData.Tender_No,
            Company_Code: 1,
            year_code: 3,
            ID: 1,
          },
        ],
      };
      

    axios
      .put(updateApiUrl, postData) 
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });

      setIsEditMode(false);
      setAddOneButtonEnabled(true);
      setEditButtonEnabled(true);
      setDeleteButtonEnabled(true);
      setBackButtonEnabled(true);
      setSaveButtonEnabled(false);
      setCancelButtonEnabled(false);
      setUpdateButtonClicked(true);
    } else {
      const postData = {
        headData: {
          Tender_No: formData.Tender_No,
          Company_Code: 1,
          Year_Code: 3,
          Mill_Code: millCode,
          // Mill_Rate:formData.Mill_Rate,
          Bags:formData.Bags

         
        },
        detailData: [
          {
            Tender_No: formData.Tender_No,
            Company_Code: 1,
            year_code: 3,
            ID: 1,
          }
        ]
      };

      axios
        .post(apiUrlSaveOrUpdate, postData)
        .then((response) => {
          console.log("Data saved successfully:", response.data);
          setIsEditMode(false);
          setAddOneButtonEnabled(true);
          setEditButtonEnabled(true);
          setDeleteButtonEnabled(true);
          setBackButtonEnabled(true);
          setSaveButtonEnabled(false);
          setCancelButtonEnabled(false);
          addNewButtonRef.current.focus();
          setSaveButtonClicked(true);
          window.location.reload()
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
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
    getData();
    setMillCode(MillCodeNew)
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

const handleMillCode=(code)=>{
  setMillCode(code);
  console.log("Mill code clicked:", code);
}


const handleFirstButtonClick = () => {
  setCurrentRecordIndex(0);
};

// Function to fetch the last record
const handleLastButtonClick = () => {
  setCurrentRecordIndex(records.length - 1);
};

// Function to fetch the next record
const handleNextButtonClick = () => {
  if (currentRecordIndex < records.length - 1) {
    setCurrentRecordIndex((prevIndex) => prevIndex + 1);
  }
};

// Function to fetch the previous record
const handlePreviousButtonClick = () => {
  if (currentRecordIndex > 0) {
    setCurrentRecordIndex((prevIndex) => prevIndex - 1);
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
            onClick={() => handleFirstButtonClick()}
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
            onClick={() => handlePreviousButtonClick()}
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
            onClick={() => handleNextButtonClick()}
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
            onClick={() => handleLastButtonClick()}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="d-flex">
        <div className="col-md-1 d-flex align-items-center">
          <label className="form-label">Tender No:</label>
          <input
            type="text"
            className="form-control"
            name="Tender_No"
            value={formData.Tender_No}
            onChange={handleInputChange}
            autoComplete="off"
            readOnly
          />
        </div>

        <label className="form-label ms-1">Resale/Mill:</label>
        <div className="col-md-1 d-flex">
          <select
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleInputChange}
            autoComplete="off"
            style={{ width: "50", height: "35px" }}
          >
            <option value="R">Resale/Mill</option>
          </select>
        </div>

        <label className="form-label ms-1">Temp Tender:</label>
        <div className="col-md-1 d-flex">
          <select
            name="Temptender"
            className="form-select"
            value={formData.type}
            onChange={handleInputChange}
            autoComplete="off"
            style={{ width: "50", height: "35px" }}
          >
            <option value="R">Temp Tender</option>
          </select>
        </div>

        <label className="form-label ms-1">Auto Purchase Bill:</label>
        <div className="col-md-1 d-flex">
          <select
            name="AutoPurchaseBill"
            className="form-select"
            value={formData.type}
            onChange={handleInputChange}
            autoComplete="off"
            style={{ width: "50", height: "35px" }}
          >
            <option value="R">Auto Purchase Bill</option>
          </select>
        </div>

        <label>Date:</label>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="date"
              className="form-control"
              id="datePicker"
              onChange={handleTender_DateChange}
              value={formData.Tender_Date}
              Min="2023-04-01"
              Max="2024-03-31"
            />
          </div>
        </div>

        <label>Payment Date:</label>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="date"
              className="form-control"
              id="datePicker"
              onChange={handleLifting_DateChange}
              value={formData.Lifting_Date}
              Min="2023-04-01"
              Max="2024-03-31"
            />
          </div>
        </div>
      </div>

      <div className="d-flex">
        <label className="form-label">Mill Code:</label>
        <ApiMill_Code acType="M" companyCode={1} name="Mill_Code" onAcCodeClick={handleMillCode} millData={MillCodeNew}  handleCancel={handleCancel} />
 
        <div className="col-md-1 d-flex align-items-center">
          <label className="form-label">Season:</label>
          <input
            type="text"
            className="form-control"
            name="season"
            value={formData.season}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
        <label className="form-label">Item Code:</label>
        <Apiitemcode acType="M" companyCode={1} name="itemcode" />
      </div>

      <div className="col-md-1 d-flex align-items-center">
          <label className="form-label">Bags:</label>
          <input
            type="text"
            className="form-control"
            name="Bags"
            value={formData.Bags}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
     
      </form>
    </>
  );
};
export default Text1;
