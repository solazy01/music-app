import {
  Box,
  CircularProgress,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import musicDb from "../../services/api.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Album = () => {
  const params = useParams();
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(false);
  const getAlbum = async () => {
    setLoading(true);
    const resp = await musicDb.get(`/v2/get_album?album_id=${params.albumId}`);
    setAlbum(resp.data.result);
    setLoading(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    getAlbum();
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
        <div>
          <div style={{ display: "flex", padding: "40px 10vw 20px 10vw" }}>
            <div>
              <Box
                component="img"
                src={album.thumbnail}
                sx={{ height: "200px", width: "200px" }}
              ></Box>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                paddingLeft: "1vw",
              }}
            >
              <div style={{ marginBottom: "auto" }}></div>
              <Typography
                variant="h3"
                style={{
                  display: "flex",
                  color: "white",
                  fontWeight: "bold",
                  paddingBottom: "10px",
                }}
              >
                {album.title}
              </Typography>
              {album.artists?.map((item) => (
                <Link
                  component="button"
                  variant="h4"
                  underline="none"
                  sx={{ display: "flex", color: "white", paddingBottom: "5px" }}
                  onClick={() => {
                    navigate(`/artist/${item.artist_id}`);
                  }}
                >
                  {item.name}
                </Link>
              )) || ""}
              <div style={{ display: "flex" }}>
                <Typography sx={{ display: "flex", color: "white" }}>
                  Released: {album.year}
                </Typography>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1vh 10vw 1vh 10vw",
              justifyContent: "left",
            }}
          >
            {album.songs?.map((item, index) => (
              <div>
                <div
                  style={{
                    display: "flex",
                    height: "40px",
                    alignItems: "center",
                  }}
                >
                  <Typography key={index} sx={{ color: "white" }}>
                    {index + 1}.
                  </Typography>
                  <div
                    style={{
                      flexGrow: 1,
                      paddingLeft: "10px",
                      justifyContent: "left",
                    }}
                  >
                    <Typography sx={{ display: "flex", color: "white" }}>
                      {item.title}
                    </Typography>
                  </div>
                  <Typography key={item.id} sx={{ color: "white" }}>
                    {Math.floor(item.duration / 60)}:
                    {(item.duration % 60).toString().padStart(2, "0")}
                  </Typography>
                </div>
                <Divider variant="middle" light={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Album;
