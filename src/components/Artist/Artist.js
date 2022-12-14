import { Box, Button, CircularProgress, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import musicDb from "../../services/api.service";
import { useNavigate, useParams } from "react-router-dom";
import "./Artist.css";

const Artist = () => {
  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState({});
  const [expanded, setExpanded] = useState(false);
  const params = useParams();
  const GetAll = async () => {
    setLoading(true);
    const resp = await musicDb.get(
      `v2/get_artist?artist_id=${params.artistId}`
    );
    setArtist(resp.data.result);
    setLoading(false);
  };
  const GetOnPage = async (id) => {
    setLoading(true);
    const resp = await musicDb.get(`v2/get_artist?artist_id=${id}`);
    setArtist(resp.data.result);
    setLoading(false);
  };
  const expandHandler = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  useEffect(() => {
    GetAll();
  }, []);

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      {loading ? (
        <Box
          sx={{
            paddingTop: "40vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={120} sx={{ color: "white" }} />
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "500px",
              backgroundImage: `url(${artist.thumbnail})`,
              backgroundSize: "cover",
              backgroundPositionY: "20%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0),  rgba(0,0,0,1))",
                alignItems: "flex-end",
                justifyContent: "left",
                paddingLeft: "10vw",
              }}
            >
              {artist.songs ? (
                <div>
                  <Typography
                    variant="h2"
                    sx={{
                      display: "flex",
                      color: "white",
                      paddingBottom: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {artist.songs[0].artists[0].name}
                  </Typography>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "10vw",
              paddingRight: "10vw",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                backgroundColor: "black",
                width: "50%",
                flexDirection: "column",
              }}
            >
              {expanded ? (
                <div style={{ paddingBottom: "3vh" }}>
                  <Typography sx={{ color: "white", textAlign: "left" }}>
                    {artist.description ? artist.description : ""}
                  </Typography>
                  <Button
                    variant="text"
                    sx={{ color: "white", display: "flex", paddingLeft: "0" }}
                    onClick={expandHandler}
                  >
                    Show Less
                  </Button>
                </div>
              ) : (
                <div style={{ paddingBottom: "3vh" }}>
                  <Typography sx={{ color: "white", textAlign: "left" }}>
                    {artist.description?.substring(0, 95) || ""}...
                  </Typography>
                  <Button
                    variant="text"
                    sx={{ color: "white", display: "flex", paddingLeft: "0" }}
                    onClick={expandHandler}
                  >
                    Show More
                  </Button>
                </div>
              )}
            </div>
            <div style={{ paddingBottom: "4vh" }}>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  display: "flex",
                  paddingBottom: "2vh",
                }}
              >
                Compositions
              </Typography>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {artist.songs?.map((song) => (
                  <div
                    style={{ display: "flex", flexDirection: "row" }}
                    key={song.id}
                  >
                    <div style={{ display: "flex", paddingBottom: "5px" }}>
                      <Box
                        component="img"
                        src={song.thumbnail}
                        sx={{ height: "50px", width: "50px" }}
                      ></Box>
                      <div
                        style={{
                          display: "flex",
                          paddingLeft: "1vw",
                          alignItems: "center",
                          width: "25vw",
                        }}
                      >
                        <Typography sx={{ color: "white", display: "flex" }}>
                          {song.title}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25vw",
                          justifyContent: "center",
                        }}
                      >
                        {song.artists?.map((artist) => (
                          <Link
                            key={artist.artist_id}
                            component="button"
                            underline="none"
                            onClick={() => {
                              GetOnPage(artist.artist_id);
                            }}
                            variant="text"
                            sx={{
                              color: "white",
                              fontSize: "1rem",
                              paddingRight: "1vw",
                            }}
                          >
                            {artist.name}
                          </Link>
                        )) || ""}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "25vw",
                          justifyContent: "right",
                        }}
                      >
                        <Link
                          component="button"
                          underline="none"
                          onClick={() => {
                            navigate(`/album/${song.album.album_id}`);
                          }}
                          variant="text"
                          sx={{ color: "white", fontSize: "1rem" }}
                        >
                          {song.album.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                )) || ""}
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "1vh" }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    display: "flex",
                  }}
                >
                  Albums
                </Typography>
              </div>
              <div
                style={{ display: "flex", overflowX: "scroll" }}
                className="Flipped"
              >
                {artist.albums?.map((album) => (
                  <div
                    className="Flipped"
                    style={{
                      paddingRight: "2.4vw",
                      display: "flex",
                      flexDirection: "column",
                      width: "11vw",
                    }}
                  >
                    <Box
                      component="img"
                      src={album.thumbnail}
                      sx={{
                        display: "flex",
                        paddingTop: "2.4vh",
                      }}
                      onClick={() => {
                        navigate(`/album/${album.album_id}`);
                      }}
                    />
                    <Link
                      component="button"
                      variant="h6"
                      underline="none"
                      sx={{
                        paddingTop: "1vh",
                        display: "flex",
                        color: "white",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        navigate(`/album/${album.album_id}`);
                      }}
                    >
                      {album.title}
                    </Link>
                    <Typography
                      sx={{
                        display: "flex",
                        fontWeight: "bold",
                        color: "gray",
                        justifyContent: "center",
                      }}
                    >
                      {album.year}
                    </Typography>
                  </div>
                )) || ""}
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "1vh" }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    display: "flex",
                  }}
                >
                  Singles
                </Typography>
              </div>
              <div
                style={{ display: "flex", overflowX: "scroll" }}
                className="Flipped"
              >
                {artist.singles?.map((album) => (
                  <div
                    className="Flipped"
                    style={{
                      paddingRight: "2.4vw",
                      display: "flex",
                      flexDirection: "column",
                      width: "11vw",
                      paddingBottom: "2vh",
                    }}
                  >
                    <Box
                      component="img"
                      src={album.thumbnail}
                      sx={{
                        display: "flex",
                        paddingTop: "2.4vh",
                      }}
                      onClick={() => {
                        navigate(`/album/${album.album_id}`);
                      }}
                    />
                    <Link
                      component="button"
                      variant="h6"
                      underline="none"
                      sx={{
                        paddingTop: "1vh",
                        display: "flex",
                        color: "white",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        navigate(`/album/${album.album_id}`);
                      }}
                    >
                      {album.title}
                    </Link>
                    <Typography
                      sx={{
                        display: "flex",
                        fontWeight: "bold",
                        color: "gray",
                        justifyContent: "center",
                      }}
                    >
                      {album.year}
                    </Typography>
                  </div>
                )) || ""}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Artist;
