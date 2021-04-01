import { useState } from "react";
import Map from "./Map";

const AddAirport = ({
  onAddAirport,
  countries,
  airlines,
  onCloseAddAirport,
}) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [associatedAirlines, setAssociatedAirlines] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!code || !name || !latitude || !longitude || !countryCode) {
      alert("Please fill all input fields");
      return;
    }

    onAddAirport(
      {
        code,
        name,
        longitude,
        latitude,
        country_code: countryCode,
      },
      associatedAirlines
    );
    setCode("");
    setName("");
    setCountryCode("");
    setLatitude("");
    setLongitude("");
    onCloseAddAirport();
  };

  const handleMapClick = (lat, long) => {
    setLatitude(lat);
    setLongitude(long);
  };

  const handleAirlineSelection = (selected, airlineId) => {
    setAssociatedAirlines(
      selected
        ? [...associatedAirlines, airlineId]
        : associatedAirlines.filter((id) => id !== airlineId)
    );
  };

  return (
    <form onSubmit={onSubmit} id="add-airport-form">
      <div className="form-row">
        <div className="col-md-4">
          <label>Code</label>
          <input
            id="code"
            type="text"
            placeholder="Add Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength="3"
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

      <label>
        Click on the map to set the airport's latitude and longitude
      </label>
      <Map
        onMapClick={handleMapClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCxnbsK8kAIVG4DVYNRudSzQu-wcFSWcZc"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        lat={null}
        long={null}
      />
      <div className="form-row mt-2">
        <div className="col-md-6">
          <label>Latitude</label>
          <input
            disabled
            type="text"
            placeholder="Add Latitude"
            value={latitude}
            className="form-control mb-2"
          />
        </div>

        <div className="col-md-6">
          <label>Longitude</label>
          <input
            disabled
            type="text"
            placeholder="Add Longitude"
            value={longitude}
            className="form-control mb-2"
          />
        </div>
      </div>
      <div className="form-row mb-2">
        <label className="col-12">Add Associated Airlines</label>
        {airlines.map((airline) => (
          <div key={airline.id} className="input-group col-6 mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleAirlineSelection(e.target.checked, airline.id)
                  }
                />
              </div>
            </div>
            <input
              type="text"
              className="form-control"
              value={`${airline.name} (${airline.code})`}
              disabled
            />
          </div>
        ))}
      </div>

      <input
        type="submit"
        value="Add Airport"
        className="btn btn-dark btn-block mb-2"
      />
    </form>
  );
};

export default AddAirport;
