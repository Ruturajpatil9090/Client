import React, { useState, useEffect } from "react";
import CustomDatePicker from "../../../common/DateRangePicker";
import "../../../../App.css";
import ApiDataTableDetail from "../../../commonFunctions/ApiDataTableDetail";

const TenderPurchaseDetail = () => {
  const [formData, setFormData] = useState({
    companyAddress: "",
    state: "Choose...",
    tdsCutByUs: false,
    selectedDate: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [millCode, setMillCode] = useState("");

  const [displayedData, setDisplayedData] = useState([]);
  const [isAddingRecord, setIsAddingRecord] = useState(false);

  const handleAddButtonClick = () => {
    setIsAddingRecord(true);
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedDate: date,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const submitFormData = () => {
    const newData = {
      ...formData,
      id: Date.now(),
      billingTo: millCode,
    };

    setDisplayedData((prevData) => [...prevData, newData]);

    setFormData({
      companyAddress: "",
      state: "Choose...",
      tdsCutByUs: false,
      selectedDate: null,
    });
  };

  const handleEdit = (index) => {
    const updatedData = [...displayedData];
    const editedRecord = updatedData[index];
    setFormData({ ...editedRecord });

    updatedData.splice(index, 1);
    setDisplayedData(updatedData);
    setShowModal(false);
  };

  const handleDelete = (recordToDelete, index) => {
    const updatedData = displayedData.map((record, idx) =>
      idx === index ? { ...record, isDeleted: !record.isDeleted } : record
    );

    setDisplayedData(updatedData);
  };

  // const handleDelete = (recordToDelete) => {
  //   setDisplayedData((prevData) =>
  //     prevData.filter((record) => record !== recordToDelete)
  //   );
  // };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleMillCodeClick = (code) => {
    setMillCode(code);
    console.log("Mill code........", code);
    console.log(code);
  };

  const handleCancel = () => {
    setFormData({
      companyAddress: "",
      state: "Choose...",
      tdsCutByUs: false,
      selectedDate: null,
      
    });
    setIsAddingRecord(false); // Disable adding record when cancel is clicked
  };

  return (
    <div>
      <div className="">
        <h4 style={{ alignItems: "center" }}>Tender Purchase Detail</h4>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddButtonClick}
        >
          Add
        </button>
        <button
          type="button"
          className="btn btn-danger"
          style={{ marginLeft: "10px" }}
          onClick={handleCancel} 
        >
          Close
        </button>
        <form className="row g-12" onSubmit={handleSubmit} method="POST">
          <div class="row">
            <ApiDataTableDetail onAcCodeClick={handleMillCodeClick}  />

            <div class="col-md-1">
              <label htmlFor="state" class="form-label">
                Resale/Mill:
              </label>
              <select name="state" class="form-select" autoComplete="off">
                <option value="R">Resale</option>
                <option value="M">Mill</option>
                <option value="W">With Payment</option>
                <option value="P">Party Bill Rate</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <label htmlFor="companyAddress" className="form-label">
                Narration:
              </label>
              <textarea
                className="form-control"
                placeholder="Company Address"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                autoComplete="off"
                disabled={!isAddingRecord}
              ></textarea>
            </div>

            <div class="col-md-1"></div>
            <div class="col-md-1">
              <label htmlFor="autoPurchaseBill" className="form-label">
                Payment Date:
              </label>

              <CustomDatePicker
                selectedDate={formData.selectedDate}
                onChange={handleDateChange}
                disabled={!isAddingRecord}
              />
            </div>

            <div className="col-md-1">
              {" "}
              <br></br>
              <br></br>
              <label>Loading By Us:</label>
              <input
                type="checkbox"
                name="tdsCutByUs"
                checked={formData.tdsCutByUs}
                onChange={handleChange}
                disabled={!isAddingRecord}
              />
            </div>
          </div>

          <div className="button" style={{ marginTop: "40px" }}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitFormData}
              disabled={!isAddingRecord} 
            >
              Save
            </button>

            {/* tableview */}

            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Company Address</th>
                    <th>Delivery Type</th>
                    <th>Date</th>
                    <th>Loading By Us</th>
                    <th>Billing To</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {displayedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.companyAddress}</td>
                      <td>{item.state}</td>
                      <td>{formatDate(item.selectedDate)}</td>
                      <td>{item.tdsCutByUs ? "Yes" : "No"}</td>
                      <td>{item.billingTo}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ marginLeft: "5px" }}
                          className="btn btn-danger"
                          onClick={() => handleDelete(item, index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenderPurchaseDetail;
