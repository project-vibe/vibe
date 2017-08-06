'use strict';
import React, {Component} from 'react';
import * as firebase from "firebase";
import {
    View,
    StyleSheet,
    StatusBar,
    Image,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    ListView,
    Text,
    ScrollView
} from 'react-native';
import Button from 'react-native-button';
import {
    Card,
    CardImage,
    CardTitle,
    CardContent,
    CardAction,
} from 'react-native-card-view';

import Swipeable from 'react-native-swipeable';
const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
    <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
    <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
];

var cardInfo = require('./cardInfo');
var arrayPosition = -1;     //keeps track of the indices for each card

//takes the index of the card, deletes it from cardInfo, and re-renders the listview
function deleteCard(index) {
    delete this.cardInfo[index];
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.cardInfo)
    })

}

/*takes attributes of card and pushes it as an entry to cardInfo, then re-renders the listview,
 see the accept button onPress on the friendRequest for how to use(ln. 124) */
function addCard(cardType, firstName, lastName, profileURL, eventName) {
    cardInfo.push(
        {
            "cardType": cardType,
            "name": {
                "first": firstName,
                "last": lastName,
            },

            "eventName": eventName, //NOTE: leave eventName as null if the card type doesn't use it(ex. friendRequest)

            "picture": {
                "large": profileURL,
            },
        },
    );

    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.cardInfo)
    })

}


class UserMessages extends Component {

    constructor() {
        super();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.cardInfo = require('./cardInfo');
        this.state = {
            dataSource: ds.cloneWithRows(this.cardInfo),
        };

    }

    pullData() {
        let userSettingsPath = "/user/" + this.props.userId + "/UserInfo";
        alert("path " + userSettingsPath);
        var leadsRef = firebase.database().ref(userSettingsPath);
        leadsRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                alert(childData);
            });
        });
    }


    renderCards(props) {
        if (props.cardType == "friendRequest") {
            arrayPosition++;
            return (
                <Swipeable
                    onRef={ref => this.swipeable = ref}
                    leftActionActivationDistance = {250}
                    onLeftActionActivate={deleteCard.bind(this, arrayPosition)}
                    leftContent={leftContent}>


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
                                <View style={{flexDirection: 'row', paddingTop: 20}}>
                                    <Button
                                        style={styles.buttonAccept}
                                        onPress={addCard.bind(this, "friendRequest", "Shanequa", "Wilkins", "https://randomuser.me/api/portraits/women/83.jpg", null)}>
                                        Accept
                                    </Button>
                                    <Button
                                        style={styles.buttonReject}
                                        onPress={() => {
                                        }}>
                                        Reject
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            )
        }
        else if (props.cardType == "eventJoin") {
            arrayPosition++;
            return (
                <Swipeable
                    onRef={ref => this.swipeable = ref}
                    leftActionActivationDistance = {250}
                    onLeftActionActivate={deleteCard.bind(this, arrayPosition)}
                    leftContent={leftContent}>
                    <Card styles={{card: {backgroundColor: '#00aad1', opacity: 0.8}}}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 10,
                            marginTop: 20,
                            marginRight: 30
                        }}>

                            <Image style={ styles.profileImage } source={{uri: props.picture.large}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardContent}>{`${props.name.first} ${props.name.last} `}
                                    has joined {props.eventName}!</Text>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            )
        }
        else if (props.cardType == "friendRequestAccepted") {
            arrayPosition++;
            return (
                <Swipeable
                    onRef={ref => this.swipeable = ref}
                    leftActionActivationDistance = {250}
                    onLeftActionActivate={deleteCard.bind(this, arrayPosition)}
                    leftContent={leftContent}>
                    <Card styles={{card: {backgroundColor: '#00aad1', opacity: 0.8}}}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 10,
                            marginTop: 20,
                            marginRight: 30
                        }}>

                            <Image style={ styles.profileImage } source={{uri: props.picture.large}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardContent}>{`${props.name.first} ${props.name.last} `}
                                    has accepted your friend request!</Text>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            )
        }
        else if (props.cardType == "eventShare") {
            arrayPosition++;
            return (
                <Swipeable
                    onRef={ref => this.swipeable = ref}
                    leftActionActivationDistance = {250}
                    onLeftActionActivate={deleteCard.bind(this, arrayPosition)}
                    leftContent={leftContent}>
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
                                    has invited you to join {props.eventName}!</Text>
                                <View style={{flexDirection: 'row', paddingTop: 20}}>
                                    <Button
                                        style={styles.buttonAccept}
                                        onPress={() => {
                                        }}>
                                        Accept
                                    </Button>
                                    <Button
                                        style={styles.buttonReject}
                                        onPress={() => {
                                        }}>
                                        Reject
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            );
        }
        return null;
    }

    render() {
        return (
            <Image source={require('../img/ciudad.jpg')} style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={this.renderCards.bind(this)}>
                </ListView>
            </Image>
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
        fontFamily: 'Noteworthy',
        fontSize: 17,
        marginRight: 45,
        marginLeft: 26,
        color: 'white'
    },

    cardTitle: {
        fontSize: 15,
        backgroundColor: 'transparent',
        fontFamily: 'Noteworthy',
        fontWeight: 'bold'
    },
    buttonAccept: {
        marginHorizontal: 30,
        fontFamily: 'Noteworthy',
        color: 'white'
    },

    buttonReject: {
        marginHorizontal: 30,
        fontFamily: 'Noteworthy',
        color: '#FF5252'
    },

});

module.exports = UserMessages;