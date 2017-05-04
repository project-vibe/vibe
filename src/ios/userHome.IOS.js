'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Animated, TouchableHighlight, StatusBar } from 'react-native'
import { SquarePagerView, TrianglePagerView, CirclePagerView } from './PagerItemView.js'
import { IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager'
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import HomeEvents from './scrollScreens/homeEventList.IOS.js';
import CreateEvents from './scrollScreens/createEvents.IOS.js';
import UserMessages from './scrollScreens/userMessages.IOS.js';

var UserSettingsScreen = require('./userSettings.IOS.js');
var AddFriendsScreen = require('./addFriends.IOS.js');

export default class UserHome extends Component {
    state = {
        index: 1,
        routes: [
            /* Messages, Home, Events */
            { key: '1', val: 0, icon: 'ios-chatbubbles' },
            { key: '2', val: 1, icon: 'ios-home' },
            { key: '3', val: 2, icon: 'ios-list-box'}
        ],
    };

    _handleChangeTab = index => {
        this.setState({ index });
    };

    _renderIcon = ({ route }) => {
        return <Icon.Button onPress={() => this._handleChangeTab(route.val)} name={route.icon} size={22} color="black" backgroundColor="transparent">
        </Icon.Button>
    };

    _renderHeader = props => {
        return <TabBar
            labelStyle={{color: 'black'}}
            indicatorStyle={{backgroundColor: '#14c7af'}}
            renderIcon={this._renderIcon}
            style={{height: 55, backgroundColor: '#eeeeee'}}
            {...props}
        />;
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <UserMessages />;

            case '2':
                return <HomeEvents />;
            case '3':
                return <CreateEvents />;
            default:
                return null;
        }
    };


    render () {
        const settingsConfig = (
            <Icon.Button name="ios-settings" size={30} color="white" onPress={() => this.userSettingsListener()} backgroundColor="transparent">
            </Icon.Button>
        );

        const addFriendsConfig = (
            <Icon.Button name="ios-person-add" size={30} color="white" onPress={() => this.addFriendsListener()} backgroundColor="transparent">
            </Icon.Button>
        );

        const titleConfig = {
            title: 'Vibe',
            style: {fontWeight: 'bold', fontSize: 26, fontFamily: 'Noteworthy', color: 'white'}
        };

        return (
            <Animated.View style={{flex: 1, backgroundColor: 'white'}} >
                {/* <Animated.View style={{flex: 1, backgroundColor: bgColor}} > */}
                <StatusBar
                    color="white"
                    barStyle="light-content"
                />
                <NavigationBar
                    title={titleConfig}
                    rightButton={settingsConfig}
                    leftButton={addFriendsConfig}
                    tintColor={'#010004'}
                />
                <View style={styles.userInfo}>
                    <TouchableHighlight style={{paddingBottom: 5}}>
                        <Image style={ styles.image } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
                    </TouchableHighlight>
                    <Text style={styles.username}>Rushi Shah</Text>
                    <Text style={styles.location}>Pomona, CA</Text>
                </View>

                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
                />

            </Animated.View>
        )
    }

    userSettingsListener() {
        this.props.navigator.push({
            title: 'userSettingsScreen',
            component: UserSettingsScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }

    addFriendsListener() {
        this.props.navigator.push({
            title: 'addFriendsScreen',
            component: AddFriendsScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2
    },
    page: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        backgroundColor: '#14c7af',
        justifyContent: 'center',
        height: 200,
        alignItems: 'center'
    },
    eventInfo: {
        backgroundColor: 'red',
        width: 250
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Noteworthy',
    },
    location: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 9,
        opacity: 0.8,
        fontFamily: 'Noteworthy',
    },
    buttonContainer: {
        backgroundColor: 'transparent',
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
    },
    indicatorContainer: {
        backgroundColor: '#eeeeee',
        height: 48
    },
    indicatorText: {
        fontSize: 14,
        fontFamily: 'Noteworthy',
        color: 'black',
        fontWeight: '800'
    },
    indicatorSelectedText: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'Noteworthy',
        fontWeight: '800'
    },
    statusBar: {
        height: 24,
        backgroundColor: 0x00000044
    },
    toolbarContainer: {
        height: 56,
        backgroundColor: 0x00000020,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    backImg: {
        width: 16,
        height: 17
    },
    titleTxt: {
        marginLeft: 36,
        color: 'white',
        fontSize: 20,
        fontWeight: '800'
    },
    image: {
        height:100,
        width: 100,
        borderRadius: 50,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        borderWidth: 2,
        borderColor: 'white'
    },
});

module.exports = UserHome;