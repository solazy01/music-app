import axios from "axios";

export default axios.create({
  baseURL: "https://youtube-music1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
    "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
  },
});
