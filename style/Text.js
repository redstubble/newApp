import styled from 'styled-components';
import { Platform } from 'react-native';
import { textWhite, psalightred } from '../utils/colors';

export const CustomSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${psalightred};
`;

export const HeaderText = styled.Text`
  font-size: 20;
  color: ${textWhite};
  align-items: center;
  text-align: left;
`;

export const UserProp = styled.Text`
  font-size: 14;
  color: ${textWhite};
  align-items: center;
  text-align: left;
  font-weight: bold;
`;

export const UserValue = styled.Text`
  font-size: 14;
  color: ${textWhite};
  align-items: center;
  text-align: left;
`;
