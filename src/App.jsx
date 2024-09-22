import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InitialPage from "./pages/initialPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<InitialPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
