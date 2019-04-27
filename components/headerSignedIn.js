import React from 'react';
import { Header } from 'react-native-elements';
import { textWhite, headerRed } from '../utils/colors';

const headerStyle = {
  backgroundColor: headerRed,
  height: 60,
  borderBottomWidth: 0,
  paddingTop: 0,
};

export default function HeaderSignedIn({ icon, title, action }) {
  return (
    <Header
      placement="left"
      leftComponent={{
        // https://www.materialui.co/icon/arrow-back
        icon,
        underlayColor: headerRed,
        onPress: () => action(),
        color: textWhite,
      }}
      centerComponent={{
        text: title,
        style: {
          color: textWhite,
          fontSize: 18,
          textAlign: 'left',
        },
      }}
      containerStyle={headerStyle}
    />
  );
}
