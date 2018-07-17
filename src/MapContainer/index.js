import React, { Component } from "react";
import { Map } from 'google-maps-react';
import ReactDOM from "react-dom";

class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      console.log(this.props.lat);

      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 15;
      let lat = parseFloat(this.props.lat);
      let lng = parseFloat(this.props.lng);

      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign({}, {
        // center: {lat: 40.758850, lng: -73.985142},
        center: center,
        zoom: zoom
      });

    this.map = new maps.Map(node, mapConfig);
      const marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: { lat: lat, lng: lng },
        map: this.map,
      });
      }
}

  render() {
    const style = {
      width: '20rem',
      height: '15rem',
    }

    return (
      <div ref="map" style={style} className="test">
          <Map google={this.props.google.div} />
      </div>
    );
  }
}

export default MapContainer;