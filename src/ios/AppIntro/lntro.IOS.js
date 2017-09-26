'use strict';

/** LANDING SCREEN FOR APP **/
import React, {Component} from 'react';
import {
    StyleSheet,   // CSS-like styles
    Text,         // Renders text
    View,          // Container component
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from './Components/Swiper';

class LandingPage extends Component {
    render() {
        return (
            <Swiper navigator={this.props.navigator}>
                {/* First screen */}
                <Image source={require('../img/backdrop.jpg')} style={{height: '100%', width: '100%', alignItems: 'center', paddingTop: 200}}>
                    <Icon name="ios-bonfire" {...iconStyles} />
                    <View style={{height: 20}} />
                    <Text style={styles.header}>SOCIALIZE</Text>
                    <Text style={styles.text}>Ignite your social flame by connecting with your friends.</Text>
                </Image>
                {/* Second screen */}
                <Image source={require('../img/backdrop2.jpg')} style={{height: '100%', width: '100%', alignItems: 'center', paddingTop: 200}}>
                    <Icon name="ios-beer" {...iconStyles} />
                    <View style={{height: 20}} />
                    <Text style={styles.header}>PLAN</Text>
                    <Text style={styles.text}>Arrange meet ups by inviting  {"\n"} friends or joining their events.</Text>
                </Image>

                {/* Third screen */}
                <Image source={require('../img/backdrop3.jpg')} style={{height: '100%', width: '100%', alignItems: 'center', paddingTop: 200}}>
                    <Icon name="ios-checkmark-circle-outline" {...iconStyles} />
                    <View style={{height: 20}} />
                    <Text style={styles.header}>LET'S START</Text>
                    <Text style={styles.text}>Welcome to Vibe! {"\n"} Now push the button.</Text>
                </Image>
            </Swiper>
        );
    }
}

const iconStyles = {
    size: 100,
    color: '#FFFFFF'
};

const styles = StyleSheet.create({
    // Slide styles
    slide: {
        flex: 1,                    // Take up all screen
        alignItems: 'center',       // Center horizontally
        paddingTop: 200
    },
    // Header styles
    header: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: -15,
    },
    // Text below header
    text: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: 'center',
        marginVertical: 25,

    },
});

module.exports = LandingPage;