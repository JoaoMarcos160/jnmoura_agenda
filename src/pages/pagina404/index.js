import React from "react";
import PageDefault from "../../components/PageDefault";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

function pagina404() {
  return (
    <PageDefault>
      <h1>Página 404</h1>
      <view style={{flexDirection: "row"}}>
        <Button as={Link} style={{}} to="/">
          Ir pra home
        </Button>
      </view>
    </PageDefault>
  );
}

export default pagina404;
