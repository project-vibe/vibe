'use strict'
import React, { Component } from 'react'
import NavigationBar from 'react-native-navbar';
import Hr from './hr.dist';
import Icon from 'react-native-vector-icons/Ionicons';
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
var userSettingsScreen = React.createClass({
    backButtonListener() {
        this.props.navigator.pop({
            title: 'BackPage',
            component: BackPage,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },
    backToHome() {
        this.props.navigator.popToTop({
            title: 'BackToHome',
            passProps: {myElement: 'text'}
        });
    },
    buttonSelect() {
        alert("Needs implementation")
    },



    render: function(){
        const titleConfig = {
            title: 'Settings',
            style: {fontWeight: 'bold', fontSize: 20, fontFamily: 'Noteworthy', color: 'white'}
        };

        const backButtonConfig = (
            <Icon.Button name="ios-arrow-back" size={30} color="white" onPress={() => this.backButtonListener()} backgroundColor="transparent">
            </Icon.Button>
        );


        return (
            <View style={styles.container}>
                <StatusBar
                    color="white"
                />
                <NavigationBar
                    title={titleConfig}
                    leftButton={backButtonConfig}
                    tintColor={'#0A81D1'}
                />
                <Hr style={{width: 140, flex: 1}}/>
                <View style = {{backgroundColor:'white', paddingLeft: 20}}>
                    <TouchableOpacity onPress={() => this.buttonSelect()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 16}}>Edit Profile</Text>
                        <View style={{width: 254}}/>
                        <Icon name="ios-arrow-forward" size={20} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.buttonSelect()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 16}}>Change Password</Text>
                        <View style={{width: 202}}/>
                        <Icon name="ios-arrow-forward" size={20} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.buttonSelect()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 16}}>Terms Policy</Text>
                        <View style={{width: 240}}/>
                        <Icon name="ios-arrow-forward" size={20} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.buttonSelect()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 16}}>Help Center</Text>
                        <View style={{width: 245}}/>
                        <Icon name="ios-arrow-forward" size={20} color="#C0C0C0" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.buttonSelect()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 16}}>Report a Problem</Text>
                        <View style={{width: 206}}/>
                        <Icon name="ios-arrow-forward" size={20} color="#C0C0C0" />
                    </TouchableOpacity>
                </View>
                <View style={{height: 60}}/>
                <View style = {{backgroundColor:'white', paddingLeft: 20}}>
                    <TouchableOpacity onPress={() => this.buttonSelect()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 16}}>Add Account</Text>
                        <View style={{width: 250}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.buttonSelect()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 16}}>Clear Search History</Text>
                        <View style={{width: 250}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.backToHome()} style={styles.buttonContainer}>
                        <Text style={{color: 'black',  margin: 0, fontSize: 16}}>Logout</Text>
                        <View style={{width: 250}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

});

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
        height: 40,
        opacity: 0.9
    }

});

module.exports = userSettingsScreen;