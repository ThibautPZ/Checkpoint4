import PropTypes from "prop-types";

function NavbarCategoriesButtons({ category, handleCategorySelected }) {
  return (
    <button
      type="button"
      value={category}
      onClick={(e) => handleCategorySelected(e.target.value)}
    >
      {category}
    </button>
  );
}

export default NavbarCategoriesButtons;

NavbarCategoriesButtons.propTypes = {
  category: PropTypes.string.isRequired,
  handleCategorySelected: PropTypes.func.isRequired,
}.isRequired;
