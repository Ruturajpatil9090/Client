import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTableSearch from "../common/DataTableSearch";
import DataTablePagination from "../common/DataTablePagination";
import axios from "axios";
import "../../App.css";



var lActiveInputFeild = "";
const ApiDataTableModal = ({
  onAcCodeClick,
  onBrokerButtonClick,
  onIdClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [popupContent, setPopupContent] = useState([]);
  const [enteredAcCode, setEnteredAcCode] = useState("");
  const [enteredAcName, setEnteredAcName] = useState("");
  const [enteredBrokerCode, setEnteredBrokerCode] = useState("");
  const [enteredBrokerName, setEnteredBrokerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [enteredBpCode, setEnteredenteredBpCode] = useState("");
  const [enteredBpName, setEnteredenteredBpName] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
 

  const fetchAndOpenPopupData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/groupmaster/gethelperall"
      );
      const data = response.data;
      setPopupContent(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBpAccountButtonClick = () => {
    lActiveInputFeild = "BpAccountInput";
    fetchAndOpenPopupData();
    if (onIdClick) {
      onIdClick(enteredBpCode);
    }
  };

  const handleBpAccountChange = (event) => {
    const { value } = event.target;

    setEnteredenteredBpCode(value);

    const matchingItems = popupContent.find(
      (item) => item.Ac_Code === parseInt(value, 10)
    );
    setEnteredenteredBpName(matchingItems ? matchingItems.Ac_Name_E : "");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const fetchAndOpenPopup = async (acType) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/groupmaster/gethelper?Ac_type=${acType}`
      );
      const data = response.data;
      setPopupContent(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMillCodeButtonClick = () => {
    lActiveInputFeild = "millCodeInput";
    fetchAndOpenPopup("M");
    if (onAcCodeClick) {
      onAcCodeClick(enteredAcCode);
    }
  };

  const handleBrokerButtonClick = () => {
    lActiveInputFeild = "brokerCodeInput";
    fetchAndOpenPopup("B");
    if (onBrokerButtonClick) {
      onBrokerButtonClick(enteredBrokerCode);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAcCodeChange = (event) => {
    const { value } = event.target;
    setEnteredAcCode(value);
    const matchingItem = popupContent.find(
      (item) => item.Ac_Code === parseInt(value, 10)
    );
    setEnteredAcName(matchingItem ? matchingItem.Ac_Name_E : "");
  };

  const handleBrokerCodeChange = (event) => {
    const { value } = event.target;

    setEnteredBrokerCode(value);

    const matchingItems = popupContent.find(
      (item) => item.Ac_Code === parseInt(value, 10)
    );
    setEnteredBrokerName(matchingItems ? matchingItems.Ac_Name_E : "");
  };

  const handleRecordDoubleClick = (item) => {
    if (lActiveInputFeild === "millCodeInput") {
      setEnteredAcCode(item.Ac_Code);
      console.log(item.Ac_Code);
      setEnteredAcName(item.Ac_Name_E);
      if (onAcCodeClick) {
        onAcCodeClick(item.Ac_Code);
      }
    } else if (lActiveInputFeild === "brokerCodeInput") {
      setEnteredBrokerCode(item.Ac_Code);
      setEnteredBrokerName(item.Ac_Name_E);
      if (onBrokerButtonClick) {
        onBrokerButtonClick(item.Ac_Code);
      }
    } else if (lActiveInputFeild === "BpAccountInput") {
      setEnteredenteredBpCode(item.Ac_Code);
      console.log(item.Ac_Code);
      setEnteredenteredBpName(item.Ac_Name_E);
      if (onIdClick) {
        onIdClick(item.Ac_Code);
      }
    }

    console.log("Closing modal");
    setShowModal(false);
  };

  const filteredData = popupContent.filter((item) =>
    item.Ac_Name_E.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "F1") {
        if (event.target.id === "millCodeInput") {
          lActiveInputFeild = "millCodeInput";
          fetchAndOpenPopup("M");
          event.preventDefault();
        } else if (event.target.id === "brokerCodeInput") {
          lActiveInputFeild = "brokerCodeInput";
          fetchAndOpenPopup("B");
          event.preventDefault();
        } else if (event.target.id === "BpAccountInput") {
          lActiveInputFeild = "BpAccountInput";
          fetchAndOpenPopupData();
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
   
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedRowIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedRowIndex((prev) =>
          Math.min(prev + 1, itemsToDisplay.length - 1)
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        handleRecordDoubleClick(itemsToDisplay[selectedRowIndex]);
      }
  
      // Ensure the selected row is in view when using arrow keys
      const modalBody = document.querySelector(".modal-body");
      const selectedRow = document.querySelector(".selected-row");
      if (modalBody && selectedRow) {
        const selectedRowOffset = selectedRow.offsetTop;
        const modalBodyOffset = modalBody.scrollTop;
        const modalBodyHeight = modalBody.clientHeight;
        
        if (selectedRowOffset < modalBodyOffset) {
          modalBody.scrollTop = selectedRowOffset;
        } else if (selectedRowOffset > modalBodyOffset + modalBodyHeight) {
          modalBody.scrollTop = selectedRowOffset - modalBodyHeight + selectedRow.clientHeight;
        }
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRowIndex, itemsToDisplay]);
  
  
  return (
    <div>
      <label htmlFor="millCodeInput" className="col-2 form-label" id="">
        active Input feild:
      </label>

      <div className="mb-2 d-flex align-items-center">
        <label htmlFor="millCodeInput" className="col-2 form-label">
          Mill Code:
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="millCodeInput"
            placeholder="Enter Mill Code"
            value={enteredAcCode}
            onChange={handleAcCodeChange}
            style={{ width: "150px" }}
          />
          <Button
            variant="primary"
            onClick={handleMillCodeButtonClick}
            className="ms-1"
          >
            ...
          </Button>
          <label id="acNameLabel" className="ms-2">
            {enteredAcName}
          </label>
        </div>
      </div>

      <div className="mb-2 d-flex align-items-center">
        <label htmlFor="brokerCodeInput" className="col-2 form-label">
          Broker Code:
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="brokerCodeInput"
            placeholder="Enter Broker Code"
            value={enteredBrokerCode}
            onChange={handleBrokerCodeChange}
            style={{ width: "150px" }}
          />
          <Button
            variant="primary"
            onClick={handleBrokerButtonClick}
            className="ms-1"
          >
           ...
          </Button>
          <label id="acNameLabel" className="ms-2">
            {enteredBrokerName}
          </label>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Popup</Modal.Title>
        </Modal.Header>
        <DataTableSearch data={popupContent} onSearch={handleSearch} />
        <Modal.Body>
          {Array.isArray(popupContent) ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Account Code</th>
                    <th>Account Name</th>
                    <th>Account Type</th>
                    <th>City Name</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsToDisplay.map((item, index) => (
                    <tr
                      key={index}
                      onDoubleClick={() => handleRecordDoubleClick(item)}
                    >
                      <td>{item.Ac_Code}</td>
                      <td>{item.Ac_Name_E}</td>
                      <td>{item.Ac_type}</td>
                      <td>{item.cityname}</td>
                      <td>{item.Address_E}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            "Loading..."
          )}
        </Modal.Body>

        <Modal.Footer>
          <DataTablePagination
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Popup</Modal.Title>
        </Modal.Header>
        <DataTableSearch data={popupContent} onSearch={handleSearch} />
        <Modal.Body>
          {Array.isArray(popupContent) ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Account Code</th>
                    <th>Account Name</th>
                    <th>Account Type</th>
                    <th>City Name</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsToDisplay.map((item, index) => (
                    <tr
                      key={index}
                      onDoubleClick={() => handleRecordDoubleClick(item)}
                    >
                      <td>{item.Ac_Code}</td>
                      <td>{item.Ac_Name_E}</td>
                      <td>{item.Ac_type}</td>
                      <td>{item.cityname}</td>
                      <td>{item.Address_E}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center">Loading...</div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <DataTablePagination
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mb-2 d-flex align-items-center">
        <label htmlFor="brokerCodeInput" className="col-2 form-label">
          Bp Account:
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="BpAccountInput"
            placeholder="Enter Broker Code"
            value={enteredBpCode}
            onChange={handleBpAccountChange}
            style={{ width: "150px" }}
          />
          <Button
            variant="primary"
            onClick={handleBpAccountButtonClick}
            className="ms-1"
          >
           ...
          </Button>
          <label id="acNameLabel" className="ms-2">
            {enteredBpName}
          </label>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Popup</Modal.Title>
        </Modal.Header>
        <DataTableSearch data={popupContent} onSearch={handleSearch} />
        <Modal.Body>
          {Array.isArray(popupContent) ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Account Code</th>
                    <th>Account Name</th>
                    <th>Account Type</th>
                    <th>City Name</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsToDisplay.map((item, index) => (
                    <tr
                      key={index}
                      onDoubleClick={() => handleRecordDoubleClick(item)}
                      className={index === selectedRowIndex ? "selected-row" : ""}
                    >
                      <td>{item.Ac_Code}</td>
                      <td>{item.Ac_Name_E}</td>
                      <td>{item.Ac_type}</td>
                      <td>{item.cityname}</td>
                      <td>{item.Address_E}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            "Loading..."
          )}
        </Modal.Body>

        <Modal.Footer>
          <DataTablePagination
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ApiDataTableModal;
