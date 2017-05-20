const React = require('react');
const ReactNative = require('react-native');
const {
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableWithoutFeedback,
    View,
} = ReactNative;
import UserHome from '../userHome.IOS.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    row: {
        borderTopColor: 'grey',
        borderBottomColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderWidth: 0.5,
        borderRadius: 0.6,
        padding: 25,
        height: 85,
        backgroundColor: 'rgb(249,250,251)',
    },
    text: {
        alignSelf: 'center',
        color: 'black',
    },
    scrollview: {
        flex: 1,
    },
});

class Row extends React.Component {

    renderStatusIcon = (status) => {
        if(status === 'accepted')
            return <Icon.Button name={'checkbox-blank-circle'} size={12} color="green" backgroundColor="transparent">
                    </Icon.Button>
        else
            return <Icon.Button name={'checkbox-blank-circle'} size={12} color="orange" backgroundColor="transparent">
            </Icon.Button>
    };

    _removeRow = () => {

    };

    _onClick = () => {
        this.props.onClick(this.props.data);
    };

    render() {
        const renderRemoveIcon = (
            <Icon.Button onPress={() => this._removeRow} name="close-box" size={25} color="grey" backgroundColor="transparent">
            </Icon.Button>
        );

        return (
            <TouchableWithoutFeedback onPress={this._onClick} >
                <View style={styles.row}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        {this.renderStatusIcon(this.props.data.status)}
                        <Text style={styles.text}>
                            {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                        </Text>
                        {renderRemoveIcon}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class RefreshControlExample extends React.Component {
    static title = '<RefreshControl>';
    static description = 'Adds pull-to-refresh support to a scrollview.';
    userHomeInstance: UserHome;

    constructor(props) {
        super();
        this.userHomeInstance = new UserHome(props);
    }

    //pass number of elements here!
    state = {
        open: false,
        isRefreshing: false,
        loaded: 0,
        rowData: Array.from(new Array(20)).map(
            (val, i) => ({text: 'Initial row ' + i,
                          clicks: 0,
                          status: 'unsure' // status: accept, maybe
                        })),
    };

    // open modal here
    _onClick = (row) => {
        row.clicks++;
        this.userHomeInstance.openModal(UserHome);
        this.setState({
            rowData: this.state.rowData,
            open: true
        });
    };

    render() {
        const rows = this.state.rowData.map((row, ii) => {
            return <Row key={ii} data={row} onClick={this._onClick}/>;
        });

        return (
            <View style={{flex: 1}}>
                <ScrollView
                    style={styles.scrollview}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor="black"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }>
                    {rows}
                </ScrollView>
            </View>
        );
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // prepend 10 items
            const rowData = Array.from(new Array(10))
                .map((val, i) => ({
                    text: 'Loaded row ' + (+this.state.loaded + i),
                    clicks: 0,
                }))
                .concat(this.state.rowData);

            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData,
            });
        }, 5000);
    };
}

module.exports = RefreshControlExample;