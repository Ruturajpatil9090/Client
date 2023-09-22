import React, { useState } from "react";
import CustomDatePicker from "../../../common/DateRangePicker";
import axios from "axios";
import DataTableModal from "../../../common/DataTableModal";
import "../../../../App.css";
import { useNavigate } from "react-router-dom";

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
  const [editIndex, setEditIndex] = useState(null);

  
  const navigate = useNavigate();

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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedData = [...displayedData, formData];
//     setDisplayedData(updatedData);
//     console.log("Form Data Submitted:", formData);
//   };



const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = [...displayedData];

    if (editIndex !== null) {
      // Update existing record
      updatedData[editIndex] = formData;
      setEditIndex(null);
    } else {
      // Add new record
      updatedData.push(formData);
    }

    setDisplayedData(updatedData);
    resetFormData(); // Reset form data after submitting
  };

  const resetFormData = () => {
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
    console.log("Form Data Submitted:", formData);
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setFormData((prevData) => ({
      ...prevData,
      id: record.id,
    }));
    setSelectedTitle(record.title);
  };

  const handleClose = () => {
    setShowModal(false);
  };


  const handleEdit = (index) => {
    setFormData({ ...displayedData[index] });
    setEditIndex(index);
  };

  // Modified handleDelete function to delete the selected record
  const handleDelete = (index) => {
    const updatedData = [...displayedData];
    updatedData.splice(index, 1);
    setDisplayedData(updatedData);
  };


  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="">
        <br />
        <h2 style={{ alignItems: "center" }}>Tender Purchase Detail</h2>
        <br />
        <button type="button" className="btn btn-primary">
          Add
        </button>
        <button type="button" className="btn btn-danger">
          Cancel
        </button>
        <form className="row g-12" onSubmit={handleSubmit}>
          <div className="col-md-2">
            <label htmlFor="changeNo" className="form-label">
              Buyer Quantal:
            </label>
            <input
              type="text"
              className="form-control"
              name="changeNo"
              value={formData.changeNo}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="tenderdetail" className="form-label">
              Tender Detail:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.tenderdetail}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="invoiceNo" className="form-label">
              Invoice No:
            </label>
            <input
              type="text"
              className="form-control"
              name="invoiceNo"
              value={formData.invoiceNo}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="ackNo" className="form-label">
              Acknowledgment No:
            </label>
            <input
              type="text"
              className="form-control"
              name="ackNo"
              value={formData.ackNo}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="companyAddress" className="form-label">
              Company Address:
            </label>
            <input
              type="text"
              className="form-control"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="state" className="form-label">
              Delivery Type:
            </label>
            <select
              name="state"
              className="form-select"
              autoComplete="off"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="Choose...">Choose...</option>
              <option value="With GST Naka Delivery">
                With GST Naka Delivery
              </option>
              <option value="Naka Delivery Without Gst Rate">
                Naka Delivery Without Gst Rate
              </option>
              <option value="Commission">Commission</option>
              <option value="DO">DO</option>
            </select>
          </div>

          <div className="col-md-2">
            <label>Date :</label>
            <CustomDatePicker
              selectedDate={formData.selectedDate}
              onChange={handleDateChange}
            />
          </div>

          <div className="col-md-2">
            <label>Loading By Us:</label>
            <input
              type="checkbox"
              name="tdsCutByUs"
              checked={formData.tdsCutByUs}
              onChange={handleChange}
            />
          </div>

          <div className="button" style={{ marginTop: "40px" }}>
            <div className="input-group mb-2" style={{ maxWidth: "200px" }}>
              <label>Billing TO:</label>
              <input
                type="text"
                className="form-control"
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
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                onClick={fetchData}
              >
                ...
              </button>
              <p style={{ marginLeft: "10px" }}>{selectedTitle}</p>
            </div>

            <br />
            <br />
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
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(index)}
                  >
                
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
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

