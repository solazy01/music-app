import { Box, Button, Divider, Link, Typography } from "@mui/material";
import Search from "../Search/Search";
import { useEffect, useState } from "react";
import musicDb from "../../services/api.service";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);

  const getSearch = async (searchStr) => {
    const url = `/v2/search?query=${searchStr}`;
    const resp = await musicDb.get(url);
    setData(resp.data.result);
    console.log(resp.data.result);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (search) getSearch(search);
  }, [search]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px 10vw 0 10vw",
        justifyContent: "center",
      }}
    >
      {searched ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              alt="YouTube Music logo"
              src="https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTubeMusic_Logo.png"
              sx={{ width: "60px", height: "60px" }}
            ></Box>
            <Typography
              variant="h4"
              sx={{ display: "flex", fontWeight: "bold" }}
            >
              Search
            </Typography>
            <div>
              <Search
                onChange={(search) => {
                  setSearch(search);
                }}
                value={search}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
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
                setSearched(true);
              }}
            />
          </div>
        </div>
      )}
      {data.songs?.map((item) => (
        <div
          style={{
            width: "80vw",
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
                <Link
                  component="button"
                  underline="none"
                  onClick={() => {
                    navigate(`/`);
                  }}
                  variant="text"
                  sx={{ color: "black", fontSize: "1rem" }}
                >
                  {artist.name}
                </Link>
              )) || ""}
            </div>
            <Link
              component="button"
              underline="none"
              sx={{
                display: "flex",
                width: "25vw",
                justifyContent: "right",
                color: "black",
                fontSize: "1rem",
              }}
              onClick={() => {
                navigate(`/album/${item.album.album_id}`);
              }}
            >
              {item.album.name}
            </Link>
          </div>
          <Divider variant="middle" />
        </div>
      )) || ""}
    </div>
  );
};

export default Main;
