import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTableSearch from "../../common/DataTableSearch";
import DataTablePagination from "../../common/DataTablePagination";
import axios from "axios";
import "../../App.css";


var lActiveInputFeild = "";
var mc = "";
const ApiDataTableModal = ({ onAcCodeClick,name, }) => {
   //Manage the states of applications
  const [showModal, setShowModal] = useState(false);
  const [popupContent, setPopupContent] = useState([]);
  const [enteredItemCode, setenteredItemCode] = useState("");
  const [enteredAcName, setEnteredAcName] = useState("");
  const [enteredAccoid, setEnteredAccoid] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);


  // Fetch data based on acType
  const fetchAndOpenPopup = async () => {
    try {
      const response = await axios.get('http://localhost:5000/groupmaster/itemmasterhelper');
      const data = response.data;
      setPopupContent(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  // Handle Mill Code button click
  const handleMillCodeButtonClick = () => {
     lActiveInputFeild = name;
    fetchAndOpenPopup();
    if (onAcCodeClick) {
      onAcCodeClick(enteredItemCode);
    }
  };

    //popup functionality show and hide
  const handleCloseModal = () => {
    setShowModal(false);
  };

  //handle onChange event for Mill Code,Broker Code and Bp Account
  const handleAcCodeChange = (event) => {
    const { value } = event.target;
    setenteredItemCode(value);
    
    // Check if the active input field is mill code input
    if (lActiveInputFeild === name) {
      // Update enteredAcName based on the input field value
      setEnteredAcName(value);
    }

    const matchingItem = popupContent.find((item) => item.System_Code === parseInt(value, 10));

    if (matchingItem) {
      setEnteredAcName(matchingItem.Item_Name);
      console.log("Ac_Name_E:", matchingItem.Item_Name);
    }
  };


  //After open popup onDoubleClick event that record display on the feilds
  const handleRecordDoubleClick = (item) => {
    if (lActiveInputFeild === name) {
      setenteredItemCode(item.System_Code);
      setEnteredAcName(item.Item_Name);
      if (onAcCodeClick) {
        onAcCodeClick(item.System_Code);
      }
    } 
    
    console.log("Closing modal");
    setShowModal(false);
  };

  //handle pagination number
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //handle search functionality
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const filteredData = popupContent.filter((item) =>
    item.Item_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredData.slice(startIndex, endIndex);

  // Handle key events
  useEffect(() => {
    const handleKeyEvents = async (event) => {
      if (event.key === "F1" ) {
        if (event.target.id === name) {
          lActiveInputFeild = name
          fetchAndOpenPopup();
          
          event.preventDefault();
        }
      } else if (event.key === "ArrowUp" ) {
        event.preventDefault();
        setSelectedRowIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedRowIndex((prev) =>
          Math.min(prev + 1, itemsToDisplay.length - 1)
        );
      } else if (event.key === "Enter" ) {
        event.preventDefault();
        // Check if a row is selected
        if (selectedRowIndex >= 0) {
          handleRecordDoubleClick(itemsToDisplay[selectedRowIndex]);
        }
      }
    };
  
    window.addEventListener("keydown", handleKeyEvents);
  
    return () => {
      window.removeEventListener("keydown", handleKeyEvents);
    };
  }, [selectedRowIndex, itemsToDisplay, fetchAndOpenPopup, handleRecordDoubleClick]);
  

  return (
    <div className="d-flex flex-row ">
      <div className="d-flex ">
        <div className="d-flex">
          <input
            type="text"
            className="form-control ms-2"
            id={name}
            autoComplete="off"
            value={enteredItemCode}
            onChange={handleAcCodeChange}
            style={{ width: "150px", height: "35px" }}
          />
          <Button
            variant="primary"
            onClick={handleMillCodeButtonClick}
            className="ms-1"
            style={{ width: "30px", height: "35px" }}
          >
            ...
          </Button>
          <label id="acNameLabel" className=" form-labels ms-2">
            {enteredAcName}
          </label>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-dialog modal-fullscreen"
      >
        <Modal.Header closeButton>
          <Modal.Title>Popup</Modal.Title>
        </Modal.Header>
        <DataTableSearch data={popupContent} onSearch={handleSearch} />
        <Modal.Body>
          {Array.isArray(popupContent) ? (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>System_Code</th>
                    <th>Item_Name</th>
                    <th>KgPerKatta</th>
                 
                  
                  </tr>
                </thead>
                <tbody>
                  {itemsToDisplay.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        selectedRowIndex === index ? "selected-row" : ""
                      }
                      onDoubleClick={() => handleRecordDoubleClick(item)}
                    >
                      <td>{item.System_Code}</td>
                      <td>{item.Item_Name}</td>
                      <td>{item.KgPerKatta}</td>
                      
                
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