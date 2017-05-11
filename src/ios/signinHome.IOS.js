'use strict';

import React, { Component } from 'react';
import * as firebase from "firebase";
import {
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Hr from './hr.dist';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';

var SignUpScreen = require('./signup.IOS.js');
var UserHomeScreen = require('./userHome.IOS.js');

const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;

var signInScreen = React.createClass({

    getInitialState () {
        return {
            username: '',
            password: ''
        };
    },

    // Attempt a login using the Facebook login dialog,
    // asking for default permissions.
    _fbAuth() {
        LoginManager.logInWithReadPermissions(['email', 'user_friends', 'public_profile']).then(
            function(result) {
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    // success
                    AccessToken.getCurrentAccessToken().then(accessTokenData => {
                        const credential = provider.credential(accessTokenData.accessToken);
                        return auth.signInWithCredential(credential);
                    })
                    .then(credData => {
                        // extract name
                        let firstName = "";
                        let lastName = "";
                        let isFirstName = true;
                        for(let i = 0; i < credData.displayName.length; i++) {
                            if(credData.displayName.charAt(i) !== ' ' && isFirstName) {
                                firstName += credData.displayName.charAt(i);
                            } else if(credData.displayName.charAt(i) !== ' ' && !isFirstName) {
                                lastName += credData.displayName.charAt(i);
                            } else if(credData.displayName.charAt(i) === ' ') {
                                isFirstName = false;
                            }
                        }
                        // extract email
                        let userId = "";
                        let tempPhoneNum = "584939392";
                        for(let i = 0; i < credData.email.length; i++) {
                            if(credData.email.charAt(i) === '@' || credData.email.charAt(i) === '.') {
                            } else {
                                userId += credData.email.charAt(i).toLowerCase();
                            }
                        }

                        let userSettingsPath = "/user/" + userId;

                        firebase.database().ref(userSettingsPath).set({
                            UserInfo: {
                                FirstName: firstName,
                                LastName: lastName,
                                Email: credData.email,
                                PhoneNumber: tempPhoneNum,
                                PhotoUrl: credData.photoURL
                            }
                        });

                        // CHANGE SCREEN HERE!!!
                    })
                    .catch(err => {
                        alert("Error: " + err);
                    });
                }
            },
            function(error) {
                alert('Login fail with error: ' + error);
            }
        );
    },

    goSignUp: function() {
        this.props.navigator.push({
            title: 'signUpScreen',
            component: SignUpScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },

    goUserHome: function() {
        this.props.navigator.push({
            title: 'userHomeScreen',
            component: UserHomeScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },

    async login(email, pass) {
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);

            console.log("Logged In!");

            //Navigate to home page after sign in
            this.goUserHome();

        } catch (error) {
            console.log(error.toString());
            alert("Error!");
        }
    },

    _simplePressLogin(event) {
        this.goUserHome();
    },

    _handlePressLogin(event) {
        let username = this.state.username;
        let password = this.state.password;
        this.login(username, password);
    },

    render: function(){
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/*spacer */}
                    <View style={{width: 50, height: 25, backgroundColor: '#0A81D1'}} />
                    <Text style={styles.header}>Vibe</Text>
                    {/* view component 4fc492*/}
                    <View style={{width: 375, height: 400, alignItems: 'center', backgroundColor: 'white'}}>
                        <View style={{width: 300, height: 600}}>
                            <View style={{width: 50, height: 30}} />
                            <TextInput
                                style={{height: 50, borderRadius: 5, borderWidth: 0.3, borderColor: 'grey', paddingLeft: 20, backgroundColor: '#f9f9f9'}}
                                autoCorrect= {false}
                                autoCapitalize="none"
                                clearButtonMode="always"
                                placeholder="Username"
                                onChangeText={(username) => this.setState({username})}
                                value={this.state.username}
                            />
                            <View style={{width: 50, height: 10}} />
                            <TextInput
                                style={{height: 50, borderRadius : 5, borderWidth: 0.3, borderColor: 'grey', paddingLeft: 20, backgroundColor: '#f9f9f9'}}
                                secureTextEntry={true}
                                placeholder="Password"
                                clearButtonMode="always"
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                            />
                            <View style={{width: 50, height: 20}} />
                            <View style={{opacity: 1.0 }}>
                                {/*<TouchableOpacity onPress={() => this._handlePressLogin()} style={styles.buttonContainer}>*/}
                                <TouchableOpacity onPress={() => this._simplePressLogin()} style={styles.buttonContainer}>
                                    <Text style={{color: 'white', fontWeight: 'bold', margin: 5, fontSize: 16}}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: 50, height: 70}} />
                            {/* look in hr.dist.js for changes */}
                            <View style={{width: 300, height: 40, flexDirection: 'row'}}>
                                <View style={{width: 140, flex: 2}}>
                                    <Hr style={{width: 140}}/>
                                </View>
                                <View style={{width: 20, flex: 1, marginTop: -8}}>
                                    <Text style={{fontWeight: 'bold', color: '#474e55', opacity: 0.8, paddingLeft: 16}}> OR </Text>
                                </View>
                                <View style={{width: 140, flex: 2}}>
                                    <Hr style={{width: 140, flex: 1}}/>
                                </View>
                            </View>
                            <View style={{opacity: 1.0, paddingTop: 20}}>
                                <TouchableOpacity onPress={this._fbAuth} style={styles.fbButton}>
                                    <View style={{width: 50}}/>
                                    <Icon name="facebook-official" size={20} color="#0A81D1" />
                                    <Text style={{color: '#0A81D1', paddingLeft: 5, fontWeight: 'bold', margin: 5, fontSize: 16}}>Log In with Facebook</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{height: 120, width: 380, backgroundColor: 'white'}}>
                        {/* spacer */}
                        <View style={{height: 60}}/>
                        <View style={{backgroundColor: '#ecf0f1', height: 60, borderTopWidth: 0.5, borderColor: 'grey', flexDirection: 'row'}}>
                            <Text style={{fontWeight: 'bold', color: '#474e55', opacity: 0.8, fontSize: 12, paddingLeft: 85, paddingTop: 20}}> Don't have an account? </Text>
                            <View style={{height: 45}}>
                                <View style={{height: 15}} />
                                <TouchableOpacity onPress={() => this.goSignUp()} style={{height: 20}}>
                                    <Text style={{fontWeight: 'bold', color:'#0A81D1',margin: 5, fontSize: 12}}>Sign up.</Text>
                                </TouchableOpacity>
                                <View style={{height: 15}} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
});

const onPressSignIn = () => {
    Alert.alert('Login successful!');
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0A81D1',
        opacity: 1
    },
    header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 78,
        fontFamily: 'Noteworthy',
        /* possible fonts -- didot, futura, Georgia, GillSans-UltraBold, IowanOldStyle-Roman, KohinoorDevanagari-Semibold, Noteworthy*/
    },
    buttonContainer: {
        backgroundColor: '#0A81D1',
        borderRadius: 100,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        height: 50,
        alignItems: 'center',
        opacity: 0.9
    },
    fbButton: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        height: 50,
        alignItems: 'center'
    }
});


module.exports = signInScreen;
