'use strict'
import React, { Component } from 'react'
import NavigationBar from 'react-native-navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
    ScrollView,
    Platform,
    TouchableHighlight,
    Keyboard,
    TouchableWithoutFeedback,
    View,
    StatusBar
} from 'react-native';
import ModalPicker from "react-native-modal-picker"
import ActionButton from "react-native-action-button";
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class editProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            phoneNumber: props.phoneNumber,
            photo: props.photo,
        }
    }

    backButtonListener() {
        this.props.navigator.pop({

        });
    }

    changeDB(uri, mime = 'image/jpg') {
        let userSettingsPath = "/user/" + this.props.userId;
        if(this.props.photo === uri)
        {
            firebase.database().ref(userSettingsPath).child('UserInfo').child('PhotoUrl').set(this.state.photo);
            firebase.database().ref(userSettingsPath).child('UserInfo').child('FirstName').set(this.state.firstName);
            firebase.database().ref(userSettingsPath).child('UserInfo').child('LastName').set(this.state.lastName);
            firebase.database().ref(userSettingsPath).child('UserInfo').child('PhoneNumber').set(this.state.phoneNumber);
        }
        else
            return new Promise((resolve, reject) => {
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
                let uploadBlob = null

                const imageRef = firebase.storage().ref(userSettingsPath).child('PhotoUrl')

                fs.readFile(uploadUri, 'base64')
                    .then((data) => {
                        return Blob.build(data, { type: `${mime};BASE64` })
                    })
                    .then((blob) => {
                        uploadBlob = blob
                        return imageRef.put(blob, { contentType: mime })
                    })
                    .then(() => {
                        uploadBlob.close()
                        return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                        this.state.photo = url
                        firebase.database().ref(userSettingsPath).child('UserInfo').child('PhotoUrl').set(this.state.photo);
                        firebase.database().ref(userSettingsPath).child('UserInfo').child('FirstName').set(this.state.firstName);
                        firebase.database().ref(userSettingsPath).child('UserInfo').child('LastName').set(this.state.lastName);
                        firebase.database().ref(userSettingsPath).child('UserInfo').child('PhoneNumber').set(this.state.phoneNumber);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
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
    pickSingleWithCamera(cropping, circular=true) {
        ImagePicker.openCamera({
            cropping: cropping,
            cropperCircleOverlay: circular,
            width: 200,
            height: 200,
        }).then(image => {
            console.log('received image', image);
            this.setState({
                photo: image.path,
            });
        }).catch(e => {
            console.log(e);
            if(e.message === "User cancelled image selection")
            {

            }
            else if(e.message === "User did not grant camera permission.")
            {
                Alert.alert("Cannot access camera. Please allow access if you want to take a new photo" );
            }
            else if(e.message !== "")
                Alert.alert(e.message );
        });
    }

    pickSingle(cropit, circular=true) {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 100,
            compressVideoPreset: 'MediumQuality',
        }).then(image => {
            console.log('received image', image);
            this.setState({
                photo: image.path,
            });
        }).catch(e => {
            console.log(e);
            if(e.message === "User cancelled image selection")
            {

            }
            else
                Alert.alert(e.message );
        });
    }
    renderImage(image) {
        return <Image style={{height:150, width: 150, borderRadius: 75, shadowColor: '#000000', shadowRadius: 10,
            borderWidth: 2, borderColor: 'white', resizeMode: 'contain'}} source={{uri: image}} />
    }


    render(){
        const titleConfig = {
            title: 'Edit Profile',
            style: {fontWeight: 'bold', fontSize: 16, fontFamily: 'Noteworthy', color: 'black'}
        };

        const backButtonConfig = (
            <BackButton.Button name="chevron-left" size={42} color="black" onPress={() => this.backButtonListener()} backgroundColor="transparent">
            </BackButton.Button>
        );
        const data = [
            { section: true, key: 0, label: 'Change Profile Photo' },
            { key: 1, label: 'Get From Facebook' },
            { key: 2, label: 'Get From Gallery' },
            { key: 3, label: 'Take Photo' },
        ];

        return (
            <View style={styles.container}>
                <StatusBar
                    color="black"
                />
                <NavigationBar
                    title={titleConfig}
                    leftButton={backButtonConfig}
                    tintColor={'#eeeeee'}
                    style={{borderBottomWidth: 0.5, borderColor: '#A9A9A9'}}
                />
                <KeyboardAwareScrollView
                    style={{ backgroundColor: 'transparent' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}
                >
                <ScrollView>
                    <View style={{height: 25}}/>
                    <View style={styles.userInfo}>
                        <TouchableHighlight style={{paddingTop: 15}}>
                            {this.renderImage(this.state.photo)}
                        </TouchableHighlight>
                    </View>
                    <View style={{height: 30}}/>
                    <View>
                        <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
                            <Text style={{color: '#0A81D1', paddingTop:15, textAlign: 'center', fontSize: 16}}>Take New Picture</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
                            <Text style={{color: '#0A81D1', paddingTop:15, textAlign: 'center', fontSize: 16}}>Select From Gallery</Text>
                        </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => this.changeDB(this.state.photo)} style={styles.logoutButtonContainer}>
                            <Text style={{color: 'red',  margin: 0, fontSize: 17}}>Confirm Changes</Text>
                            <View style={{width: 250}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 50}}/>
                </ScrollView>
                </KeyboardAwareScrollView>
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