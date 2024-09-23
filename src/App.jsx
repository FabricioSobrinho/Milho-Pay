import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InitialPage from "./pages/initialPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<InitialPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
