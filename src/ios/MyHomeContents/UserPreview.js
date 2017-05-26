import React, { Component, PropTypes } from 'react'
import { Text} from 'react-native'

export default class UserPreview extends Component {
    constructor() {
        super(props);
    }
    render() {
        return (
            <Text>{this.props.data.username}</Text>
        );
    }

}

module.exports = UserPreview;