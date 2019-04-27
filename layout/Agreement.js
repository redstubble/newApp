import React, { Component } from 'react';
import Pdf from 'react-native-pdf';
import { Platform, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { CustomContainer } from '../components/CustomSnippets';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default function Agreement({ navigation }) {
  const uri = navigation.getParam('link');
  const name = navigation.getParam('name');
  console.log(uri);
  const source = { uri, cache: false };

  const pdfViewer =
    Platform.OS === 'ios' ? (
      <WebView
        source={{ uri }} // 'https://google.com'
        style={{ marginTop: 20 }}
      />
    ) : (
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
      />
    );
  return (
    <CustomContainer title={name} navigationAction={() => navigation.goBack()} icon="arrow-back">
      {pdfViewer}
    </CustomContainer>
  );
}
