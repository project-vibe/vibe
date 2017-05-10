const React = require('react');
const ReactNative = require('react-native');
const {
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
} = ReactNative;
import Modal from 'react-native-simple-modal';

const styles = StyleSheet.create({
    row: {
        borderTopColor: 'grey',
        borderBottomColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderWidth: 0.5,
        borderRadius: 0.6,
        padding: 25,
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
    _onClick = () => {
        this.props.onClick(this.props.data);
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._onClick} >
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class RefreshControlExample extends React.Component {
    static title = '<RefreshControl>';
    static description = 'Adds pull-to-refresh support to a scrollview.';

    // pass number of elements here!
    state = {
        open: false,
        isRefreshing: false,
        loaded: 0,
        rowData: Array.from(new Array(20)).map(
            (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
    };

    _onClick = (row) => {
        row.clicks++;
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

                <Modal
                    offset={this.state.offset}
                    open={this.state.open}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({open: false})}
                    style={{alignItems: 'center'}}>
                    <View>
                        <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
                        <TouchableOpacity
                            style={{margin: 5}}
                            onPress={() => this.setState({offset: -100})}>
                            <Text>Move modal up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{margin: 5}}
                            onPress={() => this.setState({offset: 0})}>
                            <Text>Reset modal position</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{margin: 5}}
                            onPress={() => this.setState({open: false})}>
                            <Text>Close modal</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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