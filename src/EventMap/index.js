import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const Marker = ({text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '5px 5px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>{text}</div>);
 
class EventMap extends Component {
  static defaultProps = {
    center: {
      lat: 40.7128,
      lng: -74.0060
    },
    zoom: 12
  };
 
  render() {
    const mapApi='AIzaSyCQd_v_G5Gdqm03HsWHsEmiN9FqCD4WxgI';
    // console.log('map props:', this.props.eventData)
    const eachEv= this.props.eventData.map(event =>{
      const eachEvent = event[0];
      return (
        {
        evLat: eachEvent.eventLat[0],
        evLong: eachEvent.eventLong[0],
        evName: eachEvent.eventName,
        evAddress: eachEvent.eventAddress,
        evStart: eachEvent.eventDateStart,
        evEnd: eachEvent.eventDateEnd
      })
    });
    // console.log(eachEv);
    // console.log('props', this.props);

    return (

      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:mapApi}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        {eachEv.map((oneEv, index) => {
          console.log('marker', oneEv.evLat);          
          return(
          <Marker
          key={index}
          lat={Number(oneEv.evLat)}
          lng={Number(oneEv.evLong)}
          text={oneEv.evName}
          />)
        })}
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default EventMap;