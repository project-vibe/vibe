'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Animated, TouchableHighlight, SegmentedControlIOS, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import NavigationBar from 'react-native-navbar';
import * as firebase from "firebase";
import * as Animatable from 'react-native-animatable';

/** Extra COMPONENTS **/
import Modal from '../anm/react-native-simple-modal-1/index';
import ModalRegular from '../anm/react-native-simple-modal-1/regular/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Geocoder from 'react-native-geocoder';

/** SCROLL SCREENS **/
import HomeEvents from '../ScrollScreens/homeEventList.IOS.js';
import CreateEvents from '../ScrollScreens/createEvents.IOS.js';
import UserMessages from '../ScrollScreens/notifications.IOS.js';

/** ICONS FOR CREATING EVENT **/
import icon1 from '../img/icons/beach.png';
import icon2 from '../img/icons/coffee.png';
import icon3 from '../img/icons/fav.png';
import icon4 from '../img/icons/library.png';
import icon5 from '../img/icons/math.png';
import icon6 from '../img/icons/movie.png';
import icon7 from '../img/icons/sports.png';
import icon8 from '../img/icons/restaurant.png';
import icon9 from '../img/icons/other.png';

/** NAVIGATION **/
var UserSettingsScreen = require('./userSettings.IOS.js');
var AddFriendsScreen = require('./addFriends.IOS.js');
var VibeMapsScreen = require('./maps.IOS.js');
var UserEventInfo = require('./CreateEventsContents/userEventInfo.IOS');
var NewActivity = require('./QuickAdd/newActivity.IOS');

/** SCROLLER **/
var screen = require('Dimensions').get('window');
var PageControl = require('react-native-page-control');

/** MESSENGER **/
import MessengerContainer from './MessengerContainer';

export default class UserHome extends Component {

    constructor(props) {
        super(props);
        this.openFriendsModal = this.openFriendsModal.bind(this);
        this.openUsersModal = this.openUsersModal.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.onItemTap = this.onItemTap.bind(this);

        this.userEventsInfo = this.userEventsInfo.bind(this);
    };

    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);
    }

    openFriendsModal(text) {
        this.setState({
            openFriendModal: true,
            userModalTitle: text
        })
    }

    openUsersModal(e) {
        this.setState({
            openUserModal: true
        })
    }

    userEventsInfo(rowDataTitle) {
        this.props.navigator.push({
            title: 'UserEventInfo',
            component: UserEventInfo,
            navigationBarHidden: true,
            passProps: {myElement: 'text', eventTitle: rowDataTitle}
        });
    }

    state = {
        index: 1,
        routes: [
            /* Messages, Home, Events */
            { key: '1', val: 0, icon: 'account-box' },
            { key: '2', val: 1, icon: 'home' },
            { key: '3', val: 2, icon: 'format-list-bulleted'}
        ],
        openFriendModal: false,
        openUserModal: false,
        userModalTitle: '',
        currentPage: 0,
        selectedIndex: 1,
    };
    _getDataNewer = () => {
        let userSettingsPath = "/user/" + this.props.userId + "/UserInfo";
        var counter = 0;
        var childData = "";
        var photo = "";
        var phoneNumber = "";
        var firstName = "FirstNameDefault";
        var lastName = "LastNameDefault";
        var leadsRef = firebase.database().ref(userSettingsPath);

        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childData = childSnapshot.val();
                counter++;
                if(counter===2)
                    firstName = childData;
                if(counter===3)
                    lastName = childData;
                if(counter===6)
                    phoneNumber = childData;
                if(counter===7)
                    photo = childData;

            });
        });

        this.state.firstName = firstName;
        this.state.lastName = lastName;
        this.state.photo = photo;
        this.state.phoneNumber = phoneNumber;
        return photo;
    };

    _getDataNew = () => {
        let userSettingsPath = "/user/" + this.props.userId + "/UserInfo";
        var counter = 0;
        var childData = "";
        var photo = "";
        var phoneNumber = "";
        var firstName = "FirstNameDefault";
        var lastName = "LastNameDefault";
        var leadsRef = firebase.database().ref(userSettingsPath);

        leadsRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childData = childSnapshot.val();
                counter++;
                if (counter === 2)
                    firstName = childData;
                if (counter === 3)
                    lastName = childData;
                if (counter === 6)
                    phoneNumber = childData;
                if (counter === 7)
                    photo = childData;

            });
        });

        this.state.firstName = firstName;
        this.state.lastName = lastName;
        this.state.photo = photo;
        this.state.phoneNumber = phoneNumber;
        return <Text> {firstName + " " +lastName} </Text>
    };

    _handleChangeTab = index => {
        //alert("before" + index);
        console.log("before", index);
        this.setState({ index });
        console.log("after", index);
    };

    _renderIcon = ({ route }) => {
        return <Icon.Button onPress={() => this._handleChangeTab(route.val)} name={route.icon} size={22} color="black" backgroundColor="transparent">
        </Icon.Button>
    };

    _renderHeader = props => {
        return <TabBar
            labelStyle={{color: 'black'}}
            indicatorStyle={{backgroundColor: '#0A81D1'}}
            renderIcon={this._renderIcon}
            style={{height: 55, backgroundColor: '#eeeeee'}}
            {...props}
        />;
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <UserMessages />;
            case '2':
                return <HomeEvents openFriendsModal = {this.openFriendsModal}/>;
            case '3':
                return <CreateEvents userEventsInfo = {this.userEventsInfo} openUsersModal = {this.openUsersModal}/>;
            default:
                return null;
        }
    };

    onScroll (event){
        var offsetX = event.nativeEvent.contentOffset.x,
            pageWidth = screen.width;
        this.setState({
            currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1
        });
    }

    onItemTap (index) { // needs implementation
        // this.setState({
        //     currentPage: index
        // });
    }

    render () {
        const settingsConfig = (
            <Icon.Button name="settings" size={30} color="white" onPress={() => this.userSettingsListener()} backgroundColor="transparent">
            </Icon.Button>
        );

        const addFriendsConfig = (
            <Icon.Button name="account-multiple-plus" size={30} color="white" onPress={() => this.addFriendsListener()} backgroundColor="transparent">
            </Icon.Button>
        );

        const titleConfig = {
            title: 'Vibe',
            style: {fontWeight: 'bold', fontSize: 26, fontFamily: 'Noteworthy', color: 'white'}
        };

        return (
            <Animated.View style={{flex: 1, backgroundColor: 'white'}} >
                {/* <Animated.View style={{flex: 1, backgroundColor: bgColor}} > */}
                <NavigationBar
                    title={titleConfig}
                    rightButton={settingsConfig}
                    leftButton={addFriendsConfig}
                    tintColor={'#0A81D1'}
                />

                {/*<StatusBar*/}
                {/*color="white"*/}
                {/*barStyle="light-content"*/}
                {/*/>*/}

                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor:'red', width:'100%', height: 210}}>
                        <ScrollView ref="ad"
                                    pagingEnabled={true}
                                    horizontal={true}
                                    automaticallyAdjustContentInsets={false}
                                    showsVerticalScrollIndicator={false}
                                    ScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    bounces={false}
                                    onScroll={this.onScroll}
                                    scrollEventThrottle={16}
                        >
                            <View style={styles.userInfo}>
                                <TouchableHighlight style={{paddingBottom: 5}}>
                                    <Image style={ styles.image } source={{ uri: this._getDataNewer() }} />
                                </TouchableHighlight>
                                <Text style={styles.username}>{this._getDataNew()}</Text>
                                <Text style={styles.location}>{this.props.MyAddress + this.props.State}</Text>
                                <View style={{height: 20}} />
                            </View>
                            <View style={styles.userInfo}>
                                <View style={{paddingBottom:25}}>
                                    <View style={styles.nextEvent}>
                                        <Text style={styles.upcomingText}>Your Next Event!</Text>
                                        <TouchableOpacity onPress={() => this.userEventsInfo()}>
                                            <Text numberOfLines={1} style={styles.eventName}>Basketball at Rushi's</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.upcomingText}>Wednesday, August 9th</Text>
                                        <Text style={styles.upcomingText}>6:00 pm to 8:00 pm</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <PageControl style={{position:'absolute', left:0, right:0, bottom:20}}
                                     numberOfPages={2}
                                     currentPage={this.state.currentPage}
                                     hidesForSinglePage={true}
                                     pageIndicatorTintColor='grey'
                                     indicatorSize={{width:8, height:8}}
                                     currentPageIndicatorTintColor='white'
                                     onPageIndicatorPress={this.onItemTap}
                        />
                    </View>
                </View>

                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
                />

                <Modal
                    offset={this.state.offset}
                    open={this.state.openFriendModal}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({openFriendModal: false})}
                    style={{alignItems: 'center'}}>

                    <Image source={require('../img/flower-petals.jpg')}
                           style={{height: '10%', width: '100%', flexDirection: 'row'}}
                    >
                        <View style={{alignItems: 'flex-end'}}>
                            <Icon.Button
                                onPress={() => this.setState({openFriendModal: false})}
                                name="close"
                                size={22}
                                color="white"
                                backgroundColor="transparent">
                            </Icon.Button>
                        </View>
                        <View style={{width: '70%'}}>
                        </View>
                        <Icon.Button
                            onPress={() => alert("settings for modal!")}
                            name="dots-horizontal"
                            size={25}
                            color="white"
                            backgroundColor="transparent">
                        </Icon.Button>
                    </Image>
                    <View style={{height: '90%', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '700', paddingTop: 10, marginBottom: 5}}>{this.state.userModalTitle}</Text>
                        <View style={{flexDirection: 'row', width: '100%', height: 20}}>
                            <TouchableOpacity onPress={() => this.goToMaps()} style={{width: '49%'}}>
                                <Text style={{textAlign: 'right', color: 'grey', fontSize: 12}}> Pomona, CA</Text>
                            </TouchableOpacity>
                            <Text style={{color: 'grey', fontWeight: '800',fontSize: 12}}> · </Text>
                            <TouchableOpacity onPress={() => alert("Open list of friends who have ")} style={{width: '48%'}}>
                                <Text style={{color: 'grey', fontSize: 12}}> 32 Invited </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{width: '50%', alignItems: 'flex-end', flexDirection: 'row'}}>
                                    {/*spacer*/}
                                    <Text style={{width: 15}}> </Text>
                                    <Image style={ styles.miniImage } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
                                    <Image style={ styles.miniImage } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
                                    <Image style={ styles.miniImage } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
                                    <Image style={ styles.miniImage } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
                                </View>
                                <View style={{width: '50%', flexDirection: 'row'}}>
                                    <Image style={ styles.miniImage } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
                                    <Image style={ styles.miniImage } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
                                    <Image style={ styles.miniImage } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
                                    <Image style={ styles.miniImage } source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/16487709_1253209434774020_5441397503346611987_o.jpg?oh=608b2750047c6e000f020ac2ac5198e2&oe=59825DC0' }} />
                                </View>
                            </View>

                            <View style={{paddingTop: 15, marginBottom: 10, width: 300}}>
                                <SegmentedControlIOS
                                    values={['Confirm', 'Unsure']}
                                    tintColor={'#0A81D1'}
                                    selectedIndex={this.state.selectedIndex}
                                    onChange={(event) => {
                                        this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                                    }}
                                    style={{borderRadius: 20}}
                                />
                            </View>
                            <View style={{backgroundColor: 'transparent', height: '77%', width: 300}}>
                                <MessengerContainer/>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{position: 'absolute'}}>
                    <ModalRegular
                        animationType={"fade"}
                        open={this.state.openUserModal}
                        modalDidOpen={() => console.log('modal did open')}
                        modalDidClose={() => this.setState({openUserModal: false})}
                        transparent={false}
                        style={{alignItems: 'center'}}>
                        <View style={{marginLeft: screen.width/-18.75, opacity: 1, height: screen.height, width: screen.width, backgroundColor: 'rgba(10,129,209, 0.93)'}}>
                            <View style={{paddingTop: 100, alignItems: 'center'}}>
                                <Animatable.Text animation="fadeInUpBig" style={{color: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 10, fontFamily: 'Noteworthy'}}>Select your Event!</Animatable.Text>
                                <View style={{paddingTop: 30, paddingBottom: 100, width: '100%'}}>
                                    <Animatable.View animation="fadeInUpBig" ref="view" style={{flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            style={{paddingLeft: screen.width/9, alignItems: 'center'}}
                                            onPress={() => this.goToActivity('Beach')}
                                        >
                                            <Image style={ styles.icon } source={icon1} />
                                            <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Noteworthy', color: 'white'}}> Beach </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{paddingLeft: screen.width/10, alignItems: 'center'}}
                                            onPress={() => this.goToActivity('Coffee')}
                                        >
                                            <Image style={ styles.icon } source={icon2} />
                                            <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Noteworthy', color: 'white'}}> Coffee </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{paddingLeft: screen.width/10, alignItems: 'center'}}
                                            onPress={() => this.goToActivity('Beach')}
                                        >
                                            <Image style={ styles.icon } source={icon3} />
                                            <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Noteworthy', color: 'white'}}> Beach </Text>
                                        </TouchableOpacity>
                                    </Animatable.View>

                                    <Animatable.View animation="fadeInUpBig" ref="view" style={{flexDirection: 'row', paddingTop: 20}}>
                                        <TouchableOpacity
                                            style={{paddingLeft: screen.width/9, alignItems: 'center'}}
                                            onPress={() => this.goToActivity('Library')}
                                        >
                                            <Image style={ styles.icon } source={icon4} />
                                            <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Noteworthy', color: 'white'}}> Library </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{paddingLeft: screen.width/12, alignItems: 'center'}}
                                            onPress={() => this.goToActivity('Group Study')}
                                        >
                                            <Image style={ styles.icon } source={icon5} />
                                            <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Noteworthy', color: 'white'}}> Group Study </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{paddingLeft: screen.width/12, alignItems: 'center'}}
                                            onPress={() => this.goToActivity('Theaters')}
                                        >
                                            <Image style={ styles.icon } source={icon6} />
                                            <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Noteworthy', color: 'white'}}> Theaters </Text>
                                        </TouchableOpacity>
                                    </Animatable.View>

                                    <Animatable.View animation="fadeInUpBig" ref="view" style={{flexDirection: 'row', paddingTop: 20}}>
                                        <TouchableOpacity
                                            style={{paddingLeft: screen.width/9, alignItems: 'center'}}
                                            onPress={() => this.goToActivity('Sports')}
                                        >
                                            <Image style={ styles.icon } source={icon7} />
                                            <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Noteworthy', color: 'white'}}> Sports </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{paddingLeft: screen.width/9, alignItems: 'center'}}
                                            onPress={() => this.goToActivity('Food')}
                                        >
                                            <Image style={ styles.icon } source={icon8} />
                                            <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Noteworthy', color: 'white'}}> Food </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{paddingLeft: screen.width/10, alignItems: 'center'}}
                                            onPress={() => this.goToActivity('Create')}
                                        >
                                            <Image style={ styles.icon } source={icon9} />
                                            <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Noteworthy', color: 'white'}}> Create </Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>
                                <TouchableOpacity
                                    style={{margin: 5}}
                                    onPress={() => this.setState({openUserModal: false})}>
                                    <Animatable.Text animation="fadeInUpBig" style={{color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 10, fontFamily: 'Noteworthy'}}>Dismiss.</Animatable.Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalRegular>
                </View>

            </Animated.View>
        )
    }

    // screen navigations!
    goToActivity(eventType) {
        this.props.navigator.push({
            title: 'NewActivity',
            component: NewActivity,
            navigationBarHidden: true,
            passProps: {myElement: 'text', eventType: eventType}
        });
    }

    goToMaps() {
        this.props.navigator.push({
            title: 'VibeMaps',
            component: VibeMapsScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text', latitude: this.props.latitude,
                longitude: this.props.longitude, userAddress: this.props.MyAddress + this.props.State,
            eventTitle: this.state.userModalTitle, locationValue: this.props.locationValue}
        });
    }

    userSettingsListener() {
        this.props.navigator.push({
            title: 'userSettingsScreen',
            component: UserSettingsScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text', photoId: this.props.photo, userId: this.props.userId,
                firstName: this.state.firstName, lastName: this.state.lastName,
                photo: this.state.photo, locationValue: this.props.locationValue,
                email: this.props.email, phoneNumber: this.state.phoneNumber}
        });
    }

    addFriendsListener() {
        this.props.navigator.push({
            title: 'addFriendsScreen',
            component: AddFriendsScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }
}

const styles = StyleSheet.create({
    slide2: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    container: {
        flex: 2
    },
    page: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        backgroundColor: '#0A81D1',
        justifyContent: 'center',
        height: 210,
        alignItems: 'center',
        width:screen.width
    },
    eventInfo: {
        backgroundColor: 'red',
        width: 250
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Noteworthy',
    },
    location: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
        opacity: 0.8,
        fontFamily: 'Noteworthy'
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        height: 50,
        alignItems: 'center'
    },
    indicatorContainer: {
        backgroundColor: '#eeeeee',
        height: 48
    },
    indicatorText: {
        fontSize: 14,
        fontFamily: 'Noteworthy',
        color: 'black',
        fontWeight: '800'
    },
    indicatorSelectedText: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'Noteworthy',
        fontWeight: '800'
    },
    statusBar: {
        height: 24,
        backgroundColor: 0x00000044
    },
    toolbarContainer: {
        height: 56,
        backgroundColor: 0x00000020,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    backImg: {
        width: 16,
        height: 17
    },
    titleTxt: {
        marginLeft: 36,
        color: 'white',
        fontSize: 20,
        fontWeight: '800'
    },
    nextEvent: {
        backgroundColor: '#ADD8E6',
        borderRadius: 50,
        borderColor: 'white',
        borderWidth:1,
        height: 175 ,
        width:310,
        alignItems: 'center'
    },
    upcomingText: {
        paddingTop:6,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Noteworthy',
    },
    eventName: {
        flexDirection: 'row',
        color: '#0A81D1',
        fontWeight: 'bold',
        fontSize: 32,
        fontFamily: 'Noteworthy',
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
    icon: {
        height:70,
        width: 70,
        borderRadius: 35,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    miniImage: {
        height:30,
        width: 30,
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginLeft: 7,
        marginTop: 5
    },
    scrollView: {
        backgroundColor:'yellow'
    }
});

module.exports = UserHome;