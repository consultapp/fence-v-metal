const LANG = {
  shtaketnik: "Штакетник",
  proflist: "Профлист",
  oneSide: "Односторонний",
  chess: "Двусторонний",
};

export function getLang(type: string) {
  return LANG[type as keyof typeof LANG];
}
