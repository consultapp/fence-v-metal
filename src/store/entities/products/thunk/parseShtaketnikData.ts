import PRODUCT_TYPES from "@/fixtures/PRODUCT_TYPES";
import { TProduct } from "@/types";

interface IShtaketnik {
  id: string;
  title: { rendered: string };
  slug: string;
  meta: {
    price: string;
    attributes_1_value: string;
    // attributes_2_value: string;
    unit: string;
    group_image: string;
    currentPromotion?: number;
  };
  link: string;
}

export function parseShtaketnikData(items: IShtaketnik[]) {
  const result: TProduct[] = [];

  items.forEach((item) => {
    if (item && typeof item === "object") {
      const tmp: Partial<TProduct> = { productType: PRODUCT_TYPES.shtaketnik };
      if ("id" in item) {
        tmp.id = parseInt(item.id);
      }
      if ("slug" in item) {
        tmp.slug = item.slug;
      }
      if ("link" in item) {
        tmp.link = item.link;
      }
      if ("title" in item && "rendered" in item.title) {
        const { rendered } = item.title;
        tmp.name = rendered;
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
  });

  return result;
}
