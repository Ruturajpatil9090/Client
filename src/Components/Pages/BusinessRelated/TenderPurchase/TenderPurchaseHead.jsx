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

 const [data,setData] = useState([])
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

  const fetchAndOpenPopup = async (acType) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/groupmaster/gethelper?Ac_type=M`
      );
      const data = response.data;
      setData(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


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

  const [millCode, setMillCode] = useState("");
  const [bpAccount, setBpAccount] = useState("");
  const [brokerCode, setBrokerCode] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [paymentDate, setPaymentDate] = useState(null);

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

  const handleAdd = () => {};

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
          detailData: []
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

  const handleEdit = () => {};
  const handleBack = () => {
    navigate("/business/tender_utility");
  };
  const handleDelete = () => {};
  const handleCancel = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleDetailDataAction = (action, tenderNo) => {
    // Implement logic to handle the detailData based on the rowaction
    console.log('Handling detailData action:', action, 'for Tender_NO:', tenderNo);
    // You can make API calls or perform other operations based on the action and tenderNo
  };

  return (
    <div>
      <div>
        <center>
          <h4>Tender Purchase</h4>
        </center>
        <FormButtons
          handleAddOne={handleAdd}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleBack={handleBack}
          handleDelete={handleDelete}
        />
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-2 d-flex ">
              <label htmlFor="code" className="form-label ">
                Tender No:
              </label>
              <input
                type="text"
                className="form-control"
                name="Tender_No"
                value={formData.Tender_No}
                onChange={handleInputChange}
                autoComplete="off"
                style={{ width: "100px", height: "30px" }}
                readOnly
              />
            </div>

            <div
              className="col-md-2 d-flex align-items-center"
              style={{ marginLeft: "-50px" }}
            >
              <label htmlFor="state" className="form-label">
                Resale/Mill:
              </label>
              <select
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleInputChange}
                autoComplete="off"
                style={{ width: "150px", height: "35px" }}
              >
                <option value="R">Resale</option>
                <option value="M">Mill</option>
                <option value="W">With Payment</option>
                <option value="P">Party Bill Rate</option>
              </select>
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <label htmlFor="state" className="form-label">
                Temp Tender:
              </label>
              <select
                name="Temptender"
                className="form-select"
                value={formData.Temptender}
                onChange={handleInputChange}
                autoComplete="off"
                style={{ width: "100px", height: "35px" }}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <label htmlFor="state" className="form-label">
                Auto Purchase Bill:
              </label>
              <select
                name="AutoPurchaseBill"
                className="form-select"
                value={formData.AutoPurchaseBill}
                onChange={handleInputChange}
                autoComplete="off"
                style={{ width: "100px", height: "35px" }}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <label htmlFor="state" className="form-label">
                Date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                className="form-control"
                autoComplete="off"
                style={{ width: "150px", height: "35px" }}
              />
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <label htmlFor="state" className="form-label">
                Payment Date:
              </label>
              <DatePicker
                selected={paymentDate}
                onChange={handlePaymentDateChange}
                dateFormat="dd-MM-yyyy"
                className="form-control"
                autoComplete="off"
                style={{ width: "150px", height: "35px" }}
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
      <TenderPurchaseDetail/>
    </div>
  );
};

export default TenderPurchaseHead;

