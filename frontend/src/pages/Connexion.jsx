import { useState } from "react";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
// import { useBlurredBackgroundContext } from "../contexts/BlurredBackgroundContext";

export default function Connexion() {
  const [loginSelected, setLoginSelected] = useState(true);
  // const { isBackgroundBlurred } = useBlurredBackgroundContext();

  const changeSelected = () => {
    setLoginSelected(!loginSelected);
  };
  return (
    <div className="Connexion">
      <div>
        <button type="button" onClick={changeSelected} disabled={loginSelected}>
          Se connecter
        </button>

        <button
          type="button"
          onClick={changeSelected}
          disabled={!loginSelected}
        >
          S' inscrire.
        </button>
      </div>

      {/* <div>{loginSelected ? <Login /> : <Signup />}</div> */}
    </div>
  );
}
