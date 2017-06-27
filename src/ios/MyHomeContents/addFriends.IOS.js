'use strict'
import React, {
    Component,
} from 'react'

import {
    StyleSheet,
    View,
    ListView,
    StatusBar,
    Platform
} from 'react-native';

// Algolia Instantsearch
import AlgoliaDropdown from '../anm/AlgoliaDropdown';
import UserPreview from './UserPreview';
import NavigationBar from 'react-native-navbar';
import BackButton from 'react-native-vector-icons/EvilIcons';
import Row from './Row.js';

var data = require('./demoData.js');
var BackPage = require('./userHome.IOS.js');
var SelectFriendDM = require('./DirectMessaging/SelectFriend.IOS');

class addFriendsScreen extends Component {

    constructor(props) {
        super(props);

        this.backButtonListener = this.backButtonListener.bind(this);
        this.goToDM = this.goToDM.bind(this);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data),
        };
    }

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

    goToDM() {
        this.props.navigator.push({
            title: 'SelectFriendDM',
            component: SelectFriendDM,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }

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
                        style={{backgroundColor: 'white', paddingTop: Platform.OS === 'ios' ? 5 : 0}}
                        footerHeight={64}
                        // sideComponent={<Filter onPress={this.handleFilterPress} width={this.state.filterWidth} />}
                        apiKey="6b62c4d4aef895d0b0242d2e5a2b273c"
                        backButtonListener = {this.backButtonListener}
                        goToDM = {this.goToDM}
                    >
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