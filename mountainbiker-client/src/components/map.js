import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import ReactDOM from 'react-dom';

const mapStyles = {
  position: 'absolute',
  width: '80%',
  height: '80%'

};

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

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
    console.log(this.state.paths)
    return (
      <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{lat: 39.8691, lng: -86.0339}}>
      <Marker
          onClick={this.onMarkerClick}
          name={'Fort Benjamin Harrison State Park'}
        />
      <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
      <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDO8fJdzMbObguVg8t8GSco7Gkunlbr8Pk'
})(MapContainer);
