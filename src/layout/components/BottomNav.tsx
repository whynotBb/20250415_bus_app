import { Home, NotificationsActive, Star } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper, styled } from "@mui/material";
import SunnyIcon from "@mui/icons-material/Sunny";

import { useNavigate } from "react-router-dom";

const BottomNavWr = styled(Paper)({
  width: "100%",
  maxWidth: "768px",
  margin: "0 auto",
});
const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <BottomNavWr sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          onClick={() => {
            navigate("/");
          }}
        />
        <BottomNavigationAction
          label="Book Mark"
          icon={<Star />}
          onClick={() => {
            navigate("/bookmark");
          }}
        />
        <BottomNavigationAction
          label="Alarm"
          icon={<NotificationsActive />}
          onClick={() => {
            navigate("/alarm");
          }}
        />
        <BottomNavigationAction
          label="Weather"
          icon={<SunnyIcon />}
          onClick={() => {
            navigate("/weather");
          }}
        />
      </BottomNavigation>
    </BottomNavWr>
  );
};

export default BottomNav;
