import React, { Component } from 'react';
import * as firebase from "firebase";
import { View, StyleSheet, StatusBar, TouchableOpacity, Text} from 'react-native';

export default class UserMessages extends Component {

    constructor(props) {
        super(props);
    }

    pullData() {
        let userSettingsPath = "/user/" + this.props.userId + "/UserInfo";
        alert("path " + userSettingsPath);
        var leadsRef = firebase.database().ref(userSettingsPath);
        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                alert(childData);
            });
        });
    }

    render () {
        return (
            <View style={[ styles.page, { backgroundColor: 'blue' } ]}>
                <StatusBar
                    color="white"
                    barStyle="light-content"
                />
                <View>
                    <TouchableOpacity onPress={() => this.pullData()} style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText}> Pull Data</Text>
                    </TouchableOpacity>

                </View>
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

module.exports = UserMessages;