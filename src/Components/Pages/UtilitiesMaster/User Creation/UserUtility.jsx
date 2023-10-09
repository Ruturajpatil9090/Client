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
import Pagination from "../../../../UtilityCommon/Pagination";
import SearchBar from "../../../../UtilityCommon/SearchBar";
import PerPageSelect from "../../../../UtilityCommon/PerPageSelect";
import "../../../../App.css";
import axios from "axios";

function UserCreationUtility() {
  const [fetchedData, setFetchedData] = useState([]);
  const [perPage, setPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [searchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/groupmaster/getuserlist"
      );
      console.log(response);
      setFetchedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    navigate("/business/User_creation");
  };

  const handleRowClick = (doc_no) => {
    navigate("/business/User_creation", {
      state: { editRecordCode: doc_no },
    });
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const filteredData = fetchedData.filter((post) => {
      const User_Name = post.User_Name || "";
      return User_Name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return filteredData.slice(startIndex, endIndex);
  };

  return (
    <div className="App">
      <Button variant="contained" onClick={handleClick}>
        ADD
      </Button>
      <br />
      <br />

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <PerPageSelect value={perPage} onChange={handlePerPageChange} />
      <TableContainer>
        <h1>Posts Table</h1>
        <Table className="post-table">
          <TableHead>
            <TableRow>
              <TableCell>User_Id</TableCell>
              <TableCell>User Full Name</TableCell>
              <TableCell>Email_Id</TableCell>
              <TableCell>User_Type</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>UId</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {getPaginatedData().map((post) => (
              <TableRow
                key={post.User_Id}
                className="row-item"
                onDoubleClick={() => handleRowClick(post.User_Id)}
              >
                <TableCell>{post.User_Id}</TableCell>
                <TableCell>{post.userfullname}</TableCell>
                <TableCell>{post.EmailId}</TableCell>
                <TableCell>{post.User_Type}</TableCell>
                <TableCell>{post.Mobile}</TableCell>
                <TableCell>{post.uid}</TableCell>
              
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

export default UserCreationUtility;
