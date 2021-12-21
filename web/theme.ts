import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

export default createTheme({
  palette: {
    primary: indigo,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "initial",
          borderRadius: 20,
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
