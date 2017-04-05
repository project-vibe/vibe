import React, { Component } from 'react';
import {
    View,
    AppRegistry,
    StyleSheet,
    NavigatorIOS
} from 'react-native';

var signInScreen = require('./src//ios/signinHome.IOS.js');
var vibe = React.createClass({
  render() {
    return (
        <NavigatorIOS
            style = {styles.container}
            initialRoute={{
          title: "Root",
          navigationBarHidden: true,
          component:signInScreen
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