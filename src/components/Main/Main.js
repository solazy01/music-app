import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import Search from "../Search/Search";
import { useEffect, useState } from "react";
import musicDb from "../../services/api.service";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSearch = async (searchStr) => {
    setLoading(true);
    const url = `/v2/search?query=${searchStr}`;
    const resp = await musicDb.get(url);
    setData(resp.data.result);
    setLoading(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (search) getSearch(search);
  }, [search]);

  return loading ? (
    <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
      <Box
        sx={{
          paddingTop: "40vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={120} sx={{ color: "white" }} />
      </Box>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 10vw 0 10vw",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "black",
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
              sx={{
                display: "flex",
                fontWeight: "bold",
                color: "white",
                paddingRight: "2vw",
              }}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Box
              component="img"
              alt="YouTube Music logo"
              src="https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTubeMusic_Logo.png"
              sx={{ width: "200px", height: "200px" }}
            ></Box>
          </div>
          <Typography
            variant="h3"
            sx={{ color: "white", paddingBottom: "4vh" }}
          >
            YouTube Music Search
          </Typography>
          <div
            style={{
              paddingBottom: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
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
                color: "white",
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
                    navigate(`/artist/${artist.artist_id}`);
                  }}
                  variant="text"
                  sx={{ color: "white", fontSize: "1rem" }}
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
                color: "white",
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
