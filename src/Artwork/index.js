import React, { Component } from "react";

class Artwork extends Component {

    render(){
        return(
        <div className="ArtworkDetails">
            {/* <p>Artwork</p> */}
            {/* <p>Title: {this.props.title}</p> */}
            {/* <p>Description: {this.props.description}</p> */}
            {/* <p> */}
            <img src={this.props.image} alt='' title={this.props.title}/>
            {/* </p> */}
        </div>
        )
    }
}

export default Artwork;
