'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Animated, TouchableHighlight, StatusBar } from 'react-native'
import { SquarePagerView, TrianglePagerView, CirclePagerView } from './PagerItemView.js'
import { IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager'
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';

export default class UserHome extends Component {
    state = {
        bgColor: new Animated.Value(0)
    }
    _setBgColor = Animated.event([{bgColor: this.state.bgColor}])

    render () {
        let bgColor = this.state.bgColor.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['hsl(187, 74%, 47%)', 'hsl(89, 47%, 54%)', 'hsl(12, 97%, 59%)']
        });

        const settingsConfig = (
            <Icon.Button name="ios-settings" size={30} color="white" backgroundColor="transparent">
            </Icon.Button>
        );

        const addFriendsConfig = (
            <Icon.Button name="ios-person-add" size={30} color="white" backgroundColor="transparent">
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
                <IndicatorViewPager
                    style={{flex: 1, flexDirection: 'column-reverse'}}
                    initialPage={1}
                    indicator={this._renderTitleIndicator()}
                    onPageScroll={this._onPageScroll.bind(this)}
                >
                    {SquarePagerView()}
                    {CirclePagerView()}
                    {TrianglePagerView()}
                </IndicatorViewPager>

            </Animated.View>
        )
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={2} />;
    }

    _renderTitleIndicator () {
        return (
            <PagerTitleIndicator
                style={styles.indicatorContainer}
                itemTextStyle={styles.indicatorText}
                selectedItemTextStyle={styles.indicatorSelectedText}
                titles={['Messages', 'Home', 'Your events']}
            />
        )
    }

    _onPageScroll (scrollData) {
        let {offset, position} = scrollData
        if (position < 0 || position >= 2) return
        this._setBgColor({bgColor: offset + position})
    }

}

const styles = StyleSheet.create({
    userInfo: {
        backgroundColor: '#e8505c',
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