import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "./components/Navbar";
import NavbarUnlogged from "./components/NavbarUnlogged";
import InitialPage from "./pages/InitialPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import MenuCadPage from "./pages/MenuCadPage";
import DrinkCadPage from "./pages/DrinkCadPage";
import InitialPanel from "./pages/InitialPanel";
import TentMenu from "./pages/TentMenu";

import RoutesProvider from "./routes/RouteProvider";

function App() {
  return (
    <>
      <Router>
        <RoutesProvider />
      </Router>
    </>
  );
}

function MainNavigation() {
  const location = useLocation();
  const isLoggedIn = Cookies.get("isLogged");

  if (location.pathname === "/") {
    return null;
  }

  return <div>{!isLoggedIn ? <NavbarUnlogged /> : <Navbar />}</div>;
}

export default App;
