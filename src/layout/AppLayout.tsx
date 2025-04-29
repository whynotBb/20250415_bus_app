import { Outlet } from "react-router-dom";
import ThemeToggleButton from "../common/components/ThemeToggleButton";
import BottomNav from "./components/BottomNav";
import { styled } from "@mui/material";
const BodyWr = styled("div")({
  width: "100%",
  maxWidth: "768px",
  margin: "0 auto",
  position: "relative",
});
const AppLayout = () => {
  return (
    <BodyWr>
      <div>
        <ThemeToggleButton />
      </div>
      <Outlet />
      <BottomNav />
    </BodyWr>
  );
};

export default AppLayout;
