import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InitialPage from "./pages/initialPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import MenuCadPage from "./pages/MenuCadPage";
import DrinkCadPage from "./pages/DrinkCadPage";
import InitialPanel from "./pages/initialPanel";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<InitialPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/menu" element={<MenuCadPage />} />
          <Route path="/drink" element={<DrinkCadPage />} />
          <Route path="/tent" element={<InitialPanel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
