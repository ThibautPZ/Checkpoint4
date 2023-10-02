import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import axiosInstance from "../services/axiosInstance";
import { useNavbarClassnameContext } from "../contexts/NavbarClassnameContext";

import BurgerMenuPopUp from "./BurgerMenuPopUp";

import "../scss/Navbar.scss";

import TechniquesMenuPopUp from "./TechniquesMenuPopUp";
import FormatsMenuPopUp from "./FormatsMenuPopUp";
import NavbarCategoriesButtons from "./NavbarCategoriesButtons";

function Navbar() {
  const navigate = useNavigate();

  const { navbarClassname } = useNavbarClassnameContext();

  const [characteristicsList, setCharacteristicsList] = useState({
    formats: [],
    techniques: [],
  });

  const [popUpOpen, setPopUpOpen] = useState({
    burger: false,
    subMenu: null,
  });

  const handleBurgerClick = () => {
    setPopUpOpen({ burger: !popUpOpen.burger, subMenu: null });
  };

  const handleCategorySelected = (category) => {
    setPopUpOpen({ ...popUpOpen, subMenu: category });
  };

  const handleNavigationSelected = (pageName) => {
    let link = "/";
    setPopUpOpen({ burger: false, subMenu: null });
    if (pageName !== "Accueil") {
      link = `${link}${pageName}`;
    }
    navigate(link);
  };
  const fetchOeuvresCharacteristics = async () => {
    try {
      const formatsList = await axiosInstance.get("/api/paintings/sizes");
      const techniquesList = await axiosInstance.get(
        "/api/paintings/techniques"
      );
      setCharacteristicsList({
        formats: formatsList.data,
        techniques: techniquesList.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOeuvresCharacteristics();
  }, []);

  return (
    <div className={navbarClassname}>
      <div className="NavbarDesktop">
        <NavbarCategoriesButtons
          category="Accueil"
          handleCategorySelected={handleNavigationSelected}
        />
        <NavbarCategoriesButtons
          category="Diaporama"
          handleCategorySelected={handleNavigationSelected}
        />
        <NavbarCategoriesButtons
          category="Oeuvres"
          handleCategorySelected={handleNavigationSelected}
        />
        <NavbarCategoriesButtons
          category="Techniques"
          handleCategorySelected={handleCategorySelected}
        />
        <NavbarCategoriesButtons
          category="Formats"
          handleCategorySelected={handleCategorySelected}
        />
      </div>
      <button
        className="NavbarMobile"
        type="button"
        onClick={handleBurgerClick}
      >
        <img
          id="burger"
          src="/src/assets/images/burger-menu.svg"
          alt="burger-menu"
        />
      </button>
      {popUpOpen.burger
        ? createPortal(
            <BurgerMenuPopUp
              popUpOpen={popUpOpen}
              handleNavigationSelected={handleNavigationSelected}
              handleCategorySelected={handleCategorySelected}
            />,
            document.body
          )
        : ""}
      {popUpOpen.subMenu === "Techniques"
        ? createPortal(
            <TechniquesMenuPopUp
              popUpOpen={popUpOpen}
              setPopUpOpen={setPopUpOpen}
              techniques={characteristicsList.techniques}
            />,
            document.body
          )
        : ""}
      {popUpOpen.subMenu === "Formats"
        ? createPortal(
            <FormatsMenuPopUp
              popUpOpen={popUpOpen}
              setPopUpOpen={setPopUpOpen}
              formats={characteristicsList.formats}
            />,
            document.body
          )
        : ""}

      {/* 
      <Link to="/projets">
        <p>projets</p>
      </Link>
      <Link to="/atelier">
        <p>atelier</p>
      </Link>
      <Link to="/bio">
        <p>bio</p>
      </Link>
      <Link to="/contact">
        <p>contact</p>
      </Link>
      <Link to="/messages">
        <p>messages</p>
      </Link>
      <Link to="/profil">
        <p>profil</p>
      </Link>
      <Link to="/management">
        <p>management</p>
      </Link>
      <Link to="/management/oeuvres">
        <p>oeuvres management</p>
      </Link>
      <Link to="/management/bio">
        <p>bio management</p>
      </Link>
      <Link to="/management/carousel">
        <p>carousel management</p>
      </Link>
      <Link to="/management/utilisateurs">
        <p>utilisateurs management</p>
      </Link> */}
    </div>
  );
}

export default Navbar;
