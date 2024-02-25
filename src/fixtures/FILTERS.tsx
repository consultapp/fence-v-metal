import { IFilter } from "@/types";
import FENCE_TYPES from "./FENCE_TYPES";
import SHTAKETNIK_TYPES from "./SHTAKETNIK_TYPES";

const FILTERS: { [key in keyof typeof FENCE_TYPES]: IFilter[] } = {
  shtaketnik: [
    {
      slug: "trapeze",
      name: "Trapeze",
      link: "/wp-content/plugins/ca-fence-calc/assets/shtaketnik_trapeze.png",
      description: "ширина 0.118 м",
      perMeter: {
        [SHTAKETNIK_TYPES.oneSide]: 7,
        [SHTAKETNIK_TYPES.chess]: 11,
      },
    },
    {
      slug: "ellipse",
      name: "Ellipse",
      link: "/wp-content/plugins/ca-fence-calc/assets/shtaketnik_ellipse.png",
      description: "ширина 0.126 м",
      perMeter: {
        [SHTAKETNIK_TYPES.oneSide]: 7,
        [SHTAKETNIK_TYPES.chess]: 11,
      },
    },
    {
      slug: "lane",
      name: "Lane",
      link: "/wp-content/plugins/ca-fence-calc/assets/shtaketnik_lane.png",
      description: "ширина 0.99 м",
      perMeter: {
        [SHTAKETNIK_TYPES.oneSide]: 8,
        [SHTAKETNIK_TYPES.chess]: 13,
      },
    },
  ],
  proflist: [
    {
      slug: "mp20",
      name: "МП-20",
      link: "/wp-content/plugins/ca-fence-calc/assets/proflist_mp20.png",
      description: "ширина 1.15 м",
    },
    {
      slug: "c8",
      name: "С-8",
      link: "/wp-content/plugins/ca-fence-calc/assets/proflist_c8.png",
      description: "ширина 1.2 м",
    },
  ],
} as const;

export default FILTERS;
