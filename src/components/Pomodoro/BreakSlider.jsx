import { Box, Slider, Typography } from "@mui/material";
import SettingsContext from "./SettingContext";
import { useContext } from "react";

const breakMarks = [
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" }, // Default break time
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
];

export default function BreakSlider() {
  const SettingsInfo = useContext(SettingsContext);
  return (
    <Box
      sx={{
        width: "90%", // Makes it responsive
        maxWidth: 400, // Limits max size for large screens
        textAlign: "center",
        mt: { xs: 1, sm: 2 }, // Adjusts margin for different screens
        p: { xs: 2, sm: 3 }, // Adjusts padding for better spacing
        bgcolor: "#441752",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(51, 153, 255, 0.4)",
        mx: "auto", // Centers the component
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#3399FF",
          textTransform: "uppercase",
          fontSize: { xs: "1rem", sm: "1.25rem" },
        }}
      >
        ☕ Break Time
      </Typography>
      <Slider
        value={SettingsInfo.BreakMinutes}
        onChange={(_, newValue) => SettingsInfo.setBreakMinutes(newValue)}
        step={5}
        min={5}
        max={30}
        marks={breakMarks}
        valueLabelDisplay="on"
        sx={{
          color: "#3399FF",
          "& .MuiSlider-thumb": {
            backgroundColor: "#3399FF",
            border: "3px solid white",
            width: 16,
            height: 16,
            boxShadow: "0px 0px 10px rgba(51, 153, 255, 0.8)",
          },
          "& .MuiSlider-track": {
            height: 6,
            borderRadius: 2,
          },
          "& .MuiSlider-rail": {
            height: 6,
            opacity: 0.3,
            backgroundColor: "#888",
          },
          "& .MuiSlider-markLabel": {
            color: "#ddd",
            fontSize: "12px",
          },
        }}
      />
    </Box>
  );
}