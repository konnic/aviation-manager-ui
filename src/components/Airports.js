import React, { useState } from "react";
import Airport from "./Airport";
import AddAirport from "./AddAirport";
import { FaPlus, FaWindowClose } from "react-icons/fa";

const Airports = ({
  airports,
  onAddAirport,
  onUpdateAirport,
  onDeleteAirport,
  onGetAssociatedAirlines,
  countries,
  airlines,
}) => {
  const [addAirportShown, setAddAirportShown] = useState(false);

  return (
    <>
      <div className="container">
        <div className="row py-2">
          <h1 className="col-8">Airports</h1>
          <button
            onClick={() => setAddAirportShown(!addAirportShown)}
            className="btn btn-light mb-2 col-4"
          >
            {addAirportShown ? (
              <>
                <span className="mr-2">Close</span>
                <FaWindowClose />
              </>
            ) : (
              <>
                <span className="mr-2">Add Airport</span>
                <FaPlus />
              </>
            )}
          </button>
        </div>
      </div>
      {addAirportShown ? (
        <AddAirport
          onAddAirport={onAddAirport}
          countries={countries}
          airlines={airlines}
          onCloseAddAirport={() => setAddAirportShown(false)}
        />
      ) : (
        airports.map((airport) => (
          <Airport
            key={airport.id}
            airport={airport}
            associatedAirlines={onGetAssociatedAirlines(airport.id)}
            onDeleteAirport={onDeleteAirport}
            onUpdateAirport={onUpdateAirport}
          />
        ))
      )}
    </>
  );
};

export default Airports;
