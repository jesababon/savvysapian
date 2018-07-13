import React, { Component } from "react";

class Artwork extends Component {

    render(){
        return(
        <div className="Artwork">
            <p>Artwork</p>
            <p>Title: {this.props.title}</p>
            <p>Description: {this.props.description}</p>
            <p>
            <img src={this.props.image} alt=''/>
            </p>
        </div>
        )
    }
}

export default Artwork;
