'use strict'
import React, {
    Component,
} from 'react'

import {
    StyleSheet,
    View,
    Text,
    StatusBar,
} from 'react-native';


class SelectFriendsDM extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />

                <View style={{flex: 1, paddingTop: 30}}>
                    <Text> Hello</Text>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
});

module.exports = SelectFriendsDM;