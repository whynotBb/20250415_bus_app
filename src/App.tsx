import { Suspense } from "react";
import "./App.css";
import Loading from "./common/components/Loading";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import BusStopDetailPage from "./pages/BusStopDetailPage/BusStopDetailPage";
import BusDetailPage from "./pages/BusDetailPage/BusDetailPage";
import BookmarkPage from "./pages/BookmarkPage/BookmarkPage";
import AlarmPage from "./pages/AlarmPage/AlarmPage";
import WeatherPage from "./pages/WeatherPage/WeatherPage";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="busstopdetail/:id" element={<BusStopDetailPage />} />
          <Route path="busdetail/:id" element={<BusDetailPage />} />
          <Route path="bookmark" element={<BookmarkPage />} />
          <Route path="alarm" element={<AlarmPage />} />
          <Route path="weather" element={<WeatherPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
