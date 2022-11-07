import { Box, Button, Divider, Typography } from "@mui/material";
import Search from "../Search/Search";
import { useEffect, useState } from "react";
import musicDb from "../../services/api.service";

const Main = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const getSearch = async (searchStr) => {
    const url = `/v2/search?query=${searchStr}`;
    const resp = await musicDb.get(url);
    setData(resp.data.result);
    console.log(resp.data.result);
  };

  useEffect(() => {
    if (search) getSearch(search);
  }, [search]);

  return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
      <div style={{ justifyContent: "center" }}>
        <Box
          component="img"
          alt="YouTube Music logo"
          src="https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTubeMusic_Logo.png"
          sx={{ width: "200px", height: "200px" }}
        ></Box>
      </div>
      <Typography variant="h3">YouTube Music Search</Typography>
      <div style={{ paddingBottom: "15px" }}>
        <Search
          onChange={(search) => {
            setSearch(search);
          }}
        />
      </div>
      {data.songs?.map((item) => (
        <div
          style={{
            width: "80vw",
            paddingLeft: "10vw",
            paddingRight: "10wv",
          }}
        >
          <div
            style={{
              display: "flex",
              paddingTop: "5px",
              paddingBottom: "5px",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={item.thumbnail}
              sx={{ width: "50px", height: "50px" }}
            ></Box>
            <Typography
              sx={{
                display: "flex",
                width: "21vw",
                paddingLeft: "2vw",
                paddingRight: "2vw",
              }}
            >
              {item.title}
            </Typography>
            <div
              style={{
                width: "25vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {item.artists?.map((artist) => (
                <Button variant="text" sx={{ color: "black" }}>
                  {artist.name}
                </Button>
              )) || ""}
            </div>
            <Typography
              sx={{ display: "flex", width: "25vw", justifyContent: "right" }}
            >
              {item.album.name}
            </Typography>
          </div>
          <Divider variant="middle" />
        </div>
      )) || ""}
    </div>
  );
};

export default Main;
