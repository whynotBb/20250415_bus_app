import { IconButton, styled } from "@mui/material";
import { DarkMode } from "@mui/icons-material";
import { useColorMode } from "../../theme/useColorMode";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";

const ToggleButton = styled("div")({
  position: "absolute",
  top: "20px",
  right: "20px",
  zIndex: "10",
});
const ThemeToggleButton = () => {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <ToggleButton>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === "dark" ? (
          <WbIncandescentIcon style={{ color: "#00ADB5" }} />
        ) : (
          <DarkMode style={{ color: "#AC7DD2" }} />
        )}
      </IconButton>
    </ToggleButton>
  );
};

export default ThemeToggleButton;
