import React, { Component } from "react";
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
  const XML_URL = 'http://www.nyartbeat.com/list/event_juststarted.en.xml'
  const parser = new xml2js.Parser();

  axios.get(XML_URL)
    .then(function (response) {
      parser.parseString(response.data, function (err, result) {
        for (const value in result) {
          const event = result[value];
          for (const value in event) {
            const art_events = event[value];
              console.log(art_events);

            return art_events
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
    //     return(
    //     <div className="Show">
    //         <p>{this.state.title}</p>
    //         <a href={this.props.visit}>
    //         <img src={this.props.image} alt=''/>
    //         </a>
    //     </div>
    //     )
        return 'Events';

    }
}

export default Events;
