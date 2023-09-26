import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import DataTableSearch from "../common/DataTableSearch";
import DataTablePagination from "../common/DataTablePagination";

function DataTableModal({ showModal, onClose, data, onRecordClick, headers }) {
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredData(data);
    setCurrentPage(1); // Reset current page when data changes
  }, [data]);

  const handleSearch = (searchTerm) => {
    const filteredItems = data.filter((item) => {
      return headers.some((header) =>
        item[header.key]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });

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
              {headers.map((header) => (
                <th key={header.key}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.Ac_Code} onDoubleClick={() => handleRecordClick(item)}>
                {headers.map((header) => (
                  <td key={`${item.Ac_Code}_${header.key}`}>{item[header.key]}</td>
                ))}
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






















































// // components/DataTableModal.js
// import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
// import DataTableSearch from "../common/DataTableSearch";
// import DataTablePagination from "../common/DataTablePagination"; 
// function DataTableModal({ showModal, onClose, data, onRecordClick }) {
//   const [filteredData, setFilteredData] = useState(data);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     setFilteredData(data);
//     setCurrentPage(1); // Reset current page when data changes
//   }, [data]);

//   const handleSearch = (searchTerm) => {
//     const filteredItems = data.filter(
//       (item) =>
//         item.Ac_Name_E.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.Ac_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.cityname.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filteredItems);
//     setCurrentPage(1); // Reset current page when search term changes
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleRecordClick = (item) => {
//     onRecordClick(item);
//     onClose(); // Close the popup after double-clicking the record
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <Modal show={showModal} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Data Table</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <DataTableSearch data={data} onSearch={handleSearch} />
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Ac_Code</th>
//               <th>Ac_Name_E</th>
//               <th>Ac_type</th>
//               <th>cityname</th>
//               <th>Address_E</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((item) => (
//               <tr key={item.Ac_Code} onDoubleClick={() => handleRecordClick(item)}>
//                 <td>{item.Ac_Code}</td>
//                 <td>{item.Ac_Name_E}</td>
//                 <td>{item.Ac_type}</td>
//                 <td>{item.cityname}</td>
//                 <td>{item.Address_E}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <DataTablePagination
//           totalItems={filteredData.length}
//           itemsPerPage={itemsPerPage}
//           onPageChange={handlePageChange}
//         />
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default DataTableModal;