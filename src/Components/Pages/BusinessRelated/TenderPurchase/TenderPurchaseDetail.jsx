import React, { useState } from "react";
import CustomDatePicker from "../../../common/DateRangePicker";
import "../../../../App.css";
import ApiDataTableDetail from "../../../commonFunctions/ApiDataTableDetail";
import ApiDataTableModal from "../../../commonFunctions/ApiDataTableModal";

const TenderPurchaseDetail = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    state: "R",
    companyAddress: "",
    selectedDate: null,
    tdsCutByUs: false,
    saleRate: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [markedForDeletionIndex, setMarkedForDeletionIndex] = useState(null);
  const [millCode, setMillCode] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleDateChange = (date) => {
    // Check if the selected date is within the accounting year (1 Apr 2023 to 31 Mar 2024)
    const isWithinAccountingYear = date >= new Date(2023, 3, 1) && date <= new Date(2024, 2, 31);
  
    if (isWithinAccountingYear) {
      setFormData((prevData) => ({
        ...prevData,
        selectedDate: date,
      }));
    } else {
      // Display a message or take appropriate action for an invalid date
      console.log('Please select a date within the accounting year (1 Apr 2023 to 31 Mar 2024).');
    }
  };
  

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      ...formData,
      billingTo: millCode,
    };

    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = newRecord;
      setRecords(updatedRecords);
      setEditIndex(null);
    } else {
      setRecords([...records, newRecord]);
    }
    setFormData({
      state: "R",
      companyAddress: "",
      selectedDate: null,
      tdsCutByUs: false,
      saleRate: "",
    });
   
  };

  const handleEdit = (index) => {
    const editedRecord = records[index];
    if (editedRecord.isDeleted) {
      alert("This record has been deleted and cannot be edited.");
      return;
    }
    setFormData({
      ...editedRecord,
      billingTo: editedRecord.billingTo,
    });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (index === editIndex) {
      alert("Cannot delete a record being edited.");
      return;
    }

    const updatedRecords = [...records];
    updatedRecords[index].isDeleted = !updatedRecords[index].isDeleted;
    setRecords(updatedRecords);
    setMarkedForDeletionIndex(null);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleMillCodeClick = (code) => {
    setMillCode(code);
  };

  const handleClose = () => {
    setFormData({
      ...formData,
      state: "R",
      companyAddress: "",
      selectedDate: null,
      tdsCutByUs: false,
      saleRate: "",
    });
    if (editIndex !== null) {
      setEditIndex(null);
    }
  };

  return (
    <div>
      <center>
          <h4>Tender Purchase Detail</h4>
        </center>
      <form onSubmit={handleFormSubmit} className="row g-3">
        <div className="row g-3">
       
          <div className="col-md-6 d-flex align-items-center">
          <ApiDataTableDetail onAcCodeClick={handleMillCodeClick} />

            <div className="col-n1">
              <label htmlFor="state" className="form-label ms-4">
                Delivery Type:
              </label>
            </div>
            <div className="">
              <select
                name="state"
                className="form-select"
                value={formData.state}
                onChange={handleInputChange}
                autoComplete="off"
              >
                <option value="R">Resale</option>
                <option value="M">Mill</option>
                <option value="W">With Payment</option>
                <option value="P">Party Bill Rate</option>
              </select>
            </div>
          </div>

          <div className="col-md-2 d-flex align-items-center">
            <label htmlFor="companyAddress" className="form-label ms-n5">
              Narration:
            </label>
            <textarea
              className="form-control"
              placeholder="Company Address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleInputChange}
              autoComplete="off"
              required
            ></textarea>
          </div>

          <div className="col-md-2 d-flex align-items-center">
            <label htmlFor="autoPurchaseBill" className="form-label">
              Payment Date:
            </label>
            <CustomDatePicker
              selectedDate={formData.selectedDate}
              onChange={handleDateChange}
              required
            />
          </div>

          <div className="col-md-2 d-flex align-items-center">
            <label className="form-check-label">Loading By Us:</label>
            <input
              type="checkbox"
              name="tdsCutByUs"
              className="form-check-input ms-2"
              checked={formData.tdsCutByUs}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-1 d-flex align-items-center">
            <label htmlFor="saleRate" className="form-label">
              Sale Rate:
            </label>
            <input
              type="text"
              className="form-control"
              name="saleRate"
              value={formData.saleRate}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1 d-flex align-items-center">
            <button className="btn btn-primary" type="submit">
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          <div className="col-md-1 d-flex align-items-center">
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </form>
      <br></br>

      <table className=" table-bordered table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Row Action</th>
            <th>Company Address</th>
            <th>Resale/Mill</th>
            <th>Date</th>
            <th>Loading By Us</th>
            <th>Billing To</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => (
            <tr
              key={index}
              style={{ backgroundColor: item.isDeleted ? "red" : "white" }}
            >
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(index)}
                >
                  {item.isDeleted ? "Cancel" : "Delete"}
                </button>
              </td>
              <td>A</td>
              <td>{item.companyAddress}</td>
              <td>{item.state}</td>
              <td>{formatDate(item.selectedDate)}</td>
              <td>{item.tdsCutByUs ? "Yes" : "No"}</td>
              <td>{item.billingTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenderPurchaseDetail;
