export function formatarTelefone(telefone: string | number) {
  if (!telefone) return "";

  const apenasNumeros = telefone.toString().replace(/\D/g, "");

  if (apenasNumeros.length === 11) {
    // (99) 99999-9999
    return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  if (apenasNumeros.length === 10) {
    // (99) 9999-9999
    return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return telefone.toString();
}
