const axios = require("axios");
const settings = require("./config/config");

const urlChecking = "https://raw.githubusercontent.com/Hunga9k50doker/APIs-checking/refs/heads/main/endpoints.json";

async function checkBaseUrl() {
  if (settings.ADVANCED_ANTI_DETECTION) {
    const result = await getBaseApi(urlChecking);
    if (result.endpoint) {
      return result;
    }
  } else {
    return {
      endpoint: settings.BASE_URL,
    };
  }
}

async function getBaseApi(url) {
  try {
    const response = await axios.get(url);
    const content = response.data;
    if (content?.zoo) {
      return { endpoint: content.zoo };
    } else {
      return {
        endpoint: null,
      };
    }
  } catch (e) {
    return {
      endpoint: null,
    };
  }
}

module.exports = { checkBaseUrl };
