import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Pagination from "../../../UtilityCommon/Pagination";
import SearchBar from "../../../UtilityCommon/SearchBar";
import PerPageSelect from "../../../UtilityCommon/PerPageSelect";
import "../../../../App.css";
import axios from "axios";

// ... (existing imports)

function GroupMasterDetail() {
  const [fetchedData, setFetchedData] = useState([]);
  const [perPage, setPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/groupmaster/getutilitydata");
      console.log(response);
      setFetchedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    navigate("/business/tender_purchase");
  };

  const handleRowClick = (doc_no) => {
    navigate("/business/tender_purchase", { state: { editRecordCode: doc_no } });
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10)); // Parse value to integer
    setCurrentPage(1); // Reset to the first page when changing per page count
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return fetchedData.slice(startIndex, endIndex);
  };

  return (
    <div className="App">
      <Button variant="contained" onClick={handleClick}>
        ADD
      </Button>
      <br />
      <br />

      <div className="controls" style={{ float: "left", width: "150px" }}>
        <FormControl>
          <InputLabel id="filterSelect-label">Filter by Type:</InputLabel>
          <Select
            labelId="filterSelect-label"
            id="filterSelect"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            style={{ marginLeft: "150px", alignItems: "center" }}
          >
            <MenuItem value="">Select Group_Type</MenuItem>
            <MenuItem value="T">Type T</MenuItem>
            <MenuItem value="B">Type B</MenuItem>
            <MenuItem value="P">Type P</MenuItem>
          </Select>
        </FormControl>
      </div>
      <SearchBar value={""} onChange={() => {}} onSearchClick={() => {}} />
      <PerPageSelect value={perPage} onChange={handlePerPageChange} />
      <TableContainer>
        <h1>Posts Table</h1>
        <Table className="post-table">
          <TableHead>
            <TableRow>
              <TableCell>Tender No</TableCell>
              <TableCell>Tender Date</TableCell>
              <TableCell>Mill Short Name</TableCell>
              <TableCell>Quantal</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Mill Rate</TableCell>
              <TableCell>Payment To Name</TableCell>
              <TableCell>Tender do Name</TableCell>
              <TableCell>season</TableCell>
              <TableCell>Broker Short Name</TableCell>
              <TableCell>Lifting Date</TableCell>
              <TableCell>tenderid</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {getPaginatedData().map((post) => (
              <TableRow
                key={post.RowNumber}
                className="row-item"
                onDoubleClick={() => handleRowClick(post.RowNumber)}
              >
                <TableCell>{post.Tender_No}</TableCell>
                <TableCell>{post.Tender_Date}</TableCell>
                <TableCell>{post.millshortname}</TableCell>
                <TableCell>{post.Quantal}</TableCell>
                <TableCell>{post.Grade}</TableCell>
                <TableCell>{post.Mill_Rate}</TableCell>
                <TableCell>{post.paymenttoname}</TableCell>
                <TableCell>{post.tenderdoname}</TableCell>
                <TableCell>{post.season}</TableCell>
                <TableCell>{post.brokershortname}</TableCell>
                <TableCell>{post.Lifting_Date}</TableCell>
                <TableCell>{post.tenderid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        pageCount={Math.ceil(fetchedData.length / perPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default GroupMasterDetail;
