'use strict';

import React, { Component } from 'react';
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
            passProps: {myElement: 'text'}
        });
    },

    render: function() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style = {styles.wrapper}>
            <Image source = {require('./roseImage.jpg')} style = {{backgroundColor: 'transparent'}}>
                    <View style = {styles.nameStyle}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder= "First Name"
                            placeholderTextColor= "white"
                        />
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