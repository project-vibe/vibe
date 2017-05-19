'use strict';

import React, {Component} from 'react';
import * as firebase from "firebase";
import Hr from './hr2.dist';
import Icon from 'react-native-vector-icons/Ionicons';
import PhoneInput from 'react-native-phone-input';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import WelcomeText from "react-native/local-cli/templates/HelloNavigation/views/welcome/WelcomeText.android";

var SignInHomeScreen = require('./signinHome.IOS.js');
var UserHomeScreen = require('./userHome.IOS.js');
var BackPage = require('./signinHome.IOS.js');

var SignUp = React.createClass({
    getInitialState () {
        return {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            phoneNumber: ''
        };
    },

    goLogin: function () {
        this.props.navigator.push({
            title: 'signInHomeScreen',
            component: SignInHomeScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },

    goUserHome: function () {
        this.props.navigator.push({
            title: 'userHomeScreen',
            component: UserHomeScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },
    backButtonListener() {
        this.props.navigator.pop({
            title: 'BackPage',
            component: BackPage,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },

    async signup(email, password, firstName, lastName, phoneNumber) {

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);

            let userId = "";

            // extract email
            for (let i = 0; i < email.length; i++) {
                if (email.charAt(i) === '@' || email.charAt(i) === '.') {
                } else {
                    userId += email.charAt(i).toLowerCase();
                }
            }
            let userSettingsPath = "/user/" + userId;

            firebase.database().ref(userSettingsPath).set({
                UserInfo: {
                    FirstName: firstName,
                    LastName: lastName,
                    Email: email.toLowerCase(),
                    PhoneNumber: phoneNumber
                }
            });

            console.log("Account created");

            // Navigate to the Home page, the user is auto logged in
            this.goUserHome();
        } catch (error) {
            alert(error.toString());
        }

    },


    _handlePressSignUp(event) {
        let email = this.state.email;
        let password = this.state.password;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let phoneNumber = this.state.phoneNumber;
        let confirmPassword = this.state.confirmPassword;

        if (confirmPassword.toLowerCase() === password.toLowerCase()) {
            this.signup(email, password, firstName, lastName, phoneNumber);
        } else {
            alert("Passwords are not correct!")
        }
    },


    render: function () {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Image source={require('./img/blueImage.png')} style={styles.container}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <View style={{paddingRight: 70}}>
                            <Icon.Button name="ios-arrow-back" size={40} color="white"
                                         onPress={() => this.backButtonListener()} backgroundColor="transparent">
                            </Icon.Button>
                        </View>
                        <View style={{paddingRight: 110}}>
                            <Text style={styles.Title}>Vibe</Text>
                        </View>
                    </View>

                    <View style={styles.inputStyle}>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput
                                style={styles.firstNameTextInputStyle}
                                placeholder="First Name"
                                placeholderTextColor="white"
                                clearButtonMode="while-editing"
                                multiline={false}
                                autoCorrect={false}
                                onChangeText={(firstName) => this.setState({firstName})}
                                value={this.state.firstName}
                            />

                            <TextInput
                                style={styles.lastNameTextInputStyle}
                                placeholder="Last Name"
                                placeholderTextColor="white"
                                clearButtonMode="while-editing"
                                multiline={false}
                                autoCorrect={false}
                                onChangeText={(lastName) => this.setState({lastName})}
                                value={this.state.lastName}
                            />

                        </View>
                    </View>
                    <Hr marginLeft={24} marginRight={18} text="          "/>

                    <View style={{marginTop: 15}}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Email"
                            placeholderTextColor="white"
                            clearButtonMode="while-editing"
                            multiline={false}
                            autoCorrect={false}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                        />

                    </View>
                    <Hr marginLeft={100} marginRight={100}/>

                    <View style={{paddingTop: 15}}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Password"
                            placeholderTextColor="white"
                            clearButtonMode="while-editing"
                            secureTextEntry={true}
                            multiline={false}
                            autoCorrect={false}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />

                    </View>
                    <Hr marginLeft={100} marginRight={100}/>

                    <View style={{paddingTop: 15}}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Confirm Password"
                            placeholderTextColor="white"
                            clearButtonMode="while-editing"
                            secureTextEntry={true}
                            multiline={false}
                            autoCorrect={false}
                            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                            value={this.state.confirmPassword}
                        />

                    </View>
                    <Hr marginLeft={100} marginRight={100}/>
                    <View style={{flexDirection: 'row', width: 200}}>


                        <View style={{paddingLeft: 13, paddingTop: 31, width: 75, height: 20, alignItems: 'center'}}>
                            <PhoneInput
                                textStyle={{fontSize: 15, color: 'white'}}
                                flagStyle={{width: 20, height: 15}}
                            />
                        </View>
                        <View style={{paddingTop: 14, alignSelf: 'flex-start'}}>
                            <TextInput
                                style={styles.phoneTextInputStyle}
                                placeholder="Phone Number"
                                placeholderTextColor="white"
                                clearButtonMode="always"
                                multiline={false}
                                keyboardType='numeric'
                                autoCorrect={false}
                                dataDetectorTypes="phoneNumber"
                                onChangeText={(text) => this.setState({text})}
                            />

                        </View>

                    </View>

                    <Hr marginLeft={100} marginRight={100}/>


                    <View>
                        <TouchableOpacity onPress={() => this._handlePressSignUp()} style={styles.signUpButton}>
                            <Text style={styles.signUpButtonText}> Sign up</Text>
                        </TouchableOpacity>

                    </View>

                    <View>
                        <Text style={styles.belowSignUpButtonText}>Already have an account?
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => this.backButtonListener()} style={styles.loginButton}>
                            <Text style={styles.loginButtonText}> Log in
                            </Text>

                        </TouchableOpacity>
                    </View>

                </Image>
            </TouchableWithoutFeedback>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    phoneTextInputStyle: {
        height: 35,
        width: 130,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 15,
        borderWidth: 1.5,
        borderBottomColor: 'white',
        borderColor: 'transparent',
        textAlign: 'left',
    },

    Title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 50,
        paddingTop: 20,
        fontFamily: 'Noteworthy',
        alignSelf: 'center'
    },
    signUpButton: {
        backgroundColor: 'white',
        borderRadius: 40,
        height: 50,
        width: 300,
        marginTop: 50,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: 'white'
    },

    signUpButtonText: {
        color: '#0A81D1',
        fontWeight: 'bold',
        fontSize: 13,
    },

    belowSignUpButtonText: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        paddingBottom: 5,
        paddingTop: 40
    },
    loginButton: {
        backgroundColor: 'transparent',
        borderRadius: 40,
        height: 50,
        width: 300,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: 'white',
        borderWidth: 2
    },

    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },

    inputStyle: {
        paddingTop: 25,
    },
    firstNameTextInputStyle: {
        height: 20,
        width: 165,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 15,
        borderWidth: 1.5,
        borderBottomColor: 'white',
        borderColor: 'transparent',
        textAlign: 'center',
        marginRight: 20,
    },

    lastNameTextInputStyle: {
        height: 20,
        width: 165,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 15,
        borderWidth: 1.5,
        borderBottomColor: 'white',
        borderColor: 'transparent',
        textAlign: 'center',
    },


    textInputStyle: {
        height: 35,
        width: 200,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 15,
        borderWidth: 1.5,
        borderBottomColor: 'white',
        borderColor: 'transparent',
        textAlign: 'center',
    },

    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        borderColor: 'transparent'
    },

});

module.exports = SignUp;