'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, Text, TouchableOpacity, ListView, TouchableWithoutFeedback} from 'react-native'
import NavigationBar from 'react-native-navbar';
import Modal from '../../anm/react-native-simple-modal-1/NewModal/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationIcon from 'react-native-vector-icons/MaterialIcons';

/** NAVIGATION **/
var UserHome = require('../userSettings.IOS');
var VibeMapsScreen = require('../maps.IOS.js');

export default class UserEventInfo extends Component {
    state = {
        statusModal: false,
    };

    componentDidMount() {
        this.setState({statusModal: true})
    }

    deleteEvent() {
        alert('delete event. send request ot firebase')
    }

    getEventTitle() {
        return <Text style={styles.eventHeaderText}> DINNER PARTY </Text>
    }

    getEventLocation() {
        return  (
            <TouchableOpacity onPress={() => this.goToMaps()} style={styles.eventLocationButton}>
                <LocationIcon name="location-on" size={15} color="rgb(146,144,145)"></LocationIcon>
                <Text style={styles.eventHeaderLocationText}> BADMINTON ROAD B </Text>
            </TouchableOpacity>
        );
    }

    getEventDescription() {
        return (
            <View style={styles.eventDescriptionContainer}>
                <Text style={styles.eventDescription}> Put description of event here.</Text>
            </View>
        )
    }

    getEventDate() {
        return <Text style={styles.textTop}> MAY 21 MON 09:00 PM </Text>
    }

    getNumResponded() {
        return <Text style={styles.textTop}> 4/8 RESPONDED </Text>
    }

    getChatNotification() {
        return <Text style={styles.textTop}> NEW MESSAGES</Text>
    }

    render () {
        const backConfig = (
            <Icon.Button name="arrow-left-bold"
                         size={30}
                         color="grey"
                         onPress={() => this.goBackHome()}
                         backgroundColor="transparent"
            >
            </Icon.Button>
        );

        const deleteConfig = (
            <Icon.Button name="delete"
                         size={30}
                         color="rgb(146,144,145)"
                         onPress={() => this.deleteEvent()}
                         backgroundColor="transparent"
            >
            </Icon.Button>
        );

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <Modal
                    offset={this.state.offset}
                    open={this.state.statusModal}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({statusModal: false})}
                    style={{alignItems: 'center'}}>

                    <NavigationBar
                        leftButton={backConfig}
                        rightButton={deleteConfig}
                        tintColor={'transparent'}
                    />

                    <View style={styles.eventHeaderContainer}>
                        {this.getEventTitle()}
                        {this.getEventLocation()}
                        {this.getEventDescription()}
                    </View>

                    <View style={{width: '112.8%', height: '67%', marginLeft: -20}}>
                        <View style={{height: '80%'}}>
                            <TouchableWithoutFeedback onPress={() => this.goEditEvent()}>
                                <View style={styles.listRow}>
                                    {this.getEventDate()}
                                    <View style={{flexDirection: 'row', height: '35%', width: '100%'}}>
                                        <Text style={styles.rowDataStyle1}> EDIT EVENTS </Text>
                                        <View style={{width: '10%', paddingTop: 15}}>
                                            <Icon
                                                name="arrow-right-drop-circle"
                                                size={25}
                                                color="rgb(200,200,200)"
                                                backgroundColor="transparent">
                                            </Icon>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', height: '20%', width: '100%', paddingLeft: 22}}>
                                        <Icon
                                            name="account-multiple"
                                            size={20}
                                            color="rgb(146,144,145)"
                                            backgroundColor="transparent">
                                        </Icon>
                                        <Text style={styles.invitedListText}> You invited John, Tim and 3 others.</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.goToAcceptedList()}>
                                <View style={styles.listMidRow}>
                                    {this.getNumResponded()}
                                    <View style={{flexDirection: 'row', height: '40%', width: '100%'}}>
                                        <Text style={styles.rowDataStyle2}> ACCEPTED </Text>
                                        <View style={{width: '10%', paddingTop: 15}}>
                                            <Icon
                                                name="arrow-right-drop-circle"
                                                size={25}
                                                color="rgb(200,200,200)"
                                                backgroundColor="transparent">
                                            </Icon>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', height: '20%', width: '100%', paddingLeft: 22}}>
                                        <Icon
                                            name="clipboard-check"
                                            size={20}
                                            color="rgb(146,144,145)"
                                            backgroundColor="transparent">
                                        </Icon>
                                        <Text style={styles.invitedListText}> Chris, Bob and 10 others have accepted.</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.goToGroupChat()}>
                                <View style={styles.listRow}>
                                    {this.getChatNotification()}
                                    <View style={{flexDirection: 'row', height: '40%', width: '100%'}}>
                                        <Text style={styles.rowDataStyle3}> GROUP CHAT </Text>
                                        <View style={{width: '10%', paddingTop: 12}}>
                                            <Icon
                                                name="arrow-right-drop-circle"
                                                size={25}
                                                color="rgb(200,200,200)"
                                                backgroundColor="transparent">
                                            </Icon>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', height: '20%', width: '100%', paddingLeft: 22}}>
                                        <Icon
                                            name="message-text"
                                            size={20}
                                            color="rgb(146,144,145)"
                                            backgroundColor="transparent">
                                        </Icon>
                                        <Text style={styles.invitedListText}> Ron, Jim and 2 others are in this chat.</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }

    goToMaps() {
        this.props.navigator.push({
            title: 'VibeMaps',
            component: VibeMapsScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }

    goBackHome() {
        this.props.navigator.pop({
            title: 'BackPage',
            component: UserHome,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }

    goEditEvent() {
        alert('go to edit event screen')
    }

    goToAcceptedList() {
        alert('go to accepted list screen')
    }

    goToGroupChat() {
        alert('go to group chat screen')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventHeaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    eventHeaderText: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'Bangla Sangam MN',
        letterSpacing: -2,
        // TrebuchetMS-Bold,AvenirNextCondensed-Medium

        color: '#0A81D1'
    },
    eventHeaderLocationText: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Bangla Sangam MN',
        letterSpacing: -1,
        // TrebuchetMS-Bold,AvenirNextCondensed-Medium
        color: 'rgb(146,144,145)'
    },
    eventLocationButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventDescriptionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 25
    },
    eventDescription: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Bangla Sangam MN',
        color: 'rgb(200,200,200)',
    },
    rowDataStyle1: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Bangla Sangam MN',
        color: 'rgb(187, 104, 67)',
        letterSpacing: -2,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 20,
        width: '90%'
    },
    rowDataStyle2: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Bangla Sangam MN',
        color: 'rgb(94,154,168)',
        letterSpacing: -2,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 20,
        width: '90%'
    },
    rowDataStyle3: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Bangla Sangam MN',
        color: 'rgb(142,162,50)',
        letterSpacing: -2,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 20,
        width: '90%'
    },
    listRow: {
        backgroundColor: 'rgb(230,230,230)',
        borderTopColor: 'rgb(210,210,210)',
        borderBottomColor: 'rgb(210,210,210)',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        height: '41%'
    },
    listMidRow: {
        backgroundColor: 'rgb(230,230,230)',
        height: '41%'
    },
    invitedListText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Bangla Sangam MN',
        color: 'rgb(146,144,145)'
    },
    textTop: {
        paddingLeft: 25,
        color: 'rgb(59,59,59)',
        paddingTop: 25,
        fontWeight: 'bold',
        fontFamily: 'Bangla Sangam MN'
    }
});
module.exports = UserEventInfo;