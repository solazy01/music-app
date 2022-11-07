import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Search({ onChange, value }) {
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
        alignItems: "center",
      }}
    >
      <div style={{ padding: "10px", display: "flex" }}>
        <TextField
          size="small"
          label=""
          placeholder={value}
          type="search"
          variant="outlined"
          sx={{ width: "40vw" }}
          onChange={searchFieldHandler}
        ></TextField>
      </div>
      <Button
        onClick={searchButtonHandler}
        variant="contained"
        color="error"
        sx={{
          width: "10vw",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Search
      </Button>
    </div>
  );
}
