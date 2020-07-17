import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { GoogleMap, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
};

export class CurrentLocation extends React.Component {

    constructor(props) {
        super(props);

        const { lat, lng } = this.props.initialCenter;
        this.state = {
          currentLocation: {
            lat: lat,
            lng: lng
          }
        };
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
          this.recenterMap();
        }
      }
      recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
    
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
          let center = new maps.LatLng(current.lat, current.lng);
          map.panTo(center);
        }
      }





      componentDidMount() {

        
		const token=localStorage.getItem('jwt');
		const token1=JSON.parse(token);
		  const token2=JSON.parse(token1.config.data);
	console.log("Pic"+token2.email)
	
	console.log("Hello: "+this.state.email)
  axios.get('http://localhost:5000/api/commands/getloc?email='+token2.email)
  .then(res=>{if(res.data.location){this.setState({ currentLocation:{ lat:res.data.location.latitude,lng:res.data.location.longitude } })}})
   .catch();
        
        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocatio) {


              
            navigator.geolocation.getCurrentPosition(pos => {
              const coords = pos.coords;
              this.setState({
                currentLocation: {
                  lat: this.state.currentLocation.lat,
                  lng: this.state.currentLocation.lng
                }
              });
            });
          }
        }
        this.loadMap();
      }
      loadMap() {

      

        
        if (this.props && this.props.google) {
          // checks if google is available
          const { google } = this.props;
          const maps = google.maps;
    
          const mapRef = this.refs.map;
    
          // reference to the actual DOM element
          const node = ReactDOM.findDOMNode(mapRef);
    
          let { zoom } = this.props;
          const { lat, lng } = this.state.currentLocation;
          const center = new maps.LatLng(lat, lng);
          const mapConfig = Object.assign(
            {},
            {
              center: center,
              zoom: zoom
            }
          );
    
          // maps.Map() is constructor that instantiates the map
          this.map = new maps.Map(node, mapConfig);
        }
      }
      renderChildren() {
        const { children } = this.props;
    
        if (!children) return;
    
        return React.Children.map(children, c => {
          if (!c) return;
          return React.cloneElement(c, {
            map: this.map,
            google: this.props.google,
            mapCenter: this.state.currentLocation
          });
        });
      }
      render() {
        const style = Object.assign({}, mapStyles.map);
       return (
         <div>
           <div style={style} ref="map">
             Loading map...
           </div>
           {this.renderChildren()}
         
         </div>
         
       );
     }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};