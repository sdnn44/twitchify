// import dotenv from "dotenv";
// dotenv.config();

require("dotenv").config();
var cors = require("cors");

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
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: "Bearer " + accessToken,
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

app.get("/get-clips/:gameId/:periodTime?", async (req, res) => {
  const gameId = req.params.gameId;
  const periodTime = req.params.periodTime;

  const getToken = () => {
    return new Promise((resolve, reject) => {
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
          reject(err);
        } else {
          resolve(response.body.access_token);
        }
      });
    });
  };

  // Function to get clips using game ID
  const getClipsForGame = async (gameId, accessToken, clipOptionsUrl) => {
    const clipOptions = {
      url: clipOptionsUrl,
      method: "GET",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: "Bearer " + accessToken,
      },
    };

    return new Promise((resolve, reject) => {
      request.get(clipOptions, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  };

  try {
    const accessToken = await getToken();
    let clipOptionsUrl = `https://api.twitch.tv/helix/clips?game_id=${gameId}`;

    if (periodTime) {
      clipOptionsUrl += `&started_at=${periodTime}`;
    }
    const clips = await getClipsForGame(gameId, accessToken, clipOptionsUrl);
    res.json(clips);
  } catch (error) {
    console.error("Error fetching clips:", error);
    res.status(500).json({ error: "Failed to get clips" });
  }
});

// GET NEXT PAGE WITH CURSOR
app.get("/get-page/:gameId/:cursor?", async (req, res) => {
  const gameId = req.params.gameId;
  const cursor = req.params.cursor;

  const getToken = () => {
    return new Promise((resolve, reject) => {
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
          reject(err);
        } else {
          resolve(response.body.access_token);
        }
      });
    });
  };

  // Function to get clips using cursor
  const getNextPageClips = async (gameId, accessToken, clipOptionsUrl) => {
    const clipOptions = {
      url: clipOptionsUrl,
      method: "GET",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: "Bearer " + accessToken,
      },
    };

    return new Promise((resolve, reject) => {
      request.get(clipOptions, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  };

  try {
    const accessToken = await getToken();
    let clipOptionsUrl = `https://api.twitch.tv/helix/clips?game_id=${gameId}`;

    if (cursor) {
      clipOptionsUrl += `&after=${cursor}`;
    }
    const clips = await getNextPageClips(gameId, accessToken, clipOptionsUrl);
    res.json(clips);
  } catch (error) {
    console.error("Error fetching clips:", error);
    res.status(500).json({ error: "Failed to get clips" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
