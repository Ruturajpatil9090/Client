import React, { useState, useEffect, useRef } from "react";
import "../../../../App.css";
import { useNavigate } from "react-router-dom";
import ApiDataTableModal from "../../../commonFunctions/ApiDataTableModal";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const TenderPurchaseHead = () => {
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

  const [formData, setFormData] = useState({
    User_Id: "",
    userfullname: "",
    User_Name: "",
    Password: "",
    EmailId: "",
    EmailPassword: "",
    Mobile: "",
    User_Type: "U",
    User_Security: "Y",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
  };


  useEffect(() => {
    getLatestTenderNo();
  }, []);

  const getLatestTenderNo = () => {
    axios
      .get("http://localhost:5000/groupmaster/latestuser")
      .then((response) => {
        const User_Id = response.data.LatestUserId;
        console.log(User_Id);

        setFormData((prevFormData) => ({
          ...prevFormData,
          User_Id: User_Id ? User_Id + 1 : 1,
        }));
      })
      .catch((error) => {
        console.error("Error fetching last Tender_No:", error);
      });
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
    getLatestTenderNo()
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

  const handleSaveOrUpdate = async (req, res) => {
    const apiUrl = "http://localhost:5000/groupmaster/postuserlist";
  
    try {
      if (isEditMode) {
        // Logic for handling update
        setIsEditMode(false);
        setAddOneButtonEnabled(true);
        setEditButtonEnabled(true);
        setDeleteButtonEnabled(true);
        setBackButtonEnabled(true);
        setSaveButtonEnabled(false);
        setCancelButtonEnabled(false);
        setUpdateButtonClicked(true);
      } else {
        // Logic for handling save
        setIsEditMode(false);
        setAddOneButtonEnabled(true);
        setEditButtonEnabled(true);
        setDeleteButtonEnabled(true);
        setBackButtonEnabled(true);
        setSaveButtonEnabled(false);
        setCancelButtonEnabled(false);
        setSaveButtonClicked(true);
  
        // TODO: Implement logic to save the data using apiUrl and formData
        const response = await axios.post(apiUrl, formData);
        console.log("Data saved successfully:", response.data);
        setFormData({
            User_Id: "",
            userfullname: "",
            User_Name: "",
            Password: "",
            EmailId: "",
            EmailPassword: "",
            Mobile: "",
            User_Type: "User",
            User_Security: "Yes",
          });
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  

  const handleBack = () => {
    navigate("/utilities/user_creation_utility");
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
    addNewButtonRef.current.focus();
    setFormData({
        User_Id: "",
        userfullname: "",
        User_Name: "",
        Password: "",
        EmailId: "",
        EmailPassword: "",
        Mobile: "",
        User_Type: "User",
        User_Security: "Yes",
      });

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

  useEffect(() => {
    if (cancelButtonClicked && addNewButtonRef.current) {
      addNewButtonRef.current.focus();
      setCancelButtonClicked(false);
    }
    if (updateButtonClicked && addNewButtonRef.current) {
      addNewButtonRef.current.focus();
      setUpdateButtonClicked(false);
    }
    if (saveButtonClicked && addNewButtonRef.current) {
      addNewButtonRef.current.focus();
      setSaveButtonClicked(false);
    }
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      <h3>User Creation</h3>
      <div>
        <form onSubmit={handleSubmit}>
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
                Update
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
          </div>
          <div className="form-group row">
            <label htmlFor="userId" className="col-1 form-label">
              User ID:
            </label>
            <div className="col-md-1">
              <input
                type="text"
                className="form-control"
                id="User_Id"
                name="User_Id"
                value={formData.User_Id}
                onChange={handleInputChange}
                autoComplete="off"
                readOnly
              />
            </div>
            <br></br>
            <br></br>
            <div className="form-group d-flex">
              <label htmlFor="userId" className="col-1 form-label">
                User Full Name:
              </label>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="userfullname"
                  name="userfullname"
                  value={formData.userfullname}
                  onChange={handleInputChange}
                  autoComplete="off"
                  ref={resaleMillDropdownRef}
                />
              </div>
            </div>

            <br></br>
            <br></br>
            <div className="form-group d-flex">
              <label htmlFor="userId" className="col-1 form-label">
                User Name:
              </label>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="User_Name"
                  name="User_Name"
                  value={formData.User_Name}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </div>

            <br></br>
            <br></br>
            <div className="form-group d-flex">
              <label htmlFor="userId" className="col-1 form-label">
                Password:
              </label>
              <div className="col-md-2">
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </div>

            <br></br>
            <br></br>
            <div className="form-group d-flex">
              <label htmlFor="userId" className="col-1 form-label">
                Email ID:
              </label>
              <div className="col-md-2">
                <input
                  type="email"
                  className="form-control"
                  id="EmailId"
                  name="EmailId"
                  value={formData.EmailId}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </div>

            <br></br>
            <br></br>
            <div className="form-group d-flex">
              <label htmlFor="userId" className="col-1 form-label">
                Email Password:
              </label>
              <div className="col-md-2">
                <input
                  type="password"
                  className="form-control"
                  id="EmailPassword"
                  name="EmailPassword"
                  value={formData.EmailPassword}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </div>

            <br></br>
            <br></br>
            <div className="form-group d-flex">
              <label htmlFor="userId" className="col-1 form-label">
                Mobile No:
              </label>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  id="Mobile"
                  name="Mobile"
                  value={formData.Mobile}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </div>

            <br></br>
            <br></br>

            <div className="form-group d-flex">
              <label htmlFor="userType" className=" col-1 form-label">
                User Type:
              </label>
              <div className="col-md-2">
                <select
                  className="form-select"
                  name="User_Type"
                  value={formData.User_Type}
                  onChange={handleInputChange}
                  id="User_Type"
                >
                  <option value="U">User</option>
                  <option value="A">Admin</option>
                </select>
              </div>
            </div>

            <br></br>
            <br></br>
            <div className="form-group d-flex">
              <label htmlFor="userSecurity" className=" col-1 form-label">
                User Security:
              </label>
              <div className="col-md-2">
                <select
                  className="form-select"
                  name="User_Security"
                  value={formData.User_Security}
                  onChange={handleInputChange}
                  autoComplete="off"
                  id="User_Security"
                >
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
            </div>
          </div>

        </form>
      </div>
      <br></br>
    </div>
  );
};

export default TenderPurchaseHead;
