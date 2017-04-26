'use strict';

import React, { Component } from 'react';
import * as firebase from "firebase";
import {
    View, 
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

var SignInHomeScreen = require('./signinHome.IOS.js');
var SignUp = React.createClass({

    goSignUp: function() {
        this.props.navigator.push({
            title: 'signInHomeScreen',
            component: SignInHomeScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text', email: '', pass: ''}
        });
    },

    async signup(email, pass) {

        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);

            console.log("Account created");
            alert("New User Created!");

            // Navigate to the Home page, the user is auto logged in

        } catch (error) {
            console.log(error.toString())
            alert("Error!");
        }

    },

    _handlePressSignUp(event) {
        let email = this.email;
        let pass = this.pass;
        alert("email is " + email + " pass is " +pass);
        this.signup(email, pass);
    },

    render: function() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style = {styles.wrapper}>
                <View style={{opacity: 0.8 }}>
                    <TouchableOpacity onPress = {this._handlePressSignUp} style={styles.buttonContainer}>
                        <Text style={{color: 'white', fontWeight: 'bold', margin: 5, fontSize: 16}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            <Image source = {require('./roseImage.jpg')} style = {{backgroundColor: 'transparent'}}>
                    <View style = {styles.nameStyle}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder= "First Name"
                            placeholderTextColor= "white"
                        />
                        <TextInput
                            style={{height: 50, borderRadius: 5, borderWidth: 0.3, borderColor: 'grey', paddingLeft: 20, backgroundColor: '#f9f9f9'}}
                            autoCorrect= {false}
                            autoCapitalize="none"
                            clearButtonMode="always"
                            placeholder="Email"
                            ref= {(el) => { this.email = el; }}
                            onChangeText={(email) => this.setState({email})}
                            value={this.email}
                        />
                        <TextInput
                            style={{height: 50, borderRadius : 5, borderWidth: 0.3, borderColor: 'grey', paddingLeft: 20, backgroundColor: '#f9f9f9'}}
                            secureTextEntry={true}
                            placeholder="Password"
                            clearButtonMode="always"
                            onChangeText={(pass) => this.setState({pass})}
                            value={this.pass}
                        />
                    </View>
                <View style={{opacity: 0.8 }}>
                    <TouchableOpacity onPress={() => this._handlePressSignUp()} style={styles.buttonContainer}>
                        <Text style={{color: 'white', fontWeight: 'bold', margin: 5, fontSize: 16}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View><Text>test</Text></View>
            </Image>
            </View>
            </TouchableWithoutFeedback>
        );
    }
});

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    nameStyle:{
        height: 20,
        paddingTop: 200,
        paddingHorizontal: 125,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',

    },

    textInputStyle: {
        height: 50,
        width: 150,
        color: 'white',
        borderBottomColor: 'blue',
        backgroundColor: 'green',
        borderBottomWidth:5,
        fontSize: 20,

    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        borderColor: 'transparent'
    },
    subtitles: {
        color: 'white',
        fontWeight: '200',
        paddingBottom: 20
    },
    buttonBack: {
        color: 'green',
        fontWeight: 'bold',
        margin: 5, 
        fontSize: 12
    }
});

module.exports = SignUp;