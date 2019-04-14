import React, { Component } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  Image,
  View,
  Linking,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CustomSafeAreaView } from '../style/Text';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import DateTime from '../components/dateTime';
import Header from '../components/header';
import CustomTextInput from '../components/customTextInput';
import Images from '../assets/images';
import * as PsaApi from '../utils/psaApi';
import { updateDocumentState } from '../redux-actions';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: '100%',
    backgroundColor: '#000',
  },
  textLink: {
    margin: 5,
    color: textWhite,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  state = {
    email: '',
    password: '',
    isLoggingIn: false,
    msg: null,
  };

  handleEmailChange(n) {
    this.setState({ email: n });
  }
  handlePasswordChange(p) {
    this.setState({ password: p });
  }

  userLogin = async () => {
    const { navigation, dispatchDocumentState } = this.props;
    this.setState({ isLoggingIn: true, msg: '' });
    const psaApi = new PsaApi.LoginAPI(
      this.state.email,
      this.state.password,
      (obj) => dispatchDocumentState(obj),
    );
    const member = await psaApi.signIn(); // timeout 10 seconds
    this.setState({ isLoggingIn: false });
    if (member.valid) {
      navigation.navigate('App');
    } else {
      const msg = member.msg || 'Login failed';
      console.log(msg);
      this.setState({ msg });
    }
  };

  render() {
    return (
      <CustomSafeAreaView style={[styles.container]}>
        <Header text="Login to PSA" />
        <ScrollView
          style={{ backgroundColor: backgroundRed }}
          contentContainerStyle={
            {
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 40,
              paddingTop: 20,
              flexGrow: 1,
            }
            // justifyContent: 'space-between',
          }
        >
          <KeyboardAvoidingView
            style={{
              flex: 0,
              height: '100%',
            }}
            behavior="padding"
            enabled
          >
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Image
                source={Images.PSALogo}
                style={{
                  height: 65,
                  width: 1000,
                  aspectRatio: 1.5,
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <DateTime />
              </View>
              <View style={{ flex: 1, marginTop: 20, width: '100%' }}>
                <CustomTextInput
                  controlFunc={this.handleEmailChange}
                  name="Email"
                  styles={{
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                    borderColor: 'darkred',
                    borderBottomWidth: 2,
                  }}
                />
                <CustomTextInput
                  controlFunc={this.handlePasswordChange}
                  name="Password"
                  password
                  styles={{
                    borderBottomLeftRadius: 2,
                    borderBottomRightRadius: 2,
                  }}
                />
                <View style={{ flexBasis: 1, paddingTop: 10, minHeight: 40 }}>
                  {this.state.isLoggingIn ? (
                    <ActivityIndicator
                      size="large"
                      hidesWhenStopped
                      color="#fff"
                      animating={this.state.isLoggingIn}
                    />
                  ) : (
                      <Text
                        style={{
                          fontSize: 18,
                          color: textWhite,
                          textAlign: 'center',
                          marginTop: 'auto',
                        }}
                      >
                        {this.state.msg}
                      </Text>
                    )}
                </View>
              </View>
              <View style={{ flex: 2, paddingTop: 10, width: '100%' }}>
                <Button
                  disabled={
                    this.state.isLoggingIn ||
                    !this.state.email ||
                    !this.state.password
                  }
                  onPress={this.userLogin}
                  title="Login"
                  color="white"
                  buttonStyle={{
                    marginLeft: -25,
                    marginRight: -25,
                    backgroundColor: 'darkred',
                    borderRadius: 4,
                  }}
                  disabledStyle={{ backgroundColor: 'darkred' }}
                  disabledTextStyle={{ color: 'red' }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={styles.textLink}
                onPress={() =>
                  Linking.openURL(
                    'https://www.psa.org.nz/psasecurity/lostpassword',
                  )
                }
              >
                Forgot Login?
              </Text>
              <Text
                style={styles.textLink}
                onPress={() =>
                  Linking.openURL('https://www.psa.org.nz/register')
                }
              >
                Not Registered?
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </CustomSafeAreaView>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  debugger;
  return {
    documentsLoading: state.uploading,
    msg: state.msg,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDocumentState: (state) => dispatch(updateDocumentState(state)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login); // passes dispatch to component.
