import React, { PureComponent, Component } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { backgroundRed } from '../utils/colors';
import DateTime from '../components/dateTime';
import { UserProp, UserValue } from '../style/Text';

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  userProp: {
    fontSize: 14,
    marginBottom: 5,
    width: '100%',
    color: '#FEC2C2',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  userValue: {
    fontSize: 18,
    fontFamily: 'OCR A Std',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  barcodeValue: {
    fontSize: 18,
    fontFamily: 'OCR A Std',
    width: '100%',
  },
  dateProp: {
    fontSize: 14,
    marginBottom: 5,
    width: '100%',
    color: 'pink',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  dateValue: {
    fontSize: 14,
  },
});

export class MemberDetail extends Component {
  componentDidMount() {
    StatusBar.setHidden(true, true);
  }

  render({ memberNo, memberValue } = this.props) {
    return (
      <View
        style={{
          flex: 4,
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}
      >
        <View>
          <UserProp style={styles.userProp}>MEMBER NO: </UserProp>
          <UserValue style={styles.userValue}>{memberNo}</UserValue>
        </View>

        <View
          style={{
            maxWidth: '100%',
            overflow: 'hidden',
            flexWrap: 'wrap',
          }}
        >
          <UserProp style={styles.userProp}>MEMBER NAME: </UserProp>
          <UserValue style={styles.userValue}>{memberValue}</UserValue>
        </View>
      </View>
    );
  }
}

export class LandscapeView extends PureComponent {
  render({ background, backgroundCard, barcodeValue, barcodeImg, logo, children } = this.props) {
    const { height, width } = Dimensions.get('window');
    debugger;
    return (
      <React.Fragment>
        <View style={{ height, width, backgroundColor: 'blue' }}>
          <StatusBar hidden />
          <ImageBackground
            source={background}
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            resizeMode="cover"
          >
            <View
              style={{
                flex: 0.9,
                width: '80%',
              }}
            >
              <ImageBackground
                source={backgroundCard}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  width: '100%',
                }}
                resizeMode="stretch"
              >
                <View
                  style={{
                    flex: 0.9,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 50,
                    overflow: 'hidden',
                    flexWrap: 'wrap',
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Image source={logo} resizeMode="contain" style={{ flex: 2, width: '40%', height: '100%' }} />
                    {children}
                  </View>

                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        flex: 0.6,
                        padding: 20,
                        alignItems: 'center',
                        transform: [{ rotate: '90deg' }],
                      }}
                    >
                      <Image
                        source={{ uri: barcodeImg }}
                        resizeMode="stretch"
                        style={{ flex: 0.9, width: '100%', height: '80%' }}
                      />
                      <View
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          flex: 0.1,
                          alignSelf: 'center',
                        }}
                      >
                        <Text>
                          <UserValue
                            style={[
                              styles.barcodeValue,
                              {
                                fontSize: 18,
                                color: 'black',
                                width: '100%',
                              },
                            ]}
                          >
                            {`${barcodeValue}`}
                          </UserValue>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </ImageBackground>
        </View>
      </React.Fragment>
    );
  }
}

export class PortraitView extends Component {
  render({ barcodeValue, barcodeImg, logo } = this.props) {
    return (
      <ScrollView
        style={{ backgroundColor: backgroundRed }}
        contentContainerStyle={{
          margin: 40,
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={logo}
            style={{
              height: '100%',
              width: '100%',
              aspectRatio: 1.5,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <DateTime prop={styles.dateProp} value={styles.dateValue} toUpper />
        </View>
        {this.props.children}
        <View
          style={{
            flex: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              margin: 200,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <Image
              source={{ uri: barcodeImg }}
              style={{
                flex: 0.8,
                height: '100%',
                width: '80%',
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: 'white',
              }}
              resizeMode="stretch"
            />
            <View
              style={{
                alignSelf: 'center',
                paddingTop: 5,
                backgroundColor: 'white',
              }}
            >
              <Text>
                <UserValue
                  style={[
                    styles.barcodeValue,
                    {
                      textAlign: 'center',
                      fontSize: 22,
                      color: 'black',
                    },
                  ]}
                >
                  {`${barcodeValue}`}
                </UserValue>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export class HomeLoader extends PureComponent {
  render() {
    return (
      <View
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" hidesWhenStopped color="#000" />
      </View>
    );
  }
}
