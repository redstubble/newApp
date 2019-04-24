import React from 'react';
import { DrawerActions } from 'react-navigation';
import { Dimensions } from 'react-native';
import { PropTypes } from 'prop-types';
// import { Asset } from 'react-native-unimodules';
import Head from '../components/headerSignedIn';
import Images from '../assets/images';
import { getMemberDataAsync, getMemberBarcodeAsync } from '../utils/storageApi';
import Orientation from '../utils/orientation';
import { HomeLoader, LandscapeView, PortraitView, MemberDetail } from './Home_view';
import { CustomContainer, CustomSpinner } from '../components/CustomSnippets';

const landscapeBackground = require('../assets/img/hor-bg.jpg');
const landscapeBackgroundCard = require('../assets/img/credit-bg.png');
const OCRAStd = require('../assets/fonts/OCRAStd.ttf');

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map(font);
}

class Home extends React.Component {
  state = {
    memberRequestCompleted: false,
    isReady: false,
    portraitOrientation: Orientation.isPortrait() === true,
    member: {
      first_name: '',
      surname: '',
      email: '',
      member_no: '',
      barcode_source: '',
      barcode_no: 0,
      barcode_img: '',
    },
  };

  componentDidMount() {
    this.handleOrientation = () =>
      this.setState({
        portraitOrientation: Orientation.isPortrait() === true,
      });
    Dimensions.addEventListener('change', this.handleOrientation);
    this.populateMemberData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientation);
  }

  // loadAssetsAsync = async () => {
  //   const imageAssets = cacheImages([
  //     landscapeBackground,
  //     landscapeBackgroundCard,
  //   ]);

  //   const fontAssets = cacheFonts([
  //     {
  //       'OCR A Std': OCRAStd,
  //     },
  //   ]);

  //   await Promise.all([...imageAssets, ...fontAssets]);
  // };

  populateMemberData = async () => {
    const member = await getMemberDataAsync();
    const barcode = await getMemberBarcodeAsync();
    debugger;
    if (!member.valid) console.error('Member Data Invalid Error');
    else console.log(barcode);
    this.setState({
      member,
      barcode,
      memberRequestCompleted: true,
      isReady: true,
    });
  };

  memberView = m => {
    const barcodeValue = m.barcode_no;
    const barcodeImg = this.state.barcode;
    const logo = Images.PSALogo;
    const memberNo = m.member_no;
    const memberValue = `${m.first_name.toUpperCase()} ${m.surname.toUpperCase()}`;
    if (this.state.portraitOrientation) {
      console.log(this.state);

      return (
        <PortraitView barcodeValue={barcodeValue} barcodeImg={barcodeImg} logo={logo}>
          <MemberDetail
            memberNo={m.member_no}
            memberValue={`${m.first_name.toUpperCase()} ${m.surname.toUpperCase()}`}
          />
        </PortraitView>
      );
    }
    return (
      <LandscapeView
        background={landscapeBackground}
        backgroundCard={landscapeBackgroundCard}
        barcodeValue={barcodeValue}
        barcodeImg={barcodeImg}
        logo={logo}
      >
        <MemberDetail memberNo={memberNo} memberValue={memberValue} />
      </LandscapeView>
    );
  };

  header = navigation => (
    <Head icon="menu" action={() => navigation.dispatch(DrawerActions.openDrawer())} title="Home" />
  );

  render({ navigation } = this.props) {
    const m = this.state.member;
    debugger;
    // if (!this.state.isReady) {
    //   return (
    //     <CustomContainer title="Home" navigationAction={() => navigation.dispatch(DrawerActions.openDrawer())}>
    //       <CustomSpinner visible />
    //     </CustomContainer>
    //     // <AppLoading
    //     //   startAsync={this.loadAssetsAsync}
    //     //   onFinish={() => this.setState({ isReady: true })}
    //     //   onError={console.warn}
    //     // />
    //   );
    // }

    return (
      <CustomContainer
        title="Home"
        navigationAction={() => navigation.dispatch(DrawerActions.openDrawer())}
        hideHeader={!this.state.portraitOrientation}
      >
        {this.state.memberRequestCompleted && this.state.isReady ? this.memberView(m) : <HomeLoader />}
      </CustomContainer>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
