import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 220,
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      paddingLeft: "10px",
      fontSize: "0.9em",
    },
  },
};

export default function MultipleSelectPlaceholder({languages,text}) {
  const theme = useTheme();
  const [languageName, setLanguageName] = React.useState([]);
  function getStyles(language, languageName, theme) {
    return {
      fontWeight:
        languageName.indexOf(language) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLanguageName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 350, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={languageName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return text;
            }
            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            {text}
          </MenuItem>
          {languages && languages.map((language) => (
            <MenuItem
              key={language}
              value={language}
              style={getStyles(language, languageName, theme)}
            >
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
