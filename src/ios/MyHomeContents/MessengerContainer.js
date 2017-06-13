import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { GiftedChat } from '../anm/react-native-gifted-chat';
const firebase = require("firebase");
import md5 from './MessengerContents/md5.js'

import { Styles } from './MessengerContents/Shared';


// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyD-AigGdzjuSbv_He5GX-NlMqlSk582gNw",
//     authDomain: "vibe-backend.firebaseio.com",
//     databaseURL: "https://vibe-backend.firebaseio.com/",
//     messagingSenderId: "869137446385"
// };
// firebase.initializeApp(config);

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        this.user = firebase.auth().currentUser;
        // this.friend = this.props.friend;
        this.friend =  this.getRef().child('friends');



        this.chatRef = this.getRef().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order');
        this.onSend = this.onSend.bind(this);

    }

    generateChatId() {
        if(this.user.uid > this.friend.uid)
            return `${this.user.uid}-${this.friend.uid}`;
        else
            return `${this.friend.uid}-${this.user.uid}`;
    }

    static route = {
        navigationBar: {
            title: 'Chat',
            ... Styles.NavBarStyles
        }
    }

    getRef() {
        return firebase.database().ref();
    }

    listenForItems(chatRef) {
        chatRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                var avatar = 'https://www.gravatar.com/avatar/' + ( child.val().uid == this.user.uid? md5(this.user.email) : md5(this.friend.email))
                var name = child.val().uid == this.user.uid? this.user.name: this.friend.name
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        _id: child.val().uid,
                        avatar: avatar
                    }
                });
            });

            this.setState({
                loading: false,
                messages: items
            })


        });
    }

    componentDidMount() {
        this.listenForItems(this.chatRefData);
    }

    componentWillUnmount() {
        this.chatRefData.off()
    }

    onSend(messages = []) {

        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });
        messages.forEach(message => {
            var now = new Date().getTime()
            this.chatRef.push({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: this.user.uid,
                order: -1 * now
            })
        })

    }
    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend.bind(this)}
                    user={{
                        _id: this.user.uid,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'stretch',
        marginRight: 10,
        marginLeft: 10
    }
});