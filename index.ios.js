import React, { Component } from 'react';
import * as firebase from "firebase";
import {
    View,
    AppRegistry,
    StyleSheet,
    NavigatorIOS
} from 'react-native';

firebase.initializeApp({
    apiKey: "AIzaSyD-AigGdzjuSbv_He5GX-NlMqlSk582gNw",
    authDomain: "vibe-backend.firebaseapp.com",
    databaseURL: "https://vibe-backend.firebaseio.com",
    storageBucket: "vibe-backend.appspot.com",
});

var signInScreen = require('./src//ios/signinHome.IOS.js');
var landingPage = require('./src//ios/landingPage.IOS.js');

var vibe = React.createClass({
  render() {
    return (
        <NavigatorIOS
            style = {styles.container}
            initialRoute={{
              title: "Root",
              navigationBarHidden: true,
              component:landingPage
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