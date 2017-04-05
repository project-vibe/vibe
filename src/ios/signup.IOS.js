'use strict';

import React, { Component } from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

var SignInHomeScreen = require('./signinHome.IOS.js');

var SignUp = React.createClass({
    goSignUp: function() {
        this.props.navigator.push({
            title: 'signInHomeScreen',
            component: SignInHomeScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    },

    render: function() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.title}> Vibe </Text>
                <Text style={styles.subtitles}> Powered by CPP </Text>
                <TouchableOpacity onPress={() => this.goSignUp()} style={{backgroundColor: 'white', height: 20}}>
                  <Text style={styles.buttonBack}>Go back.</Text>
                </TouchableOpacity>
            </View> 
        );
    }
});

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#1abc9c', 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
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