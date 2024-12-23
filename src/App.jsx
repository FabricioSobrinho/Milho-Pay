import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "./components/Navbar";
import InitialPage from "./pages/initialPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import MenuCadPage from "./pages/MenuCadPage";
import DrinkCadPage from "./pages/DrinkCadPage";
import InitialPanel from "./pages/initialPanel";
import TentMenu from "./pages/TentMenu";

function App() {
  return (
    <>
      <MainNavigation />
      <Router>
        <Routes>
          <Route exact path="/" element={<InitialPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/menu" element={<MenuCadPage />} />
          <Route path="/drink" element={<DrinkCadPage />} />
          <Route path="/tent" element={<InitialPanel />} />
          <Route path="/tent/:tent" element={<TentMenu />} />
        </Routes>
      </Router>
    </>
  );
}

function MainNavigation() {
  const isLoggedIn = Cookies.get("isLogged");

  return <div>{isLoggedIn ? <Navbar /> : <Navbar />}</div>;
}

export default App;
