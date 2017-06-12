'use strict'
import React, {
    Component,
} from 'react'

import {
    StyleSheet,
    View,
    ListView,
    TouchableHighlight,
    Text,
    Modal,
    StatusBar,
    Platform
} from 'react-native';

// Algolia Instantsearch
import { InstantSearch } from 'react-instantsearch/native';
import AlgoliaDropdown from '../anm/AlgoliaDropdown';
import UserPreview from './UserPreview';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from 'react-native-vector-icons/EvilIcons';

import Row from './Row.js';
import ActionButton from 'react-native-action-button';

const myIcon = (<ion-icon name="alert" size={30} color="red" />)
var data = require('./demoData.js');
var BackPage = require('./userHome.IOS.js');

class addFriendsScreen extends Component {
    state = {
        filterWidth: 100
    };

    backButtonListener() {
        this.props.navigator.pop({
            title: 'BackPage',
            component: BackPage,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data),
        };
    }

    render() {
        const titleConfig = {
            title: 'Contacts',
            style: {fontWeight: 'bold', fontSize: 20, fontFamily: 'Noteworthy', color: 'black'}
        };

        const backButtonConfig = (
            <BackButton.Button name="chevron-left" size={42} color="black" onPress={() => this.backButtonListener()}
                         backgroundColor="transparent">
            </BackButton.Button>
        );

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <NavigationBar
                    title={titleConfig}
                    leftButton={backButtonConfig}
                    tintColor={'#F3F3F3'}
                />

                <View style={{flex: 1}}>
                    <AlgoliaDropdown
                        appID="G3REXGMTZM"
                        style={{backgroundColor: 'white', paddingTop: Platform.OS === 'ios' ? 25 : 0}}
                        footerHeight={64}
                        // sideComponent={<Filter onPress={this.handleFilterPress} width={this.state.filterWidth} />}
                        apiKey="6b62c4d4aef895d0b0242d2e5a2b273c">
                        <UserPreview
                            index='contacts'
                            title='Friends'
                            params={{hitsPerPage: 3}}
                            onToProfile={(userId) => alert("user: " + userId)}
                            small={true} />
                    </AlgoliaDropdown>

                    <ListView
                        style={styles.listViewStyle}
                        dataSource={this.state.dataSource}
                        automaticallyAdjustContentInsets={false}
                        renderRow={(data) => <Row {...data} />}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                    />

                    <ActionButton Icon={myIcon} offsetX={10} offsetY={10} buttonColor="#279AF1">
                        <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {
                        }}>
                            <Icon name="md-notifications-off" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                    </ActionButton>
                </View>
            </View>
        )
    }
};

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

});

module.exports = addFriendsScreen;