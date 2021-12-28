import { Box, colors } from "@mui/material";
import { forwardRef } from "react";

export default forwardRef(function BirthdayCard(_, ref) {
  return (
    <Box
      ref={ref}
      sx={{
        width: 300,
        height: 400,
        boxShadow: 6,
        borderRadius: 2,
        background: `linear-gradient(60deg, ${colors.red["600"]} 0%, ${colors.pink["400"]} 20%, ${colors.purple["600"]} 100%)`,
      }}
    />
  );
});
