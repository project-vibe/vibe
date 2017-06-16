'use strict'
import React, { Component } from 'react'
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from 'react-native-vector-icons/EvilIcons';
import * as firebase from "firebase";
import {
    StyleSheet,
    Text,
    TextInput,
    Alert,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Keyboard,
    TouchableWithoutFeedback,
    View,
    StatusBar
} from 'react-native';
import ActionButton from "react-native-action-button";


class editProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            phoneNumber: props.phoneNumber,
            photoUrl: '',
        }
    }

    backButtonListener() {
        this.props.navigator.pop({

        });
    }
    changeDB() {
        let userSettingsPath = "/user/" + this.props.userId;
        firebase.database().ref(userSettingsPath).child('UserInfo').child('FirstName').set(this.state.firstName);
        firebase.database().ref(userSettingsPath).child('UserInfo').child('LastName').set(this.state.lastName);
        firebase.database().ref(userSettingsPath).child('UserInfo').child('PhoneNumber').set(this.state.phoneNumber);
        //no code yet for photo change
    }
    /*backToHome() {
        this.props.navigator.popToTop({
            title: 'BackToHome',
            passProps: {myElement: 'text'}
        });
    }*/
    buttonSelect() {
        alert("Needs implementation")
    }

    render(){
        const titleConfig = {
            title: 'Edit Profile',
            style: {fontWeight: 'bold', fontSize: 16, fontFamily: 'Noteworthy', color: 'black'}
        };

        const rightConfig = {
            title: 'Done',
            tintColor:'black',
            handler: () => alert('done'),
        };

        const backButtonConfig = (
            <BackButton.Button name="chevron-left" size={42} color="black" onPress={() => this.backButtonListener()} backgroundColor="transparent">
            </BackButton.Button>
        );
        const data = [
            { section: true, label: 'Change Profile Photo' },
            { label: 'Get From Facebook' },
            { label: 'Get From Gallery' },
            { label: 'Take Photo' },
        ];

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
                <View style={{height: 5}}/>
                <View style={styles.userInfo}>
                    <TouchableHighlight style={{paddingBottom: 5}}>
                        <Image style={ styles.image } source={{ uri: this.props.photoId }} />
                    </TouchableHighlight>
                </View>
                <View>
                    <Text style={{color: '#0A81D1', paddingTop:5, textAlign: 'center', fontSize: 14}}>Change Profile Photo</Text>
                </View>
                <View style={styles.inputStyle}>
                    <Text style={{color: '#808080',  paddingLeft: 20,paddingBottom:7, fontSize: 17}}>Name</Text>
                    <View style={{flexDirection: 'row', paddingLeft: 20, backgroundColor: 'white', borderRadius: 1, borderBottomWidth: 0, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                        <View style={{flexDirection: 'row', paddingTop: 6,paddingRight: 20, backgroundColor: 'white'}}>
                            <Icon name="account" size={30} color="#A9A9A9" />
                        </View>
                        <TextInput
                            style={styles.firstPTextInputStyle}
                            defaultValue={this.props.firstName}
                            placeholder="FirstName"
                            placeholderTextColor="#C0C0C0"
                            clearButtonMode="while-editing"
                            multiline={false}
                            autoCorrect={false}
                            onChangeText={(firstName) => this.setState({firstName})}
                            value={this.state.firstName}
                        />
                    </View>
                    <View style={{flexDirection: 'row', paddingLeft: 20, backgroundColor: 'white', borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                        <View style={{flexDirection: 'row', paddingTop: 6,paddingRight: 20, backgroundColor: 'white'}}>
                            <Icon name="account" size={30} color="#A9A9A9" />
                        </View>
                        <TextInput
                            style={styles.firstPTextInputStyle}
                            defaultValue={this.props.lastName}
                            placeholder="LastName"
                            placeholderTextColor="#C0C0C0"
                            clearButtonMode="while-editing"
                            multiline={false}
                            autoCorrect={false}
                            onChangeText={(lastName) => this.setState({lastName})}
                            value={this.state.lastName}
                        />
                    </View>
                    <View style={{height: 40}}/>
                    <Text style={{color: '#808080',  paddingLeft: 20,paddingBottom:7, fontSize: 17}}>Info</Text>
                    <View style={{flexDirection: 'row', paddingLeft: 20, backgroundColor: 'white', borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                        <View style={{flexDirection: 'row', paddingTop: 6,paddingRight: 20, backgroundColor: 'white'}}>
                            <Icon name="email" size={30} color="#A9A9A9" />
                        </View>
                        <TextInput
                            style={styles.firstPTextInputStyle}
                            defaultValue={this.props.email}
                            placeholder="email"
                            placeholderTextColor="#C0C0C0"
                            clearButtonMode="while-editing"
                            multiline={false}
                            autoCorrect={false}
                            editable={false}
                        />
                    </View>
                    <View style={{flexDirection: 'row', paddingLeft: 20, backgroundColor: 'white',borderRadius: 1, borderBottomWidth: 0.5, borderColor: '#C0C0C0'}}>
                        <View style={{flexDirection: 'row', paddingTop: 6,paddingRight: 20, backgroundColor: 'white'}}>
                            <Icon name="phone" size={30} color="#A9A9A9" />
                        </View>
                        <TextInput
                            style={styles.lastPTextInputStyle}
                            defaultValue={this.props.phoneNumber}
                            placeholder="Phone number"
                            placeholderTextColor="#C0C0C0"
                            clearButtonMode="while-editing"
                            multiline={false}
                            autoCorrect={false}
                            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                            value={this.state.phoneNumber}
                        />
                    </View>
                </View>
                <View style={{height: 60}}/>
                <View style = {{backgroundColor:'white', paddingLeft: 20, borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                    <TouchableOpacity onPress={() => this.changeDB()} style={styles.logoutButtonContainer}>
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
        paddingTop: 0,
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
    image: {
        height:80,
        width: 80,
        borderRadius: 40,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        borderWidth: 2,
        borderColor: 'white'
    },

    lastPTextInputStyle: {
        height: 43,
        width: 300,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 17,
        borderBottomColor: '#C0C0C0',
    },
    userInfo: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        height: 100,
        alignItems: 'center'
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

module.exports = editProfile;