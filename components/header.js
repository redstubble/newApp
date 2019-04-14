import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { textWhite, headerRed } from '../utils/colors';

const HeaderText = styled.Text`
  font-size: 18;
  color: ${textWhite};
  align-items: center;
  text-align: left;
  font-weight: 500;
`;

const HeaderView = styled.View`
  background-color: ${headerRed};
  align-self: stretch;
  padding-left: 20px;
  padding-top: 20px;
  height: 60px;
  ${{
    shadowColor: 'black',
    shadowOffset: '20px 10px',
    shadowRadius: 50,
  }};
`;

class Header extends React.Component {
  renderView = (content) => <HeaderView>{content}</HeaderView>;

  render({ text } = this.props) {
    const content = <HeaderText>{text}</HeaderText>;
    return this.renderView(content);
  }
}

export default Header;

Header.propTypes = {
  text: PropTypes.string.isRequired,
};
