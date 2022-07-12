// material
import { Box, Typography } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

export default function RedirectButton({ text, ...other }) {
  return (
    <Box
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": { opacity: 0.7 },
      }}
    >
      <ExpandCircleDownIcon
        sx={{ transform: "rotate(-90deg)", mr: 1 }}
        color="secondary"
      />
      <Typography variant="caption">Go!</Typography>
    </Box>
  );
}
