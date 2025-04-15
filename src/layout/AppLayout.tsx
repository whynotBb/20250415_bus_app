import { Outlet } from "react-router-dom";
import ThemeToggleButton from "../common/components/ThemeToggleButton";
import BottomNav from "./components/BottomNav";

const AppLayout = () => {
	return (
		<div>
			<div>
				<ThemeToggleButton />
			</div>
			<Outlet />
			<BottomNav />
		</div>
	);
};

export default AppLayout;
