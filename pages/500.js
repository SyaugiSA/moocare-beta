import { Box } from "@mui/material";
import { Typography } from "@mui/material";

export default function Custom500() {
  return (
    <Box
      sx={{
        width: "max-content",
        mx: "auto",
        mt: "20%",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          fontFamily: "Poppins",
          width: "max-content",
          mx: "auto",
          fontWeight: 600,
          mb: 2,
        }}
      >
        500
      </Typography>

      <Typography
        variant="h3"
        component="div"
        sx={{
          fontFamily: "Poppins",
          width: "max-content",
          fontWeight: 600,
        }}
      >
        Server-Side Error Occurred
      </Typography>
    </Box>
  );
}
