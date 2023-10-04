import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./scss/App.scss";
import { NavbarClassnameContextProvider } from "./contexts/NavbarClassnameContext";

function App() {
  return (
    // <>
    <NavbarClassnameContextProvider>
      <Navbar />
      <div className="App">
        <Outlet />
      </div>
    </NavbarClassnameContextProvider>
    // {/* </> */}
  );
}

export default App;
