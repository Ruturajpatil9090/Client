import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTableModal from "./DataModelTables";

const ApiDataTableModal = ({ apiType, onAcCodeClick }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [displayText, setDisplayText] = useState("");

  const handleClose = () => {
    setShowModal(false);
  };
  const handleRecordClick = (item) => {
    setSelectedRecord(item);
  
    if (apiType === "mill_code") {
      setDisplayText(item.Ac_Name_E || "");
      onAcCodeClick(item.Ac_Code);
    } else if (apiType === "Bp_Account") {
      setDisplayText(item.Ac_Name_E || "");
      onAcCodeClick(item.Ac_Code);
    } else if (apiType === "broker") {
      setDisplayText(item.cityname || "");
      onAcCodeClick(item.Ac_Code);
    }
  
    console.log("Record clicked:", item);
    handleClose();
  };
  
  const getData = async () => {
    let apiUrl;
    if (apiType === "mill_code") {
      apiUrl = "http://localhost:5000/groupmaster/gethelper?Ac_type=M";
    } else if (apiType === "Bp_Account") {
      apiUrl = "http://localhost:5000/groupmaster/gethelper?Ac_type=B";
    } else if (apiType === "broker") {
      apiUrl = "http://localhost:5000/groupmaster/gethelper";
    } else {
      console.error("Invalid apiType");
      return;
    }

    try {
      if (apiType === "mill_code" || apiType === "Bp_Account") {
        const response = await axios.get(apiUrl);
        setData(response.data);
        if (response.data.length > 0) {
          const firstItem = response.data[0];
          const headers = Object.keys(firstItem).map((key) => ({
            key,
            label: key,
          }));
          setTableHeaders(headers);
        }

        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F1") {
        let targetTextBoxId;
        if (apiType === "mill_code") {
          targetTextBoxId = "millCodeTextBox";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [apiType, getData]);

  return (
    <div
      className="col-3 d-flex align-items-center"
      style={{ maxWidth: "200px" }}
    >
      <label htmlFor="companyName" className="form-label">
        {apiType === "mill_code"
          ? "Mill Code:"
          : "" || apiType === "Bp_Account"
          ? "BP Account:"
          : "" || apiType === "broker"
          ? "Broker:"
          : ""}
      </label>
      <input
        type="text"
        id="millCodeTextBox"
        className="form-control"
        placeholder=""
        aria-label="Example text with button addon"
        aria-describedby="button-addon1"
        value={
          selectedRecord &&
          ((apiType === "mill_code" && selectedRecord.Ac_Code) ||
            (apiType === "Bp_Account" && selectedRecord.Ac_Code) ||
            (apiType === "broker" && selectedRecord.Ac_Code))
        }
        style={{ width: "100px", height: "35px" }}
      />

      <DataTableModal
        showModal={showModal}
        onClose={handleClose}
        data={data}
        onRecordClick={handleRecordClick}
        headers={tableHeaders}
        selectedRecord={selectedRecord}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon1"
        onClick={getData}
        style={{ height: "35px" }}
      >
        ...
      </button>
      <p style={{ width: "100px", height: "5px" }}>{displayText}</p>
    </div>
  );
};

export default ApiDataTableModal;
