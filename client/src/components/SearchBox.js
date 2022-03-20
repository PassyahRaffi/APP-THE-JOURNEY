import React from "react";
import TextField from "@mui/material/TextField";

const SearchBox = () => {
  return (
    <div className="md:mt-8">
      <TextField
        className="w-full"
        id="outlined-basic"
        label="Search anything here"
        variant="outlined"
      />
    </div>
  );
};

export default SearchBox;
