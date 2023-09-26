import React, { useState, useEffect } from "react";
import CustomDatePicker from "../../../common/DateRangePicker";
import axios from "axios";
import DataTableModal from "../../../common/DataTableModal";
import "../../../../App.css";

const TenderPurchaseDetail = () => {
  const [formData, setFormData] = useState({
    changeNo: "",
    tenderdetail: "",
    invoiceNo: "",
    ackNo: "",
    companyAddress: "",
    state: "Choose...",
    tdsCutByUs: false,
    selectedDate: null,
  });

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  const [displayedData, setDisplayedData] = useState([]);

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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submitFormData = () => {
    const newData = {
      ...formData,
      id: Date.now(),
      billingTo: selectedRecord ? selectedRecord.id : "",
    };

    setDisplayedData((prevData) => [...prevData, newData]);

    setFormData({
      changeNo: "",
      tenderdetail: "",
      invoiceNo: "",
      ackNo: "",
      companyAddress: "",
      state: "Choose...",
      tdsCutByUs: false,
      selectedDate: null,
    });
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setFormData((prevData) => ({
      ...prevData,
      title: record.title,
    }));
    setSelectedTitle(record.title);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleEdit = (index) => {
    const updatedData = [...displayedData];
    const editedRecord = updatedData[index];
    setFormData({ ...editedRecord });

    updatedData.splice(index, 1);
    setDisplayedData(updatedData);
    setShowModal(false);
  };

  const handleDelete = (recordToDelete) => {
    setDisplayedData((prevData) =>
      prevData.filter((record) => record !== recordToDelete)
    );
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // f1 key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F1") {
        event.preventDefault();
        // fetchData();
        // setShowModal(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="">
        <h4 style={{ alignItems: "center" }}>Tender Purchase Detail</h4>

        <button type="button" className="btn btn-primary">
          Add
        </button>
        <button
          type="button"
          className="btn btn-danger"
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
        <form className="row g-12" onSubmit={handleSubmit}>
          <div class="row">
            <div class="input-group mb-2" style={{ "max-width": "200px" }}>
              <label htmlFor="companyName" className="form-label">
                Mill Code:
              </label>
              <input
                type="text"
                class="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value={selectedRecord ? selectedRecord.id : ""}
                style={{ width: "70%" }}
              />
              <DataTableModal
                showModal={showModal}
                onClose={handleClose}
                data={data}
                onRecordClick={handleRecordClick}
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={fetchData}
              >
                ...
              </button>
              <p style={{ "margin-left": "10px" }}>{selectedTitle}</p>
            </div>

            <div class="input-group mb-2" style={{ "max-width": "200px" }}>
              <label htmlFor="companyName" className="form-label">
                Item Code:
              </label>
              <input
                type="text"
                class="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value={selectedRecord ? selectedRecord.id : ""}
                style={{ width: "70%" }}
              />
              <DataTableModal
                showModal={showModal}
                onClose={handleClose}
                data={data}
                onRecordClick={handleRecordClick}
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={fetchData}
              >
                ...
              </button>
              <p style={{ "margin-left": "10px" }}>{selectedTitle}</p>
            </div>

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

            <div class="input-group mb-2" style={{ "max-width": "200px" }}>
              <h5>Grade:</h5>
              <input
                type="text"
                class="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value={selectedRecord ? selectedRecord.Grade : ""}
                style={{ width: "70%" }}
              />
              <DataTableModal
                showModal={showModal}
                onClose={handleClose}
                data={data}
                onRecordClick={handleRecordClick}
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={fetchData}
              >
                ...
              </button>
              <p style={{ "margin-left": "10px" }}>{selectedTitle}</p>
            </div>

            <div class="input-group mb-2" style={{ "max-width": "200px" }}>
              <h5>Grade:</h5>
              <input
                type="text"
                class="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value={selectedRecord ? selectedRecord.Grade : ""}
                style={{ width: "70%" }}
              />
              <DataTableModal
                showModal={showModal}
                onClose={handleClose}
                data={data}
                onRecordClick={handleRecordClick}
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={fetchData}
              >
                ...
              </button>
              <p style={{ "margin-left": "10px" }}>{selectedTitle}</p>
            </div>

            <div className="col-md-1">
              <label htmlFor="companyName" className="form-label">
                Quantal:
              </label>
              <input
                type="text"
                className="form-control"
                name="tenderdetail"
                value={formData.Quantal}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="col-md-1">
              <label htmlFor="companyName" className="form-label">
                Packing
              </label>
              <input
                type="text"
                className="form-control"
                name="tenderdetail"
                value={formData.Packing}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="col-md-1">
              <label htmlFor="companyName" className="form-label">
                Bags
              </label>
              <input
                type="text"
                className="form-control"
                name="tenderdetail"
                value={formData.Bags}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div class="input-group mb-2" style={{ "max-width": "200px" }}>
              <h5>Grade:</h5>
              <input
                type="text"
                class="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value={selectedRecord ? selectedRecord.Grade : ""}
                style={{ width: "70%" }}
              />
              <DataTableModal
                showModal={showModal}
                onClose={handleClose}
                data={data}
                onRecordClick={handleRecordClick}
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={fetchData}
              >
                ...
              </button>
              <p style={{ "margin-left": "10px" }}>{selectedTitle}</p>
            </div>

            <div className="col-md-1">
              <label htmlFor="companyName" className="form-label">
                Mill Rate:
              </label>
              <input
                type="text"
                className="form-control"
                name="tenderdetail"
                value={formData.Mill_Rate}
                onChange={handleChange}
                autoComplete="off"
              />
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
                value={formData.Narration}
                onChange={handleChange}
                autoComplete="off"
              ></textarea>
            </div>

            <div class="col-md-1">
              <label htmlFor="autoPurchaseBill" class="form-label">
                Date :
              </label>

              <CustomDatePicker
                selectedDate={formData.Tender_Date}
                onChange={handleDateChange}
              />
            </div>
            <div class="col-md-1">
              {/* select date */}
              <label htmlFor="autoPurchaseBill" class="form-label">
                Payment Date:
              </label>

              <CustomDatePicker
                selectedDate={formData.selectedDate}
                onChange={handleDateChange}
              />
            </div>

            <div className="col-md-1">
              <label htmlFor="companyName" className="form-label">
                Mill Rate:
              </label>
              <input
                type="text"
                className="form-control"
                name="tenderdetail"
                value={formData.Mill_Rate}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="col-md-1">
              <label htmlFor="companyName" className="form-label">
                <br></br>
              </label>
              <input
                type="text"
                className="form-control"
                name="tenderdetail"
                value={formData.Mill_Rate}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="col-md-1">
              <label htmlFor="companyName" className="form-label">
                Tcs Amount:
              </label>
              <input
                type="text"
                className="form-control"
                name="tenderdetail"
                value={formData.Mill_Rate}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="col-md-1">
              <label htmlFor="companyName" className="form-label">
                <br></br>
              </label>
              <input
                type="text"
                className="form-control"
                name="tenderdetail"
                value={formData.Mill_Rate}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <br></br>
            <br></br>

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
              />
            </div>
          </div>

          <div className="button" style={{ marginTop: "40px" }}>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitFormData}
            >
              Save
            </button>

            {/* tableview */}

            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Change No</th>
                    <th>Tender Detail</th>
                    <th>Invoice No</th>
                    <th>Acknowledgment No</th>
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
                      <td>{item.changeNo}</td>
                      <td>{item.tenderdetail}</td>
                      <td>{item.invoiceNo}</td>
                      <td>{item.ackNo}</td>
                      <td>{item.companyAddress}</td>
                      <td>{item.state}</td>
                      <td>{formatDate(item.selectedDate)}</td>
                      <td>{item.tdsCutByUs ? "Yes" : "No"}</td>
                      <td>{item.title}</td>
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
                          onClick={() => handleDelete(item)}
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
