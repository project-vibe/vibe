import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import Timeline from 'react-native-timeline-listview';
import ActionButton from 'react-native-action-button';

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
            <View style={{flex: 1}}>
                <Timeline
                    style={{backgroundColor: '#eeeeee'}}
                    //..other props
                    data={this.data}
                    innerCircle= {'dot'}
                    circleSize={10}
                    circleColor='#0A81D1'
                    lineColor='#0A81D1'
                    timeContainerStyle={{minWidth:52, marginTop: -5}}
                    detailContainerStyle={{backgroundColor: 'white', paddingLeft: 10, width: '93%', borderRadius: 5,
                        paddingBottom: 20, borderWidth: 0.3, borderColor: 'grey'}}
                    timeStyle={{textAlign: 'center', backgroundColor:'#0A81D1', color:'white', padding:5, borderRadius:100}}
                    descriptionStyle={{color:'gray'}}
                    options={{
                        style:{paddingTop:10}
                    }}
                />
                <ActionButton offsetX={10} offsetY={10} buttonColor="#279AF1" onPress={() => alert('open.')}>
                </ActionButton>
            </View>
        )
    }
}
