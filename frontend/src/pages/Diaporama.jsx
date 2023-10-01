import { useEffect, useState } from "react";
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
  const [storedTimeOutId, setStoredTimeOutId] = useState(null);
  const [diapoDuration, setDiapoDuration] = useState(15000);

  const { navbarClassname, setNavbarClassname } = useNavbarClassnameContext();

  // const diapoDuration = 15000; // 15s par diapo

  let nFadeIntervId; // variable to store our intervalID

  let nTimeOutId;

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
    setTimeout(() => {
      setRandomOeuvreToDisplay();
      setFadeInOutClassname("FadeInDiapo");
    }, 3100);
  };

  const changeOeuvre = () => {
    // console.log(diapoDuration);
    // check if an interval has already been set up
    if (!nFadeIntervId) {
      nFadeIntervId = setInterval(fadeOutCurrentThenDisplayNext, diapoDuration);
    }
  };

  const initializeDiaporama = () => {
    setRandomOeuvreToDisplay();
    changeOeuvre();
  };

  // console.log("page body:", timeOutWillBeStarted);

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
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 500);
    return () => {
      clearInterval(timer);
      clearInterval(nFadeIntervId);

      clearInterval(storedTimeOutId);
      setNavbarClassname("Navbar");
    };
  }, []);

  useEffect(() => {
    // console.log("checkTimeOutToBeStarted: ", timeOutWillBeStarted);
    if (timeOutWillBeStarted) {
      if (storedTimeOutId) {
        showNavbarAndButtons();
        clearTimeout(storedTimeOutId);
        // nTimeOutId = null;
        console.error("nTimennnnn: ", storedTimeOutId);
      }
      nTimeOutId = setTimeout(() => {
        console.warn("time", nTimeOutId);
        if (navbarClassname !== "NavbarDiapoHidden") {
          setNavbarClassname("NavbarDiapoHidden");
        }
        if (buttonsShownClassname !== "DiapoButtonsHidden") {
          setButtonsShownClassname("DiapoButtonsHidden");
        }
      }, 3000);
      setStoredTimeOutId(nTimeOutId);

      setTimeOutWillBeStarted((prev) => !prev);
    }
  }, [count]);

  useEffect(() => {
    if (!oeuvresList.length) {
      fetchAllOeuvres();
    } else {
      initializeDiaporama();
    }
    if (navbarClassname === "Navbar") {
      setNavbarClassname("NavbarDiapoHidden");
    }
  }, [oeuvresList]);

  return currentOeuvre.id ? (
    <>
      <div
        // key={currentOeuvre.id}
        className={fadeInOutClassname}
        onMouseMove={() => setTimeOutWillBeStarted(true)}
        onTouchStart={() => setTimeOutWillBeStarted(true)}
      >
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${
            import.meta.env.VITE_PAINTINGS_PATH
          }/${currentOeuvre.pathname}`}
          alt={currentOeuvre.title}
        />
      </div>
      <input
        type="range"
        id="DiapoDuration"
        min="10000"
        max="120000"
        step="1000"
        value={diapoDuration}
        onChange={(e) => setDiapoDuration(e.target.value)}
      />
    </>
  ) : (
    ""
  );
}

export default Diaporama;
