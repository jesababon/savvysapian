import React, { Component } from "react";
import "./style.css";
import Geolocation from "react-geolocation";
import Events from "../Events";


class UserLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userLat: null,
      userLong: null
    }
    this.addUserLocation = this.addUserLocation.bind(this)
  }

addUserLocation(latitude, longitude) {
    this.setState({
      userLat: latitude,
      userLong: longitude
    })
  }

render() {
      // console.log(this.state);

    // if(this.state.userLat !== null){console.log(this.state.userLat);}
return (
      <div className='Container'>
          {(this.state.userLat !== null) ? (
          <div className="Events">
          <Events key={this.state.userLat} 
          latitude={this.state.userLat}
          longitude={this.state.userLong}
          />

          </div>
            ) : ( //a ternary dedication to my friend Eryl Murphy
              <div className='EventRendering'>
                <Geolocation
                  render={({ fetchingPosition,
                    position: { coords: { latitude, longitude } = {} } = {},
                    error,
                    getCurrentPosition
                  }) =>
                    <div>
                      <button onClick={() => {
                        getCurrentPosition;
                        this.addUserLocation(latitude, longitude);
                      }}>Get Position</button>
                      {error &&
                        <div>
                          {error.message}
                        </div>}
                    </div>}
                />
                </div>
          )}
      </div>
    )
  }
}

export default UserLocation;
