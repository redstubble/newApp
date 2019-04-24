import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import Environment from '../utils/environment';
import { setMemberAsync, setMemberBarcodeAsync } from '../utils/storageApi';
import Member from './dataTypes';

const subDir = Platform.OS === 'ios' ? 'childFolder' : 'childFolder/';
const fs = RNFetchBlob.fs;
const base64 = RNFetchBlob.base64;
const DIR = `${fs.dirs.CacheDir}/${subDir}`;

// https://davidwalsh.name/fetch-timeout - see comments
const fetchWithTimeout = (url, options) =>
  new Promise((resolve, reject) => {
    // Set timeout timer
    const timer = setTimeout(
      () => reject(new Error('Unable to connect, please check your internet connection')),
      20000, // 10 seconds
    );

    fetch(url, options)
      .then(response => resolve(response), err => reject(err))
      .finally(() => clearTimeout(timer));
  });

export class LoginAPI {
  constructor(e, p, FnDocsLoading) {
    this.populateHeaders(e, p);
    this.FnDocsLoading = FnDocsLoading;
    this.options = {
      method: 'POST',
      headers: this.head,
    };
  }

  populateHeaders(email, password) {
    this.head = new Headers();
    const auth = base64.encode(`${email}:${password}`);
    this.head.append('Authorization', `Basic ${auth}`);
    this.head.append('Access-Control-Allow-Origin', '*');
    this.head.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
  // Method
  signIn = async () => {
    let member = {};
    let responseBody = '';
    try {
      const response = await fetchWithTimeout(Environment.LOGIN_END_POINT, this.options);
      responseBody = await response.text();
      const JSONObj = responseBody ? JSON.parse(responseBody) || null : null;
      member = new Member(JSONObj);
      if (member.valid) {
        // agreements
        const agreementEntries = Object.entries(JSONObj.data.CollectiveAgreement);
        if (agreementEntries.length > 0) {
          this.FnDocsLoading({
            uploading: true,
            msg: `Downloading ${agreementEntries.length} documents`,
          });
        }
        await setMemberAsync(member.export());
        // download barcode
        debugger;
        const barCodeImg = await this.downloadBlob(JSONObj.data.BarcodeSource);
        if (barCodeImg) member.creds.barcode_img = barCodeImg;

        if (agreementEntries.length > 0) {
          const downloadAgreements = async () => {
            member.creds.collective_agreements = await this.downloadCollectiveAgreements(agreementEntries);

            if (member.creds.collective_agreements.length > 0) {
              await setMemberAsync(member.export());
              this.FnDocsLoading({
                uploading: false,
                msg: 'Completed download',
              }); // apply
            }
          };
          downloadAgreements();
        }
      }
    } catch (e) {
      console.log('Error', e);
      // Check if error on .json() returned string
      if (e instanceof SyntaxError && responseBody) {
        if (responseBody.startsWith('<!DOCTYPE html>')) {
          member.msg = 'Login Failed'; // username correct password wrong
        }
        if (responseBody === 'not authorized') {
          member.msg = 'Login Failed'; // username password incorrect
        }
      } else if (e.message) {
        member.msg = e.message; // time out
      }
      console.log(member.msg);
    }
    return member;
  };

  downloadCollectiveAgreements = async agreementEntries => {
    const total = agreementEntries.length;
    // const agreements = await Promise.all(
    const funcArray = agreementEntries.map((entry, i) => {
      const value = entry.slice(1)[0]; // need second element of array
      const { Doc: agreementMetaData, BelongsTo: agreementChildrenMetaData } = value;
      return async () => {
        this.FnDocsLoading({
          uploading: true,
          msg: `Downloading ${i + 1} of ${total} documents`,
        });
        const agreement = await this.downloadDocs(agreementMetaData.link);
        agreement.name = agreementMetaData.name;
        agreement.children = await agreementChildrenMetaData.map(async childMetaData => {
          console.log('Child Agreement', childMetaData);
          const child = await this.downloadDocs(childMetaData.link);
          child.name = childMetaData.name;
        });
        return agreement;
      };
    });

    const results = [];
    const appendResults = async p => {
      const r = await p;
      if (r) {
        results.push(r);
      }
    };
    const finalPromise = await funcArray.reduce(async (promise, asyncFn) => {
      await appendResults(promise);
      return asyncFn();
    }, Promise.resolve());
    await appendResults(finalPromise);
    return results;
  };

  getFileNameFromHttpResponse = disposition => {
    const result = disposition
      .split(';')[1]
      .trim()
      .split('=')[1];
    return result.replace(/"/g, '');
  };

  downloadBlob = async link => {
    const data = await fetch(link, this.options);
    console.log(data);
    debugger;
    const mime = data.headers.get('Content-Type');
    let result = false;
    if (mime.includes('png') && link.includes('barcode')) {
      debugger;

      const b = await data.blob();
      console.log('WELP');
      debugger;
      try {
        result = await this.readBlob(b);
        debugger;
        setMemberBarcodeAsync(result);
      } catch (rej) {
        console.log(rej);
      }
    }
    return result;
  };

  readBlob = blob => {
    debugger;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = f => {
        debugger;
        resolve(reader.result);
      };

      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };
      reader.readAsDataURL(blob);
    });
  };

  downloadDocs = async link => {
    let fileName = null;
    const data = await fetch(link, this.options);
    const mime = data.headers.get('Content-Type');
    const httpResponse = data.headers.get('Content-Disposition');
    if (httpResponse) fileName = this.getFileNameFromHttpResponse(httpResponse);
    const isDir = await fs.isDir(DIR);
    if (!isDir) {
      debugger;
      const t = fs.mkdir(DIR);
      debugger;
    }
    const path = `${DIR}/${fileName}`;
    debugger;
    try {
      const isDir = await fs.isDir(DIR);
      debugger;
      if (!isDir) throw 'Exception';
    } catch (e) {
      debugger;
      return new Error([`Unable to create local Directory ${DIR}`.psaApi]);
    }

    try {
      const res = await RNFetchBlob.config({
        path: path,
      }).fetch('GET', link);
      debugger;

      if (res) {
        console.log(`${fileName} downloaded to ${path}`);
        return {
          path,
          fileName,
          mime,
        };
      }
      throw new Error();
    } catch (e) {
      console.log('Error', `Unable to download ${fileName} to ${DIR}`);
    }
  };
}

export const signOut = async () => {
  try {
    const response = await fetch(Environment.LOGOUT_END_POINT);
    const body = await response.text();
    if (body) console.log('server logged out');
  } catch (e) {
    console.log(e);
    console.log('server log out failed');
  }
};
