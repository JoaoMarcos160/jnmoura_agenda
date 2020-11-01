import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PageDefault from "../../components/PageDefault";
import FormField from "../../components/FormField";
import { cepMask, colors, phoneMask } from "../../utils";
import "./index.css";
import StyledContentLoader from "styled-content-loader";
import api, { apiViaCep } from "../../api";

function Alterar(nomeAntigo, telefoneAntigo, enderecoAntigo) {
  const [nome, setNome] = useState(nomeAntigo);
  const [telefone, setTelefone] = useState(telefoneAntigo);
  const [telefoneMascarado, setTelefoneMascarado] = useState(null);
  const [endereco, setEndereco] = useState(enderecoAntigo);
  const [cep, setCep] = useState(null);
  const [cepMascarado, setCepMascarado] = useState(null);
  const [buscandoEndereco, setBuscandoEndereco] = useState(false);
  const [alterandoContato, setAlterandoContato] = useState(false);

  useEffect(() => {
    if (cep !== null) {
      console.log(cep);
      if (cep.length >= 8) {
        console.log("buscando cep...");
        buscar_endereco(cep);
      }
    }
  }, [cep]);

  async function inserir_contato() {
    setAlterandoContato(true);
    if (nome === null || nome === undefined || nome === "") {
      alert("Falta colocar um nome");
      setAlterandoContato(false);
      return;
    }
    if (telefone === null || telefone === undefined || telefone === "") {
      alert("Falta colocar um telefone");
      return;
    }
    const response = await api.post("/", {
      nome: nome,
      telefone: telefone,
      endereco: endereco,
    });
    if (response.status === 201) {
      alert("Contato criado com sucesso");
      setNome(null);
      setCep(null);
      setCepMascarado(null);
      setTelefone(null);
      setTelefoneMascarado(null);
      setEndereco(null);
    } else {
      console.error(response);
    }
    setAlterandoContato(false);
  }

  async function buscar_endereco(cep) {
    setBuscandoEndereco(true);
    const response = await apiViaCep.get("/" + cep + "/json");
    if (response.status === 200) {
      if (!(response.data.erro == true)) {
        setEndereco(
          response.data.logradouro +
            ", " +
            response.data.bairro +
            ", " +
            response.data.localidade +
            "/" +
            response.data.uf
        );
      }
    }
    setBuscandoEndereco(false);
    console.log(response.data);
  }

  return (
    <PageDefault>
      <h2>Cadastro de contato: {nome}</h2>
      <StyledContentLoader
        // backgroundColor={colors.cor_bem_clara}
        // foregroundColor={colors.cor_escura}
        isLoading={alterandoContato}
      >
        <form
          onSubmit={function handleSubmit(infosDoEvento) {
            infosDoEvento.preventDefault();
            setEndereco(null);
            setNome(null);
            setTelefone(null);
            setTelefoneMascarado(null);
            setCep(null);
          }}
        >
          <FormField
            label="Nome"
            type="text"
            placeholder="Digite aqui o nome"
            value={nome}
            name="nome"
            onChange={(text) => {
              setNome(text.target.value);
            }}
            required={true}
          />

          <FormField
            label="Telefone: "
            type="text"
            name="telefone"
            placeholder="Digite o telefone aqui"
            value={telefoneMascarado}
            onChange={(text) => {
              setTelefoneMascarado(phoneMask(text.target.value));
              setTelefone(text.target.value);
            }}
            maxLength={15}
            required={true}
          />
          <FormField
            label="Cep:"
            type="text"
            placeholder="Digite aqui o cep"
            name="endereco"
            value={cepMascarado}
            onChange={(text) => {
              setCepMascarado(cepMask(text.target.value));
              setCep(text.target.value.replace(/\D/g, ""));
            }}
            maxLength={10}
            required={false}
          />
          <StyledContentLoader
            // backgroundColor={"#ffe"}
            // foregroundColor={colors.cor_escura}
            isLoading={buscandoEndereco}
          >
            <FormField
              label="Endereço:"
              type="text"
              placeholder="Digite aqui o endereço"
              name="endereco"
              value={endereco}
              onChange={(text) => {
                setEndereco(text.target.value);
              }}
              required={false}
            />
          </StyledContentLoader>

          <button
            style={{
              margin: 10,
              padding: 10,
              borderColor: colors.cor_escura,
              color: colors.cor_escura,
              borderRadius: 5,
            }}
            onClick={() => {
              inserir_contato();
            }}
          >
            Cadastrar
          </button>
        </form>
      </StyledContentLoader>
      <Link className="link" to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default Alterar;
