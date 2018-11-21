import axios from "axios";
import Config from 'react-native-config';


// This works only off of the batch endpoint
const API_SERVER_URL = "https://profiles.segment.com";

export async function getTraits() {
  try {
    let data = await fetch(traitsIDFAURL('773D2B40-A6D7-48D9-94B5-FCBD80FB1302'));
    return data.data.traits;
  } catch (e) {
    console.log('Error fetching traits: ', e);
  }
}

function baseURL() {
  return `${API_SERVER_URL}/v1/spaces/${Config.PROFILES_WORKSPACE_ID}/collections/users/profiles`;
}

function traitsIDFAURL(idfa) {
  return `${baseURL()}/ios.idfa:${idfa}/traits?limit=200`;
}

function traitsEmailURL(email) {
  return `${baseURL()}/email:${email}/traits?limit=200`;
}

async function fetch(url) {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      auth: {
        username: Config.PROFILES_API_KEY,
        password: ""
      },
      //data: stringJSON
    });
    return response;
  } catch (e) {
    throw e;
  }
}
