import { Routes, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../components/Navbar";
import NavbarUnlogged from "../components/NavbarUnlogged";

import InitialPage from "../pages/InitialPage";
import LoginPage from "../pages/LoginPage";
import OrderPage from "../pages/OrderPage";
import MenuCadPage from "../pages/MenuCadPage";
import DrinkCadPage from "../pages/DrinkCadPage";
import InitialPanel from "../pages/InitialPanel";
import TentMenu from "../pages/TentMenu";
import ReportPage from "../pages/ReportPage";

export default function RoutesProvider() {
  const location = useLocation();
  const isLoggedIn = Cookies.get("isLogged");

  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && (!isLoggedIn ? <NavbarUnlogged /> : <Navbar />)}

      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/menu" element={<MenuCadPage />} />
        <Route path="/drink" element={<DrinkCadPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/tent" element={<InitialPanel />} />
        <Route path="/tent/:tent" element={<TentMenu />} />
      </Routes>
    </>
  );
}
