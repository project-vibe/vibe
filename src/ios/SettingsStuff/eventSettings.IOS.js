'use strict'
import React, { Component } from 'react'
import NavigationBar from 'react-native-navbar';
import ModalDropdown from 'react-native-modal-dropdown';
import Hr from './hr.dist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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


class eventSettings extends Component{



    backButtonListener() {
        this.props.navigator.pop({

        });
    }
    confirmChangesButton() {
        alert("Your Password is Changed!! YAAY!!!")
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
            title: 'Event Settings',
            style: {fontWeight: 'bold', fontSize: 16, fontFamily: 'Noteworthy', color: 'black'}
        };

        const rightConfig = {
            title: 'Done',
            tintColor:'black',
            handler: () => alert('YAYY its DONEE!!'),
        };

        const backButtonConfig = (
            <Icon.Button name="arrow-left" size={30} color="black" onPress={() => this.backButtonListener()} backgroundColor="transparent">
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
                    rightButton={rightConfig}
                    tintColor={'#eeeeee'}
                />
                <Hr style={{width: 140, flex: 1}}/>
                <View style={{height: 20}}/>
                <View style={styles.inputStyle}>
                        <Text style={{color: '#808080',  paddingLeft: 20,paddingBottom:7, fontSize: 17}}>Save Your Events For:</Text>
                        <View style={{flexDirection: 'row', paddingLeft: 20, backgroundColor: 'white', borderRadius: 1, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#C0C0C0'}}>
                            <View style={{flexDirection: 'row', paddingTop: 6,paddingRight: 20, backgroundColor: 'white'}}>
                                <Icon name="calendar-clock" size={30} color="#A9A9A9" />
                            </View>
                            <ModalDropdown
                                options={['1 Week', '1 Month', '1 Year']}
                                defaultValue={'1 Year'}
                                dropdownStyle={{flexDirection: 'row', backgroundColor: 'white', height: 120, width: 320}}
                                textStyle={{color: 'black',  margin: 0, fontSize: 17, alignItems:'center', paddingTop: 4}}
                                style={{flexDirection: 'row', paddingTop: 6,paddingRight: 20, backgroundColor: 'white'}}>
                            </ModalDropdown>
                        </View>
                </View>
                <View style={{height: 125}}/>
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

module.exports = eventSettings;