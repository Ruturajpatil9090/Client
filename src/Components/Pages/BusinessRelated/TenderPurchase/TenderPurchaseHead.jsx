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
    Temptender: "",
    AutoPurchaseBill: "",
    Tender_Date: null,
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

    // changeNo: "",
    // tenderdetail: "",
    // invoiceNo: "",
    // ackNo: "",
    // companyAddress: "",
    // state: "Choose...",
    // tdsCutByUs: false,
    // selectedDate: null,
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
      <center>
        <h4>Tender Purchase</h4>
      </center>
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
            Copy From :
          </label>
          <input
            type="text"
            className="form-control"
            // name="tenderdetail"
            // value={formData.tenderdetail}
            onChange={handleChange}
            autoComplete="off"
          />
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

        <div class="col-md-1">
          <label htmlFor="state" class="form-label">
            Temp Tender:
          </label>
          <select
            name="tempTender"
            class="form-select"
            autoComplete="off"
            value={FormData.Temptender}
            onChange={handleChange}
          >
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>

        <div class="col-md-2">
          <label htmlFor="autoPurchaseBill" class="form-label">
            Auto Purchase Bill:
          </label>
          <select
            name="autoPurchaseBill"
            class="form-select"
            autoComplete="off"
            value={FormData.AutoPurchaseBill}
            onChange={handleChange}
          >
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>

        <div className="col-md-1">
          <label htmlFor="companyName" className="form-label">
            Voucher No:
          </label>
          <p>{"1"}</p>
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
          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Season:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.season}
              onChange={handleChange}
              autoComplete="off"
            />
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

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Balance Self:
            </label>
            <p>{"0"}</p>
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
              Purch Rate:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.Purc_Rate}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>

        <div class="row">
          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Party Bill Rate
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.Party_Bill_Rate}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div class="input-group mb-2" style={{ "max-width": "200px" }}>
            <label htmlFor="companyName" className="form-label">
              Bp Account:
            </label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={selectedRecord ? selectedRecord.Bp_Account : ""}
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
              B.P:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.CashDiff}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Diff:
            </label>
            <p>{"0"}</p>
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Amount:
            </label>
            <p>{"0"}</p>
          </div>

          <div class="input-group mb-2" style={{ "max-width": "200px" }}>
            <label htmlFor="companyName" className="form-label">
              Payment To:
            </label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={selectedRecord ? selectedRecord.Payment_To : ""}
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
              Tender From:
            </label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={selectedRecord ? selectedRecord.Tender_From : ""}
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
              Tender D.O.:
            </label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={selectedRecord ? selectedRecord.Tender_DO : ""}
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
              Voucher By:
            </label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={selectedRecord ? selectedRecord.Voucher_By : ""}
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
        </div>

        <div className="row">
          <div class="input-group mb-2" style={{ "max-width": "200px" }}>
            <label htmlFor="companyName" className="form-label">
              Broker:
            </label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={selectedRecord ? selectedRecord.Broker : ""}
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
              Brokrage:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.Brokrage}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div class="input-group mb-2" style={{ "max-width": "200px" }}>
            <label htmlFor="companyName" className="form-label">
              GstRateCode:
            </label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={selectedRecord ? selectedRecord.gstratecode : ""}
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
              Exc/GST Rate:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.Excise_Rate}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              GST Rate:
            </label>
            <p>{""}</p>
          </div>

          <div className="col-md-2">
            <label htmlFor="companyName" className="form-label">
              value SellNoteNo:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.Sell_Note_No}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

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

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              TCS%:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.TCS_Rate}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              TCS Amount:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.TCS_Amt}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              Value with TCSAmt:
            </label>
            <p>{""}</p>
          </div>

          <div className="col-md-1">
            <label htmlFor="companyName" className="form-label">
              TDS%:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.TDS_Rate}
              onChange={handleChange}
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
        </div>
        <div className="button" style={{ "margin-top": "40px" }}>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitFormData}
          >
            Save
          </button>
        </div>
      </form>
      <TenderPurchaseDetail />
    </div>
  </div>
  );
};

export default TenderPurchaseHead;
