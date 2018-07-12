import React, { Component } from "react";
// var parseString = require('react-native-xml2js').parseString;
// var xml = "<root>Hello xml2js!</root>"
// parseString(xml, function (err, result) {
//   console.dir(result);
// })

class Events extends Component {
     constructor(props) {
       super(props);
       this.state = {
         events: []
       };
     }
     componentWillMount() {
       console.log(this.state);
       
       fetch('/events')
       .then(response => response.json())
       .then(events => {
         this.setState({
           events: events
         })
       })
  }

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
