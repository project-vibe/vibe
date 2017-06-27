import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    Alert,
    Image,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    View,
    StatusBar
} from 'react-native';

import Swiper from 'react-native-swiper';

var SignUpScreen = require('./signup.IOS.js');
// var SignInScreen = require('./MyHomeContents/userHome.IOS')
var SignInScreen = require('./signinHome.IOS');
//var UserHomeScreen = require('./userHome.IOS.js');
var image1 = require('./img/roundabout.gif');
var image2 = require('./img/forest.gif');
var image3 = require('./img/sea.gif');

const Permissions = require('react-native-permissions');

var landingPage = React.createClass({

    getInitialState() {
        return {
            locationPermission: ''
        };
    },

    async signIn() {
        await this.askForLocation();
        this.props.navigator.push({
            title: 'signInHomeScreen',
            component: SignInScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },

    async signUp() {
        await this.askForLocation();
        this.props.navigator.push({
            title: 'signUp',
            component: SignUpScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },

    async askForLocation() {
        await Permissions.requestPermission('location')
            .then(response => {
                //returns once the user has chosen to 'allow' or to 'not allow' access
                //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                this.setState({ locationPermission: response })
            });
    },

    render: function () {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    color="white"
                    barStyle="light-content"
                />
                <Swiper autoplay={true} showButtons={true}
                        dot={<View style={{
                            backgroundColor: 'grey',
                            width: 9,
                            height: 9,
                            borderRadius: 7,
                            marginLeft: 7,
                            marginRight: 7,
                            marginBottom: 175
                        }}/>}
                        activeDot={<View style={{
                            backgroundColor: 'white',
                            width: 11.5,
                            height: 11.5,
                            borderRadius: 7,
                            marginLeft: 7,
                            marginRight: 7,
                            marginBottom: 175
                        }}/>}>
                    <View style={styles.slide1}>
                        <Image source={image1} style={styles.container}>

                            <View style={{width: 300, height: 100, marginTop: 200, alignItems: 'center'}}>
                                <Text style={{fontSize: 39, color: 'white', fontFamily: 'Futura-medium'}}>
                                    Ignite your social flame.
                                </Text>
                            </View>
                        </Image>
                    </View>

                    <View style={styles.slide2}>
                        <Image source={image2} style={styles.container}>
                            <View style={{width: 300, height: 100, marginTop: 200, alignItems: 'center'}}>
                                <Text style={{fontSize: 39, color: 'white', fontFamily: 'Futura-medium'}}>
                                    Arrange meetups with your friends.
                                </Text>
                            </View>
                        </Image>
                    </View>

                    <View style={styles.slide3}>
                        <Image source={image3} style={styles.container}>


                            <View style={{width: 300, height: 100, marginTop: 200, alignItems: 'center'}}>
                                <Text style={{fontSize: 39, color: 'white', fontFamily: 'Futura-medium'}}>
                                    Hit that button and sign up.
                                </Text>
                            </View>
                        </Image>
                    </View>
                </Swiper>
                <View style={{
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    height: 1,
                    width: 80,
                    top: 50,
                    alignSelf: 'center'
                }}>
                    <Text
                        style={{fontSize: 105, color: 'white', fontFamily: 'Chalkduster', fontWeight: 'bold'}}>V </Text>
                </View>
                <TouchableOpacity onPress={() => this.signUp()} style={styles.signUpButton}>
                    <Text style={styles.signUpButtonText}> Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.signIn()} style={styles.signInButton}>
                    <Text style={styles.signInButtonText}> Log in</Text>
                </TouchableOpacity>

            </View>
        );
    }
});

const styles = StyleSheet.create({

    dotStyle: {
        fontSize: 50,
    },

    slide1: {
        flex: 1
    },

    slide2: {
        flex: 1

    },

    slide3: {
        flex: 1

    },

    backgroundGif: {
        flex: 1,
        resizeMode: 'cover'
    },

    container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },

    signUpButton: {
        borderRadius: 30,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#0A81D1',
        opacity: 0.8,
        position: 'absolute',
        bottom: 130
    },

    signUpButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },

    signInButton: {
        borderRadius: 30,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'grey',
        opacity: 0.7,
        position: 'absolute',
        bottom: 70
    },

    signInButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },

});


module.exports = landingPage;