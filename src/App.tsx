import { Route, Routes } from "react-router";
import MainLayout from "./components/layout/MainLayout";
import Andes from "./pages/Andes";
import Events from "./pages/Events";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="mapa" element={<MapPage />} />
        <Route path="eventos" element={<Events />} />
        <Route path="explorar" element={<Explore />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="andes" element={<Andes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}