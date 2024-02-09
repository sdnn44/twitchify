// import dotenv from "dotenv";
// dotenv.config();

require("dotenv").config();

const APIkey = process.env.TWITCH_API_KEY;

const request = require("request");

const getToken = (url, callback) => {
  const options = {
    url: process.env.GET_TOKEN,
    json: true,
    body: {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  };

  request.post(options, (err, res, body) => {
    if (err) {
      return console.log("Error: " + err);
    }
    console.log("Staus: ");
    console.log(body);
    callback(res);
  });
};

var accessToken = "";

getToken(process.env.GET_TOKEN, (res) => {
  accessToken = res.body.access_token;
  return accessToken;
});

const getClips = (url, accessToken, callback) => {
  const clipOptions = {
    url: process.env.GET_CLIPS,
    method: "GET",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: "Bearer " + accessToken,
    },
  };

  request.get(clipOptions, (err, res, body) => {
    if (err) {
      return console.log("Error: " + err);
    }
    console.log(JSON.parse(body));
  });
};

setTimeout(() => {
  getClips(process.env.GET_CLIPS, accessToken, (response) => {});
}, 1000);
