import axios from "axios";
import Config from 'react-native-config';


// This works only off of the batch endpoint
const API_SERVER_URL = "https://profiles.segment.com";

export async function getTraits() {
  try {
    let data = await fetch(traitsEmailURL('igor@segment.com'));
    return data.data.traits;
  } catch (e) {
    console.log('Error fetching traits: ', e);
  }
}

function traitsIDFAURL(idfa) {
  return `${API_SERVER_URL}/v1/spaces/${Config.PROFILES_WORKSPACE_ID}/collections/users/profiles/ios.idfa:${idfa}/traits?limit=200`;
}

function traitsEmailURL(email) {
  return `${API_SERVER_URL}/v1/spaces/${Config.PROFILES_WORKSPACE_ID}/collections/users/profiles/email:${email}/traits?limit=200`;
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
