import React, { Component } from "react";
// import EventMap from '../EventMap';


const axios = require('axios');
const xml2js = require('xml2js');

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    //if lat and long is not null then do the rest of this, else just the button
    // Need to change XML_URL to location search with geotag properties
    const userLat = Number(this.props.userLat).toFixed(2);    
    const userLong = Number(this.props.userLong).toFixed(2);
        // console.log(userLat);
        // console.log(userLong);

    const XML_URL = 'http://www.nyartbeat.com/list/event_searchNear?latitude='+userLat+'&longitude='+userLong+'&SearchRange=3000m&MaxResults=5';
    // EXAMPLE:     'http://www.nyartbeat.com/list/event_searchNear?latitude=40.719130&longitude=-73.980000&MaxResults=5;
                  // http://www.nyartbeat.com/list/event_searchNear?latitude=40.7111218&longitude=-73.9677708&MaxResults=5
    
    const parser = new xml2js.Parser();
    let currentComponent = this;    



    axios.get(XML_URL)
      .then(function (response) {
        // console.log(response.request.responseURL);
        
            // console.log('xml log', XML_URL);

        parser.parseString(response.data, function (err, result) {
          if (err) {
            console.log('No events found');
            
          } else {
            for (const value in result) {
              const event = result[value];
              for (const value in event) {
                const art_events = event[value];
                // console.log(art_events);

                return currentComponent.setState({ events: art_events })
            }

          }
        }
      }
      )
      
      })
  }

render() {
return (
      <div className='EventsContainer'>
        <div className="Events">
            {this.state.events.map((event, index) => {
              return (
                <div className="EventDetails" key={index}>
                  <p>{event.Name[0]}</p>
                  <p>{event.DateEnd[0]+' through '}
                    {event.DateStart[0]}</p>
                  <div className='EventDescription'>
                   <p>{event.Description[0]}</p>
                  </div>
                  {/* <EventMap key={index+event.Longitude[0]}
                  eventLong={event.Longitude[0]}
                  eventLat={event.Latitude[0]}
                  /> */}
              </div>
              )}
              )
            }
        </div>
      </div>
        )
      }
}

export default Events;
