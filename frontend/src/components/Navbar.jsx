import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link to="/">
        <p>Accueil</p>
      </Link>
      <Link to="/oeuvres">
        <p>Oeuvres</p>
      </Link>
      <Link to="/oeuvres/acrylique">
        <p>acrylique</p>
      </Link>
      <Link to="/oeuvres/huile">
        <p>Huile</p>
      </Link>
      <Link to="/oeuvres/aquarelle">
        <p>aquarelle</p>
      </Link>
      <Link to="/oeuvres/crayon">
        <p>crayon</p>
      </Link>
      <Link to="/oeuvres/minis">
        <p>minis</p>
      </Link>
      <Link to="/oeuvres/tableaux">
        <p>tableaux</p>
      </Link>
      <Link to="/oeuvres/maxis">
        <p>maxis</p>
      </Link>
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
      </Link>
    </>
  );
}

export default Navbar;
