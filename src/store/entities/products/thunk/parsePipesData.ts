import { PRODUCT_TYPES } from "@/fixtures/PRODUCT_TYPES";
import { TProduct } from "@/types";

interface IPipes {
  id: string;
  title: { rendered: string };
  slug: string;
  meta: {
    price: string;
    attributes_1_value: string;
    unit: string;
    group_image: string;
    currentPromotion?: number;
  };
  link: string;
}

const PIPES_PILLAR = [
  "truba-profilnaya-40x40x1-5",
  "truba-profilnaya-40x40x2",
  "truba-profilnaya-50x50x2",
  "truba-profilnaya-50x50x3",
  "truba-profilnaya-60x40x2",
  "truba-profilnaya-60x40x3",
];

const PIPES_JOIST = [
  "truba-profilnaya-30-20-1-5",
  "truba-profilnaya-40x20x1-5",
  "truba-profilnaya-40x20x2",
];

export function parsePipesData(items: IPipes[]) {
  const result: TProduct[] = [];

  items.forEach((item) => {
    if (item && typeof item === "object") {
      let productType = null;
      if (PIPES_PILLAR.includes(item.slug)) {
        productType = PRODUCT_TYPES.pillar;
      } else if (PIPES_JOIST.includes(item.slug)) {
        productType = PRODUCT_TYPES.joist;
      }
      if (productType) {
        const tmp: Partial<TProduct> = { productType };

        if ("id" in item) {
          tmp.id = parseInt(item.id);
        }
        if ("slug" in item) {
          tmp.slug = item.slug;
        }
        if ("title" in item && "rendered" in item.title) {
          const { rendered } = item.title;
          tmp.name = rendered;
        }
        if ("link" in item) {
          tmp.link = item.link;
        }

        if ("meta" in item) {
          const {
            price,
            attributes_1_value,
            unit,
            group_image,
            currentPromotion,
          } = item.meta;
          tmp.price = parseFloat(price);
          tmp.description = attributes_1_value;
          tmp.unit = unit;
          tmp.group_image = group_image;
          tmp.currentPromotion = Number(currentPromotion) ?? null;
        }
        result.push(tmp as TProduct);
      }
    }
  });

  return result;
}
