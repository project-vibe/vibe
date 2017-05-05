'use strict';

import React, { Component } from 'react';
import * as firebase from "firebase";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Hr from './hr.dist';
import FBSDK, { LoginManager } from 'react-native-fbsdk';

var SignUpScreen = require('./signup.IOS.js');
var UserHomeScreen = require('./userHome.IOS.js');

var signInScreen = React.createClass({

    getInitialState () {
        return {
            username: '',
            password: ''
        };
    },

      _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
           function(result) {
              if (result.isCancelled) {
                 alert('Login cancelled');
              } else {
                 alert('Login success with permissions: '
                 +result.grantedPermissions.toString());
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
            console.log(error.toString())
            alert("Error!");
        }
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
                <View style={{width: 50, height: 25, backgroundColor: '#EF4836'}} /> 
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
                    <View style={{opacity: 0.8 }}> 
                      <TouchableOpacity onPress={() => this._handlePressLogin()} style={styles.buttonContainer}>
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
                    <View style={{opacity: 0.8 }}> 
                      <TouchableOpacity onPress={this._fbAuth} style={styles.fbButton}>
                          <Text style={{color: '#EF4836', fontWeight: 'bold', margin: 5, fontSize: 16}}>Log In with Facebook</Text>
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
                          <Text style={{fontWeight: 'bold', color:'#EF4836',margin: 5, fontSize: 12}}>Sign up.</Text>
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
    backgroundColor: '#EF4836',
    opacity: 0.8
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 78,
    fontFamily: 'Noteworthy',
    /* possible fonts -- didot, futura, Georgia, GillSans-UltraBold, IowanOldStyle-Roman, KohinoorDevanagari-Semibold, Noteworthy*/
  },
  buttonContainer: {
    backgroundColor: '#EF4836',
    borderRadius: 100,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    height: 50,
    alignItems: 'center'
  },
  fbButton: {
    backgroundColor: 'white',
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
