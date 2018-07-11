import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";
import LandingPage from "../LandingPage";
import Artwork from "../Artwork";
import Show from "../Show";
const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal'); //plugin adds support for hypertext application language
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTc1MTE2NCwiaWF0IjoxNTMxMTQ2MzY0LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0MzcwN2MwMmRlNjEwMDIyMjMzNmZkIn0.d7Q59zoc22gLyZHnzkWRchMf6yNvXOzJHpu0mimOzGM';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
const api = traverson.from('https://api.artsy.net/api').jsonHal();

//search for anything console.log(data._embedded.results[0]._links.permalink.href)
// console.log(JSON.stringify(data))
//met only https://api.artsy.net/api/artworks?partner_id=52e9639bc9dc24eff7000103
// data._embedded.results ➡(map) type(artist, show or article)
//get self json ➡(map) _links.self.href)
//; thumbnail ➡ (map) _links.thumbnail.href)
// const next = data._links.next.href; //returns the next json array
// return results;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      next: ''
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
      q: 'impressionist'
    })
    .getResource(function (error, data) {
      const results = data._embedded.results;
      const next = data._links.next.href; //returns the next json array
      if (error) {
        console.log('Sorry, not found');
      } else {
        currentComponent.setState({
          results: results,
          next: next
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
        {console.log(this.state.results)}
        
        <div className="ResultsDiv">{this.state.results.map((result, index) => {
          if (result.type === "artist") {
            return (<Artwork key={index}
            title={result.title}
            type={result.type}
            image={result._links.thumbnail.href}
            visit={result._links.permalink.href}
          />)
          }
          else if (result.type === "show") {
            //add show rendering
          return (<Show key={index}
            title={result.title}
            type={result.type}
            image={result._links.thumbnail.href}
            visit={result._links.permalink.href}
          />)
            } 
          else {
              console.log(`no results for ${result.type}`);
              <p> Sorry, No results for this search. </p>
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
