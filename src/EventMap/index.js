import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const mapApi = "AIzaSyCQd_v_G5Gdqm03HsWHsEmiN9FqCD4WxgI";

const Marker = ({ text }) => (
  <div
    style={{
      color: "violet",
      background: "grey",
      padding: "5px 5px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)"
    }}
  >
    {text}
  </div>
);


class EventMap extends Component {
  
  static defaultProps = {
    center: {
      lat: 40.744086,
      lng: -73.98770
    },
    zoom: 12,
    myCoords: { lat: 40.7128, lng: -74.00 }
  };

  render() {
    const eachEv = this.props.eventData.map(event => {
    const eachEvent = event[0];
      return {
        evLat: eachEvent.eventLat[0],
        evLong: eachEvent.eventLong[0],
        evName: eachEvent.eventName,
        evAddress: eachEvent.eventAddress,
        evStart: eachEvent.eventDateStart,
        evEnd: eachEvent.eventDateEnd
      };
    });
const oneEvent = eachEv['0'];
// const oneDetails = oneEvent[0];
// console.log(oneDetails);
    // Object.keys(oneEvent)[0])

    console.log("map props:", oneEvent);

    // ['0']['evLat']

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "30vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapApi }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {eachEv.map((oneEv, index) => {
            // console.log('marker', oneEv.evLat);
            return (
              <Marker
                key={index}
                lat={oneEv.evLat}
                lng={oneEv.evLong}
                text={index}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default EventMap;
