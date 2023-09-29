import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./scss/App.scss";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Outlet />
      </div>
    </>
  );
}

export default App;
