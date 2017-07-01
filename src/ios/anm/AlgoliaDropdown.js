import React, { Component, PropTypes } from 'react'
import { StyleSheet, TextInput, View, Text, Animated, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import algoliasearch from 'algoliasearch/reactnative'
import Icon from 'react-native-vector-icons/EvilIcons';

var BackPage = require('../MyHomeContents/userHome.IOS.js');
var SelectFriendDM = require('../MyHomeContents/DirectMessaging/SelectFriend.IOS');

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
// const { height, width } = Dimensions.get('window')
const SEARCH_INPUT_HEIGHT = 35;

function NoResults () {
    return (
        <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No Results</Text>
        </View>
    )
}

function validateChildProps (children) {
    if(children.isArray){
        children.forEach((child) => {
            if (typeof child.props.index !== 'string') throw new Error(`AlgoliaDropdown: The child component ${child.type.name} must have an "index" attribute which is a string.`)
            if (typeof child.props.title !== 'string') throw new Error(`AlgoliaDropdown: The child component ${child.type.name} must have a "title" attribute which is a string.`)
            if (typeof child.props.params !== 'undefined' && Object.prototype.toString.call(child.props.params) !== '[object Object]') throw new Error(`AlgoliaDropdown: The child component ${child.type.name} has a params attribute which isn't an object.`)
        })
    }else{
        if (typeof children.props.index !== 'string') throw new Error(`AlgoliaDropdown: The child component ${children.type.name} must have an "index" attribute which is a string.`)
        if (typeof children.props.title !== 'string') throw new Error(`AlgoliaDropdown: The child component ${children.type.name} must have a "title" attribute which is a string.`)
        if (typeof children.props.params !== 'undefined' && Object.prototype.toString.call(children.props.params) !== '[object Object]') throw new Error(`AlgoliaDropdown: The child component ${children.type.name} has a params attribute which isn't an object.`)
    }
}

export default class AlgoliaDropdown extends Component {
    constructor (props) {
        super()
        validateChildProps(props.children)
        this.client = algoliasearch(props.appID, props.apiKey)

        this.state = {
            showOverlay: false,
            results: [],
            cancelWidth: new Animated.Value(0),
            cancelOpacity: new Animated.Value(0),
            backWidth: new Animated.Value(35),
            backOpacity: new Animated.Value(1),
            resultsHeight: new Animated.Value(0),
            alignText: 'center'
        }

        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.formatQuery = this.formatQuery.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleRemoveFocus = this.handleRemoveFocus.bind(this)
        this.getInputStyle = this.getInputStyle.bind(this)
    }

    handleSearch (err, content) {
        if (err) return console.log('Oops', err)

        if (content.results.every((result) => result.nbHits === 0)) {
            return this.setState({
                results: [
                    this.props.noResultsWrapper
                        ? React.cloneElement(this.props.noResultsWrapper, {key: 'NoResults'})
                        : <NoResults key='NoResults' />
                ]
            })
        }

        const results = content.results.map((result, index) => {
            return (
                <View key={result.index}>
                    {this.props.titleWrapper
                        ? result.hits.length === 0 ? null : React.cloneElement(this.props.titleWrapper, {title: this.props.children.isArray ? this.props.children[index].props.title : this.props.children.props.title})
                        : result.hits.length === 0 ? null : <View style={styles.defaultTitleContainer}>
                            <Text style={styles.defaultTitleText}>
                                { this.props.children.isArray ? this.props.children[index].props.title : this.props.children.props.title}
                            </Text>
                        </View>}
                    {result.hits.map((hit, i) => React.cloneElement( this.props.children.isArray ? this.props.children[index] : this.props.children, {data: hit, key: i}))}
                </View>
            )
        })

        this.setState({results})
    }

    formatQuery (query) {
        if(this.props.children.isArray){
            return this.props.children.map((child) => ({
                indexName: child.props.index,
                params: child.props.params,
                query,
            }))
        }else{
            return [{
                indexName: this.props.children.props.index,
                params: this.props.children.props.params,
                query
            }]
        }
    }

    handleTextChange (e) {
        if (e.nativeEvent.text === '') this.setState({results: []})
        else this.client.search(this.formatQuery(e.nativeEvent.text), this.handleSearch)
    }

    handleFocus () {
        Animated.timing(this.state.resultsHeight, {toValue: height - SEARCH_INPUT_HEIGHT, duration: 500}).start()
        Animated.sequence([
            Animated.timing(this.state.cancelWidth, {toValue: 63, duration: 200}),
            Animated.timing(this.state.backWidth, {toValue: 0, duration: 200}),
            Animated.timing(this.state.cancelOpacity, {toValue: 1, duration: 200}),
            Animated.timing(this.state.backOpacity, {toValue: 0, duration: 200}),
        ]).start()
        this.setState({showOverlay: true})
        this.setState({alignText: 'left'})
    }

    handleRemoveFocus () {
        this.input.blur()
        this.setState({showOverlay: false, results: []})
        this.input.clear()
        Animated.timing(this.state.resultsHeight, {toValue: 0, duration: 500}).start()

        Animated.sequence([
            Animated.timing(this.state.cancelOpacity, {toValue: 0, duration: 200}),
            Animated.timing(this.state.backWidth, {toValue: 35, duration: 200}),
            Animated.timing(this.state.cancelWidth, {toValue: 0, duration: 200}),
            Animated.timing(this.state.backOpacity, {toValue: 1, duration: 200}),
        ]).start()

        this.setState({alignText: 'center'})
    }

    getInputStyle () {
        const baseStyles = {
            flex: 1,
            height: SEARCH_INPUT_HEIGHT,
            borderColor: '#E4E4E4',
            borderWidth: 0,
            borderRadius: SEARCH_INPUT_HEIGHT/2,
            padding: 7,
            paddingLeft: 15,
            paddingRight: 15,
            margin: 5,
            backgroundColor: '#F3F3F3',
            color: '#4E595D',
            // textAlign: this.state.alignText
        }

        return this.props.inputStyle
            ? {...baseStyles, ...this.props.inputStyle}
            : baseStyles
    }

    myBackButton() {
        this.props.backButtonListener();
    }

    myDMScreen() {
        this.props.goToDM();
    }

    render () {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.searchContainer}>
                    <Animated.View style={{width: this.state.backWidth, opacity: this.state.backOpacity}}>
                        <Icon name="chevron-left"
                              size={42}
                              color="#0A81D1"
                              backgroundColor="transparent"
                              onPress={() => this.myBackButton()}
                        />
                    </Animated.View>

                    <TextInput
                        ref={(ref) => this.input = ref}
                        autoCorrect={false}
                        selectionColor={'#0A81D1'}
                        underlineColorAndroid='transparent'
                        style={[this.getInputStyle(), {textAlign: this.state.alignText}]}
                        onFocus={this.handleFocus}
                        onChange={this.handleTextChange}
                        placeholder={this.props.placeholder} />
                    {this.props.sideComponent && this.state.showOverlay === false
                        ? React.cloneElement(this.props.sideComponent)
                        : null}
                    <TouchableOpacity
                        onPress={this.handleRemoveFocus}>
                        <Animated.Text
                            style={{width: this.state.cancelWidth, opacity: this.state.cancelOpacity, color: this.props.cancelButtonColor, fontSize: 17, padding: 2}}>
                            {this.props.cancelText}
                        </Animated.Text>
                    </TouchableOpacity>

                    <Animated.View style={{width: this.state.backWidth, opacity: this.state.backOpacity}}>
                        <Icon name="comment"
                              size={30}
                              color="#0A81D1"
                              backgroundColor="transparent"
                              onPress={() => this.myDMScreen()}
                        />
                    </Animated.View>
                </View>
                <Animated.View style={{height: this.state.resultsHeight, backgroundColor: this.props.resultsContainerBackgroundColor}}>
                    {this.state.showOverlay === true
                        ? <ScrollView automaticallyAdjustContentInsets={false} keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps="always">
                            {this.state.results}
                            {this.props.footerHeight ? <View style={{height: this.props.footerHeight}} /> : null}
                        </ScrollView>
                        : null}
                </Animated.View>
            </View>
        )
    }
}

AlgoliaDropdown.propTypes = {
    appID: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    titleWrapper: PropTypes.element,
    cancelButtonColor: PropTypes.string,
    inputStyle: PropTypes.object,
    resultsContainerBackgroundColor: PropTypes.string,
    noResultsWrapper: PropTypes.element,
    style: PropTypes.object,
    footerHeight: PropTypes.number,
    sideComponent: PropTypes.element,
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
    ]),
}

AlgoliaDropdown.defaultProps = {
    placeholder: 'Search',
    cancelText: 'Cancel',
    cancelButtonColor: '#0A81D1',
    resultsContainerBackgroundColor: '#fff',
    backgroundColor: '#fff',
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'rgb(89,97,111)'
    },
    searchContainer: {
        height: SEARCH_INPUT_HEIGHT + 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    defaultTitleContainer: {
        justifyContent: 'center',
        padding: 12,
        backgroundColor: '#F7F9F9',
    },
    defaultTitleText: {
        fontSize: 15,
        color: '#929292'
    },
    noResultsContainer: {
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginLeft: 10,
        borderColor: '#E4E4E4',
    },
    noResultsText: {
        color: '#4E595D'
    },
});

module.exports = AlgoliaDropdown;