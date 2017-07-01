'use strict'
import React, { Component } from 'react'
import NavigationBar from 'react-native-navbar';
import Hr from './hr.dist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from 'react-native-vector-icons/EvilIcons';
import * as firebase from "firebase";
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
import ActionButton from "react-native-action-button";


class changePassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newPassword: '',
            confirmPassword: ''
        }
    }
    backButtonListener() {
        this.props.navigator.pop({

        });
    }
    async confirmChangesButton() {
        let passwordCorrect = false;
        let password = this.state.password;
        let newPassword = this.state.newPassword;
        let confirmPassword = this.state.confirmPassword;

        try {
            await firebase.auth()
                .signInWithEmailAndPassword(this.props.email, password);
            passwordCorrect = true;
        } catch(error) {
            alert("Your current password is wrong!");
        }

        if(passwordCorrect) {
            //check if password is correct
            if (confirmPassword === newPassword) {
                this.updatePassword();
            } else {
                alert("Passwords are not correct!");
            }
        }
    }

    updatePassword() {
        var user = firebase.auth().currentUser;

        user.updatePassword(this.state.newPassword).then(function() {
            alert("Password changed!")
        }, function(error) {
            alert(error.message);
        });
    }

    backToHome() {
        this.props.navigator.popToTop({
            title: 'BackToHome',
            passProps: {myElement: 'text'}
        });
    }
    buttonSelect() {
        alert("Needs implementation")
    }

    render(){
        const titleConfig = {
            title: 'Change Password',
            style: {fontWeight: 'bold', fontSize: 16, fontFamily: 'Noteworthy', color: 'black'}
        };

        const rightConfig = {
            title: 'Done',
            tintColor:'black',
            handler: () => alert('YAYY its DONEE!!'),
        };

        const backButtonConfig = (
            <BackButton.Button name="chevron-left" size={46} color="black" onPress={() => this.backButtonListener()} backgroundColor="transparent">
            </BackButton.Button>
        );


        return (
            <View style={styles.container}>
                <StatusBar
                    color="black"
                />
                <NavigationBar
                    title={titleConfig}
                    leftButton={backButtonConfig}
                    rightButton={rightConfig}
                    tintColor={'#eeeeee'}
                    style={{borderBottomWidth: 0.5, borderColor: '#A9A9A9'}}
                />
                <View style={{height: 20}}/>
                <View style={styles.inputStyle}>
                    <View style={{flexDirection: 'row', paddingLeft: 20, backgroundColor: 'white', borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                        <View style={{flexDirection: 'row', paddingTop: 6,paddingRight: 20, backgroundColor: 'white'}}>
                            <Icon name="lock" size={25} color="#A9A9A9" />
                        </View>
                        <TextInput
                            style={styles.firstPTextInputStyle}
                            placeholder="Current Password"
                            placeholderTextColor="#C0C0C0"
                            clearButtonMode="while-editing"
                            multiline={false}
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>
                    <View style={{height: 40}}/>
                    <View style={{flexDirection: 'row', paddingLeft: 20, backgroundColor: 'white', borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                        <View style={{flexDirection: 'row', paddingTop: 6,paddingRight: 20, backgroundColor: 'white'}}>
                            <Icon name="lock" size={25} color="#A9A9A9" />
                        </View>
                            <TextInput
                                style={styles.lastPTextInputStyle}
                                placeholder="New Password"
                                placeholderTextColor="#C0C0C0"
                                clearButtonMode="while-editing"
                                multiline={false}
                                autoCorrect={false}
                                secureTextEntry={true}
                                onChangeText={(newPassword) => this.setState({newPassword})}
                                value={this.state.newPassword}
                            />
                    </View>
                    <View style={{flexDirection: 'row', paddingLeft: 20, backgroundColor: 'white',borderRadius: 1, borderBottomWidth: 0.5, borderColor: '#C0C0C0'}}>
                        <View style={{flexDirection: 'row', paddingTop: 6,paddingRight: 20, backgroundColor: 'white'}}>
                            <Icon name="lock" size={25} color="#A9A9A9" />
                        </View>
                        <TextInput
                            style={styles.lastPTextInputStyle}
                            placeholder="Confirm Password"
                            placeholderTextColor="#C0C0C0"
                            clearButtonMode="while-editing"
                            multiline={false}
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                            value={this.state.confirmPassword}
                        />
                    </View>
                </View>
                <View style={{height: 60}}/>
                <View style = {{backgroundColor:'white', paddingLeft: 20, borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                    <TouchableOpacity onPress={() => this.confirmChangesButton()} style={styles.logoutButtonContainer}>
                        <Text style={{color: 'red',  margin: 0, fontSize: 17}}>Confirm Changes</Text>
                        <View style={{width: 250}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

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
    inputStyle: {
        paddingTop: 25,
    },
    firstPTextInputStyle: {
        height: 43,
        width: 300,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 17,
        borderBottomColor: '#C0C0C0',
        marginRight: 20,
    },

    lastPTextInputStyle: {
        height: 43,
        width: 300,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 17,
        borderBottomColor: '#C0C0C0',
    },

    logoutButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 1,
        padding: 10,
        paddingLeft:90,
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

module.exports = changePassword;