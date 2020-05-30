import React, { Component } from 'react'
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from '../main/Maps';

    const mapStyles = {
    width: '80%',
    height: '80%',
    marginLeft: '186px'
  };

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
        return (
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
          >
            <Marker onClick={this.onMarkerClick} name={'current location'} />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </CurrentLocation>
        );
      }
    }
 
export default GoogleApiWrapper({
    apiKey: '&callback=initMap'
  })(MapContainer);