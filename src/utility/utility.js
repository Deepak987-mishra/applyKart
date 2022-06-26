import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationService from "../navigation/NavigationService";
import { store } from "../store/configureStore";
import { types } from "../store/action/ActionTypes";
import { serviceUrl } from "../constants/serviceUrls";
import moment from "moment";

exports.apiCall = async function (url, body, method, token = null) {
  console.log(url, "url");

  if (!token) {
    token = await AsyncStorage.getItem("accessToken");
  }
  console.log("Token", token);
  return fetch(url, {
    method: method,
    headers: !token //anonymous apis
      ? {
          Accept: "application/json",
          "Content-Type": "application/json",
          "client-secret": "1QiLA0KICJhbGciOiJIUzI1NiJ9",
        }
      : {
          // logged in user
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
          "client-secret": "1QiLA0KICJhbGciOiJIUzI1NiJ9",
        },
    body: body ? JSON.stringify(body) : null,
  }).catch(err => {
    console.log("Something went wrong, please check your network.");
  });
};

// to refresh token by calling api BY PROMISE
exports.apiCallForRefreshToken = async function () {
  let refreshToken = await AsyncStorage.getItem("refreshToken");
  let deviceToken = await AsyncStorage.getItem("deviceToken");
  await AsyncStorage.removeItem("accessToken");

  return new Promise(function (resolve, reject) {
    resolve(
      exports
        .apiCall(
          `${serviceUrl.user}access-token/new`,
          {
            refreshToken: refreshToken,
            deviceToken: deviceToken,
          },
          "POST",
          null,
        )
        .then(function (response) {
          console.log("apiCallForRefreshTokenRES", response);
          if (response.status) {
            AsyncStorage.setItem("userTokens", JSON.stringify(response.data));
            AsyncStorage.setItem("accessToken", response.response.data.accessToken);
            // AsyncStorage.setItem('refreshToken', response.data.refreshToken);
          } else {
            AsyncStorage.multiRemove(["accessToken", "refreshToken", "deviceToken", "userTokens", "twitchTokens"])
              // AsyncStorage.clear()
              .catch(err => {
                console.log("can not be removed due to", err);
              });
            store.dispatch({
              type: types.RENDER_AGAIN_STACK_NAV,
            });
            NavigationService.reset(0, "IntroScreen");
            return true;
          }
        })
        .catch(function (error) {
          console.log("Error at utility in function3: apiCallForRefreshToken" + error + error.message);
          return { error: true, errorMessage: error };
        }),
    );
  });
};

export const uploadFileToAzure = async (uri, containername) => {
  let timestamp = moment().format("x");
  let file = {
    uri: uri,
    type: "image/jpeg",
    name: timestamp + ".jpg",
  };

  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      lang: "en",
    };
    const token = await AsyncStorageLib.getItem("accessToken");
    //   console.log("token =",token)
    if (token) {
      headers["access_token"] = token;
    }

    let res = await fetch(
      `https://applymedia.blob.core.windows.net/userprofileimages${file?.name}&container=${containername}`,
      {
        method: "GET",
        headers: headers,
        body: null,
        headers: headers,
      },
    );
    if (res.status !== 200) throw new Error("Image URL does not created!");
    res = await res.json();
    const azureRes = await fetch(res.message, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content": "image/png",
      },
    });

    if (azureRes.status !== 201) throw new Error("Image does not uploaded!");
    {
      return file?.name;
    }
  } catch (error) {
    throw error;
  }
};
