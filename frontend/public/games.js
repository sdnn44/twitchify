import { handleGameClick } from "@/app/api/fetchClips";

export const games = [
  {
    id: 1,
    game_name: "Just Chatting",
    game_img: "/justchatting.jpg",
    game_id: "509658",
    onGameClick: handleGameClick
  },
  {
    id: 2,
    game_name: "League of Legends",
    game_img: "/lol.png",
    game_id: "21779",
    onGameClick: handleGameClick
  },
  {
    id: 3,
    game_name: "Counter-Strike 2",
    game_img: "/cs2.png",
    game_id: "32399",
    onGameClick: handleGameClick
  },
  {
    id: 4,
    game_name: "Grand Theft Auto V",
    game_img: "/gta.jpg",
    game_id: "32982",
    onGameClick: handleGameClick
  },
  {
    id: 5,
    game_name: "Fortnite",
    game_img: "/fortnite.jpg",
    game_id: "33214",
    onGameClick: handleGameClick
  },
  {
    id: 6,
    game_name: "VALORANT",
    game_img: "/valorant.png",
    game_id: "516575",
    onGameClick: handleGameClick
  },
  {
    id: 7,
    game_name: "Dota 2",
    game_img: "/dota2.png",
    game_id: "29595",
    onGameClick: handleGameClick
  },
  {
    id: 8,
    game_name: "Apex Legends",
    game_img: "/apex.jpg",
    game_id: "511224",
    onGameClick: handleGameClick
  },
];
