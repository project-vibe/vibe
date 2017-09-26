import React, { Component } from 'react';
import * as firebase from "firebase";
import {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    StatusBar
} from 'react-native';

firebase.initializeApp({
    apiKey: "AIzaSyD-AigGdzjuSbv_He5GX-NlMqlSk582gNw",
    authDomain: "vibe-backend.firebaseapp.com",
    databaseURL: "https://vibe-backend.firebaseio.com",
    storageBucket: "vibe-backend.appspot.com",
});

let landingPage = require('./src/ios/AppIntro/lntro.IOS.js');

let vibe = React.createClass({
    componentDidMount() {
        // Hide the status bar
        StatusBar.setHidden(true);
    },

    render() {
        return (
            <NavigatorIOS
                style = {styles.container}
                initialRoute={{
                  title: "Root",
                  navigationBarHidden: true,
                  component: landingPage
            }}/>
        );
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('vibe', () => vibe);