'use strict'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, Animated, TouchableHighlight, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import NavigationBar from 'react-native-navbar';
import * as firebase from "firebase";

/** Extra COMPONENTS **/
import Modal from '../anm/react-native-simple-modal/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Geocoder from 'react-native-geocoder';

/** SCROLL SCREENS **/
import HomeEvents from '../scrollScreens/homeEventList.IOS.js';
import CreateEvents from '../scrollScreens/createEvents.IOS.js';
import UserMessages from '../scrollScreens/userMessages.IOS.js';

/** ICONS FOR CREATING EVENT **/
import icon1 from '../img/icons/beach.png';
import icon2 from '../img/icons/coffee.png';
import icon3 from '../img/icons/fav.png';
import icon4 from '../img/icons/library.png';
import icon5 from '../img/icons/math.png';
import icon6 from '../img/icons/movie.png';
import icon7 from '../img/icons/other.png';
import icon8 from '../img/icons/restaurant.png';
import icon9 from '../img/icons/sports.png';

/** NAVIGATION **/
var UserSettingsScreen = require('./userSettings.IOS.js');
var AddFriendsScreen = require('./addFriends.IOS.js');
var VibeMapsScreen = require('./maps.IOS.js');

/** SCROLLER **/
var screen = require('Dimensions').get('window');
var PageControl = require('react-native-page-control');
export default class UserHome extends Component {

    constructor(props) {
        super(props);
        this.openFriendsModal = this.openFriendsModal.bind(this);
        this.openUsersModal = this.openUsersModal.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.onItemTap = this.onItemTap.bind(this);
    };

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
        currentPage: 0
    };

    _getDataNew = () => {
        let userSettingsPath = "/user/" + this.props.userId + "/UserInfo";
        var counter = 0;
        var childData = "";
        var firstName = "FirstNameDefault";
        var lastName = "LastNameDefault";
        var leadsRef = firebase.database().ref(userSettingsPath);

        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childData = childSnapshot.val();
                counter++;
                if(counter==2)
                    firstName = childData;
                if(counter==3) {
                    lastName = childData;
                }
            });
        });
        this.state.firstName = firstName;
        this.state.lastName = lastName;
        return <Text> {firstName + " " +lastName} </Text>
    };

    /*setData() {
        let userSettingsPath = "/user/" + this.props.userId + "/UserInfo";
        var counter = 0;
        var childData = "";
        var leadsRef = firebase.database().ref(userSettingsPath);
        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childData = childSnapshot.val();
                counter++;
                if(counter==2)
                    this.state.firstName = childData;
            });
        });
    }*/

    /*componentWillMount() {
        navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            //this.state.MyAddress = position.coords.latitude;
            //this.state.State = position.coords.longitude;

            this.setState({
                MyAddress: position.coords.latitude,
                State: position.coords.longitude
            });

            try {
                var NY = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                let ret = Geocoder.geocodePosition(NY).then((res) => {
                    res.locality = res["0"].locality;
                    res.state = res["0"].adminArea;
                    this.state.MyAddress = res.locality;
                    this.state.State = res.state;

                     //alert(this.state.MyAddress + ", " + this.state.State);

                }).catch(err => console.log(err));

            } catch(error) {
                console.log(error);
            }
        });
    }*/

     /*getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        Geocoder.fallbackToGoogle("AIzaSyCEBP1ZAYZgvr-rzK0VNKToyfmQg1_3mns");
        // use the lib as usual

        // var lat = this.state.latitude;
        // var lng = this.state.longitude;
         var myAddress = ''

         var NY = {
             lat: this.state.latitude,
             lng: this.state.longitude
         };

         // Geocoder.fallbackToGoogle(MY_KEY);//MY_KEY -- enabled the key googleMapAPI portal.

         let ret = Geocoder.geocodePosition(NY).then((res)=>
         {
             //console.log(res)
            locality = res["0"].locality;
            state = res["0"].adminArea;
             //console.log(myAddress);
             this.setState({
                 MyAddress: locality,
                 State: state
             }).catch(err => console.log(err));
         });

        //let ret = Geocoder.geocodePosition({lat, lng});

        //alert(ret.formattedAddress);
        //return <Text> {this.state.latitude + " @ " +this.state.longitude} </Text>
        //return <Text>{this.state.MyAddress}</Text>
    }*/

     /*getLocation() {
         var latitude = '42';
         var longitude = '-17';
         var locality = 'Northridge';
         var state = 'CALI';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                //alert(this.state.latitude + " , " + this.state.longitude);
                Geocoder.fallbackToGoogle("AIzaSyCEBP1ZAYZgvr-rzK0VNKToyfmQg1_3mns");
                // use the lib as usual


                var NY = {
                    lat: latitude,
                    lng: longitude
                };

                try {
                    let ret = Geocoder.geocodePosition(NY).then((res) => {
                        locality = res["0"].locality;
                        state = res["0"].adminArea;

                       // alert(this.state.MyAddress + ", " + this.state.State);

                    }).catch(err => console.log(err));

                } catch(error) {
                    console.log(error);
                }
            },
            (error) => {this.state.error = error.message;}
        );

         return <Text>{locality + ", " + state}</Text>
         //alert(this.state.MyAddress + ", " + this.state.State);
    }*/

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
                return <CreateEvents openUsersModal = {this.openUsersModal}/>;
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
                <StatusBar
                    color="white"
                    barStyle="light-content"
                />

                <NavigationBar
                    title={titleConfig}
                    rightButton={settingsConfig}
                    leftButton={addFriendsConfig}
                    tintColor={'#0A81D1'}
                />

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
                                    <Image style={ styles.image } source={{ uri: this.props.photoUrl }} />
                                </TouchableHighlight>
                                <Text style={styles.username}>{this._getDataNew()}</Text>
                                <Text style={styles.location}>{this.props.MyAddress + " , " + this.props.State}</Text>
                                <View style={{height: 20}} />
                            </View>
                            <View style={{width:screen.width,  height:210,backgroundColor:'#0A81D1'}}>
                                <Text>NEXT EVENT:</Text>
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
                           style={{height: '18%', width: '100%', flexDirection: 'row'}}
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
                    <View style={{height: 460, alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '700', paddingTop: 10, marginBottom: 5}}>{this.state.userModalTitle}</Text>
                        <View style={{flexDirection: 'row', width: '100%', height: 20}}>
                            <TouchableOpacity onPress={() => this.goToMaps()} style={{width: '49%'}}>
                                <Text style={{textAlign: 'right', color: 'grey', fontSize: 12}}> Pomona, CA</Text>
                            </TouchableOpacity>
                            <Text style={{color: 'grey', fontWeight: '800',fontSize: 12}}> · </Text>
                            <TouchableOpacity onPress={() => alert("Open list of friends who have ")} style={{width: '49%'}}>
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
                        </View>
                    </View>
                </Modal>

                <View style={{opacity: 0.95, position: 'absolute'}}>
                    <Modal
                        animationType={"fade"}
                        open={this.state.openUserModal}
                        modalDidOpen={() => console.log('modal did open')}
                        modalDidClose={() => this.setState({openUserModal: false})}
                        transparent={true}
                        style={{alignItems: 'center'}}>
                        <View style={{marginLeft: screen.width/-18.75, height: screen.height, width: screen.width, backgroundColor: '#0A81D1'}}>
                            <View style={{paddingTop: 80, alignItems: 'center'}}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 10, fontFamily: 'Noteworthy'}}>Select your Event!</Text>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => alert("hello")}
                                    >
                                        <Image style={ styles.image } source={icon1} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => alert("hello")}
                                    >
                                        <Image style={ styles.image } source={icon2} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => alert("hello")}
                                    >
                                        <Image style={ styles.image } source={icon3} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => alert("hello")}
                                    >
                                        <Image style={ styles.image } source={icon4} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => alert("hello")}
                                    >
                                        <Image style={ styles.image } source={icon5} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => alert("hello")}
                                    >
                                        <Image style={ styles.image } source={icon6} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => alert("hello")}
                                    >
                                        <Image style={ styles.image } source={icon7} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => alert("hello")}
                                    >
                                        <Image style={ styles.image } source={icon8} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => alert("hello")}
                                    >
                                        <Image style={ styles.image } source={icon9} />
                                    </TouchableOpacity>


                                </View>
                                <TouchableOpacity
                                    style={{margin: 5}}
                                    onPress={() => this.setState({openUserModal: false})}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 10, fontFamily: 'Noteworthy'}}>I'm good.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </Animated.View>
        )
    }

    // screen navigations!
    goToMaps() {
        this.props.navigator.push({
            title: 'VibeMaps',
            component: VibeMapsScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }

    userSettingsListener() {
        this.props.navigator.push({
            title: 'userSettingsScreen',
            component: UserSettingsScreen,
            navigationBarHidden: true,
            passProps: {myElement: 'text', photoId: this.state.photoUrl, userId: this.props.userId,
            firstName: this.state.firstName, lastName: this.state.lastName}
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