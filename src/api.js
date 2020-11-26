import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.0.129/api/contatos",
  baseURL: "http://127.0.0.1:8000/api/contatos",
});

export const apiViaCep = axios.create({
  baseURL: "http://viacep.com.br/ws",
});

export default api;
