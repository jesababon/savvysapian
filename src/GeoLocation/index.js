import React from "react";
import Geolocation from "react-geolocation";
// import Events from "../Events";

{/* <Link to = "/events"> Events</Link> */}

{/* <Route path="/events" exact component={Events}/> */}

export default () => {
  return (
    <Geolocation
      onSuccess={console.log}
      render={({
        fetchingPosition,
        position: { coords: { latitude, longitude } = {} } = {},
        error,
        getCurrentPosition
      }) =>
        <div>
          <button onClick={getCurrentPosition}>Want more Art?</button>
          {error &&
            <div>
              {error.message}
            </div>}
          <pre>
            latitude: {latitude} 
            longitude: {longitude}
          </pre>
        </div>}
    />
  ); //then generate event based on lat and long
};
