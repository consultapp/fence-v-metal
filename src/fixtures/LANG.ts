const LANG = {
  shtaketnik: "Штакетник",
  proflist: "Профлист",
  oneSide: "Одностороннее",
  chess: "Шахматное",
};

export function getLang(type: string) {
  return LANG[type as keyof typeof LANG];
}
