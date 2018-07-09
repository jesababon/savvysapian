import React, { Component } from "react";
import "./style.css";
const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal');
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTc1MTE2NCwiaWF0IjoxNTMxMTQ2MzY0LCJhdWQiOiI1YjNlZjQyZTEzOWIyMTEzOGM2YTcyMTEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI0MzcwN2MwMmRlNjEwMDIyMjMzNmZkIn0.d7Q59zoc22gLyZHnzkWRchMf6yNvXOzJHpu0mimOzGM';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
const api = traverson.from('https://api.artsy.net/api').jsonHal();

api.newRequest()
  .follow('artist')
  .withRequestOptions({
    headers: {
      'X-Xapp-Token': xappToken,
      'Accept': 'application/vnd.artsy-v2+json'
    }
  })
  .withTemplateParameters({
    id: 'andy-warhol'
  })
  .getResource(function (error, andyWarhol) {
    console.log(andyWarhol.name + ' was born in ' + andyWarhol.birthday + ' in ' + andyWarhol.hometown);
  });

class LandingPage extends Component {
  constructor(props){
    super(props);
      this.state = {
        links: [],
      };
  }

  componentDidMount(){
    fetch('https://api.artsy.net/api')
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);      
      const links = json.filter(link => {
        return link;
      })
      this.setState({
        links,
      });
    });
  }

  render() {
    return (
    <div className="LandingPage">
    <p>You have landed.</p>
    {this.state.links.map((link, index) => {
      console.log(link);
      
      return link;
    })}
    </div>
    );
  }
}

export default LandingPage;
