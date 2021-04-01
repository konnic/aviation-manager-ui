import React, { useState } from "react";
import { FaWindowClose, FaPlus } from "react-icons/fa";
import AddAirline from "./AddAirline";
import Airline from "./Airline";

const Airlines = ({
  airlines,
  onAddAirline,
  onDeleteAirline,
  onUpdateAirline,
  countries,
}) => {
  const [addAirlineShown, setAddAirlineShown] = useState(false);

  return (
    <>
      <div className="container">
        <div className="row py-2">
          <h1 className="col-8">Airlines</h1>
          {/* TODO make own component => ToggleButton */}
          <button
            onClick={() => setAddAirlineShown(!addAirlineShown)}
            className="btn btn-light mb-2 col-4"
          >
            {addAirlineShown ? (
              <>
                <span className="mr-2">Close</span>
                <FaWindowClose />
              </>
            ) : (
              <>
                <span className="mr-2">Add Airline</span>
                <FaPlus />
              </>
            )}
          </button>
        </div>
      </div>
      {addAirlineShown ? (
        <AddAirline
          countries={countries}
          onAddAirline={onAddAirline}
          onCloseAddAirline={() => setAddAirlineShown(false)}
        />
      ) : (
        airlines.map((airline) => (
          <Airline
            key={airline.id}
            airline={airline}
            countries={countries}
            onDeleteAirline={onDeleteAirline}
            onUpdateAirline={onUpdateAirline}
          />
        ))
      )}
    </>
  );
};

export default Airlines;
