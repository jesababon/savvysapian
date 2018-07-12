import React, { Component } from "react";
// import { join } from "path";
const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal'); //plugin adds support for hypertext application language
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTc1MTE2NCwiaWF0IjoxNTMxMTQ2MzY0LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0MzcwN2MwMmRlNjEwMDIyMjMzNmZkIn0.d7Q59zoc22gLyZHnzkWRchMf6yNvXOzJHpu0mimOzGM';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

class Artwork extends Component {
    componentDidMount() {

        const api = traverson.from(this.props.input).jsonHal();
        let currentComponent = this;


            api.newRequest()
            //  .follow('artworks')
             .withRequestOptions({
               headers: {
                 'X-Xapp-Token': xappToken,
                 'Accept': 'application/vnd.artsy-v2+json'
               }
             })
            //   .withTemplateParameters({
                // slug: this.props.title
                // type: 'artwork'
            //    })
             .getResource(function (error, data) {
                // console.log(data);
            //    const showData = data.status;
               if (data !== 'closed') {
                 return data
               } else {
                 console.log('No current or upcoming shows.');

               }

               //    const shows = data._embedded.results.map(result => {
               //      if (result.type === 'show') {
               //        return result._links.self.href
               //      }
               //      return shows;
               //    });
               // console.log(shows);

               if (error) {
                 console.log('Sorry, no shows found');
               } else {
                 currentComponent.setState({
                   data: data
                 });
               }
             })
           }

    render(){
        return(
        <div className="Artwork">
            <p>Artwork</p>
            <p>Title: {this.props.title}</p>
            <p>
                <a href={this.props.visit}>
                <img src={this.props.image} alt=''/>
                </a>
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
