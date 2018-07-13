import React, { Component } from "react";
import "./style.css";
import Geolocation from "react-geolocation";

const axios = require('axios');
const xml2js = require('xml2js');

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userLat: null,
      userLong: null
    }
    this.addUserLocation = this.addUserLocation.bind(this)
  }

  componentWillMount() {
    //if lat and long is not null then do the rest of this, else just the button
    // Need to change XML_URL to location search with geotag properties
    const XML_URL = 'http://www.nyartbeat.com/list/event_searchNear?latitude=40.719130&longitude=-73.980000'
    const parser = new xml2js.Parser();
    let currentComponent = this;



    axios.get(XML_URL)
      .then(function (response) {
        parser.parseString(response.data, function (err, result) {
          for (const value in result) {
            const event = result[value];
            for (const value in event) {
              const art_events = event[value];
              // console.log(art_events);

              return currentComponent.setState({ events: art_events })
            }

          }
        })
      })
  }

  addUserLocation(latitude, longitude) {
    this.setState({
      userLat: latitude,
      userLong: longitude
    })
  }
  render() {
    if(this.state.userLat !== null){
      console.log(this.state.userLat);
      
    }
    return (
      <div className='Container'>
        <div className='EventRendering'>
          <Geolocation
            render={({ fetchingPosition,
              position: { coords: { latitude, longitude } = {} } = {},
              error,
              getCurrentPosition
            }) =>
              <div>
                <button onClick={() => {
                  getCurrentPosition;
                  this.addUserLocation(latitude, longitude);
                }}>Get Position</button>
                {error &&
                  <div>
                    {error.message}
                  </div>}
              </div>}
          />
        </div>
        <div className="Events">
          {this.state.events.map((event, index) => {
            return (
              <div className="EventDetails" key={index}>
                <p>{event.DateEnd[0]}-
                  {event.DateStart[0]}</p>
                <p>{event.Name[0]}</p>
                <p>{event.Description[0]}</p>
                <p>{event.Longitude[0]}</p>
                <p>{event.Latitude[0]}</p>
                {/* Need to pass Long and Lat to Map Component */}
                {/* Would like to render venue name <p>{event.venue}</p> */}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Events;
