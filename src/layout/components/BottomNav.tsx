import { Home, NotificationsActive, Star } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import { useNavigate } from "react-router-dom";

const BottomNav = () => {
	const navigate = useNavigate();
	return (
		<Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
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
		</Paper>
	);
};

export default BottomNav;
