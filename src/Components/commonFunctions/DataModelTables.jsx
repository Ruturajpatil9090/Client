// components/DataTableModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import DataTableSearch from "../common/DataTableSearch";
import DataTablePagination from "../common/DataTablePagination"; 
function DataTableModal({ showModal, onClose, data, onRecordClick }) {
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredData(data);
    setCurrentPage(1); // Reset current page when data changes
  }, [data]);

  const handleSearch = (searchTerm) => {
    const filteredItems = data.filter(
      (item) =>
        item.Tender_No.toString().includes(searchTerm) ||
        item.Tender_Date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.millshortname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
    setCurrentPage(1); // Reset current page when search term changes
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRecordClick = (item) => {
    onRecordClick(item);
    onClose(); // Close the popup after double-clicking the record
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Data Table</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DataTableSearch data={data} onSearch={handleSearch} />
        <table className="table">
          <thead>
            <tr>
              <th>Tender_No</th>
              <th>Tender_Date</th>
              <th>millshortname</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.Tender_No} onDoubleClick={() => handleRecordClick(item)}>
                <td>{item.Tender_No}</td>
                <td>{item.Tender_Date}</td>
                <td>{item.millshortname}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <DataTablePagination
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DataTableModal;