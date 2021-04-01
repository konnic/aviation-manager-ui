import React, { useState } from "react";
import { FaTimes, FaPencilAlt } from "react-icons/fa";
import Map from "./Map";

const Airport = ({
  airport,
  associatedAirlines,
  onDeleteAirport,
  onUpdateAirport,
  gmapsApiKey,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [code, setCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");

  const saveChanges = () => {
    if (code || latitude || longitude || name) {
      const updatedAirport = {
        ...airport,
        code: code || airport.code,
        latitude: latitude || airport.latitude,
        longitude: longitude || airport.longitude,
        name: name || airport.name,
      };

      onUpdateAirport(updatedAirport);
    }

    setEditMode(!editMode);
  };

  const handleMapClick = (lat, long) => {
    setLatitude(lat);
    setLongitude(long);
  };

  return (
    <div className="card mb-2">
      <div className="card-header d-flex justify-content-between">
        {editMode ? (
          <input
            disabled={!editMode}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={airport.name}
            maxLength="100"
            className="form-control w-50 h5"
          />
        ) : (
          <h5>{airport.name}</h5>
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
            onClick={() => onDeleteAirport(airport.id)}
            className="btn btn-secondary btn-sm"
          >
            <span className="mr-2">Delete </span>
            <FaTimes />
          </button>
        </div>
      </div>
      <>
        <div className="card-body row">
          <div className="col-2">
            <label>Code</label>
            <input
              type="text"
              disabled={!editMode}
              placeholder={airport.code}
              value={editMode ? code : airport.code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="3"
              className="form-control mb-2"
            />
          </div>
          <div className="col-5">
            <label>Latitude</label>
            <input
              disabled
              type="text"
              value={latitude || airport.latitude}
              className="form-control mb-2"
            />
          </div>
          <div className="col-5">
            <label>Longitude</label>
            <input
              disabled
              type="text"
              value={longitude || airport.longitude}
              className="form-control mb-2"
            />
          </div>
        </div>
        {editMode ? (
          <Map
            onMapClick={handleMapClick}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${gmapsApiKey}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={airport.latitude}
            long={airport.longitude}
          />
        ) : (
          ""
        )}

        {associatedAirlines.length > 0 && !editMode ? (
          <div className="card-body row">
            <label className="col-12">Associated Airlines</label>
            {associatedAirlines.map((airline) => (
              <div key={airline.id} className="input-group col-4 mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={`${airline.name} (${airline.code})`}
                  disabled
                />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default Airport;
