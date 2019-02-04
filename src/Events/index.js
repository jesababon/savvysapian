import React, { Component } from "react";
import EventMap from '../EventMap';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


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
      <div className="EventsContainer">
      {/* {console.log(this.state.events)} */}
      
              <div className="Map">
                <EventMap 
                key ={this.state.events.Name}
                eventData={this.state.events.map( event =>{
                  
                const geoArrayLong = [];
                geoArrayLong.push({
                  eventLat: event.Latitude, 
                  eventLong: event.Longitude,
                  eventName: event.Name[0],
                  eventMedia: event.Media,
                  eventDateStart: event.DateStart[0],
                  eventDateEnd: event.DateEnd[0],
                  eventDesc: event.Description[0],
                  eventAddress: event.Venue[0].Address[0],
                  eventPrice: event.Price[0]
              
                  
                });
                return geoArrayLong
                })}
                />
              </div>
        <CSSTransitionGroup className="Events" transitionName="fades" transitionEnterTimeout={1700} transitionLeaveTimeout={1700}>
            {this.state.events.map((event, index) => {
              return (
                <div className="EventDetails" key={index}>
                  <p style={{fontWeight:'bold', textAlign:'center'}}>{index}</p>
                  <p style={{fontWeight:'bold'}}>{event.Name[0]}</p>
                  <p>{event.DateEnd[0]+' to '}
                    {event.DateStart[0]}</p>
                    <p>{event.Media}</p>
                    <p>{event.Venue[0].Address[0]}</p>
                  <div className='EventDescription'>
                   <p>{event.Description[0]}</p>
                  </div>
              </div>
              )}
              )
            }
        </CSSTransitionGroup>
      </div>
        )
      }
}

export default Events;
