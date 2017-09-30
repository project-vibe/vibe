'use strict'
import React, { Component } from 'react'
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as firebase from "firebase";
import Switch from 'react-native-switch-pro'
import {
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    View,
    StatusBar
} from 'react-native';

var BackPage = require('./userHome.IOS.js');
var passwordChange = require('../SettingsContent/changePassword.IOS');
var editProfile = require('../SettingsContent/editProfile.IOS.js');
var eventSettings = require('../SettingsContent/eventSettings.IOS');

const auth = firebase.auth();
const Permissions = require('react-native-permissions');

class userSettingsScreen extends Component {

    async checkLocation() {
        await Permissions.getPermissionStatus('location', 'whenInUse')
            .then(response => {
                if(response==='authorized')
                    return true;
                else
                    return false;
            });
    }

    async openSettings() {
        await Permissions.openSettings();
    }

    backButtonListener() {
        this.props.navigator.pop({
            title: 'BackPage',
            component: BackPage,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }

    async backToHome() {
        await auth.signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });

        this.props.navigator.popToTop({
            title: 'BackToHome',
            passProps: {myElement: 'text'}
        });
    }

    termsPolicy() {
        alert("Terms and Policy Redirect")
    }

    helpCenter() {
        alert("Help Center Redirect")
    }

    reportProblem() {
        alert("Report a Problem Redirect")
    }

    passwordPage() {
        this.props.navigator.push({
            title: 'password',
            component: passwordChange,
            navigationBarHidden: true,
            passProps: {myElement: 'text', email: this.props.email}
        });
    }

    eventSettings() {
        this.props.navigator.push({
            title: 'eventSettings',
            component: eventSettings,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }

    profilePage() {
        this.props.navigator.push({
            title: 'editProfile',
            component: editProfile,
            navigationBarHidden: true,
            passProps: {myElement: 'text', photoId: this.props.photoId, userId: this.props.userId,
                firstName: this.props.firstName, lastName: this.props.lastName, photo: this.props.photo,
                email: this.props.email, phoneNumber: this.props.phoneNumber}
        });
    }

    render(){
        const titleConfig = {
            title: 'Settings',
            style: {fontWeight: 'bold', fontSize: 20, fontFamily: 'Noteworthy', color: 'black'}
        };

        const backButtonConfig = (
            <Icon.Button name="chevron-left" size={45} color="black" onPress={() => this.backButtonListener()} backgroundColor="transparent">
            </Icon.Button>
        );


        return (
            <View style={styles.container}>
                <StatusBar
                    color="black"
                />
                <NavigationBar
                    title={titleConfig}
                    leftButton={backButtonConfig}
                    tintColor={'#eeeeee'}
                    style={{borderBottomWidth: 0.5, borderColor: '#A9A9A9'}}
                />
                <View style={{height: 35}}/>
                <View style = {{backgroundColor:'white', paddingLeft: 20, borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                    <TouchableOpacity onPress={() => this.profilePage()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 17}}>Edit Profile</Text>
                        <View style={{width: 236}}/>
                        <Icon name="chevron-right" size={35} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.passwordPage()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 17}}>Change Password</Text>
                        <View style={{width: 180}}/>
                        <Icon name="chevron-right" size={35} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.termsPolicy()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 17}}>Terms Policy</Text>
                        <View style={{width: 220}}/>
                        <Icon name="chevron-right" size={35} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.helpCenter()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 17}}>Help Center</Text>
                        <View style={{width: 228}}/>
                        <Icon name="chevron-right" size={35} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.reportProblem()} style={styles.bottomButtonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 17}}>Report a Problem</Text>
                        <View style={{width: 186}}/>
                        <Icon name="chevron-right" size={35} color="#C0C0C0" />
                    </TouchableOpacity>
                </View>
                <View style={{height: 40}}/>
                <View style = {{backgroundColor:'white', paddingLeft: 20, borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                    <TouchableOpacity onPress={() => this.eventSettings()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 17}}>Event Settings</Text>
                        <View style={{width: 250}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openSettings()} style={styles.bottomButtonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 17}}>Location Services</Text>
                        <View style={{width: 160}}/>
                        <Switch
                            style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                            value={this.props.locationValue}
                            disabled={true}
                            activeText={'On'}
                            inActiveText={'Off'}
                            backgroundActive={'#0A81D1'}
                            backgroundInactive={'#C0C0C0'}
                            circleActiveColor={'#30a566'}
                            circleInActiveColor={'#000000'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{height: 40}}/>
                <View style = {{backgroundColor:'white', paddingLeft: 20, borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                    <TouchableOpacity onPress={() => this.backToHome()} style={styles.logoutButtonContainer}>
                        <Text style={{color: 'red',  margin: 0, fontSize: 18, paddingLeft:'40%'}}>Logout</Text>
                        <View style={{width: 250}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee',
        flex: 1
    },
    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 1,
        borderBottomWidth: 0.5,
        borderColor: '#C0C0C0',
        padding: 10,
        paddingLeft:0,
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 9
        },
        shadowRadius: 10,
        height: 43,
        opacity: 0.9
    },
    bottomButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 1,
        padding: 10,
        paddingLeft:0,
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 9
        },
        shadowRadius: 10,
        height: 43,
        opacity: 0.9
    },
    logoutButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 1,
        padding: 10,
        paddingLeft:0,
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 9
        },
        shadowRadius: 10,
        height: 43,
        opacity: 0.9
    }

});

module.exports = userSettingsScreen;