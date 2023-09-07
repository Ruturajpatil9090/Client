import React, { useState } from "react";

function SimpleForm() {
  const [formData, setFormData] = useState({
    code: "",
    companyName: "",
    regionalName: "",
    companyAddress: "",
    regionalAddress: "",
    state: "Choose...",
    rState: "Choose...",
    rCity: "Choose...",
    city: "Choose...",
    pin: "",
    gstNumber: "",
    mobileNo: "",
    cst: "",
    tin: "",
    phone: "",
    panNo: "",
    fssaiNo: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <h2 style={{ alignItems: "center" }}>Company Creation :</h2>
      <form className="row g-12" onSubmit={handleSubmit}>
        <div className="col-md-2">
          <label htmlFor="code" className="form-label">
            Code :
          </label>
          <input
            type="text"
            className="form-control"
            id="code"
            value={formData.code}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="companyName" className="form-label">
            Company Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="regionalName" className="form-label">
            Regional Name :
          </label>
          <input
            type="text"
            className="form-control"
            id="regionalName"
            value={formData.regionalName}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-6">
          <label htmlFor="companyAddress" className="form-label">
            Company Address:
          </label>
          <textarea
            className="form-control"
            placeholder="Company Address"
            id="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            autoComplete="off"
          ></textarea>
        </div>
        <div className="col-6">
          <label htmlFor="regionalAddress" className="form-label">
            Regional Address:
          </label>
          <textarea
            className="form-control"
            placeholder="Regional Address"
            id="regionalAddress"
            value={formData.regionalAddress}
            onChange={handleChange}
            autoComplete="off"
          ></textarea>
        </div>
        <div className="col-md-4">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <select
            id="state"
            className="form-select"
            value={formData.state}
            onChange={handleChange}
            autoComplete="off"
          >
            <option value="Choose...">Choose...</option>
            <option value="Option1">Option 1</option>
            <option value="Option2">Option 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="rState" className="form-label">
            R State
          </label>
          <select
            id="rState"
            className="form-select"
            value={formData.rState}
            onChange={handleChange}
            autoComplete="off"
          >
            <option value="Choose...">Choose...</option>
            <option value="Option1">Option 1</option>
            <option value="Option2">Option 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="rCity" className="form-label">
            R City
          </label>
          <select
            id="rCity"
            className="form-select"
            value={formData.rCity}
            onChange={handleChange}
            autoComplete="off"
          >
            <option value="Choose...">Choose...</option>
            <option value="Option1">Option 1</option>
            <option value="Option2">Option 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <select
            id="city"
            className="form-select"
            value={formData.city}
            onChange={handleChange}
            autoComplete="off"
          >
            <option value="Choose...">Choose...</option>
            <option value="Option1">Option 1</option>
            <option value="Option2">Option 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="pin" className="form-label">
            Pin
          </label>
          <input
            type="text"
            className="form-control"
            id="pin"
            value={formData.pin}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="gstNumber" className="form-label">
            GST Number
          </label>
          <input
            type="text"
            className="form-control"
            id="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="mobileNo" className="form-label">
            Mobile No
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="cst" className="form-label">
            CST
          </label>
          <input
            type="text"
            className="form-control"
            id="cst"
            value={formData.cst}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="tin" className="form-label">
            TIN
          </label>
          <input
            type="text"
            className="form-control"
            id="tin"
            value={formData.tin}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="panNo" className="form-label">
            Pan No
          </label>
          <input
            type="text"
            className="form-control"
            id="panNo"
            value={formData.panNo}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="fssaiNo" className="form-label">
            FSSAI No
          </label>
          <input
            type="text"
            className="form-control"
            id="fssaiNo"
            value={formData.fssaiNo}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="button" style={{"margin-top":"40px"}}>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default SimpleForm;
