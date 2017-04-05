'use strict';

import React, { Component } from 'react';
import {
    View, 
    Text,
    StyleSheet
} from 'react-native';

var Register = React.createClass({
    render: function() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.title}> Vibe </Text>
                <Text style={styles.subtitles}> Powered by CPP </Text>
            </View> 
        );
    }
})

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#1abc9c', 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitles: {
        color: 'white',
        fontWeight: '200',
        paddingBottom: 20
    }
});

module.exports = Register;