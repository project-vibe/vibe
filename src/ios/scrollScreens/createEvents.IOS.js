import React, { Component } from 'react';
import {

} from 'react-native';
import Timeline from 'react-native-timeline-listview';

export default class CreateEvents extends Component {
    constructor(){
        super();
        this.data = [
            {time: '5/5', title: 'Event 1', description: 'Event 1 Description'},
            {time: '5/20', title: 'Event 2', description: 'Event 2 Description'},
            {time: '5/23', title: 'Event 3', description: 'Event 3 Description'},
            {time: '5/26', title: 'Event 4', description: 'Event 4 Description'},
            {time: '6/18', title: 'Event 5', description: 'Event 5 Description'}
        ]
    }

    render(){
        return(
            <Timeline
                style={{backgroundColor: '#eeeeee'}}
                //..other props
                data={this.data}
                innerCircle= {'dot'}
                circleSize={10}
                circleColor='rgb(67,169,144)'
                lineColor='#14c7af'
                timeContainerStyle={{minWidth:52, marginTop: -5}}
                detailContainerStyle={{backgroundColor: 'white', paddingLeft: 10, width: '90%', borderRadius: 5,
                                       paddingBottom: 20, borderWidth: 0.2, borderColor: 'grey'}}
                timeStyle={{textAlign: 'center', backgroundColor:'#14c7af', color:'white', padding:5, borderRadius:100}}
                descriptionStyle={{color:'gray'}}
                options={{
                    style:{paddingTop:10}
                }}
            />
        )
    }
}


/*
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';

export default class CreateEvents extends Component {
    constructor() {
        super();

        this.renderRow = this.renderRow.bind(this);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'row 1',
                'row 2',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut venenatis felis. Donec at tempus neque. Morbi vitae sem et nisi porta ornare. Cras at venenatis tellus. Curabitur consequat lacinia lacus, et luctus tortor dignissim nec. Suspendisse scelerisque aliquet vehicula. Integer at ante elit.',
                'Suspendisse potenti. Proin varius risus ac venenatis elementum. Morbi fringilla ante et nibh accumsan, ultricies tempor est porta. Nunc molestie neque a efficitur posuere. Nunc egestas, massa vitae hendrerit feugiat, ligula sem ullamcorper ante, quis ultricies quam turpis ac lectus. Praesent luctus, sapien imperdiet sagittis iaculis, nibh lacus convallis velit, sed placerat enim justo ornare tortor. Phasellus sed dui id odio lobortis imperdiet. Duis sollicitudin tellus sed eros commodo ultrices. Donec auctor nunc id quam suscipit, tempus tincidunt elit placerat. Sed nec odio vel ligula maximus varius. Nullam vulputate augue non gravida lacinia. Nam ac lobortis libero, id sollicitudin nulla.']),
        };
    }

    renderRow(rowData, section, row) {
        const total = this.state.dataSource.getRowCount();
        const topLineStyle = row == 0 ? [styles.topLine, styles.hiddenLine] : styles.topLine;
        const bottomLineStyle = row == total - 1 ? [styles.bottomLine, styles.hiddenLine] : styles.bottomLine;

        return (
            <View style={styles.row}>
                <View style={styles.timeline}>
                    <View style={styles.line}>
                        <View style={topLineStyle} />
                        <View style={bottomLineStyle} />
                    </View>
                    <View style={styles.dot} />
                </View>
                <View style={styles.content}>
                    <Text>{rowData}</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView style={styles.listView}
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    row: {
        padding: 4,
        paddingLeft: 0,
    },
    content: {
        marginLeft: 40,
    },
    timeline: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 40,
        justifyContent: 'center', // center the dot
        alignItems: 'center',
    },
    line: {
        position: 'absolute',
        top: 0,
        left: 18,
        width: 4,
        bottom: 0,
    },
    topLine: {
        flex: 1,
        width: 3,
        backgroundColor: '#e3e5e4',
    },
    bottomLine: {
        flex: 1,
        width: 3,
        backgroundColor: '#e3e5e4',
    },
    hiddenLine: {
        width: 0,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: '#8e959d',
    },
});

module.exports = CreateEvents;



/!*
import React, { Component } from 'react'
import { View, StyleSheet, StatusBar} from 'react-native';

export default class CreateEvents extends Component {
    render () {
        return (
            <View style={[ styles.page, { backgroundColor: '#eeeeee' } ]}>
                <StatusBar
                    color="white"
                    barStyle="light-content"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

module.exports = CreateEvents;*!/
*/
