'use strict'
import React, {
    Component,
} from 'react'

import {
    StyleSheet,
    View,
    StatusBar,
    Platform,
    Text,
    Image,
    TouchableWithoutFeedback,
    TabBarIOS
} from 'react-native';

// Algolia Instantsearch
import AlgoliaDropdown from '../anm/AlgoliaDropdown';
import UserPreview from './UserPreview';

// contacts list
var AlphabetListView = require('react-native-alphabetlistview');

// icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

var BackPage = require('./userHome.IOS.js');
var SelectFriendDM = require('./DirectMessaging/SelectFriend.IOS');

class Cell extends Component {
    state = {
        favStatus: 'true',
        friendshipStatus: 'true'
    };
    getProfilePicture(item) {
        return <Image style={ styles.profilePic } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
    }

    // get user's location from Firebase from userid
    getUserLocation(item) {
        return (
            <View style={{flexDirection: 'row'}}>
                <Icon name="map-marker" size={14} color='rgb(143,153,163)' backgroundColor= 'transparent' style={{paddingRight: 3, paddingTop: 2}}/>
                <Text style={styles.locationText}>Cupertino, CA</Text>
            </View>
        )
    }

    // get user's name from Firebase from userid
    getUsername (item) {
        return <Text style={styles.textStyle}>{item}</Text>
    }

    // friend/unfriend button
    getStatus (item) {
        if(this.state.friendshipStatus === 'true') {
            return (
                <TouchableWithoutFeedback
                    onPress={() =>
                        this.setState({friendshipStatus: 'false'})
                    }>
                    <View style={{height: '50%', width: '67%',  backgroundColor: '#0A81D1', borderRadius: 2, marginTop: 15, marginLeft: 5}}>
                        <Text style={{ color: 'white', fontWeight: '600', borderRadius: 2, fontFamily: 'Bangla Sangam MN', textAlign:'center', paddingTop: 5, fontSize: 12}}>Friends</Text>
                    </View>

                </TouchableWithoutFeedback>
            )
        } else if(this.state.friendshipStatus === 'waiting') {
            return (
                <TouchableWithoutFeedback
                    onPress={() =>
                        this.setState({friendshipStatus: 'waiting'})
                    }>
                    <View style={{backgroundColor: 'white', height: '50%', width: '67%', borderRadius: 2, borderWidth: 1,  borderColor: '#0A81D1', marginTop: 15, marginLeft: 5}}>
                        <Text style={{ color: '#0A81D1', fontWeight: '600', borderRadius: 2, fontFamily: 'Bangla Sangam MN', textAlign:'center', paddingTop: 5, fontSize: 12}}>Request Sent</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <TouchableWithoutFeedback
                    onPress={() =>
                        this.setState({friendshipStatus: 'waiting'})
                    }>
                    <View style={{backgroundColor: 'white', height: '50%', width: '67%', borderRadius: 2, borderWidth: 1,  borderColor: '#0A81D1', marginTop: 15, marginLeft: 5}}>
                        <Text style={{ color: '#0A81D1', fontWeight: '600', borderRadius: 2, fontFamily: 'Bangla Sangam MN', textAlign:'center', paddingTop: 5, fontSize: 12}}>Send Request</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    // fav/nonfav button
    getFav (item) {
        if(this.state.favStatus === 'true') {
            return (
                <TouchableWithoutFeedback
                    style={{ height: '60%', width: '100%',flexDirection: 'row' }}
                    onPress={() =>
                        this.setState({favStatus: 'false'})
                    }>
                    <View style={{width: '100%', height: '100%',  marginTop: 20, marginLeft: 12}}>
                        <Icon name="star" size={24} color="rgb(78, 176, 232)" backgroundColor= 'transparent'/>
                    </View>

                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <TouchableWithoutFeedback
                    style={{ height: '60%', width: '100%'}}
                    onPress={() =>
                        this.setState({favStatus: 'true'})
                    }>
                    <View style={{width: '100%', height: '100%', marginTop: 20, marginLeft: 12}}>
                        <Icon name="star-outline" size={24} color="rgb(78, 176, 232)" backgroundColor= 'transparent'/>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    render() {
        return (
            <View style={styles.itemStyle}>
                <View style={{width: '10%', height: '100%'}}>
                    {this.getFav(this.props.item)}
                </View>
                <View style={{width: '15%', height: '100%'}}>
                    {this.getProfilePicture(this.props.item)}
                </View>
                <View style={{width: '40%', height: '100%'}}>
                    {this.getUsername(this.props.item)}
                    {this.getUserLocation(this.props.item)}
                </View>
                <View style={{width: '35%', height: '100%'}}>
                    {this.getStatus(this.props.item)}
                </View>
            </View>
        );
    }
}

class SectionItem extends Component {
    render() {
        var titleStyle = {
            fontWeight: 'bold',
            fontFamily: 'Bangla Sangam MN',
            color:'rgb(89,97,111)',
            paddingBottom: 4.5,
            fontSize: 10
        };

        return (
            <Text style={titleStyle}>{this.props.title}</Text>
        );
    }
}

class SectionHeader extends Component {
    render() {
        // inline styles used for brevity, use a stylesheet when possible
        var textStyle = {
            textAlign:'left',
            color:'rgb(89,97,111)',
            fontWeight: 'bold',
            fontFamily: 'Bangla Sangam MN',
            fontSize: 16,
            paddingLeft: 20,
        };

        var viewStyle = {
            backgroundColor: 'rgb(254,254,254)',
        };
        return (
            <View style={viewStyle}>
                <Text style={textStyle}>{this.props.title}</Text>
            </View>
        );
    }
}

class addFriendsScreen extends Component {

    constructor(props) {
        super(props);
        this.backButtonListener = this.backButtonListener.bind(this);
        this.goToDM = this.goToDM.bind(this);

        // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.state = {
        //     dataSource: ds.cloneWithRows(data),
        // };
    }

    state = {
        filterWidth: 100,
        // user ids
        data: {
            A: ['John Agnew','Joshua Allison', 'Abhay Varshney'],
            B: ['some','entries','are here'],
            C: ['some','entries','are here'],
            D: ['some','entries','are here'],
            E: ['some','entries','are here'],
            F: ['some','entries','are here'],
            G: ['some','entries','are here'],
            H: ['some','entries','are here'],
            I: ['some','entries','are here'],
            J: ['some','entries','are here'],
            K: ['some','entries','are here'],
            L: ['some','entries','are here'],
            M: ['some','entries','are here'],
            N: ['some','entries','are here'],
            O: ['some','entries','are here'],
            P: ['some','entries','are here'],
            Q: ['some','entries','are here'],
            R: ['some','entries','are here'],
            S: ['some','entries','are here'],
            T: ['some','entries','are here'],
            U: ['some','entries','are here'],
            V: ['some','entries','are here'],
            W: ['some','entries','are here'],
            X: ['some','entries','are here'],
            Y: ['some','entries','are here'],
            Z: ['some','entries','are here'],
        },
        selectedTab: 'blueTab'
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />

                <View style={{flex: 1, paddingTop: 20}}>
                    <AlgoliaDropdown
                        appID="G3REXGMTZM"
                        style={{backgroundColor: 'white', paddingTop: Platform.OS === 'ios' ? 5 : 0, paddingBottom: 5}}
                        footerHeight={64}
                        apiKey="6b62c4d4aef895d0b0242d2e5a2b273c"
                        backButtonListener = {this.backButtonListener}
                        goToDM = {this.goToDM}
                    >
                        <UserPreview
                            index='contacts'
                            title='Friends'
                            params={{hitsPerPage: 10}}
                            onToProfile={(userId) => alert("user: " + userId)}
                            small={true} />
                    </AlgoliaDropdown>

                    <View style={{width: '100%', height: 0.7, backgroundColor: 'rgb(231,235,236)' }} />

                    <TabBarIOS tintColor="#0A81D1">
                        <TabBarIOS.Item
                            title="Blue Tab"
                            systemIcon = "contacts"
                            selected={this.state.selectedTab === 'blueTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'blueTab'
                                });
                            }}
                        >
                            <View style={{height: '93%'}}>
                                <AlphabetListView
                                    data={this.state.data}
                                    cell={Cell}
                                    cellHeight={61}
                                    sectionListItem={SectionItem}
                                    sectionHeader={SectionHeader}
                                    sectionHeaderHeight={22.5}
                                    automaticallyAdjustContentInsets={false}
                                    style={{paddingTop: 10, backgroundColor: 'rgb(254,254,254)'}}
                                />
                            </View>


                        </TabBarIOS.Item>

                        <TabBarIOS.Item
                            title="Red Tab"
                            systemIcon="favorites"
                            selected={this.state.selectedTab === 'redTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'redTab'
                                });
                            }}
                        >
                            <View style={{flex: 1}}>
                                <Text> hello </Text>
                            </View>
                        </TabBarIOS.Item>
                    </TabBarIOS>
                </View>
            </View>
        )
    }

    backButtonListener() {
        this.props.navigator.pop({
            title: 'BackPage',
            component: BackPage,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }

    goToDM() {
        this.props.navigator.push({
            title: 'SelectFriendDM',
            component: SelectFriendDM,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },

    listViewContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    listViewStyle: {
        flex: 1
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },


    itemStyle: {
        height: 60,
        backgroundColor: 'rgb(254,254,254)',
        flexDirection: 'row'
    },

    textStyle: {
        fontWeight: 'bold',
        fontFamily: 'Bangla Sangam MN',
        color:'rgb(45,46,46)',
        fontSize: 16,
        paddingTop: 10,
        paddingLeft: 1
    },

    locationText: {
        fontWeight: '600',
        fontFamily: 'Bangla Sangam MN',
        color:'rgb(143,153,163)',
        fontSize: 12,
    },

    profilePic: {
        height:40,
        width: 40,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        marginLeft: 10,
        marginTop: 12
    }
});

module.exports = addFriendsScreen;