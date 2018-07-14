import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";
import LandingPage from "../LandingPage";
import Artist from "../Artist";
import Artwork from "../Artwork";
import UserLocation from "../UserLocation";




//these should be made into a Traverson Helpers Component
const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal'); //plugin adds support for hypertext application language
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTc1MTE2NCwiaWF0IjoxNTMxMTQ2MzY0LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0MzcwN2MwMmRlNjEwMDIyMjMzNmZkIn0.d7Q59zoc22gLyZHnzkWRchMf6yNvXOzJHpu0mimOzGM';
traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
const api = traverson.from('https://api.artsy.net/api').jsonHal();


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      next: ''
      // shows: []
    };
  }

componentWillMount(){
  let currentComponent = this;
 api.newRequest()
    .follow('search')
    .withRequestOptions({
      headers: {
        'X-Xapp-Token': xappToken,
        'Accept': 'application/vnd.artsy-v2+json'
      }
    })
    .withTemplateParameters({
      q: 'lina viktor'
      // q: 'keever' //has shows
    })
    .getResource(function (error, data) {
      
      // const shows= data._embedded.results.map( result =>{
      //   // console.log(shows);
        
      //   if(result.type === 'show'){
          
      //   return result._links.self.href}
      //   return '';
      // });
      
      const results = data._embedded.results;
      // console.log(results);
      
      const next = data._links.next.href; //returns the next json array
      // const showLink = data._embedded.results._links.self.href
      if (error) {
        console.log('Sorry, not found');
      } else {
        currentComponent.setState({
          results: results,
          next: next
          // shows: shows
        });
      }
    })
  }

  render() {

    return (
    <Router>

      <div className="App">
        <h1>Savvy?</h1>
        <nav>
        <Link to = "/"> Home </Link>
        </nav>
        {/* {console.log(this.state.results)} */}
        <UserLocation/>

        <div className="ResultsDiv">{this.state.results.map((result, index) => {
          if (result.type === "artist") {
            //add artist rendering
            return (
            <Artist key={index}
            title={result.title}
            type={result.type}
            image={result._links.thumbnail.href}
            artistUrl={result._links.self.href}
            //ex artist json: https://api.artsy.net/api/artists/4ed901b755a41e0001000a9f
          />)
          }
          // else if (result.type === "show") {
          //   return <Show 
          //     key={index}
          //     showUrl={result._links.self.href}
          //     input={result.title}/>
          // }
          else if (result.type === "artwork") {
            //add artwork rendering
            return (
            <Artwork key={index}
              title={result.title}
              description={result.description}
              image={result._links.thumbnail.href}
              artworkUrl={result._links.self.href}
            />)
            } 
            else {
              // return console.log(``);
              return console.log(`Not rendering ${result.type}s in this module`);
            }
        })}
        </div>
        <p><a href={this.state.next}>Next</a>
        </p>
        <Route path="/" exact component={LandingPage}/>
      </div>
    </Router>
    );
  }
}


export default App;
