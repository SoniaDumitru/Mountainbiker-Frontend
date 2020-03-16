import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './map.js';
require('dotenv').config();

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    console.log(process.env)
      return (
        <CurrentLocation
          path={this.props.path}
          centerAroundCurrentLocation
          google={this.props.google}>
          <Marker
          onClick={this.onMarkerClick}
          name={'current location'} />

          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
          </InfoWindow>
        </CurrentLocation>
      );
    }
  }

  export default GoogleApiWrapper({
     apiKey: process.env.REACT_APP_API_KEY_GOOGLE_MAPS
  })(MapContainer);
