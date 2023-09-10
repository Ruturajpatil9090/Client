
import React, { useState } from "react";
import CustomDatePicker from "../common/DateRangePicker";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../common/Button";
import DataTableModal from "../common/DataTableModal";
import FormComponent from "../common/FormComponent";
const OrderDetail = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

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

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setFormData((prevData) => ({
        ...prevData,
        selectedId: record.id,
      }));
  };

  const [formData, setFormData] = useState({
    changeNo: "",
    tenderdetail: "",
    invoiceNo: "",
    ackNo: "",
    companyAddress: "",
    state: "Choose...",
    tdsCutByUs: false,
    selectedDate: null,
  });

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedDate: date,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <div className="container">
        <br></br>
        <h2 style={{ alignItems: "center" }}>Delivery Order</h2>
        <br></br>
        <form className="row g-12" onSubmit={handleSubmit}>
          <div className="col-md-2">
            <label htmlFor="code" className="form-label">
              Change Number :
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
          <div className="col-md-2">
            <label htmlFor="companyName" className="form-label">
              Tender Detail Id:
            </label>
            <input
              type="text"
              className="form-control"
              name="tenderdetail"
              value={formData.tenderdetail}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="regionalName" className="form-label">
              Invoice Number:
            </label>
            <input
              type="text"
              className="form-control"
              name="invoiceNo"
              value={formData.invoiceNo}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="regionalName" className="form-label">
              ACKNO:
            </label>
            <input
              type="text"
              className="form-control"
              name="ackNo"
              value={formData.ackNo}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="col-2">
            <label htmlFor="companyAddress" className="form-label">
              Company Address:
            </label>
            <textarea
              className="form-control"
              placeholder="Company Address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              autoComplete="off"
            ></textarea>
          </div>

          <div className="col-md-4">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select
              name="state"
              className="form-select"
              value={formData.state}
              onChange={handleChange}
              autoComplete="off"
            >
              <option value="Choose...">Choose...</option>
              <option value="Option1">Option 1</option>
              <option value="Option2">Option 2</option>
            </select>
            <div>
              <label>
                TDS Cut by Us:
                <input
                  type="checkbox"
                  name="tdsCutByUs"
                  checked={formData.tdsCutByUs}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>Select Date :</label>

            <CustomDatePicker
              selectedDate={formData.selectedDate}
              onChange={handleDateChange}
            />

            <div className="container mt-5">
              <Button onClick={fetchData} />

              <DataTableModal
                showModal={showModal}
                onClose={handleClose}
                data={data}
                onRecordClick={handleRecordClick}
              />

              {selectedRecord && (
                <FormComponent
                  selectedId={selectedRecord.id}
                  selectedTitle={selectedRecord.title}
                />
              )}
            </div>
          </div>

          <div className="button" style={{ "margin-top": "40px" }}>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderDetail;












//mutiple data and data1 buttons code 

// import React, { useState } from "react";
// import CustomDatePicker from "../common/DateRangePicker";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "../common/Button";
// import DataTableModal from "../common/DataTableModal";
// import FormComponent from "../common/FormComponent";

// const OrderDetail = () => {
//   const [datas, setData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);

//   //data1
//   const [data1, setData1] = useState([]);
//   const [showModal1, setShowModal1] = useState(false);
//   const [selectedRecord1, setSelectedRecord1] = useState(null);

//   const [formData, setFormData] = useState({
//     changeNo: "",
//     tenderdetail: "",
//     invoiceNo: "",
//     ackNo: "",
//     companyAddress: "",
//     state: "Choose...",
//     tdsCutByUs: false,
//     selectedDate: null,
//   });

//   const fetchData1 = async () => {
//     try {
//       const response = await axios.get(
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       setData1(response.data);
//       setShowModal1(true);
//     } catch (error) {
//       console.error("Error fetching data1:", error);
//     }
//   };

//   const handleData1ButtonClick = (record) => {
//     setSelectedRecord1(record);
//     setFormData((prevData) => ({
//         ...prevData,
//         state: record.id, 
//       //selectState: record.title,
//       }));
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       setData(response.data);
//       setShowModal(true);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//   };

//   const handleRecordClick = (record) => {
//     setSelectedRecord(record);
//     setFormData((prevData) => ({
//       ...prevData,
//       selectedId: record.id,
//     }));
//   };

//   const handleDateChange = (date) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       selectedDate: date,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div>
//       <div className="container">
//         <br></br>
//         <h2 style={{ alignItems: "center" }}>Delivery Order</h2>
//         <br></br>
//         <form className="row g-12" onSubmit={handleSubmit}>
//           <div className="col-md-2">
//             <label htmlFor="code" className="form-label">
//               Change Number :
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="changeNo"
//               value={formData.changeNo}
//               onChange={handleChange}
//               autoComplete="off"
//             />
//           </div>
//           <div className="col-md-2">
//             <label htmlFor="companyName" className="form-label">
//               Tender Detail Id:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="tenderdetail"
//               value={formData.tenderdetail}
//               onChange={handleChange}
//               autoComplete="off"
//             />
//           </div>

//           <div className="col-md-2">
//             <label htmlFor="regionalName" className="form-label">
//               Invoice Number:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               autoComplete="off"
//             />
//           </div>
//           <div className="col-md-2">
//             <label htmlFor="regionalName" className="form-label">
//               ACKNO:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="ackNo"
//               value={formData.ackNo}
//               onChange={handleChange}
//               autoComplete="off"
//             />
//           </div>
//           <div className="col-2">
//             <label htmlFor="companyAddress" className="form-label">
//               Company Address:
//             </label>
//             <textarea
//               className="form-control"
//               placeholder="Company Address"
//               name="companyAddress"
//               value={formData.companyAddress}
//               onChange={handleChange}
//               autoComplete="off"
//             ></textarea>
//           </div>

//           <div className="col-md-4">
//             <label htmlFor="state" className="form-label">
//               State
//             </label>
//             <select
//               name="state"
//               className="form-select"
//               value={formData.state}
//               onChange={handleChange}
//               autoComplete="off"
//             >
//               <option value="Choose...">Choose...</option>
//               <option value="Option1">Option 1</option>
//               <option value="Option2">Option 2</option>
//             </select>
//             <div>
//               <label>
//                 TDS Cut by Us:
//                 <input
//                   type="checkbox"
//                   name="tdsCutByUs"
//                   checked={formData.tdsCutByUs}
//                   onChange={handleChange}
//                 />
//               </label>
//             </div>

//             <label>Select Date :</label>

//             <CustomDatePicker
//               selectedDate={formData.selectedDate}
//               onChange={handleDateChange}
//             />

//             <div className="container mt-5">
//               <Button onClick={fetchData} text="Data" />
              
//               {/* Add Data1 button */}
//               <DataTableModal
//                 showModal={showModal}
//                 onClose={handleClose}
//                 data={datas}
//                 onRecordClick={handleRecordClick}
//               />
             
//               {selectedRecord && (
//                 <FormComponent
//                   selectedId={selectedRecord.id}
//                   selectedTitle={selectedRecord.title}
//                 />
//               )}
//               <br></br>
//               <Button onClick={fetchData1} text="Data1" />
//               <DataTableModal
//                 showModal={showModal1} // Use showModal1 for data1
//                 onClose={() => setShowModal1(false)} // Use setShowModal1 for data1
//                 data={data1} // Use data1 for data1
//                 onRecordClick={handleData1ButtonClick} // Use handleData1ButtonClick for data1
//               />
//               {selectedRecord1 && (
//                 <FormComponent
//                   state={selectedRecord1.id}
//                   selectState={selectedRecord1.title}
//                 />
//               )}
//             </div>
//           </div>

//           <div className="button" style={{ marginTop: "40px" }}>
//             <button className="btn btn-primary">Save</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;

