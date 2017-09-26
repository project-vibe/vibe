import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/EvilIcons';

var UserHome = require('../userHome.IOS.js');

/** DROPDOWN CREATE EVENT SQUARE **/


class NewActivity extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Event Name', description: 'Description'}
    }

    getName() {
        return <Text style={styles.nameStyle}> Abhay Varshney </Text>
    }

    openCalendar() {
        alert('open calender');
    }

    /**  {this.props.eventType} **/
    render () {
        const titleConfig = (
            <View style={{paddingBottom: 5}}>
                <Text style={{fontSize: 18, fontWeight: '400', color: 'rgb(83,83,83)'}}> NEW EVENT</Text>
            </View>
        );

        const backButtonConfig = (
            <Icon.Button onPress={() => this.backButtonListener()} name="chevron-left" size={35} style={{paddingBottom: 5}} color="rgb(135,135,135)" backgroundColor="transparent"> </Icon.Button>
        );

        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    title={titleConfig}
                    leftButton={backButtonConfig}
                    tintColor={'rgb(255,255,255)'}
                    style={styles.navbarStyle}
                />


                <View style={{width: '100%', height: '28%', backgroundColor: 'rgb(251,251,251)', flexDirection: 'row'}}>
                    <View style={{width: '38%', height: '100%', backgroundColor: 'rgb(251,251,251)', paddingLeft: 10, paddingTop: 30}}>
                        <View style={styles.picture}>
                            <Image style={{height: 50, width: 50}} source={require('../../img/camera.png')}  />
                        </View>
                    </View>

                    <View style={{width: '62%', height: '100%'}}>
                        <View style={{width: '100%', height: '30%', marginTop: 30, marginLeft: 5, flexDirection: 'row'}}>
                            <Text style={{fontSize: 18, fontWeight: '600', color: 'rgb(83,83,83)'}}> Group: </Text>
                            <Text style={{fontSize: 18, fontWeight: '300', color: 'rgb(83,83,83)', paddingLeft: -5}}> {this.props.eventType}</Text>
                        </View>
                        <View style={{width: '90%', height: '30%', marginTop: -35, marginLeft: 9}}>
                            <TextInput
                                style={{height: 40, color: '#7f8c8d', fontWeight: '900', fontSize: 20}}
                                onChangeText={(text) => this.setState({text})}
                                placeholder="Event Name"
                                value={this.state.eventName}
                            />
                        </View>
                        <View style={{width: '90%', height: '50%', marginTop: -15, marginLeft: 9, backgroundColor: 'red'}}>
                            <TextInput
                                style={{height: 40, color: '#bdc3c7', fontWeight: '600', fontSize: 16}}
                                onChangeText={(text) => this.setState({text})}
                                multiline = {true}
                                numberOfLines = {8}
                                placeholder="Description (optional)"
                                value={this.state.eventDescription}
                            />
                        </View>
                    </View>
                </View>

                {/*<View style={{borderBottomWidth: 0.4, borderBottomColor: '#eeeeee', flexDirection: 'row', width: '100%', height: '10%', backgroundColor: 'red'}}>*/}

                    {/*<Image style={ styles.profilePicture } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />*/}
                    {/*<View style={{paddingTop: 20, paddingLeft: 10}}>*/}
                        {/*{this.getName()}*/}
                    {/*</View>*/}
                    {/*{calendar}*/}

                {/*</View>*/}
            </View>
        )

    }

    // switch screens
    backButtonListener() {
        this.props.navigator.pop({
            title: 'UserHome',
            component: UserHome,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }
}

const styles = StyleSheet.create({
    profilePicture: {
        marginTop: 10,
        marginLeft: 20,
        height:35,
        width: 35,
        borderRadius: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10
    },
    nameStyle: {
        fontWeight: 'bold'
    },
    navbarStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgb(230,230,230)',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10
    },
    picture: {
        height:110,
        width: 110,
        backgroundColor: 'rgb(226,226,226)',
        borderRadius: 55,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        marginLeft: 7,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});


module.exports = NewActivity;