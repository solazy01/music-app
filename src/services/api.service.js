import axios from "axios";

export default axios.create({
  baseURL: "https://youtube-music1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "590342ec98mshca2893ee0d1c529p113b71jsn1b113c7f70d5",
    "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com",
  },
});
