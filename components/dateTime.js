import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import { UserProp, UserValue } from '../style/Text';

class DateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DateTime: moment(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getDateTimeStrings = (upper) =>
    ['Date', 'Time'].map((a) => (upper ? a.toUpperCase() : a));

  tick() {
    this.setState({
      DateTime: moment(),
    });
  }

  render({ prop, value, toUpper = false } = this.props) {
    const dateTimeStrings = this.getDateTimeStrings(toUpper);
    return (
      <Text>
        <UserProp style={prop}>{dateTimeStrings[0]}: </UserProp>
        <UserValue style={value}>
          {`${this.state.DateTime.format('DD/MM/YYYY')} `}
        </UserValue>
        <UserProp style={({ marginLeft: 50 }, prop)}>
          {dateTimeStrings[1]}:{' '}
        </UserProp>
        <UserValue style={value}>
          {this.state.DateTime.format('h:mm a')}
        </UserValue>
      </Text>
    );
  }
}

export default DateTime;
