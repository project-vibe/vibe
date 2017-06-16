'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, Text, TouchableOpacity} from 'react-native'

import Modal from '../../anm/react-native-simple-modal/index';

export default class UserEventInfo extends Component {

    constructor(props) {
        super();
        // this.setState({statusModal: true})
    };

    state = {
        statusModal: false,
    };

    render () {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this.setState({statusModal: true})} style={{width: 200, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 12}}> Pomona, CA</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    offset={this.state.offset}
                    open={true}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({statusModal: false})}
                    style={{alignItems: 'center', backgroundColor: 'white'}}>

                    <Text> HELLO </Text>
                </Modal>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
module.exports = UserEventInfo;