import React, { Component } from 'react'
import { Text, View, Image, StyleSheet} from 'react-native'

export default class UserPreview extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.data.UserInfo.FirstName} </Text>
                <Text>{this.props.data.UserInfo.Email }</Text>
                <Image style={ styles.image } source={{ uri: this.props.data.UserInfo.photoUrl }} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F3F3'
    },
    image: {
        height:100,
        width: 100,
        borderRadius: 50,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        borderWidth: 2,
        borderColor: 'white'
    },
});

module.exports = UserPreview;