// import dotenv from "dotenv";
// dotenv.config();

require("dotenv").config();
var cors = require('cors');

const request = require("request");

const express = require("express");
const app = express();

const PORT = 3000; // Or any other port you prefer

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);

// Endpoint to get access token and clips
app.get("/get-clips", (req, res) => {
  // Function to get access token
  const getToken = (callback) => {
    const options = {
      url: process.env.GET_TOKEN,
      json: true,
      body: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      },
    };

    request.post(options, (err, response, body) => {
      if (err) {
        return callback(err);
      }
      callback(null, response.body.access_token);
    });
  };

  // Function to get clips using access token
  const getClips = (accessToken, callback) => {
    const clipOptions = {
      url: "https://api.twitch.tv/helix/clips?game_id=743",
      method: "GET",
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': "Bearer " + accessToken,
      },
    };

    request.get(clipOptions, (err, response, body) => {
      if (err) {
        return callback(err);
      }
      callback(null, JSON.parse(body));
    });
  };

  // Get token and then get clips
  getToken((err, accessToken) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get access token" });
    }

    getClips(accessToken, (err, clips) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get clips" });
      }
      res.json(clips);
    });
  });
});

app.get("/get-clips/:gameId", (req, res) => {
  const gameId = req.params.gameId;

  const getToken = (callback) => {
    const options = {
      url: process.env.GET_TOKEN,
      json: true,
      body: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      },
    };

    request.post(options, (err, response, body) => {
      if (err) {
        return callback(err);
      }
      callback(null, response.body.access_token);
    });
  };

  // Function to get clips using game ID
  const getClipsForGame = (gameId, accessToken, callback) => {
    const clipOptions = {
      url: `https://api.twitch.tv/helix/clips?game_id=${gameId}`,
      method: "GET",
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': "Bearer " + accessToken,
      },
    };

    request.get(clipOptions, (err, response, body) => {
      if (err) {
        return callback(err);
      }
      callback(null, JSON.parse(body));
    });
  };

  getToken((err, accessToken) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get access token" });
    }

    getClipsForGame(gameId, accessToken, (err, clips) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get clips" });
      }
      res.json(clips);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
