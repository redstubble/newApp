import React, { Component } from 'react';
import { DrawerActions } from 'react-navigation';
import { View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getMemberDataAsync } from '../utils/storageApi';
import { textWhite, backgroundRed } from '../utils/colors';
import { CustomSpinner, CustomContainer, CustomUserMessage } from '../components/CustomSnippets';
import { updateDocumentState } from '../redux-actions';

const hashCode = str =>
  str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0);

const CollectiveAgreement = props => {
  const { navigation, agreement } = props;
  return (
    <View
      style={{
        flex: 1,
        margin: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: textWhite,
      }}
    >
      <Icon name="file" type="material-community" size={32} color={backgroundRed} iconStyle={{ marginRight: 10 }} />
      <Text
        style={{ color: 'black' }}
        onPress={() =>
          navigation.navigate('Agreement', {
            link: agreement.path,
            name: agreement.name,
          })
        }
      >
        {agreement.name}
      </Text>
    </View>
  );
};

class Documents extends Component {
  state = {
    memberRequestCompleted: false,
    member: false,
  };

  componentDidMount() {
    this.populateMemberData();
  }

  componentWillReceiveProps() {
    this.setState({ memberRequestCompleted: false });
    this.populateMemberData();
  }

  populateMemberData = async () => {
    const member = await getMemberDataAsync();
    if (!member.valid) console.error('Member Data Invalid Error');
    this.setState({
      member,
      memberRequestCompleted: true,
    });
  };

  render({ navigation, uploading, msg } = this.props) {
    let agreements = null;
    const {
      memberRequestCompleted,
      member: { collective_agreements: agreementsArr },
    } = this.state;
    if (memberRequestCompleted) {
      if (uploading) {
        return <CustomUserMessage msg={msg} />;
      }

      agreements = agreementsArr.map((agreement, k) => (
        <CollectiveAgreement
          navigation={navigation}
          agreement={agreement}
          key={hashCode(agreement.fileName.slice(0, 15) + agreement.path.slice(-10))}
        />
      ));
    } else {
      agreements = <CustomSpinner />;
    }
    return (
      <CustomContainer navigationAction={() => navigation.dispatch(DrawerActions.openDrawer())} title="Documents">
        <ScrollView>{agreements}</ScrollView>
      </CustomContainer>
    );
  }
}

const mapStateToProps = state => ({
  uploading: state.uploading,
  msg: state.msg,
});

const mapDispatchToProps = dispatch => ({
  dispatchDocumentState: bool => dispatch(updateDocumentState(bool)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Documents);
