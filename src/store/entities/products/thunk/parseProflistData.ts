import { PRODUCT_TYPES } from "@/fixtures/PRODUCT_TYPES";
import { TProduct } from "@/types";

interface IProflist {
  id: string;
  title: { rendered: string };
  slug: string;
  meta: {
    price: string;
    attributes_1_value: string;
    attributes_2_value: string;
    unit: string;
    group_image: string;
  };
  link: string;
}

export function parseProflistData(items: IProflist[]) {
  const result: TProduct[] = [];

  items.forEach((item) => {
    if (item && typeof item === "object") {
      const tmp: Partial<TProduct> = { productType: PRODUCT_TYPES.proflist };
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
          attributes_2_value,
          unit,
          group_image,
        } = item.meta;
        tmp.price = parseFloat(price);
        tmp.width = parseFloat(attributes_2_value);
        tmp.description = attributes_1_value;
        tmp.unit = unit;
        tmp.group_image = group_image;
      }
      if (tmp.slug?.startsWith("mp-20") || tmp.slug?.startsWith("s-8"))
        result.push(tmp as TProduct);
    }
  });

  return result;
}
