import { styled } from "@mui/material";

const BottomSheet = styled("div")(({ theme }) => ({
	width: "100%",
	height: "200px",
	position: "fixed",
	bottom: "-200px",
	left: "50%",
	transform: "translateX(-50%)",
	backgroundColor: theme.palette.background.default,
	borderRadius: "30px 30px 0 0",
	boxShadow: "0px -4px 10px 2px rgba(0, 0, 0, .3)",
	padding: "20px",
	transition: "all .3s",
}));

const BusStopDetail = ({ isOpen }: { isOpen: boolean }) => {
	return <BottomSheet style={{ bottom: isOpen ? "0" : "-200px" }}>bottom sheet</BottomSheet>;
};

export default BusStopDetail;
