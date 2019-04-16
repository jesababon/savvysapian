import React, { Component } from "react";

const traverson = require("traverson");
const JsonHalAdapter = require("traverson-hal"); //plugin adds support for hypertext application language
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1NjAzODc5MiwiaWF0IjoxNTU1NDMzOTkyLCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWNiNjBhMDgwZjhmYzIzMzgyNmZmZDdhIn0.XRmuq0rUnq4okb_FPSMQDLGbNb4Z6msyVowMu_OPS_4';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      gender: "",
      image: "",
      artworks: ""
    };
  }

  componentWillMount() {
    const api = traverson.from(this.props.artistUrl).jsonHal();
    let currentComponent = this;

    api
      .newRequest()
      .withRequestOptions({
        headers: {
          "X-Xapp-Token": xappToken,
          Accept: "application/vnd.artsy-v2+json",
        // RetryAfter: 120,
        // 'Access-Control-Allow-Origin': 'https://api.artsy.net/api',
        // '\Access-Control-Allow-Methods': 'GET',
        // 'preflightContinue': false,
        // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, X-Requested-With, Content-Type, Accept, Authorization',
        }
      })
      .getResource(function(error, data) {
           console.log(data);

        if (data !== undefined) {
          //    const shows = data._embedded.results.map(result => {
          //      if (result.type === 'show') {
          //        return result._links.self.href
          //      }
          //      return shows;
          //    });
          // console.log(shows);

          if (error) {
            console.log("");
          } else {
            currentComponent.setState({
              id: data.id,
              name: data.name,
              gender: data.gender,
              image: data._links.thumbnail.href,
              artworks: data._links.artworks.href
            });
          }
        }
      });
  }

  render() {
    // console.log(this.state);

    return (
    <div className="ArtistDetails">
        {/* <p>Artist Id: {this.state.id} </p> */}
        <p>
          <a href={`https://en.wikipedia.org/wiki/${this.state.name}`} target="_blank" rel="noopener noreferrer">
            <img src={this.state.image} alt="" title={this.state.name}/>
          </a>
        </p>
        {/* <Artwork artworksUrl={this.state.artworks}/> */}
      </div>
    )
  }
}

//search for anything console.log(data._embedded.results[0]._links.permalink.href)
// console.log(JSON.stringify(data))
//met only https://api.artsy.net/api/artworks?partner_id=52e9639bc9dc24eff7000103
// data._embedded.results ➡(map) type(artist, show or article)
//get self json ➡(map) _links.self.href)
//; thumbnail ➡ (map) _links.thumbnail.href

export default Artist;
