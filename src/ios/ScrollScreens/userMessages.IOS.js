import React, {Component} from 'react';
import * as firebase from "firebase";
import {
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TouchableHighlight,
    ListView,
    Text,
    Alert,
    Image,
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


export default class UserMessages extends Component {

    constructor() {
        super();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(cardInfo),
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
        //see cardInfo for how the data blob's organized
        if (props.cardType == "friendRequest")
            return (
                <Swipeable
                    leftContent={leftContent}>
                    <Card styles={styles.card}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 10,
                            marginTop: 20,
                            marginRight: 30
                        }}>

                            <Image style={ styles.image } source={{uri: props.picture.large}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardContent}>{`${props.name.first} ${props.name.last} `}
                                    has requested to add you!</Text>
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
            )
        if (props.cardType == "eventJoin")
            return (
                <Swipeable leftContent={leftContent}>
                    <Card styles={styles.card}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 10,
                            marginTop: 20,
                            marginRight: 30
                        }}>

                            <Image style={ styles.image } source={{uri: props.picture.large}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardContent}>{`${props.name.first} ${props.name.last} `}
                                    has joined {props.eventName}!</Text>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            )
        if (props.cardType == "friendRequestAccepted")
            return (
                <Swipeable leftContent={leftContent}>
                    <Card styles={styles.card}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 10,
                            marginTop: 20,
                            marginRight: 30
                        }}>

                            <Image style={ styles.image } source={{uri: props.picture.large}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.cardContent}>{`${props.name.first} ${props.name.last} `}
                                    has accepted your friend request!</Text>
                            </View>
                        </View>
                    </Card>
                </Swipeable>
            )
        if (props.cardType == "eventShare")
            return (
                <Swipeable leftContent={leftContent}>
                    <Card styles={styles.card}>
                        <View style={{
                            width: 325,
                            flexDirection: 'row',
                            marginBottom: 10,
                            marginTop: 20,
                            marginRight: 30
                        }}>

                            <Image style={ styles.image } source={{uri: props.picture.large}}/>
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
            )
        return null;
    }

    _swipeAction() {
        alert("Swiped")
    }

    render() {
        //swipeAction: () => this.setState({swipeAction})

        return (
            <View style={styles.page}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderCards.bind(cardInfo)}>
                </ListView>
            </View>

        );
    }
}

const styles = StyleSheet.create({

    page: {
        flex: 1,
        backgroundColor: '#E8E8EE'
    },

    image: {
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
        borderColor: '#0A81D1'
    },

    card: {
        flex: 1,
        width: 350,
        height: 320
    },

    cardContent: {
        fontFamily: 'Noteworthy',
        fontSize: 17,
        marginRight: 45,
        marginLeft: 26
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
        color: 'green'
    },

    buttonReject: {
        marginHorizontal: 30,
        fontFamily: 'Noteworthy',
        color: 'red'
    },

});

module.exports = UserMessages;