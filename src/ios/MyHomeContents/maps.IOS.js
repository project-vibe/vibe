import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

var UserHome = require('./userHome.IOS.js');

export default class VibeMaps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coords: []
        }
    }

    componentDidMount() {
        this.getDirections("37.78825, -122.4324", "37.317356,-122.021288")
    }

    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            });
            this.setState({coords: coords});
            return coords
        } catch(error) {
            alert(error);
            return error
        }
    }

    render () {
        const titleConfig = {
            title: 'Settings',
            style: {fontWeight: 'bold', fontSize: 20, fontFamily: 'Noteworthy', color: 'black', paddingBottom: 5}
        };

        const backButtonConfig = (
            <Icon.Button name="ios-arrow-back" size={27} color="black" onPress={() => this.backButtonListener()} backgroundColor="transparent">
            </Icon.Button>
        );

        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    title={titleConfig}
                    leftButton={backButtonConfig}
                    tintColor={'#eeeeee'}
                    style={{borderBottomWidth: 0.4, borderBottomColor: '#47315a'}}
                    // style={{borderWidth: 0.4, borderBottomColor: 'black'}}
                />
                <View style={styles.container}>
                    <MapView style={styles.map} initialRegion={{
                        latitude:37.78825,
                        longitude:-122.4324,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5
                    }}>

                        <MapView.Polyline
                            coordinates={this.state.coords}
                            strokeWidth={2}
                            strokeColor="red"/>

                        <MapView.Marker
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324
                            }}
                            title={"Your Location!"}
                        />

                        <MapView.Marker
                            coordinate={{
                                latitude: 37.317356,
                                longitude: -122.021288
                            }}
                            title={"title"}
                            description={"description"}
                        />

                    </MapView>
                </View>
                <View style={{height: '10%', backgroundColor: '#eeeeee', borderTopColor: 'black'}}>
                    <Text style={{paddingTop: 15, fontFamily: 'Noteworthy', fontSize: 18, textAlign: 'center'}}> 1213 Rembrandt Drive, Pomona, CA</Text>
                </View>
            </View>
        )
    }

    // switch screens
    backButtonListener() {
        this.props.navigator.pop({
            title: 'UserHome',
            component: UserHome,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});


module.exports = VibeMaps;