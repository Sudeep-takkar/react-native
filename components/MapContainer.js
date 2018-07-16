import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class MapContainer extends React.Component {
	state = {
		region:{
			longitude: this.props.GPSPoints.GPS[0].Lon,
			latitude: this.props.GPSPoints.GPS[0].Lat,
			longitudeDelta: 1,
			latitudeDelta: 1
		},
		mapLoaded: false
	}
	componentDidMount() {
		this.setState({
			mapLoaded: true
		});
	}

	onRegionChangeComplete = (region) => {
		this.setState({ region });
	}; 

	render() {
		console.log(this.props.GPSPoints.GPS);
		if(!this.state.mapLoaded){
			return (
				<View style={{ flex:1, justifyContent: 'center' }}>
					<ActivityIndicator size="large" />
				</View>
			);
		}
		return (
		  <View style={styles.container}>
		    <MapView style={styles.container} region={this.state.region}
		    onRegionChangeComplete={this.onRegionChangeComplete} showsUserLocation={true} provider='google'>
		    	{this.props.GPSPoints.GPS.map((marker, index) => {
            		return (
              			<MapView.Marker key={index} coordinate={{
				          	latitude: marker.Lat,
				          	longitude: marker.Lon}} 
            				title={marker.Name}
            				description={marker.Date}>
              			</MapView.Marker>
            		);
          		})}
		    </MapView>
		  </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


const mapStateToProps = state => {
	return { GPSPoints: state.GPSPoints };
};

export default connect(mapStateToProps)(MapContainer);
