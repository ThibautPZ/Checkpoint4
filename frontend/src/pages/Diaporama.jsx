import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { useNavbarClassnameContext } from "../contexts/NavbarClassnameContext";

import "../scss/Diaporama.scss";

function Diaporama() {
  const [oeuvresList, setOeuvresList] = useState([]);
  const [currentOeuvre, setCurrentOeuvre] = useState({});
  const [fadeInOutClassname, setFadeInOutClassname] = useState("FadeInDiapo");
  const [buttonsShownClassname, setButtonsShownClassname] =
    useState("DiapoButtonsHidden");
  const [timeOutWillBeStarted, setTimeOutWillBeStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [storedTimeFunctionsIds, setStoredTimeFunctionsIds] = useState({
    nFadeIntervId: 0,
    nNextTimeOutId: 0,
    nHideTimeOutId: 0,
  });
  const [diapoDuration, setDiapoDuration] = useState(15000);

  const { navbarClassname, setNavbarClassname } = useNavbarClassnameContext();

  const navigate = useNavigate();

  const fetchAllOeuvres = async () => {
    try {
      const paintingsList = await axiosInstance.get(`/api/paintings/`);

      setOeuvresList(paintingsList.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomIndexFromArray = (arr) => {
    return Math.round(Math.random() * (arr.length - 1));
  };

  const getRandomIndexNotCurrentFromArray = (arr, currentIndex) => {
    const indexToCheck = getRandomIndexFromArray(arr);
    if (indexToCheck !== currentIndex) {
      return indexToCheck;
    }

    return getRandomIndexNotCurrentFromArray(arr, currentIndex);
  };

  const setRandomOeuvreToDisplay = () => {
    // console.log(storedTimeFunctionsIds);
    // console.log(oeuvresList);
    let currentOeuvreIndex = 0;
    if (currentOeuvre.id) {
      currentOeuvreIndex = currentOeuvre.id;
    }

    const index = getRandomIndexNotCurrentFromArray(
      oeuvresList,
      currentOeuvreIndex
    );
    return setCurrentOeuvre(oeuvresList[index]);
  };

  const fadeOutCurrentThenDisplayNext = () => {
    setFadeInOutClassname("FadeOutDiapo");
    if (storedTimeFunctionsIds.nNextTimeOutId) {
      clearTimeout(storedTimeFunctionsIds.nNextTimeOutId);
    }
    const nNextTimeOutId = setTimeout(() => {
      console.warn("next");
      setRandomOeuvreToDisplay();
      setFadeInOutClassname("FadeInDiapo");
    }, 3100);
    setStoredTimeFunctionsIds({
      ...storedTimeFunctionsIds,
      nNextTimeOutId,
    });
  };

  const changeOeuvre = () => {
    // console.log(storedTimeFunctionsIds);
    // check if an interval has already been set up
    if (storedTimeFunctionsIds.nFadeIntervId) {
      clearInterval(storedTimeFunctionsIds.nFadeIntervId);
    }
    const nFadeIntervId = setInterval(
      () => {
        console.warn("fade");
        fadeOutCurrentThenDisplayNext();
      },

      diapoDuration
    );
    setStoredTimeFunctionsIds({
      ...storedTimeFunctionsIds,
      nFadeIntervId,
    });
  };
  // console.log(storedTimeFunctionsIds);
  const initializeDiaporama = () => {
    setRandomOeuvreToDisplay();
    // changeOeuvre();
  };

  const stopDiaporama = () => {
    // console.log("stop");

    clearInterval(storedTimeFunctionsIds.nFadeIntervId);
    clearInterval(storedTimeFunctionsIds.nFadeIntervId + 1);
  };

  const startDiaporama = () => {
    // console.log("start");

    changeOeuvre();
  };

  const navigateToOeuvre = () => {
    setNavbarClassname("Navbar");
    navigate(`/oeuvre/${currentOeuvre.title}`);
  };

  const showNavbarAndButtons = () => {
    if (
      navbarClassname === "NavbarDiapoHidden" ||
      buttonsShownClassname === "DiapoButtonsHidden"
    ) {
      setNavbarClassname("NavbarDiapoShown");
      setButtonsShownClassname("DiapoButtonsShown");
    }
  };

  useEffect(() => {
    fetchAllOeuvres();

    if (navbarClassname === "Navbar") {
      setNavbarClassname("NavbarDiapoHidden");
    }

    const nTimerIntervId = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 500);

    return () => {
      // console.log(storedTimeFunctionsIds);
      clearInterval(nTimerIntervId);
      clearInterval(storedTimeFunctionsIds.nFadeIntervId);
      clearTimeout(storedTimeFunctionsIds.nNextTimeOutId);
      clearTimeout(storedTimeFunctionsIds.nHideTimeOutId);
      setNavbarClassname("Navbar");
    };
  }, []);

  useEffect(() => {
    // console.log("checkTimeOutToBeStarted: ", timeOutWillBeStarted);
    if (timeOutWillBeStarted) {
      if (storedTimeFunctionsIds.nHideTimeOutId) {
        showNavbarAndButtons();
        clearTimeout(storedTimeFunctionsIds.nHideTimeOutId);
      }
      const nHideTimeOutId = setTimeout(() => {
        console.warn("time", storedTimeFunctionsIds.nHideTimeOutId);
        if (navbarClassname !== "NavbarDiapoHidden") {
          setNavbarClassname("NavbarDiapoHidden");
        }
        if (buttonsShownClassname !== "DiapoButtonsHidden") {
          setButtonsShownClassname("DiapoButtonsHidden");
        }
      }, 3000);
      setStoredTimeFunctionsIds({ ...storedTimeFunctionsIds, nHideTimeOutId });
      // console.log(storedTimeFunctionsIds);

      setTimeOutWillBeStarted((prev) => !prev);
    }
  }, [count]);

  useEffect(() => {
    if (oeuvresList.length) {
      //   console.log("fetch");
      //   fetchAllOeuvres();
      // } else {
      // console.log("init");
      initializeDiaporama();
    }
    // if (navbarClassname === "Navbar") {
    //   setNavbarClassname("NavbarDiapoHidden");
    // }
  }, [oeuvresList]);

  // console.log(currentOeuvre);
  return currentOeuvre?.id ? (
    <div
      className="DiapoParent"
      onMouseMove={() => setTimeOutWillBeStarted(true)}
      onTouchStart={() => setTimeOutWillBeStarted(true)}
    >
      <div
        className={fadeInOutClassname}
        // key={currentOeuvre.id}
      >
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${
            import.meta.env.VITE_PAINTINGS_PATH
          }/${currentOeuvre.pathname}`}
          alt={currentOeuvre.title}
        />
      </div>
      <div id="DiapoDuration">
        <p>{`Durée : ${diapoDuration}`}</p>
        <input
          type="range"
          min="10000"
          max="120000"
          step="1000"
          value={diapoDuration}
          onChange={(e) => setDiapoDuration(e.target.value)}
        />
      </div>

      <button
        className={buttonsShownClassname}
        id="DiapoStop"
        type="button"
        onClick={stopDiaporama}
      >
        Pause
      </button>
      <button
        className={buttonsShownClassname}
        id="DiapoStart"
        type="button"
        onClick={startDiaporama}
      >
        Démarrer le diaporama
      </button>
      <button
        className={buttonsShownClassname}
        id="DiapoLink"
        type="button"
        onClick={navigateToOeuvre}
      >
        Fiche de l'oeuvre
      </button>
    </div>
  ) : (
    ""
  );
}

export default Diaporama;
