'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native'
import { SquarePagerView, TrianglePagerView, CirclePagerView } from './PagerItemView.js'
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager'
import NavigationBar from 'react-native-navbar';
import Hr from './hr.dist';
import Icon from 'react-native-vector-icons/FontAwesome';

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

        const rightButtonConfig = {
            title: 'Settings',
            handler: () => alert('hello!'),
        };

        const titleConfig = {
            title: 'Vibe',
            style: {fontWeight: 'bold', fontSize: 26, fontFamily: 'Noteworthy',}
        };

        return (
            <Animated.View style={{flex: 1, backgroundColor: '#f33443'}} >
            {/* <Animated.View style={{flex: 1, backgroundColor: bgColor}} > */}
                <NavigationBar
                    title={titleConfig}
                    rightButton={rightButtonConfig}
                    tintColor={'#eeeeee'}
                />
                <Hr style={{width: 250}}/>
                <View style={styles.wrapper}>
                    <Text style={styles.username}>Abhay Varshney</Text>
                    <Text style={styles.location}>Pomona, CA</Text>
                    <Icon.Button name="facebook" backgroundColor="#3b5998">
                        Login with Facebook
                    </Icon.Button>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={{color: 'white', fontWeight: 'bold', margin: 5, fontSize: 16}}>PICTURE HERE!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={{color: 'white', fontWeight: 'bold', margin: 5, fontSize: 16}}>Settings</Text>
                    </TouchableOpacity>
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
    wrapper: {
        backgroundColor: '#f33443',
        justifyContent: 'center',
        height: 180,
        alignItems: 'center'
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
        fontSize: 10,
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
        backgroundColor: 0x00000020,
        height: 48
    },
    indicatorText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '200'
    },
    indicatorSelectedText: {
        fontSize: 14,
        color: 0xFFFFFFFF
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
    }
});

module.exports = UserHome;