import React, { Component } from 'react'
import { View, StyleSheet, StatusBar} from 'react-native';

export default class UserEventsList extends Component {
    render () {
        return (
            <View style={[ styles.page, { backgroundColor: 'white' } ]}>
                <StatusBar
                    color="white"
                    barStyle="light-content"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

module.exports = UserEventsList;