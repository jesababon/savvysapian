import React, { Component } from "react";
import "./style.css";
const axios = require('axios');
const xml2js = require('xml2js');

class Events extends Component {
     constructor(props) {
       super(props);
       this.state = {
         events: []
       };
     }

  componentWillMount() {
    // Need to change XML_URL to location search with geotag properties
  const XML_URL = 'http://www.nyartbeat.com/list/event_juststarted.en.xml'
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

            return currentComponent.setState({events: art_events})
          }
          
        }
      })
    })
  }
  //    componentWillMount() {
  //      console.log(this.state);
       
  //      fetch('/events')
  //      .then(response => response.json())
  //      .then(events => {
  //        this.setState({
  //          events: events
  //        })
  //      })
  // }

    render(){
      // console.log(this.state.events);
              return(
        <div className="Events">
              {this.state.events.map ((event, index) => {
                return (
                  <div className="EventDetails" key={index}>
                  <p>{event.DateEnd[0]}-
                  {event.DateStart[0]}</p>
                  <p>{event.Name[0]}</p>
                  {/* <p>{event.Description[0]}</p> */}
                  <p>{event.Longitude[0]}</p>
                  <p>{event.Latitude[0]}</p>
                  {/* Need to pass Long and Lat to Map Component */}
                  {/* Would like to render venue name <p>{event.venue}</p> */}
                  </div>
                )
              })}
         </div>
        )
    }
}

export default Events;
