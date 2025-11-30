export function formatarCPF(cpf: string | number) {
  if (!cpf) return "";

  const apenasNumeros = cpf.toString().replace(/\D/g, "");

  if (apenasNumeros.length !== 11) {
    return cpf.toString(); // retorna original se não for 11 dígitos
  }

  return apenasNumeros.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );
}
