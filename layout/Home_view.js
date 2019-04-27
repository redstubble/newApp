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
import { backgroundRed, pink, black, textShadow, backgroundWhite } from '../utils/colors';
import DateTime from '../components/dateTime';
import { UserProp, UserValue } from '../style/Text';

const styles = StyleSheet.create({
  barcodeValue: {
    fontFamily: 'OCR A Std',
    fontSize: 18,
    width: '100%',
  },
  dateProp: {
    color: pink,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    width: '100%',
  },
  dateValue: {
    fontSize: 14,
  },
  flexParent: {
    alignItems: 'flex-start',
    flex: 4,
    justifyContent: 'space-around',
  },
  flexWrapper: {
    flexWrap: 'wrap',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  userProp: {
    color: pink,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    marginBottom: 5,
    width: '100%',
  },
  userValue: {
    flexWrap: 'wrap',
    fontFamily: 'OCR A Std',
    fontSize: 18,
    overflow: 'hidden',
    textShadowColor: textShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
});

export function MemberDetail({ memberNo, memberValue }) {
  return (
    <View style={styles.flexParent}>
      <View>
        <UserProp style={styles.userProp}>MEMBER NO: </UserProp>
        <UserValue style={styles.userValue}>{memberNo}</UserValue>
      </View>

      <View style={styles.flexWrapper}>
        <UserProp style={styles.userProp}>MEMBER NAME: </UserProp>
        <UserValue style={styles.userValue}>{memberValue}</UserValue>
      </View>
    </View>
  );
}

export function LandscapeView({ background, backgroundCard, barcodeValue, barcodeImg, logo, children }) {
  const { height, width } = Dimensions.get('window');
  return (
    <React.Fragment>
      <View style={{ height, width }}>
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
                      backgroundColor: backgroundWhite,
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
                          {barcodeValue}
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

export function PortraitView({ barcodeValue, barcodeImg, logo, children }) {
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
      {children}
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
                {barcodeValue}
              </UserValue>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const homeLoaderStyles = {
  marginTop: 'auto',
  marginBottom: 'auto',
};
export function HomeLoader() {
  return (
    <View style={homeLoaderStyles}>
      <ActivityIndicator size="large" hidesWhenStopped color="#000" />
    </View>
  );
}
