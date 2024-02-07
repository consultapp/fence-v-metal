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
