'use strict';
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    ListView,
    Text
} from 'react-native';
import Button from 'react-native-button';
import { Card } from 'react-native-card-view';
import Swipeable from 'react-native-swipeable';
import * as firebase from "firebase";
const _ = require('lodash');
//const cardInfo = require('./data/notifications-data-tester.json');
const cardInfo = require('./data/notifications-data.json');
const cardTypes = ["eventJoin", "friendRequest", "eventShare", "friendRequestAccepted"];

function deleteCard(index) {
    // removes from json
    _.pullAt(this.cardInfo, [index]);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
        dataSource: ds.cloneWithRows(this.cardInfo)
    })
}

function acceptRequest(index) {
    this.cardInfo[index].cardType = "friendRequestAccepted";
    this.cardInfo[index].eventName = null;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
        dataSource: ds.cloneWithRows(this.cardInfo)
    });

    let userId = this.props.userId;
    let friendId = this.cardInfo[index].userId;
    let userPath = "/user/" + userId;
    let friendPath = "/user/" + friendId;

    firebase.database().ref(userPath).child('Friends').child('AcceptedFriends').child(friendId).set({"id": friendId});
    firebase.database().ref(friendPath).child('Friends').child('AcceptedFriends').child(userId).set({"id": userId});
    firebase.database().ref(userPath).child('Friends').child('IncomingRequests').child(friendId).remove();
    firebase.database().ref(userPath).child('Friends').child('OutgoingRequests').child(friendId).remove();
    firebase.database().ref(friendPath).child('Friends').child('OutgoingRequests').child(userId).remove();
}

function rejectRequest(index) {
    deleteCard = deleteCard.bind(this);
    deleteCard(index);

    // let userId = this.props.userId;
    // let friendId = this.cardInfo[index].userId;
    // let userPath = "/user/" + userId;
    // let friendPath = "/user/" + friendId;
    //
    // firebase.database().ref(friendPath).child('Friends').child('AcceptedFriends').child(userId).remove();
    // firebase.database().ref(userPath).child('Friends').child('AcceptedFriends').child(friendId).remove();
    // firebase.database().ref(userPath).child('Friends').child('IncomingRequests').child(friendId).remove();
    // firebase.database().ref(friendPath).child('Friends').child('OutgoingRequests').child(userId).remove();
}

function acceptInvitation(index) {
    this.cardInfo[index].cardType = "eventJoin";
    this.cardInfo[index].eventName = "Study Session";
    this.cardInfo[index].name.first = "You";
    this.cardInfo[index].name.last = "";
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
        dataSource: ds.cloneWithRows(this.cardInfo)
    })
}

function rejectInvitation(index) {
    deleteCard = deleteCard.bind(this);
    deleteCard(index);
}

class Notifications extends Component {
    constructor(props) {
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.cardInfo = _.cloneDeep(cardInfo.data);
        this.state = {
            dataSource: ds.cloneWithRows(this.cardInfo),
        };
    }

    componentDidMount(){
        this.grabData(this.props.userId);
    }

    grabData(userId) {
        let userSettingsPath = "/user/" + userId + "/Friends/IncomingRequests/";
        let childData = "";
        let leadsRef = firebase.database().ref(userSettingsPath);

        leadsRef.on('value', (snapshot) => {
            this.cardInfo = [];
            snapshot.forEach((childSnapshot) => {
                childData = childSnapshot.val();
                let user = {
                    eventName: null,
                    profileURL: 'https://randomuser.me/api/portraits/men/47.jpg',
                    leadsRef: firebase.database().ref("/user/" + childData.userId + "/UserInfo"),
                    userId: childData.userId
                };

                user.leadsRef.on('value',(snapshot) =>{
                    let counter = 0;
                    snapshot.forEach((childSnapshot) =>{
                        counter++;
                        if (counter === 2) {
                            user.firstName = childSnapshot.val();
                        }
                        if (counter === 3) {
                            user.lastName = childSnapshot.val();
                        }
                        if (counter === 8) {
                            user.profileURL = childSnapshot.val();
                        }
                    });
                    this.cardInfo.push(
                        {
                            "cardType": cardTypes[1],
                            "userId": user.userId,
                            "name": {
                                "first": user.firstName,
                                "last": user.lastName,
                            },

                            "eventName": user.eventName, //NOTE: leave eventName as null if the card type doesn't use it(ex. friendRequest)

                            "picture": {
                                "large": user.profileURL,
                            },
                        },
                    );
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                    this.setState({dataSource: ds.cloneWithRows(this.cardInfo)});
                });
            });
        });
    }

    grammarFix(name) {
        if(name === "You") return "have";
        else return "has";
    }

    renderCards(props) {
        let swipeBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { alert('delete')}
            },
            {
                text: 'Duplicate',
                backgroundColor: 'blue',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { alert('hello ')}
            }
        ];

        if(props.cardType === "friendRequest") {
            return (
                <Swipeable
                    onRef={ref => this.swipeable = ref}
                    leftActionActivationDistance = {250}
                    onLeftActionActivate={deleteCard.bind(this, _.findIndex(this.cardInfo, props))}
                    leftContent={<Text> </Text>}>

                    <Card styles={{card: {backgroundColor: '#00aad1', opacity: 0.8}}}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 10,
                            marginTop: 20,
                            marginRight: 30
                        }}>
                            <Image style={ styles.friendRequestImage} source={{uri: props.picture.large}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardContent}>{`${props.name.first} ${props.name.last} `}
                                    has requested to add you!</Text>
                                <View style={{flexDirection: 'row', paddingTop: 20, paddingBottom: 10}}>
                                    <Button
                                        style={styles.buttonAccept}
                                        onPress={acceptRequest.bind(this, _.findIndex(this.cardInfo, props))}>
                                        Accept
                                    </Button>
                                    <Button
                                        style={styles.buttonReject}
                                        onPress={rejectRequest.bind(this, _.findIndex(this.cardInfo, props))}>
                                        Reject
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            )
        } else if(props.cardType === "eventJoin") {
            return (
                <Swipeable
                    onRef={ref => this.swipeable = ref}
                    leftActionActivationDistance = {250}
                    onLeftActionActivate={deleteCard.bind(this, _.findIndex(this.cardInfo, props))}
                    leftContent={<Text> </Text>}>

                    <Card styles={{card: {backgroundColor: '#00aad1', opacity: 0.8}}}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 20,
                            marginTop: 20,
                            marginRight: 30
                        }}>
                            <Image style={ styles.profileImage } source={{uri: props.picture.large}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardContent}>{`${props.name.first} ${props.name.last} `}
                                    {this.grammarFix(props.name.first)} joined the {props.eventName}!</Text>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            )
        } else if(props.cardType === "friendRequestAccepted") {
            return (
                <Swipeable
                    onRef={ref => this.swipeable = ref}
                    leftActionActivationDistance = {250}
                    onLeftActionActivate={deleteCard.bind(this, _.findIndex(this.cardInfo, props))}
                    leftContent={<Text> </Text>}>

                    <Card styles={{card: {backgroundColor: '#00aad1', opacity: 0.8}}}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 20,
                            marginTop: 20,
                            marginRight: 30
                        }}>
                            <Image style={ styles.profileImage } source={{uri: props.picture.large}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardContent}>
                                    {`You have accepted ${props.name.first} ${props.name.last}'s friend request.`}
                                </Text>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            )
        } else if(props.cardType === "eventShare") {
            return (
                <Swipeable
                    onRef={ref => this.swipeable = ref}
                    leftActionActivationDistance = {250}
                    onLeftActionActivate={deleteCard.bind(this, _.findIndex(this.cardInfo, props))}
                    leftContent={<Text> </Text>}>

                    <Card styles={{card: {backgroundColor: '#00aad1', opacity: 0.8}}}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 20,
                            marginTop: 20,
                            marginRight: 30
                        }}>
                            <Image style={ styles.friendRequestImage} source={{uri: props.picture.large}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardContent}>{`${props.name.first} ${props.name.last} `}
                                    has invited you to join {props.eventName}!</Text>
                                <View style={{flexDirection: 'row', paddingTop: 20, paddingBottom: 10}}>
                                    <Button
                                        style={styles.buttonAccept}
                                        onPress={acceptInvitation.bind(this, _.findIndex(this.cardInfo, props))}>
                                        Accept
                                    </Button>
                                    <Button
                                        style={styles.buttonReject}
                                        onPress={rejectInvitation.bind(this, _.findIndex(this.cardInfo, props))}>
                                        Reject
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            )
        }
        return null;
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={this.renderCards.bind(this)}>
            </ListView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        width: undefined,
        height: undefined,
    },
    profileImage: {
        flexDirection: 'column',
        marginRight: 10,
        marginLeft: 15,
        height: 50,
        width: 50,
        borderRadius: 25,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        borderWidth: 2,
        borderColor: 'white'
    },

    friendRequestImage: {
        flexDirection: 'column',
        marginRight: 10,
        marginLeft: 15,
        marginTop: 17,
        height: 50,
        width: 50,
        borderRadius: 25,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        borderWidth: 2,
        borderColor: 'white'
    },

    cardContent: {
        fontFamily: 'Bangla Sangam MN',
        fontSize: 17,
        marginRight: 45,
        marginLeft: 26,
        color: 'white'
    },

    cardTitle: {
        fontSize: 15,
        backgroundColor: 'transparent',
        fontFamily: 'Bangla Sangam MN',
        fontWeight: 'bold'
    },
    buttonAccept: {
        marginHorizontal: 30,
        fontFamily: 'Bangla Sangam MN',
        color: 'white'
    },

    buttonReject: {
        marginHorizontal: 30,
        fontFamily: 'Bangla Sangam MN',
        color: '#FF5252'
    },

});

module.exports = Notifications;
