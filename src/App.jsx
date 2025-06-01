import { BrowserRouter as Router } from "react-router-dom";

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

export default App;
