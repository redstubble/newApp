import React from 'react';
import { Header } from 'react-native-elements';
import { textWhite, headerRed } from '../utils/colors';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Header
        placement="left"
        leftComponent={{
          // https://www.materialui.co/icon/arrow-back
          icon: this.props.icon,
          underlayColor: headerRed,
          onPress: () => this.props.action(),
          color: textWhite,
        }}
        centerComponent={{
          text: this.props.title,
          style: {
            color: textWhite,
            fontSize: 18,
            textAlign: 'left',
          },
        }}
        outerContainerStyles={{
          backgroundColor: headerRed,
          height: 60,
          borderBottomWidth: 0,
          paddingTop: 0,
        }}
      />
    );
  }
}
