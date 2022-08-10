import { Box, CircularProgress } from "@mui/material";

const Spinner = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
    }}
  >
    <CircularProgress />
  </Box>
);

export default Spinner;
