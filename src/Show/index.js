import React, { Component } from "react";
import "./style.css";
// import { BrowserRouter as Router } from "react-router-dom";
const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal'); //plugin adds support for hypertext application language
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTc1MTE2NCwiaWF0IjoxNTMxMTQ2MzY0LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0MzcwN2MwMmRlNjEwMDIyMjMzNmZkIn0.d7Q59zoc22gLyZHnzkWRchMf6yNvXOzJHpu0mimOzGM';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

class Show extends Component {
     constructor(props) {
       super(props);
       this.state = {
        id: '',
        name: '',
        description: '',
        status: '',
        thumbnail: '',
        partnerLink: ''

       };
     }

     componentWillMount() {
        const api = traverson.from(this.props.showUrl).jsonHal();
        let currentComponent = this;
       
       api.newRequest()
         .withRequestOptions({
           headers: {
             'X-Xapp-Token': xappToken,
             'Accept': 'application/vnd.artsy-v2+json'
           }
         })
         .getResource(function (error, data) {
           
            if (data !== undefined){
        //    const shows = data._embedded.results.map(result => {
        //      if (result.type === 'show') {
        //        return result._links.self.href
        //      }
        //      return shows;
        //    });
           // console.log(shows);

           if (error) {
             console.log('');
           } else {
             
             currentComponent.setState({
              id: data.id,
              name: data.name,
              description: data.description, 
              status: data.status, 
              thumbnail: data._links.thumbnail.href, 
              partnerLink: data._links.partner.href
             });
           }
          }
          // console.log('show data:', data);
        }
         )
     }

    render(){
      //  console.log(this.state.id);
      //  console.log(this.state.name);


        return(
        // <Router>
        <div className="Show">
        <div className='ShowsResults'>
        Show
        {/* <p>{this.state.id}</p> */}
        <p>{this.state.name}</p>
        <p>{this.state.description}</p>
        <p><img src={this.state.thumbnail} alt={this.state.name+'thumbnail'}/></p>
        {/* create partners component to pass partnerLink */}
        {/* <p>{this.state.partnerLink}</p> */}
        </div>
        </div>
        // </Router>
        )
    }
}

//search for anything console.log(data._embedded.results[0]._links.permalink.href)
// console.log(JSON.stringify(data))
//met only https://api.artsy.net/api/artworks?partner_id=52e9639bc9dc24eff7000103
// data._embedded.results ➡(map) type(artist, show or article)
//get self json ➡(map) _links.self.href)
//; thumbnail ➡ (map) _links.thumbnail.href

export default Show;
