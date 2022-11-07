import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Search({ onChange }) {
  const [searchValue, setSearchValue] = useState("");

  const searchFieldHandler = (event) => {
    setSearchValue(event.target.value);
  };
  const searchButtonHandler = () => {
    onChange(searchValue);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ flexDirection: "column" }}>
        <div style={{ padding: "10px" }}>
          <TextField
            label=""
            type="search"
            variant="outlined"
            sx={{ width: "60vw" }}
            onChange={searchFieldHandler}
          ></TextField>
        </div>
        <Button
          onClick={searchButtonHandler}
          variant="contained"
          sx={{ width: "10%" }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
