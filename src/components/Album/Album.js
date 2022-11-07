import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import musicDb from "../../services/api.service";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Album = () => {
  const params = useParams();
  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(false);
  const getAlbum = async () => {
    setLoading(true);
    const resp = await musicDb.get(`/v2/get_album?album_id=${params.id}`);
    setAlbum(resp.data.result);
    setLoading(false);
  };
  useEffect(() => {
    getAlbum();
  }, []);

  return (
    <div>
      {loading ? (
        <Typography variant="h1">Loading...</Typography>
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
              <Typography variant="h3" style={{ display: "flex" }}>
                {album.title}
              </Typography>
              {album.artists?.map((item) => (
                <Typography variant="h4" sx={{ display: "flex" }}>
                  {item.name}
                </Typography>
              )) || ""}
              <div style={{ display: "flex" }}>
                <Typography sx={{ display: "flex" }}>
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
                  <Typography key={index}>{index + 1}.</Typography>
                  <div
                    style={{
                      flexGrow: 1,
                      paddingLeft: "10px",
                      justifyContent: "left",
                    }}
                  >
                    <Typography sx={{ display: "flex" }}>
                      {item.title}
                    </Typography>
                  </div>
                  <Typography key={item.id}>
                    {Math.floor(item.duration / 60)}:
                    {(item.duration % 60).toString().padStart(2, "0")}
                  </Typography>
                </div>
                <Divider variant="middle" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Album;
