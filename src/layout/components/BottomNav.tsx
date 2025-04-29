import { Home, NotificationsActive, Star } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper, styled } from "@mui/material";

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
      </BottomNavigation>
    </BottomNavWr>
  );
};

export default BottomNav;
