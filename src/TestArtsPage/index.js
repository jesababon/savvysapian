import React, { Component } from "react";
import "./style.css";
import Artist from "../Artist";
import Artwork from "../Artwork";
import UserLocation from "../UserLocation";


//these should be made into a Traverson Helpers Component
const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal'); //plugin adds support for hypertext application language
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMjM1NzQ1NywiaWF0IjoxNTMxNzUyNjU3LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0Y2IwZDFlMDFlN2IwMDFmMjllY2JlIn0.jn-RY4N6BH64faWWKqJZBdXyjipwUnsYVTh61aQYy8c';
traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
const api = traverson.from('https://api.artsy.net/api').jsonHal();


class TestArtsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: []
    };
  }

componentDidMount(){
  let currentComponent = this;
  // console.log('state:', this.state);
  // console.log('props:', this.props.query.search);
  
 api.newRequest()
    .follow('search')
    .withRequestOptions({
      headers: {
        'X-Xapp-Token': xappToken,
        'Accept': 'application/vnd.artsy-v2+json'
      }
    })
    .withTemplateParameters({
      q: 'jean gerome'
      // q: 'keever' //has shows
    })
    .getResource(function (error, data) {
      // console.log('get resource data',data);
      
      // const shows= data._embedded.results.map( result =>{
      //   // console.log(shows);
        
      //   if(result.type === 'show'){
          
      //   return result._links.self.href}
      //   return '';
      // });
      
      const results = data._embedded.results;
      
      // const next = data._links.next.href; //returns the next json array
      // const showLink = data._embedded.results._links.self.href
      if (error) {
        console.log('Sorry, not found');
      } else {
        currentComponent.setState({
          results: results
          // next: next
          // shows: shows
        });
      }
    })
  }

  render() {

    return (

      <div className="ResultsContainer">
        {/* {console.log(this.state.results)} */}
        <UserLocation/>

        <div className="ResultsDiv">{this.state.results.map((result, index) => {
          if (result.type === "artist") {
            //add artist rendering
            return (
              <div className='ArtistResults' key={index+'artistResults'}>
            <Artist key={index+'artist'}
            title={result.title}
            type={result.type}
            image={result._links.thumbnail.href}
            artistUrl={result._links.self.href}
            //ex artist json: https://api.artsy.net/api/artists/4ed901b755a41e0001000a9f
          />
          </div>
          )
          }
          else if (result.type === "artwork") {
            //add artwork rendering
            return (
              <div className = 'ArtworkResults' key={index+'artworkResults'}>
                <Artwork key={index+'artwork'}
                  title={result.title}
                  description={result.description}
                  image={result._links.thumbnail.href}
                  artworkUrl={result._links.self.href}
                />
            </div>
          )} 
            else {
              return (
              // console.log(`Not rendering ${result.type}s in this module`)
              console.log(``)
              )
            }
        })}
        </div>
      </div>
    )
  }
}


export default TestArtsPage;
