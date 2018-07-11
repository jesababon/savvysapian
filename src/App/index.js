import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style.css";
import LandingPage from "../LandingPage";
import Artist from "../Artist";
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
      next: '',
      shows: []
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
      q: 'kehinde'
    })
    .getResource(function (error, data) {
      const shows= data._embedded.results.map( result =>{
        if(result.type === 'show'){
        return result._links.self.href}
        return shows;
      });
      // console.log(shows);
      
      const results = data._embedded.results;
      const next = data._links.next.href; //returns the next json array
      // const showLink = data._embedded.results._links.self.href
      if (error) {
        console.log('Sorry, not found');
      } else {
        currentComponent.setState({
          results: results,
          next: next,
          shows: shows
        });
      }
    })
  }

    // componentDidMount() {
    //     let currentComponent = this; 
    //     console.log(currentComponent);
        
        
    //     const showsApi = traverson.from('https://api.artsy.net:443/api/shows/5908d4d1139b21635fae5778').jsonHal();

    //     // let showTitle = '';
    //     // console.log('show is titled:', showTitle);
    //     showsApi.newRequest()
    //       // .follow('shows')
    //       .withRequestOptions({
    //         headers: {
    //           'X-Xapp-Token': xappToken,
    //           'Accept': 'application/vnd.artsy-v2+json'
    //         }
    //       })
    //       // .withTemplateParameters({
    //       //   id: '5908d4d1139b21635fae5778',
    //       // })
    //       .getResource(function (error, data) {
    //         // console.log('shows data:', data);

    //         const dataId = data.id
    //         if (dataId === '5908d4d1139b21635fae5778') {
    //           return dataId
    //         }

    //         const shows = dataId;            
    //         if (error) {
    //           console.log('Sorry, no shows found');
    //         } else {
    //           currentComponent.setState({
    //             shows: shows
    //           });
    //         }
    //       })
    //     }



  render() {

    return (
    <Router>

      <div className="App">
        <h1>Savvy?</h1>
        <nav>
        <Link to = "/"> Home </Link>
        </nav>
        {/* {console.log(this.state.results)} */}
        {/* {console.log('shows in state', this.state.shows)} */}
        
        <div className="ResultsDiv">{this.state.results.map((result, index) => {
          // if (result.type === "show") {
          //   const showLink= result._links.self.href
          //   console.log(showLink);
            
          //   return showLink
          // }
          //closed shows are showing up. have to parse through only open shows
          //ex show json: https: //api.artsy.net/api/shows/5908d4d1139b21635fae5778
          //id, name (functions as title), description, press_release, start_at, end_at
          if (result.type === "artist") {
            //add artist rendering
            return (
            <Artist key={index}
            title={result.title}
            type={result.type}
            image={result._links.thumbnail.href}
            visit={result._links.self.href}
            //ex artist json: https://api.artsy.net/api/artists/4ed901b755a41e0001000a9f
          />)
          }
          else if (result.type === "artwork") {
            //add artwork rendering
            return (
            <Artwork key={index}
              title={result.title}
              type={result.type}
              image={result._links.thumbnail.href}
              visit={result._links.permalink.href}
            />)
            } 
            // else if (result.type === "show") {
            // //add artwork rendering
            // return (
            // <Show key={index}
            //   title={result.title}
            //   type={result.type}
            //   image={result._links.thumbnail.href}
            //   visit={result._links.permalink.href}
            // />)
            // } 
            else {
              return console.log(`Not rendering ${result.type}s in this module`);
            }
        })}
        </div>
            <div className='ShowsResults'>
            {this.state.shows.map((show, index) => {
              console.log(show);
              if (show !== undefined) {
                return <Show key={index}
              showUrl={show} />
              }else{
                return ''
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
