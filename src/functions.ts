import { TProduct } from "./types";

export function Ceil(num: number, t: number = 2) {
  return Math.ceil(num * 10 ** t) / 10 ** t;
}

export function sortByPrice(products: TProduct[]) {
  return products.sort(
    (a, b) => getPriceIfPromotion(a) - getPriceIfPromotion(b)
  );
}

export function getPriceIfPromotion(p: TProduct) {
  return p.currentPromotion
    ? (p.price ?? 0) * ((100 - p.currentPromotion) / 100)
    : p.price ?? 0;
}

export function getPriceWithPromotion(
  price: number | undefined,
  promotion: number
) {
  return price ? Ceil((price ?? 0) * ((100 - promotion) / 100)) : NaN;
}

export function splitPipesDiscount(str: string) {
  const arr = str.split(";");
  const result: { [key: number]: number } = {};
  arr.forEach((item) => {
    if (item) {
      const [a, d] = item.split("-");
      const a1 = parseInt(a);
      const d1 = parseFloat(d);
      if (typeof a1 === "number") result[a1] = d1;
    }
  });
  return result;
}

export function getPipePriceWithDiscount(p: TProduct, meters: number) {
  let currentDiscount = 0;

  if (p.profilePipeDiscount) {
    for (const [a, d] of Object.entries(p.profilePipeDiscount)) {
      if (parseInt(a) <= meters) {
        currentDiscount = d;
      } else break;
    }
  }
  return getPriceWithPromotion(p?.price ?? 0, currentDiscount);
}
