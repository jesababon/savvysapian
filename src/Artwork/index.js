import React, { Component } from "react";
// const traverson = require('traverson');
// const JsonHalAdapter = require('traverson-hal'); //plugin adds support for hypertext application language
// const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTc1MTE2NCwiaWF0IjoxNTMxMTQ2MzY0LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0MzcwN2MwMmRlNjEwMDIyMjMzNmZkIn0.d7Q59zoc22gLyZHnzkWRchMf6yNvXOzJHpu0mimOzGM';

// traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

class Artwork extends Component {
      //  constructor(props) {
      //    super(props);
      //    this.state = {
      //      id: '',
      //      name: '',
      //      gender: '',
      //      image: '',
      //      artworks: ''

      //    };
      //  }

      //  componentWillMount() {
      //    const api = traverson.from(this.props.artworkUrl[0]).jsonHal();
      //    let currentComponent = this;

      //    api.newRequest()
      //      .withRequestOptions({
      //        headers: {
      //          'X-Xapp-Token': xappToken,
      //          'Accept': 'application/vnd.artsy-v2+json'
      //        }
      //      })
      //      .getResource(function (error, data) {
      //        if (data !== undefined) {
      //          //    const shows = data._embedded.results.map(result => {
      //          //      if (result.type === 'show') {
      //          //        return result._links.self.href
      //          //      }
      //          //      return shows;
      //          //    });
      //          // console.log(shows);

      //          if (error) {
      //            console.log('');
      //          } else {

      //            currentComponent.setState({
      //              id: data.id,
      //              name: data.name,
      //              gender: data.gender,
      //              image: data._links.thumbnail.href,
      //              artworks: data._links.artworks.href
      //            });
      //          }
      //        }
      //       //  console.log('artwork data:', data);
      //      })
      //  }

    render(){
        return(
        <div className="Artwork">
            <p>Artwork</p>
            <p>Title: {this.props.title}</p>
            <p>Description: {this.props.description}</p>
            <p>
            {/* <a href={this.props.image}> */}
            <img src={this.props.image} alt=''/>
            {/* </a> */}
            </p>
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

export default Artwork;
