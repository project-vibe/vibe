import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native'
// icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from "firebase";

export default class UserPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriend: 'false'
        };
    }

    componentDidMount() {
        this.checkUser(this.props.data.UserInfo.Email);
    }

    getButton(friendEmail) {
        if(this.state.addFriend === 'false') {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setState({addFriend: 'true'});
                        this.addFriend(friendEmail);
                        }
                    }>
                    <View style={{width: '67%', backgroundColor: 'transparent', borderWidth: 1, borderColor: '#0A81D1', borderRadius: 50, marginTop: 15, marginLeft: 5, alignItems: 'center'}}>
                        <Icon name="account-plus" size={24} color='#0A81D1' backgroundColor= 'transparent' style={{paddingRight: 3, paddingTop: 5}}/>
                    </View>

                </TouchableWithoutFeedback>
            )
        } else {
            //add friend
            this.addFriend(friendEmail);
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setState({addFriend: 'false'});
                        this.removeFriend(friendEmail);
                        }
                    }>
                    <View style={{width: '67%', backgroundColor: '#0A81D1', borderWidth: 1, borderColor: '#0A81D1', borderRadius: 20, marginTop: 15, marginLeft: 5, alignItems: 'center'}}>
                        <Icon name="account-plus" size={24} color='white' backgroundColor= '#0A81D1' style={{paddingRight: 3, paddingTop: 5}}/>
                    </View>

                </TouchableWithoutFeedback>
            )
        }
    }

    async checkUser(email) {

        let userEmail = firebase.auth().currentUser.email;
        let friendId = "";
        let userId = "";

        // get id for friend
        for (let i = 0; i < email.length; i++) {
            if (email.charAt(i) === '@' || email.charAt(i) === '.') {
            } else {
                friendId += email.charAt(i).toLowerCase();
            }
        }

        // get id for current user
        for (let i = 0; i < userEmail.length; i++) {
            if (userEmail.charAt(i) === '@' || userEmail.charAt(i) === '.') {
            } else {
                userId += userEmail.charAt(i).toLowerCase();
            }
        }

        let self = this;
        let friendSettingsPath = "/user/" + friendId;
        let userSettingsPath = "/user/" + userId + "/Friends/OutgoingRequests";
        let acceptedFriendsPath = "/user/" + userId + "/Friends/AcceptedFriends";

        var leadsRef = firebase.database().ref(userSettingsPath);
        var acceptedFriendsRef = firebase.database().ref(acceptedFriendsPath);
        await leadsRef.once('value', function (snapshot) {
            if (snapshot.hasChild(friendId)) {
                self.setState({addFriend: 'true'});
            }
        });
        await acceptedFriendsRef.once('value', function (snapshot) {
            if (snapshot.hasChild(friendId)) {
                self.setState({addFriend: 'true'});
            }
        });

        //firebase.database().ref(friendSettingsPath).child('Friends').child('AcceptedFriends').set({[friendId]: email});
        //firebase.database().ref(friendSettingsPath).child('Friends').child('IncomingRequests').child(userId).set({userId: userId, email: userEmail});
        //firebase.database().ref(userSettingsPath).child('Friends').child('OutgoingRequests').child(friendId).set({userId: friendId, email: email});
    }

    addFriend(email) {
        //check if data exists
        let userEmail = firebase.auth().currentUser.email;
        let friendId = "";
        let userId = "";

        // get id for friend
        for (let i = 0; i < email.length; i++) {
            if (email.charAt(i) === '@' || email.charAt(i) === '.') {
            } else {
                friendId += email.charAt(i).toLowerCase();
            }
        }

        // get id for current user
        for (let i = 0; i < userEmail.length; i++) {
            if (userEmail.charAt(i) === '@' || userEmail.charAt(i) === '.') {
            } else {
                userId += userEmail.charAt(i).toLowerCase();
            }
        }

        let friendSettingsPath = "/user/" + friendId;
        let userSettingsPath = "/user/" + userId;

        //firebase.database().ref(userSettingsPath).child('Friends').child('AcceptedFriends').child(friendId).set({"id": friendId});
        //just need next two lines but testing rn
        firebase.database().ref(friendSettingsPath).child('Friends').child('IncomingRequests').child(userId).set({userId: userId, email: userEmail});
        firebase.database().ref(userSettingsPath).child('Friends').child('OutgoingRequests').child(friendId).set({userId: friendId, email: email});

    }

    removeFriend(email) {
        let userEmail = firebase.auth().currentUser.email;
        let friendId = "";
        let userId = "";

        // get id for friend
        for (let i = 0; i < email.length; i++) {
            if (email.charAt(i) === '@' || email.charAt(i) === '.') {
            } else {
                friendId += email.charAt(i).toLowerCase();
            }
        }

        // get id for current user
        for (let i = 0; i < userEmail.length; i++) {
            if (userEmail.charAt(i) === '@' || userEmail.charAt(i) === '.') {
            } else {
                userId += userEmail.charAt(i).toLowerCase();
            }
        }

        let friendSettingsPath = "/user/" + friendId;
        let userSettingsPath = "/user/" + userId;

        /*firebase.database().ref(friendSettingsPath).child('Friends').child('AcceptedFriends').remove({[userId]: userEmail});
        firebase.database().ref(userSettingsPath).child('Friends').child('AcceptedFriends').remove({[friendId]: email});
        firebase.database().ref(userSettingsPath).child('Friends').child('OutgoingRequests').remove({[friendId]: email});
        firebase.database().ref(friendSettingsPath).child('Friends').child('IncomingRequests').remove({[userId]: userEmail});*/

        firebase.database().ref(friendSettingsPath).child('Friends').child('AcceptedFriends').child(userId).remove();
        firebase.database().ref(userSettingsPath).child('Friends').child('AcceptedFriends').child(friendId).remove();
        firebase.database().ref(userSettingsPath).child('Friends').child('OutgoingRequests').child(friendId).remove();
        firebase.database().ref(friendSettingsPath).child('Friends').child('IncomingRequests').child(userId).remove();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', paddingBottom: 20}}>
                    <View style={{paddingLeft: 10, width: '20%'}}>
                        <Image style={ styles.image } source={{ uri: this.props.data.UserInfo.PhotoUrl }} />
                    </View>
                    <View style={{width: '60%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.username}>{this.props.data.UserInfo.FirstName} </Text>
                            <Text style={styles.userlastname}>{this.props.data.UserInfo.LastName} </Text>
                        </View>
                        <Text style={styles.email}>{this.props.data.UserInfo.Email }</Text>
                    </View>
                    <View style={{width: '20%'}}>
                        {this.getButton(this.props.data.UserInfo.Email)}
                    </View>
                </View>
                <View style={{width: '100%', height: 0.5, backgroundColor: 'rgb(231,235,236)' }} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(245,247,247)',
        paddingTop: 20,
    },
    image: {
        height:60,
        width: 60,
        borderRadius: 30,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
    },
    username: {
        fontWeight: '600',
        borderRadius: 2,
        fontFamily: 'Bangla Sangam MN',
        fontSize: 15,
        color: 'black',
        paddingTop: 10,
        paddingLeft: 10
    },
    userlastname: {
        fontWeight: '600',
        borderRadius: 2,
        fontFamily: 'Bangla Sangam MN',
        fontSize: 15,
        color: 'black',
        paddingTop: 10
    },
    email: {
        fontWeight: '600',
        borderRadius: 2,
        fontFamily: 'Bangla Sangam MN',
        fontSize: 12,
        color: 'grey',
        paddingLeft: 10
    }
});

module.exports = UserPreview;