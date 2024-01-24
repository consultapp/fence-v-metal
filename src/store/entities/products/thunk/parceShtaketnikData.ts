import { PRODUCT_TYPES } from "@/fixtures/PRODUCT_TYPES";
import { TProduct } from "@/types";

interface IProflist {
  id: string;
  title: { rendered: string };
  slug: string;
  meta: {
    price: string;
    attributes_1_value: string;
    // attributes_2_value: string;
  };
}

export function parceShtaketnikData(items: IProflist[]) {
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
      if ("title" in item && "rendered" in item.title) {
        const { rendered } = item.title;
        tmp.name = rendered;
      }
      if ("meta" in item) {
        const { price, attributes_1_value } = item.meta;
        tmp.price = parseFloat(price);
        tmp.description = attributes_1_value;
      }
      result.push(tmp as TProduct);
    }
  });

  return result;
}
