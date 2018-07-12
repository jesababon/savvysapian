import React, { Component } from "react";
const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal'); //plugin adds support for hypertext application language
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTc1MTE2NCwiaWF0IjoxNTMxMTQ2MzY0LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0MzcwN2MwMmRlNjEwMDIyMjMzNmZkIn0.d7Q59zoc22gLyZHnzkWRchMf6yNvXOzJHpu0mimOzGM';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

class AllShows extends Component {
     constructor(props) {
       super(props);
       this.state = {
         show: []
       };
     }

     componentWillMount() {
        let currentComponent = this;
       console.log(this.props.input);
       const api = traverson.from('https://api.artsy.net/api').jsonHal();

       api.newRequest()
        // .follow('search')
         .withRequestOptions({
           headers: {
             'X-Xapp-Token': xappToken,
             'Accept': 'application/vnd.artsy-v2+json'
           }
         })
        //  .withTemplateParameters({
        //    q: this.props.input,
        //    type: 'show'
        //   })
         .getResource(function (error, data) {
            //  console.log(data);
            const showData = data.status;
             if (data.status !== 'closed') {
                 return data.status  
             } else{
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
               shows: showData
             });
           }
         })
     }

    render(){
        return(
        <div className="Show">
            <p>Exhibit: {this.props.title}</p>
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

export default AllShows;
