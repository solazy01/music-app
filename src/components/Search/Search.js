import { IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ onChange, value }) {
  const [searchValue, setSearchValue] = useState("");

  const searchFieldHandler = (event) => {
    setSearchValue(event.target.value);
  };
  const searchButtonHandler = () => {
    onChange(searchValue);
  };
  return (
    <Paper component="form">
      <InputBase
        sx={{ width: "40vw", paddingLeft: "2vw", paddingRight: "2vw" }}
        placeholder={value}
        onChange={searchFieldHandler}
      />
      <IconButton
        type="button"
        onClick={searchButtonHandler}
        sx={{
          p: "10px",
          paddingRight: "2vw",
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
