import { styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const WeatherWr = styled("div")({
  position: "absolute",
  top: "80px",
  right: "20px",
  background: "rgba(255,255,255,.6)",
  color: "#666",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "1px 1px 6px 2px rgba(0, 0, 0, .1)",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  textAlign: "center",
});
const WeatherBx = styled("div")({});
const AtmosphereBx = styled("div")({});
const BtnClose = styled("button")(({ theme }) => ({
  position: "absolute",
  width: "20px",
  height: "20px",
  top: "-10px",
  right: "-10px",
  background: "rgba(255,255,255,.8)",
  boxShadow: "1px 1px 6px 2px rgba(0, 0, 0, .1)",
  border: "1px solid #ddd",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  svg: {
    width: "12px",
    color: theme.palette.primary.main,
  },
}));
const WeatherWidget = () => {
  return (
    <WeatherWr>
      <BtnClose>
        <CloseIcon />
      </BtnClose>
      <WeatherBx>
        <div>icon</div>
        <p>15°</p>
      </WeatherBx>
      <AtmosphereBx>
        <div>
          <span></span>
          <p>미세</p>
        </div>
        <div>
          <span></span>
          <p>초미세</p>
        </div>
      </AtmosphereBx>
    </WeatherWr>
  );
};

export default WeatherWidget;
