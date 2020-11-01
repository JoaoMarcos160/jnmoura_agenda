import React from "react";
import "./menu.css";
import Button from "./../Button";
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../utils";
// import ButtonLink from "./components/ButtonLink";

function Menu() {
  return (
    <nav className="Menu">
      <Link to="/">
        <FontAwesomeIcon icon={faHome} size="2x" color={colors.cor_bem_clara} />
      </Link>
      <Button as={Link} to="/cadastro">
        Cadastrar novo contato
      </Button>
    </nav>
  );
}

export default Menu;
