import React, { Component } from 'react';
import PDFReader from 'rn-pdf-reader-js';
import { WebView, Platform } from 'react-native';
import { CustomContainer } from '../components/CustomSnippets';

export default class Document extends Component {
  render({ navigation } = this.props) {
    console.log(this.props.navigation.getParam('link'));

    const pdfViewer =
      Platform.OS === 'ios' ? (
        <WebView
          source={{ uri: this.props.navigation.getParam('link') }} //'https://google.com'
          style={{ marginTop: 20 }}
        />
      ) : (
        <PDFReader
          source={{
            uri: this.props.navigation.getParam('link'),
          }}
        />
      );
    return (
      <CustomContainer
        title={this.props.navigation.getParam('name')}
        navigationAction={() => navigation.goBack()}
        icon="arrow-back"
      >
        {pdfViewer}
      </CustomContainer>
    );
  }
}
