import axios from 'axios';
import Config from 'react-native-config';
import { IDFA } from '@ptomasroos/react-native-idfa';
// This works only off of the batch endpoint
const API_SERVER_URL = 'https://profiles.segment.com';

export async function getTraits() {
  try {
    let requiredUrl = await traitsIDFAURL();
    console.log('url is', requiredUrl);
    let data = await fetch(requiredUrl);
    return data.data.traits;
  } catch (e) {
    console.log('Error fetching traits: ', e);
  }
}

export function getIDFA() {
  return new Promise((res, err) => {
    IDFA.getIDFA()
      .then(idfa => {
        console.log('Idfa', idfa);
        res(idfa);
      })
      .catch(e => {
        console.error(e);
        err(e);
      });
  });
}
function baseURL() {
  return `${API_SERVER_URL}/v1/spaces/${
    Config.PROFILES_WORKSPACE_ID
  }/collections/users/profiles`;
}

function traitsIDFAURL() {
  return new Promise((res, err) => {
    getIDFA()
      .then(data => {
        res(`${baseURL()}/ios.idfa:${data}/traits?limit=200`);
        // res(
        //   `${baseURL()}/ios.idfa:773D2B40-A6D7-48D9-94B5-FCBD80FB1302/traits?limit=200`
        // );
      })
      .catch(e => err(e));
  });
}

function traitsEmailURL(email) {
  return `${baseURL()}/email:${email}/traits?limit=200`;
}

async function fetch(url) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      auth: {
        username: Config.PROFILES_API_KEY,
        password: ''
      }
      //data: stringJSON
    });
    return response;
  } catch (e) {
    throw e;
  }
}
