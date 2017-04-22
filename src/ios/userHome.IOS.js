'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform, Image, TouchableOpacity, Animated } from 'react-native'
import { SquarePagerView, TrianglePagerView, CirclePagerView } from './PagerItemView.js'
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager'

export default class UserHome extends Component {
    state = {
        bgColor: new Animated.Value(0)
    }
    _setBgColor = Animated.event([{bgColor: this.state.bgColor}])

    render () {
        let bgColor = this.state.bgColor.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['hsl(187, 74%, 47%)', 'hsl(89, 47%, 54%)', 'hsl(12, 97%, 59%)']
        })
        return (
            <Animated.View style={{flex: 1, backgroundColor: '#EF4836'}} >
            {/* <Animated.View style={{flex: 1, backgroundColor: bgColor}} > */}
                <View style={styles.wrapper}>
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
                selectedBorderStyle={styles.selectedBorderStyle}
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
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 200,
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: 'green',
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
    selectedBorderStyle: {
        height: 3,
        backgroundColor: 'white'
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