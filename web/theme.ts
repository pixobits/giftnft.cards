import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

export default createTheme({
  palette: {
    primary: indigo,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "initial",
          borderRadius: 20,
        },
      },
    },
  },
});
