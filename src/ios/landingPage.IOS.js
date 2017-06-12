
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    Alert,
    Image,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import Swiper from 'react-native-swiper';

var SignUpScreen = require('./signup.IOS.js');
var SignInScreen = require('./signinHome.IOS');
//var UserHomeScreen = require('./userHome.IOS.js');
var image1 = require('./img/purpleImage.jpg');
var image2 = require('./img/forest.gif');
var image3 = require('./img/sea.gif');

var landingPage = React.createClass({

    getInitialState () {
        return {
            myElement: ''
        };
    },

    goSignIn: function () {
        this.props.navigator.push({
            title: 'signInHomeScreen',
            component: SignInScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },

    goSignUp: function () {

        this.props.navigator.push({
            title: 'signUp',
            component: SignUpScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },

    render: function () {
        return (
            <Swiper style = {styles.wrapper} autoplay = {true} showButtons = {true}
                    dot={<View style={{backgroundColor: 'grey', width: 9, height: 9, borderRadius: 7, marginLeft: 7, marginRight: 7, marginBottom: 225}} />}
                    activeDot={<View style={{backgroundColor: 'white', width: 9, height: 9, borderRadius: 7, marginLeft: 7, marginRight: 7, marginBottom: 225}} />}                >
                <View style = {styles.slide1}>
                    <Image source={image1} style={styles.container}>
                        <View style = {{paddingTop: 30, alignItems: 'center', width: 100, height: 150, paddingBottom: 50}}>
                            <Text style = {{fontSize: 105, color: 'white', fontFamily: 'Chalkduster', fontWeight: 'bold'}}>V </Text>
                        </View>

                        <View style = {{width: 300, height: 100, paddingTop: 69, alignItems: 'center'}}>
                            <Text style = {{fontSize: 39, color: 'white', fontFamily: 'Futura-medium' }}>
                                Ignite your social flame.
                            </Text>
                        </View>
                        <View style = {{paddingTop: 200}}>
                            <TouchableOpacity onPress={() => this.goSignUp()} style={styles.signUpButton}>
                                <Text style={styles.signUpButtonText}> Sign up</Text>
                            </TouchableOpacity>
                        </View>

                        <View style = {{paddingTop: 25}}>
                            <TouchableOpacity onPress={() => this.goSignIn()} style={styles.signInButton}>
                                <Text style={styles.signInButtonText}> Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </Image>
                </View>

                <View style = {styles.slide2}>
                    <Image source={image1} style={styles.container}>
                        <View style = {{paddingTop: 30, alignItems: 'center', width: 100, height: 150, paddingBottom: 50}}>
                            <Text style = {{fontSize: 105, color: 'white', fontFamily: 'Chalkduster', fontWeight: 'bold'}}>V </Text>
                        </View>

                        <View style = {{width: 300, height: 100, paddingTop: 69, alignItems: 'center'}}>
                            <Text style = {{fontSize: 39, color: 'white', fontFamily: 'Futura-medium' }}>
                                Arrange meetups with your friends.
                            </Text>
                        </View>
                        <View style = {{paddingTop: 200}}>
                            <TouchableOpacity onPress={() => this.goSignUp()} style={styles.signUpButton}>
                                <Text style={styles.signUpButtonText}> Sign up</Text>
                            </TouchableOpacity>
                        </View>

                        <View style = {{paddingTop: 25}}>
                            <TouchableOpacity onPress={() => this.goSignIn()} style={styles.signInButton}>
                                <Text style={styles.signInButtonText}> Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </Image>
                </View>

                <View style = {styles.slide3}>
                    <Image source={image1} style={styles.container}>
                        <View style = {{paddingTop: 30, alignItems: 'center', width: 100, height: 150, paddingBottom: 50}}>
                            <Text style = {{fontSize: 105, color: 'white', fontFamily: 'Chalkduster', fontWeight: 'bold'}}>V </Text>
                        </View>

                        <View style = {{width: 300, height: 100, paddingTop: 69, alignItems: 'center'}}>
                            <Text style = {{fontSize: 39, color: 'white', fontFamily: 'Futura-medium' }}>
                                Smash that button and sign up.
                            </Text>
                        </View>
                        <View style = {{paddingTop: 200}}>
                            <TouchableOpacity onPress={() => this.goSignUp()} style={styles.signUpButton}>
                                <Text style={styles.signUpButtonText}> Sign up</Text>
                            </TouchableOpacity>
                        </View>

                        <View style = {{paddingTop: 25}}>
                            <TouchableOpacity onPress={() => this.goSignIn()} style={styles.signInButton}>
                                <Text style={styles.signInButtonText}> Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </Image>
                </View>

            </Swiper>
        );
    }
});

const styles = StyleSheet.create({

    dotStyle:{
      fontSize: 50,

    },

    wrapper: {
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

    backgroundGif:{
        flex:1,
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
        borderRadius: 5,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#0A81D1',
        opacity: 0.8
    },

    signUpButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },

    signInButton: {
        borderRadius: 5,
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        opacity: 0.8
    },

    signInButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 13,
    },

});


module.exports = landingPage;
