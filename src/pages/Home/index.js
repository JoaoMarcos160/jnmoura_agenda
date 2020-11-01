import React from "react";
import PageDefault from "../../components/PageDefault";
import Table from "@material-ui/core/Table";
import {
  Dialog,
  DialogTitle,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";
import api from "../../api";
import { useEffect } from "react";
import { colors, formatDate, phoneMask } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import StyledContentLoader from "styled-content-loader";
import FormField from "../../components/FormField";
import { ButtonFiltro, ButtonSim, ButtonNao } from "../../components/Button";

function Home() {
  const [listaDeContatos, setListaDeContatos] = useState(null);
  const [buscandoContatos, setBuscandoContatos] = useState(false);
  const [ordenadoPor, setOrdenadoPor] = useState(null);
  const [tipoOrdenadoPor, setTipoOrdenadoPor] = useState("asc");
  const [open, setOpen] = useState(false);
  const [contatoParaExcluir, setContatoParaExcluir] = useState(null);
  const [openExclusao, setOpenExclusao] = useState(false);
  const [openBuscar, setOpenBuscar] = useState(false);
  const [values, setValues] = useState({
    nome: "",
    telefone: "",
    endereco: "",
  });
  const [valuesBuscar, setValuesBuscar] = useState({
    nome: "",
    telefone: "",
    endereco: "",
  });

  useEffect(() => {
    buscar_contatos("nome");
  }, []);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor, // nome: 'valor'
    });
  }
  function setValueBuscar(chave, valor) {
    setValuesBuscar({
      ...values,
      [chave]: valor, // nome: 'valor'
    });
  }

  function handleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute("name"),
      infosDoEvento.target.value
    );
  }
  function handleChangeBuscar(infosDoEvento) {
    setValueBuscar(
      infosDoEvento.target.getAttribute("name"),
      infosDoEvento.target.value
    );
  }

  async function buscar_contatos(orderBy, tipoOrdenadoBy, dados) {
    setBuscandoContatos(true);
    try {
      var valores = {
        orderby: orderBy,
        tipoorderby: tipoOrdenadoBy,
      };
      if (dados !== undefined) {
        if (dados.nome !== undefined) {
          valores = { ...valores, nome: dados.nome };
        }
        if (dados.endereco !== undefined) {
          valores = { ...valores, endereco: dados.endereco };
        }
        if (dados.telefone !== undefined) {
          valores = { ...valores, telefone: dados.telefone };
        }
      }
      const response = await api.post("/buscar", valores);
      if (response.status === 200) {
        setListaDeContatos(response.data.data);
      } else if (response.status === 404) {
        setListaDeContatos(null);
      } else {
        alert("Erro ao buscar contatos");
        console.error(response);
      }
      setBuscandoContatos(false);
    } catch (e) {
      console.error(e);
      setListaDeContatos(null);
      setBuscandoContatos(false);
    }
  }

  async function deletar_contatos(id) {
    setBuscandoContatos(true);
    console.log(id);
    try {
      const response = await api.delete("/?id=" + id);
      if (response.status === 200) {
        alert("Excluído com sucesso!");
      } else {
        alert("Erro ao excluir contato");
        console.error(response);
      }
      await buscar_contatos(ordenadoPor, tipoOrdenadoPor);
      setBuscandoContatos(false);
    } catch (e) {
      console.error(e);
      setBuscandoContatos(false);
    }
  }

  async function alterar_contato(contatoAlterado) {
    setBuscandoContatos(true);
    try {
      const response = await api.put("/", {
        id: contatoAlterado.id,
        nome: contatoAlterado.nome,
        telefone: contatoAlterado.telefone,
        endereco: contatoAlterado.endereco,
      });
      if (response.status === 200) {
        alert("Alterado com sucesso!");
      } else {
        alert("Erro ao alterar contato");
        console.error(response);
      }
      await buscar_contatos(ordenadoPor, tipoOrdenadoPor);
      setBuscandoContatos(false);
    } catch (e) {
      console.error(e);
      setBuscandoContatos(false);
    }
  }

  const styleTableCell = {
    borderColor: colors.cor_escura,
    borderWidth: 1,
  };
  return (
    <PageDefault>
      <h2>Agenda telefônica</h2>
      <ButtonFiltro
        onClick={() => {
          setOpenBuscar(true);
        }}
      >
        Filtros
      </ButtonFiltro>
      <Dialog aria-labelledby="simple-dialog-title" open={openExclusao}>
        <view
          style={{
            color: "#003",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <DialogTitle>Deseja realmente excluir este contato?</DialogTitle>
          <DialogTitle>
            Nome: {contatoParaExcluir !== null ? contatoParaExcluir.nome : ""}
          </DialogTitle>
          <ButtonSim
            onClick={() => {
              deletar_contatos(contatoParaExcluir.id);
              setOpenExclusao(false);
            }}
          >
            Sim
          </ButtonSim>
          <ButtonNao
            onClick={() => {
              setContatoParaExcluir(null);
              setOpenExclusao(false);
            }}
          >
            Não
          </ButtonNao>
        </view>
      </Dialog>
      <Dialog aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Altere aqui</DialogTitle>
        <FormField
          label="Nome"
          type="text"
          placeholder="Digite aqui o nome"
          value={values.nome}
          name="nome"
          onChange={handleChange}
          required={true}
        />
        <FormField
          label="Telefone: "
          type="text"
          name="telefone"
          placeholder="Digite o telefone aqui"
          value={values.telefone}
          onChange={handleChange}
          maxLength={15}
          required={true}
        />
        <FormField
          label="Endereço:"
          type="text"
          placeholder="Digite aqui o endereço"
          name="endereco"
          value={values.endereco}
          onChange={handleChange}
          required={false}
        />
        <ButtonSim
          onClick={() => {
            alterar_contato(values);
            setOpen(false);
          }}
        >
          Salvar
        </ButtonSim>
      </Dialog>
      <Dialog aria-labelledby="simple-dialog-title" open={openBuscar}>
        <DialogTitle id="simple-dialog-title">Coloque os filtros</DialogTitle>
        <FormField
          label="Nome"
          type="text"
          placeholder="Digite aqui o nome"
          value={valuesBuscar.nome}
          name="nome"
          onChange={handleChangeBuscar}
          required={true}
        />
        <FormField
          label="Telefone: "
          type="text"
          name="telefone"
          placeholder="Digite o telefone aqui"
          value={valuesBuscar.telefone}
          onChange={handleChangeBuscar}
          maxLength={15}
          required={true}
        />
        <FormField
          label="Endereço:"
          type="text"
          placeholder="Digite aqui o endereço"
          name="endereco"
          value={valuesBuscar.endereco}
          onChange={handleChangeBuscar}
          required={false}
        />
        <ButtonSim
          onClick={() => {
            buscar_contatos(ordenadoPor, tipoOrdenadoPor, valuesBuscar);
            setOpenBuscar(false);
          }}
        >
          Buscar
        </ButtonSim>
      </Dialog>
      <StyledContentLoader isLoading={buscandoContatos}>
        <TableContainer>
          <Table size="small" aria-label="Contatos">
            <TableHead>
              <TableRow>
                <TableCell align="center">Opções</TableCell>
                <TableCell
                  style={styleTableCell}
                  align="left"
                  onClick={() => {
                    if (ordenadoPor === "id") {
                      if (tipoOrdenadoPor === "asc") {
                        setTipoOrdenadoPor("desc");
                        buscar_contatos("id", "desc");
                      } else {
                        setTipoOrdenadoPor("asc");
                        buscar_contatos("id", "asc");
                      }
                    } else {
                      setTipoOrdenadoPor("asc");
                      buscar_contatos("id", "asc");
                    }
                    setOrdenadoPor("id");
                  }}
                >
                  Id
                  {ordenadoPor === "id" &&
                    (tipoOrdenadoPor === "asc" ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ))}
                </TableCell>
                <TableCell
                  style={styleTableCell}
                  onClick={() => {
                    if (ordenadoPor === "nome") {
                      if (tipoOrdenadoPor === "asc") {
                        setTipoOrdenadoPor("desc");
                        buscar_contatos("nome", "desc");
                      } else {
                        setTipoOrdenadoPor("asc");
                        buscar_contatos("nome", "asc");
                      }
                    } else {
                      setTipoOrdenadoPor("asc");
                      buscar_contatos("nome", "asc");
                    }
                    setOrdenadoPor("nome");
                  }}
                  align="right"
                >
                  Nome
                  {ordenadoPor === "nome" &&
                    (tipoOrdenadoPor === "asc" ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ))}
                </TableCell>
                <TableCell
                  style={styleTableCell}
                  onClick={() => {
                    if (ordenadoPor === "telefone") {
                      if (tipoOrdenadoPor === "asc") {
                        setTipoOrdenadoPor("desc");
                        buscar_contatos("telefone", "desc");
                      } else {
                        setTipoOrdenadoPor("asc");
                        buscar_contatos("telefone", "asc");
                      }
                    } else {
                      setTipoOrdenadoPor("asc");
                      buscar_contatos("telefone", "asc");
                    }
                    setOrdenadoPor("telefone");
                  }}
                  align="right"
                >
                  Telefone
                  {ordenadoPor === "telefone" &&
                    (tipoOrdenadoPor === "asc" ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ))}
                </TableCell>
                <TableCell
                  style={styleTableCell}
                  onClick={() => {
                    if (ordenadoPor === "endereco") {
                      if (tipoOrdenadoPor === "asc") {
                        setTipoOrdenadoPor("desc");
                        buscar_contatos("endereco", "desc");
                      } else {
                        setTipoOrdenadoPor("asc");
                        buscar_contatos("endereco", "asc");
                      }
                    } else {
                      setTipoOrdenadoPor("asc");
                      buscar_contatos("endereco", "asc");
                    }
                    setOrdenadoPor("endereco");
                  }}
                  align="right"
                >
                  Endereço
                  {ordenadoPor === "endereco" &&
                    (tipoOrdenadoPor === "asc" ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ))}
                </TableCell>
                <TableCell
                  style={styleTableCell}
                  onClick={() => {
                    if (ordenadoPor === "created_at") {
                      if (tipoOrdenadoPor === "asc") {
                        setTipoOrdenadoPor("desc");
                        buscar_contatos("created_at", "desc");
                      } else {
                        setTipoOrdenadoPor("asc");
                        buscar_contatos("created_at", "asc");
                      }
                    } else {
                      setTipoOrdenadoPor("asc");
                      buscar_contatos("created_at", "asc");
                    }
                    setOrdenadoPor("created_at");
                  }}
                  align="right"
                >
                  Criado em:
                  {ordenadoPor === "created_at" &&
                    (tipoOrdenadoPor === "asc" ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ))}
                </TableCell>
                <TableCell
                  style={styleTableCell}
                  onClick={() => {
                    if (ordenadoPor === "updated_at") {
                      if (tipoOrdenadoPor === "asc") {
                        setTipoOrdenadoPor("desc");
                        buscar_contatos("updated_at", "desc");
                      } else {
                        setTipoOrdenadoPor("asc");
                        buscar_contatos("updated_at", "asc");
                      }
                    } else {
                      setTipoOrdenadoPor("asc");
                      buscar_contatos("updated_at", "asc");
                    }

                    setOrdenadoPor("updated_at");
                  }}
                  align="right"
                >
                  Alterado em:
                  {ordenadoPor === "updated_at" &&
                    (tipoOrdenadoPor === "asc" ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ))}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaDeContatos === null ? (
                <TableRow>
                  <TableCell>Nenhum contato encontrado</TableCell>
                </TableRow>
              ) : (
                listaDeContatos.map(function (contato) {
                  // console.log(contato);
                  return (
                    <TableRow key={contato.id}>
                      <TableCell>
                        <TableCell
                          aria-describedby="Excluir"
                          aria-details="Clique aqui para excluir"
                          onClick={() => {
                            setContatoParaExcluir(contato);
                            setOpenExclusao(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} color="#f34" />
                        </TableCell>
                        <TableCell
                          aria-details="Clique aqui para alterar"
                          aria-describedby="Alterar"
                          onClick={() => {
                            setValues(contato);
                            setOpen(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </TableCell>
                      </TableCell>
                      <TableCell align="left">{contato.id}</TableCell>
                      <TableCell align="right">{contato.nome}</TableCell>
                      <TableCell align="right">
                        {phoneMask(contato.telefone)}
                      </TableCell>
                      <TableCell align="right">{contato.endereco}</TableCell>
                      <TableCell align="right">
                        {formatDate(contato.created_at)}
                      </TableCell>
                      <TableCell align="right">
                        {formatDate(contato.updated_at)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledContentLoader>
    </PageDefault>
  );
}
export default Home;
