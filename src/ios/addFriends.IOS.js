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
    StatusBar
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Hr from './hr.dist';
import Icon from 'react-native-vector-icons/Ionicons';
import Search from 'react-native-search-box';
import AtoZListView from 'react-native-atoz-listview';

const rowHeight = 40;
var BackPage = require('./userHome.IOS.js');



class addFriendsScreen extends Component {

    state = {
        data: {
            "A": [
                {
                    "name": "Anh Tuan Nguyen",
                    "age": 28
                },
                {
                    "name": "An Nhien",
                    "age": 20
                },
            ],
            "Z": [
                {
                    "name": "Zue Dang",
                    "age": 22
                },
                {
                    "name": "Zoom Jane",
                    "age": 30
                },
            ]
        }
    }


    renderRow = (item, sectionId, index) => {
        return (
            <TouchableHighlight
                style={{
                    height: rowHeight,
                    justifyContent: 'center',
                    alignItems: 'center'}}
            >
                <Text>{item.name}</Text>
            </TouchableHighlight>
        );
    }

    // Important: You must return a Promise
    beforeFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('beforeFocus');
            resolve();
        });
    }

    // Important: You must return a Promise
    onFocus = (text) => {
        return new Promise((resolve, reject) => {
            console.log('beforeFocus', text);
            resolve();
        });
    }

    // Important: You must return a Promise
    afterFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('afterFocus');
            resolve();
        });
    }




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


    render() {
        const titleConfig = {
            title: 'Add Friends',
            style: {fontWeight: 'bold', fontSize: 20, fontFamily: 'Noteworthy', color: 'white'}
        };

        const backButtonConfig = (
            <Icon.Button name="ios-arrow-back" size={30} color="white" onPress={() => this.backButtonListener()} backgroundColor="transparent">
            </Icon.Button>
        );

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />
                    <NavigationBar
                        title={titleConfig}
                        leftButton={backButtonConfig}
                        tintColor={'#010004'}
                    />
                    <Hr style={{width: 140, flex: 1}}/>

                    <View style={{ flex: 1 }}>
                        <Search
                            ref="search_bar"
                            titleSearch="Tìm kiếm"
                            titleCancel="Huỷ"
                            onSearch={this.onSearch}
                            onChangeText={this.onChangeText}
                            onDelete={() => console.log('onDelete')}
                            afterDelete={this.afterDelete}
                            beforeFocus={this.beforeFocus}
                            onFocus={this.onFocus}
                            afterFocus={this.afterFocus}
                            onCancel={this.onCancel}
                            backgroundColor="gray"
                            placeholderTextColor="black"
                            tintColorSearch="blue"
                            tintColorDelete="blue"
                        />
                        <AtoZListView
                            data={this.state.data}
                            renderRow={this.renderRow}
                            rowHeight={rowHeight}
                            sectionHeaderHeight={40}
                        />
                    </View>

                </View>
            </TouchableWithoutFeedback>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8505c',
        flex: 1
    },

});

module.exports = addFriendsScreen;