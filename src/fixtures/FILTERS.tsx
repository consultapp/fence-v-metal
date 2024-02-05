import { IFilter } from "@/types";
import FENCE_TYPES from "./FENCE_TYPES";

const FILTERS: { [key in keyof typeof FENCE_TYPES]: IFilter[] } = {
  shtaketnik: [
    {
      slug: "trapeze",
      name: "Trapeze",
      link: "../assets/shtaketnik_trapeze.png",
      description: "ширина 1.15 м",
    },
    {
      slug: "ellipse",
      name: "Ellipse",
      link: "../assets/shtaketnik_ellipse.png",
      description: "ширина 1.15 м",
    },
    {
      slug: "lane",
      name: "Lane",
      link: "assets/shtaketnik_lane.png",
      description: "ширина 1.15 м",
    },
  ],
  proflist: [
    {
      slug: "mp20",
      name: "МП-20",
      link: "../assets/shtaketnik_lane.png",
      description: "ширина 1.15 м",
    },
    {
      slug: "c8",
      name: "С-8",
      link: "../assets/shtaketnik_lane.png",
      description: "ширина 1.15 м",
    },
  ],
} as const;

export default FILTERS;
