import React, { useState } from "react";
import { FaTimes, FaPencilAlt } from "react-icons/fa";

const Airline = ({ airline, countries, onDeleteAirline, onUpdateAirline }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [countryCode, setCountryCode] = useState(airline.country_code);
  const [editMode, setEditMode] = useState(false);

  const saveChanges = () => {
    const countryCodeUpdated = countryCode !== airline.country_code;
    if (code || name || countryCodeUpdated) {
      const updatedAirline = {
        ...airline,
        code: code || airline.code,
        name: name || airline.name,
        country_code: countryCode || airline.country_code,
      };
      onUpdateAirline(updatedAirline);
    }
    setEditMode(false);
  };

  return (
    <div className="card mb-2">
      <div className="card-header d-flex justify-content-between">
        {editMode ? (
          <input
            disabled={!editMode}
            onChange={(e) => setName(e.target.value)}
            type="text"
            maxLength="100"
            placeholder={airline.name}
            className="form-control w-50 h5"
          />
        ) : (
          <h5>{airline.name}</h5>
        )}

        <div>
          <button
            onClick={
              editMode ? () => saveChanges() : () => setEditMode(!editMode)
            }
            className="btn btn-secondary btn-sm mr-2"
          >
            <span className="mr-2">{editMode ? "Save Changes" : "Edit"}</span>
            <FaPencilAlt />
          </button>
          <button
            onClick={() => onDeleteAirline(airline.id)}
            className="btn btn-secondary btn-sm"
          >
            <span className="mr-2">Delete </span>
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="card-body row">
        <div className="col">
          <label>Code</label>
          <input
            maxLength="2"
            type="text"
            disabled={!editMode}
            placeholder={airline.code}
            value={editMode ? code : airline.code}
            onChange={(e) => setCode(e.target.value)}
            className="form-control mb-2"
          />
        </div>
        <div className="col">
          <label>Country</label>
          <select
            value={countryCode}
            disabled={!editMode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="form-control mb-2"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {`${country.code} - ${country.name}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Airline;
