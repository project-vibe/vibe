'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import NavigationBar from 'react-native-navbar';
import Hr from './hr.dist';
import Icon from 'react-native-vector-icons/Ionicons';

var addFriendsScreen = React.createClass({
    backButtonListener() {
        alert('back button clicked!');
    },
    render: function(){
        const titleConfig = {
            title: 'Add Friends',
            style: {fontWeight: 'bold', fontSize: 20, fontFamily: 'Noteworthy', color: 'white'}
        };

        const backButtonConfig = (
            <Icon.Button name="ios-arrow-back" size={30} color="white" onPress={() => this.backButtonListener()} backgroundColor="transparent">
            </Icon.Button>
        );

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <NavigationBar
                    title={titleConfig}
                    leftButton={backButtonConfig}
                    tintColor={'#010004'}
                />
                <Hr style={{width: 140, flex: 1}}/>
                <Text>
                    Add Friend
                </Text>
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8505c',
        flex: 1
    }
});

module.exports = addFriendsScreen;