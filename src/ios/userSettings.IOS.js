'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import NavigationBar from 'react-native-navbar';
import Hr from './hr.dist';
import Icon from 'react-native-vector-icons/Ionicons';

var BackToHome = require('./userHome.IOS.js');
var userSettingsScreen = React.createClass({
    backButtonListener() {
        this.props.navigator.pop({
            title: 'BackToHome',
            component: BackToHome,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },
    render: function(){
        const titleConfig = {
            title: 'Settings',
            style: {fontWeight: 'bold', fontSize: 20, fontFamily: 'Noteworthy'}
        };

        const backButtonConfig = (
            <Icon.Button name="ios-arrow-back" size={30} color="black" onPress={() => this.backButtonListener()} backgroundColor="transparent">
            </Icon.Button>
        );

        const backToHomepage = (
            <Icon.Button name="ios-arrow-back" size={30} color="black" onPress={() => this.backButtonListener()} backgroundColor="transparent">
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
                />
                <Hr style={{width: 140, flex: 1}}/>
                <Text>
                    Settings
                </Text>
            </View>
        )
    }

});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    }
});

module.exports = userSettingsScreen;