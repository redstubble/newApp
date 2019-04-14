// @flow
import { AsyncStorage } from 'react-native';

export const MEMBER_KEY = 'PSAMember';
export const BARCODE_KEY = 'PSABarcodeData';

export const setMemberAsync = async (JSONData) => {
  try {
    const result = await AsyncStorage.setItem(MEMBER_KEY, JSONData);
    console.info('AsyncSetMember', result);
    return result;
  } catch (e) {
    console.log('AsyncSetMember', e.message);
    return false;
  }
};

export const getMemberDataAsync = async () => {
  try {
    const JSONData = await AsyncStorage.getItem(MEMBER_KEY);
    if (JSONData && JSON.parse(JSONData)) {
      return JSON.parse(JSONData);
    }
  } catch (e) {
    console.log('getMemberDataAsync', e.message);
  }
  return false;
};

export const setMemberBarcodeAsync = async (BarcodeBase64) => {
  let result = false;
  try {
    console.log(BARCODE_KEY);
    result = await AsyncStorage.setItem(BARCODE_KEY, BarcodeBase64);
    console.info('AsyncSetBarcode', result);
  } catch (e) {
    console.log('AsyncSetBarcode', e.message);
  }
  return result;
};

export const getMemberBarcodeAsync = async () => {
  console.log(BARCODE_KEY);
  const barcode = await AsyncStorage.getItem(BARCODE_KEY);
  return barcode;
};

export const removeMemberBarcodeAsync = async () => {
  try {
    await AsyncStorage.removeItem(BARCODE_KEY);
  } catch (e) {
    console.log('Error', e.message);
  }
};

export const removeMemberDataAsync = async () => {
  try {
    await AsyncStorage.removeItem(MEMBER_KEY);
  } catch (e) {
    console.log('Error', e.message);
  }
};
