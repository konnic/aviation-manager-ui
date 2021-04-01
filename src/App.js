import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Airlines from "./components/Airlines";
import Airports from "./components/Airports";
import NavBar from "./components/NavBar";
import navItems from "./navItems.json";
import {
  deleteResource,
  getResource,
  postResource,
  updateResource,
} from "./shared/ResourceService";
import gmapsApiKey from "./gmapsKey";

const App = () => {
  const [airports, setAirports] = useState([]);
  const [countries, setCountries] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    const getAirports = async () => {
      const data = await getResource("/api/airports");
      setAirports(data);
    };
    const getCountries = async () => {
      const data = await getResource("/api/countries");
      setCountries(data);
    };
    const getAirlines = async () => {
      const data = await getResource("/api/airlines");
      setAirlines(data);
    };
    const getAssociations = async () => {
      const data = await getResource("/api/associations");
      setAssociations(data);
    };

    getAirports();
    getCountries();
    getAirlines();
    getAssociations();
  }, []);

  const addAirport = async (airport, associatedAirlines) => {
    const data = await postResource("/api/airports", airport);
    setAirports([...airports, data]);
    if (associatedAirlines.length > 0) {
      addAssociations(data.id, associatedAirlines);
    }
  };

  const updateAirport = async (updatedAirport) => {
    const data = await updateResource(
      `/api/airports/${updatedAirport.id}`,
      updatedAirport
    );
    setAirports(
      airports.map((airport) =>
        airport.id === updatedAirport.id ? data : airport
      )
    );
  };

  const deleteAirport = async (id) => {
    await deleteResource(`/api/airports/${id}`);
    setAirports(airports.filter((airport) => airport.id !== id));
  };

  const getAssociatedAirlines = (airportId) => {
    // const data = await getResource(`/api/associations?airport_id=${airportId}`);

    // // For whatever reason the response type switches between type obj and array
    // const isArray = Array.isArray(data);
    let matchedAirlines = [];
    const filteredAssociations = associations.filter(
      (association) => association.airport_id === airportId
    );
    // if (data.length > 0) {
    filteredAssociations.forEach((association) => {
      matchedAirlines = [
        ...matchedAirlines,
        ...airlines.filter((airline) => airline.id === association.airline_id),
      ];
    });
    // }
    return matchedAirlines;
  };

  const addAirline = async (airline) => {
    const data = await postResource("/api/airlines", airline);
    setAirlines([...airlines, data]);
  };

  const updateAirline = async (updatedAirline) => {
    const data = await updateResource(
      `/api/airlines/${updatedAirline.id}`,
      updatedAirline
    );
    setAirlines(
      airlines.map((airline) =>
        airline.id === updatedAirline.id ? data : airline
      )
    );
  };

  const deleteAirline = async (id) => {
    await deleteResource(`/api/airlines/${id}`);
    setAirlines(airlines.filter((airline) => airline.id !== id));
  };

  const addAssociations = async (airportId, associatedAirlines) => {
    associatedAirlines.forEach(async (airlineId) => {
      const data = await postResource("/api/associations", {
        airline_id: airlineId,
        airport_id: airportId,
      });
      setAssociations([...associations, data]);
    });
  };

  return (
    <Router>
      <NavBar navItems={navItems.navItems} title="Aviation Manager" />
      <div className="container">
        <Route path="/" exact>
          <Redirect to="/airports" />
        </Route>
        <Route
          path="/airports"
          exact
          render={(props) => (
            <>
              <Airports
                airports={airports}
                countries={countries}
                airlines={airlines}
                associations={associations}
                onAddAirport={addAirport}
                onUpdateAirport={updateAirport}
                onDeleteAirport={deleteAirport}
                onGetAssociatedAirlines={getAssociatedAirlines}
                gmapsApiKey={gmapsApiKey}
              />
            </>
          )}
        />
        <Route
          path="/airlines"
          exact
          render={(props) => (
            <>
              <Airlines
                airlines={airlines}
                countries={countries}
                onAddAirline={addAirline}
                onDeleteAirline={deleteAirline}
                onUpdateAirline={updateAirline}
              />
            </>
          )}
        />
      </div>
    </Router>
  );
};

export default App;
