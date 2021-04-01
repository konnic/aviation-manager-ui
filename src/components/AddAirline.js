import React, { useState } from "react";

const AddAirline = ({ onAddAirline, countries, onCloseAddAirline }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!code || !name || !countryCode) {
      alert("Please fill all input fields");
      return;
    }

    onAddAirline({
      code,
      name,
      country_code: countryCode,
    });
    setCode("");
    setName("");
    setCountryCode("");
    onCloseAddAirline();
  };

  return (
    <form onSubmit={onSubmit} id="add-airline-form">
      <div className="form-row">
        <div className="col-md-4">
          <label>Code</label>
          <input
            id="code"
            type="text"
            placeholder="Add Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength="2"
            className="form-control mb-2"
          />
        </div>
        <div className="col-md-8">
          <label>Name</label>
          <input
            type="text"
            placeholder="Add Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="100"
            className="form-control mb-2"
          />
        </div>
      </div>
      <div>
        <label>Country</label>
        <select
          onChange={(e) => setCountryCode(e.target.value)}
          className="form-control mb-2"
        >
          <option value={null}>Add Country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {`${country.code} - ${country.name}`}
            </option>
          ))}
        </select>
      </div>

      <input
        type="submit"
        value="Add Airline"
        className="btn btn-dark btn-block mb-2"
      />
    </form>
  );
};

export default AddAirline;
