import PropTypes from "prop-types";
import NavbarCategoriesButtons from "./NavbarCategoriesButtons";

import "../scss/BurgerMenuPopUp.scss";

function BurgerMenuPopUp({
  popUpOpen,
  handleNavigationSelected,
  handleCategorySelected,
}) {
  return popUpOpen.burger === true ? (
    <div className="BurgerMenuPopUp">
      <NavbarCategoriesButtons
        category="Accueil"
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
  ) : (
    ""
  );
}

export default BurgerMenuPopUp;

BurgerMenuPopUp.propTypes = {
  popUpOpen: PropTypes.shape({
    burger: PropTypes.bool,
    subMenu: PropTypes.string,
  }).isRequired,
  handleNavigationSelected: PropTypes.func.isRequired,
  handleCategorySelected: PropTypes.func.isRequired,
}.isRequired;
