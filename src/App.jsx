import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InitialPage from "./pages/initialPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<InitialPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
