// components/DataTableModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import DataTableSearch from "./DataTableSearch";
import DataTablePagination from "./DataTablePagination"; 
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
        item.id.toString().includes(searchTerm) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} onDoubleClick={() => handleRecordClick(item)}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
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