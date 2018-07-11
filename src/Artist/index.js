import React, { Component } from "react";

class Artist extends Component {
    render(){
        return(
        <div className="Artist">
            <p>Artist: {this.props.title}</p>
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

export default Artist;
