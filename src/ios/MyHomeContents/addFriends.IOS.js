'use strict'
import React, {
    Component,
} from 'react'

import {
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Touchable,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableHighlight,
    View,
    ListView,
    Image,
    StatusBar
} from 'react-native';

import AlgoliaDropdown from './AlgoliaDropdown';
import UserPreview from './UserPreview';
import NavigationBar from 'react-native-navbar';
import Hr from '../hr.dist';
import Icon from 'react-native-vector-icons/Ionicons';

import Search from 'react-native-search-box';
import Row from './Row.js';
import ActionButton from 'react-native-action-button';

const myIcon = (<ion-icon name="alert" size={30} color="red" />)
var data = require('./demoData.js');
var BackPage = require('./userHome.IOS.js');
var inSearch = false;

class addFriendsScreen extends Component {


    backButtonListener() {
        this.props.navigator.pop({
            title: 'BackPage',
            component: BackPage,
            navigationBarHidden: true,
            passProps: {myElement: 'text'}
        });
    }
    backToHome() {
        this.props.navigator.popToTop({
            title: 'BackToHome',
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
            title: 'Add Friends',
            style: {fontWeight: 'bold', fontSize: 20, fontFamily: 'Noteworthy', color: 'black'}
        };

        function renderIf(condition, content) {
            if (condition) {
                return content;
            } else {
                return null;
            }
        }
        function changeStatus(trueOrFalse){
            inSearch = trueOrFalse;
        }

        const backButtonConfig = (
            <Icon.Button name="ios-arrow-back" size={30} color="black" onPress={() => this.backButtonListener()}
                         backgroundColor="transparent">
            </Icon.Button>
        );

        return (
            //  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <NavigationBar
                    title={titleConfig}
                    leftButton={backButtonConfig}
                    tintColor={'white'}
                />

                <View style={{flex: 1}}>

                    {/*<Search*/}
                        {/*ref="search_bar"*/}
                        {/*titleSearch="Tìm kiếm"*/}
                        {/*titleCancel="Huỷ"*/}
                        {/*onSearch={this.onSearch}*/}
                        {/*onChangeText={this.onChangeText}*/}
                        {/*onDelete={() => console.log('onDelete')}*/}
                        {/*afterDelete={this.afterDelete}*/}
                        {/*beforeFocus={this.beforeFocus}*/}
                        {/*afterFocus={this.afterFocus}*/}
                        {/*onCancel={this.onCancel}*/}
                        {/*backgroundColor="white"*/}
                        {/*placeholderTextColor="black"*/}
                        {/*tintColorSearch="black"*/}
                        {/*tintColorDelete="blue"*/}
                        {/*titleCancelColor='black'*/}
                        {/*onFocus={this.onFocus}*/}
                        {/*//onFocus = {() => changeStatus(true)}*/}
                    {/*/>*/}

                    <AlgoliaDropdown
                        appID="G3REXGMTZM"
                        style={{backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'black', paddingTop: 20}}
                        footerHeight={64}
                        apiKey="6b62c4d4aef895d0b0242d2e5a2b273c">
                        <UserPreview
                            index='users'
                            title='People'
                            params={{hitsPerPage: 3}}
                            small={true} />
                        {/*<PostSearchContainer*/}
                            {/*navigator={this.props.navigator}*/}
                            {/*index='posts'*/}
                            {/*title='Public Posts'*/}
                            {/*params={{hitsPerPage: 3}} />*/}
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
            //  </TouchableWithoutFeedback>
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