// import dotenv from "dotenv";
// dotenv.config();

// require("dotenv").config();
import dotenv from 'dotenv';
import cors from "cors";
import express from "express";
import axios from "axios";

dotenv.config();

// const cors = require("cors");
// const request = require("request");
// const express = require("express");

// const axios = require("axios");

const app = express();
const PORT = 3000; // Or any other port you prefer

app.use(express.json());
app.use(
  cors({
    origin: ["https://twitchify.vercel.app"],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);

const getToken = async () => {
  const options = {
    url: process.env.GET_TOKEN,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  };

  const response = await axios(options);
  return response.data.access_token;
};

const twitchRequest = async (url, accessToken) => {
  const options = {
    method: "GET",
    url,
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios(options);
  return response.data;
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/get-clips", async (req, res) => {
  try {
    const accessToken = await getToken();
    let clipOptionsUrl = `https://api.twitch.tv/helix/clips?game_id=743&first=100`;

    const clips = await twitchRequest(clipOptionsUrl, accessToken);
    res.json(clips);
  } catch (error) {
    next(error);
  }
});

app.get("/get-clips/:gameId/:periodTime?", async (req, res) => {
  try {
    const { gameId, periodTime } = req.params;
    const accessToken = await getToken();
    let clipOptionsUrl = `https://api.twitch.tv/helix/clips?game_id=${gameId}&first=100`;

    if (periodTime) {
      clipOptionsUrl += `&started_at=${periodTime}`;
    }

    const clips = await twitchRequest(clipOptionsUrl, accessToken);
    res.json(clips);
  } catch (error) {
    next(error);
  }
});

app.get("/get-page/:gameId/:cursor/:periodTime?", async (req, res) => {
  try {
    const { gameId, cursor, periodTime } = req.params;
    const accessToken = await getToken();
    let clipOptionsUrl = `https://api.twitch.tv/helix/clips?game_id=${gameId}&first=100`;

    if (periodTime) {
      clipOptionsUrl += `&started_at=${periodTime}`;
    }

    if (cursor) {
      clipOptionsUrl += `&after=${cursor}`;
    }

    const clips = await twitchRequest(clipOptionsUrl, accessToken);
    res.json(clips);
  } catch (error) {
    next(error);
  }
});

app.get("/get-channel/:searchPhrase", async (req, res) => {
  try {
    const { searchPhrase } = req.params;
    const accessToken = await getToken();
    let clipOptionsUrl = `https://api.twitch.tv/helix/search/channels?query=${searchPhrase}`;

    const clips = await twitchRequest(clipOptionsUrl, accessToken);
    res.json(clips);
  } catch (error) {
    next(error);
  }
});

app.get("/get-clips-by-broadcasterid/:broadcasterId/:periodTime?", async (req, res) => {
  try {
    const { broadcasterId, periodTime } = req.params;
    const accessToken = await getToken();
    let clipOptionsUrl = `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&first=100`;

    if (periodTime) {
      clipOptionsUrl += `&started_at=${periodTime}`;
    }

    const clips = await twitchRequest(clipOptionsUrl, accessToken);
    res.json(clips);
  } catch (error) {
    next(error);
  }
});

app.get("/get-page-by-broadcasterid/:broadcasterId/:cursor/:periodTime?", async (req, res) => {
  try {
    const { broadcasterId, cursor, periodTime } = req.params;
    const accessToken = await getToken();
    let clipOptionsUrl = `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&first=100`;

    if (periodTime) {
      clipOptionsUrl += `&started_at=${periodTime}`;
    }

    if (cursor) {
      clipOptionsUrl += `&after=${cursor}`;
    }

    const clips = await twitchRequest(clipOptionsUrl, accessToken);
    res.json(clips);
  } catch (error) {
    next(error);
  }
});

app.get("/get-gameinfo/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const accessToken = await getToken();
    let clipOptionsUrl = `https://api.twitch.tv/helix/games?id=${gameId}`;

    const clips = await twitchRequest(clipOptionsUrl, accessToken);
    res.json(clips);
  } catch (error) {
    next(error);
  }
});

// // Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
