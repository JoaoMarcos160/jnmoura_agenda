export const colors = {
  background: "#003",
  cor_bem_clara: "#ffd",
  cor_escura: "#002",
};

export function phoneMask(value) {
  if (value == null) {
    return null;
  }
  let tamanho = value.replace(/\D/g, "").length;
  if (tamanho < 11) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,2})/, "$1-$2");
  } else {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,2})/, "$1-$2");
  }
}

export function cepMask(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2");
}

export function formatDate(value) {
  if (value == null) {
    return null;
  }
  let data = value.split("T", 1).toString();
  let split = data.split("-", 3);
  let dia = split[2];
  let mes = split[1];
  let ano = split[0];
  let horario = value.split("T", 2);
  return (
    "" + dia + "/" + mes + "/" + ano + " " + horario[1].toString().split(".", 1)
  );
}
