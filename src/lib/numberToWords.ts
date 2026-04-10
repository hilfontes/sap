export function numberToWords(value: number): string {
  const unidades = [
    "",
    "um",
    "dois",
    "três",
    "quatro",
    "cinco",
    "seis",
    "sete",
    "oito",
    "nove",
  ];

  const especiais = [
    "dez",
    "onze",
    "doze",
    "treze",
    "catorze",
    "quinze",
    "dezasseis",
    "dezassete",
    "dezoito",
    "dezanove",
  ];

  const dezenas = [
    "",
    "",
    "vinte",
    "trinta",
    "quarenta",
    "cinquenta",
    "sessenta",
    "setenta",
    "oitenta",
    "noventa",
  ];

  const centenas = [
    "",
    "cem",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seiscentos",
    "setecentos",
    "oitocentos",
    "novecentos",
  ];

  function convert(n: number): string {
    if (n === 0) return "zero";

    if (n < 10) return unidades[n];

    if (n < 20) return especiais[n - 10];

    if (n < 100) {
      const d = Math.floor(n / 10);
      const r = n % 10;
      return dezenas[d] + (r ? " e " + unidades[r] : "");
    }

    if (n < 1000) {
      const c = Math.floor(n / 100);
      const r = n % 100;

      let centenaText = centenas[c];
      if (n > 100 && c === 1) centenaText = "cento";

      return centenaText + (r ? " e " + convert(r) : "");
    }

    if (n < 1000000) {
      const mil = Math.floor(n / 1000);
      const r = n % 1000;

      const milText =
        mil === 1 ? "mil" : convert(mil) + " mil";

      return milText + (r ? " e " + convert(r) : "");
    }

    return n.toString();
  }

  const text = convert(value);

  return `${text} kwanzas`;
}