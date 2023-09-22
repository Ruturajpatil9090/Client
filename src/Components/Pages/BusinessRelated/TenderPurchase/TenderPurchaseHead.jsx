import React, { useState } from "react";
import CustomDatePicker from "../../../common/DateRangePicker";
import axios from "axios";
import Button from "../../../common/Button";
import DataTableModal from "../../../common/DataTableModal";
import FormButtons from "../../../common/CommonButtons";
import "../../../../App.css";
import { useNavigate } from "react-router-dom";
import TenderPurchaseDetail from "./TenderPurchaseDetail"

const TenderPurchaseHead = () => {
  // State for form data
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

  const navigate = useNavigate();

  // Function to handle date change
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedDate: date,
    }));
  };

  // Function to handle input field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    // You can add logic here to submit the form data to your server.
  };

  // Function to fetch data from an API
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

  // Function to submit form data
  const submitFormData = () => {
    // You can add logic here to submit the form data to your server.
    console.log("Form Data Submitted:", formData);
  };

  // Function to handle clicking a record in the data table
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

  //buttons

  const handleAdd = () => {};

  const handleEdit = () => {};

  const handleBack = () => {
    navigate("/business/tender_utility");
  };

  const handleDelete = () => {};
  const handleCancel = () => {};

  const handleFirst = () => {
    console.log("first");
  };

  const handleLast = () => {
    console.log("Last");
  };

  const handlePrevious = () => {
    console.log("Previous");
  };

  const handleNext = () => {
    console.log("next");
  };

  return (
    <div>
      <div className="">
        <br></br>
      
        <br></br>

        <FormButtons
          handleAddOne={handleAdd}
          handleSaveOrUpdate={""}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleBack={handleBack}
          handleDelete={handleDelete}
          handleFirst={handleFirst}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleLast={handleLast}
        />
<br></br>
        <form className="row g-12" onSubmit={handleSubmit}>
          <div className="col-md-1">
            <label htmlFor="code" className="form-label">
              Change NO:
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
          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Tender DetailId:
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

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Quantale
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
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
              // value={formData.tenderdetail}
              // onChange={handleChange}
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
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Party Bill Rate
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Purch Rate:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
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
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Brokrage:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
            Ex/GST Rate:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Sell Note No:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              TCS%:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              TCS Amount:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              TCSAmt: TDS%:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              TDS Amount:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              VTCS Rate:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              VTDS Rate:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              // value={formData.tenderdetail}
              // onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="regionalName" className="form-label">
              Invoice NO:
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

          <div className="col-1">
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
            ></textarea>
          </div>
          <div class="row">
            <div class="col-md-1">
              <label htmlFor="state" class="form-label">
                Resale/Mill
              </label>
              <select name="state" class="form-select" autoComplete="off">
                <option value="Option1">Resale</option>
                <option value="Option2">Mill</option>
                <option value="Option1">With Payment</option>
                <option value="Option2">Party Bill Rate</option>
              </select>
            </div>

            <div class="col-md-1">
              <label htmlFor="tempTender" class="form-label">
                Temp Tender:
              </label>
              <select name="tempTender" class="form-select" autoComplete="off">
                <option value="Option1">YES</option>
                <option value="Option2">NO</option>
              </select>
            </div>

            <div class="col-md-1">
              <label htmlFor="autoPurchaseBill" class="form-label">
                AutoPurchaseBill:
              </label>
              <select
                name="autoPurchaseBill"
                class="form-select"
                autoComplete="off"
              >
                <option value="Option1">YES</option>
                <option value="Option2">NO</option>
              </select>
            </div>

            <div class="col-md-1">
              <label>Date :</label>

              <CustomDatePicker
                selectedDate={formData.selectedDate}
                onChange={handleDateChange}
              />

              {/* select date */}
              <label>Select Date :</label>

              <CustomDatePicker
                selectedDate={formData.selectedDate}
                onChange={handleDateChange}
              />
            </div>

            <div>
              <label>
                TDS Cut by Us:
                <input
                  type="checkbox"
                  name="tdsCutByUs"
                  checked={formData.tdsCutByUs}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="button" style={{ "margin-top": "40px" }}>
            <div class="input-group mb-2" style={{ "max-width": "200px" }}>
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

            {/* f1  */}
            <div class="input-group mb-2" style={{ "max-width": "200px" }}>
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
              <p>{selectedTitle}</p>
            </div>

            <br></br>
            <br></br>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitFormData}
            >
              Save
            </button>
          </div>
        </form>
        <TenderPurchaseDetail/>
      </div>
    </div>
  );
};

export default TenderPurchaseHead;
