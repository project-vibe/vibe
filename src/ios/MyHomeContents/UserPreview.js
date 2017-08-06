import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native'
// icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class UserPreview extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        addFriend: 'true'
    };

    getButton() {
        if(this.state.addFriend === 'true') {
            return (
                <TouchableWithoutFeedback
                    onPress={() =>
                        this.setState({addFriend: 'false'})
                    }>
                    <View style={{width: '67%', backgroundColor: 'transparent', borderWidth: 1, borderColor: '#0A81D1', borderRadius: 50, marginTop: 15, marginLeft: 5, alignItems: 'center'}}>
                        <Icon name="account-plus" size={24} color='#0A81D1' backgroundColor= 'transparent' style={{paddingRight: 3, paddingTop: 5}}/>
                    </View>

                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <TouchableWithoutFeedback
                    onPress={() =>
                        this.setState({addFriend: 'true'})
                    }>
                    <View style={{width: '67%', backgroundColor: '#0A81D1', borderWidth: 1, borderColor: '#0A81D1', borderRadius: 20, marginTop: 15, marginLeft: 5, alignItems: 'center'}}>
                        <Icon name="account-plus" size={24} color='white' backgroundColor= '#0A81D1' style={{paddingRight: 3, paddingTop: 5}}/>
                    </View>

                </TouchableWithoutFeedback>
            )
        }
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
                        {this.getButton()}
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