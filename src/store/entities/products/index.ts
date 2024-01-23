import { createSlice } from "@reduxjs/toolkit";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import type { TProduct, TProductID, TProductStore } from "@/types.d.ts";
import { PRODUCT_TYPES } from "@/fixtures/PRODUCT_TYPES";

const initialState: TProductStore<TProduct> = {
  entities: [
    { id: 1, name: "40х40х1.5", productType: PRODUCT_TYPES.pillar },
    { id: 2, name: "40х40х2", productType: PRODUCT_TYPES.pillar },
    { id: 3, name: "50х50х2", productType: PRODUCT_TYPES.pillar },
    { id: 4, name: "50х50х3", productType: PRODUCT_TYPES.pillar },
    { id: 5, name: "60х40х2", productType: PRODUCT_TYPES.pillar },
    { id: 6, name: "60х40х3", productType: PRODUCT_TYPES.pillar },
    {
      id: 10,
      name: "МП-20 Профлист 0.35",
      link: "https://v-metal.by/product/mp-20-proflist-0-35/",
      price: 100,
      productType: PRODUCT_TYPES.proflist,
      proflistType: "mp20",
    },
    {
      id: 11,
      name: "МП-20 Профлист 0.4",
      link: "https://v-metal.by/product/mp-20-proflist-0-4/",
      price: 1100,
      productType: PRODUCT_TYPES.proflist,
      proflistType: "mp20",
    },
    {
      id: 12,
      name: "МП-20 Профлист 0.4-4",
      link: "https://v-metal.by/product/mp-20-proflist-0-4-4/",
      price: 1200,
      productType: PRODUCT_TYPES.proflist,
      proflistType: "mp20",
    },

    {
      id: 13,
      name: "МП-20 Профлист 0.35-2",
      link: "https://v-metal.by/product/mp-20-proflist-0-35-2/",
      price: 90,
      productType: PRODUCT_TYPES.proflist,
      proflistType: "mp20",
    },
    {
      id: 14,
      name: "С-8 Профлист 0.4",
      link: "https://v-metal.by/product/s-8-proflist-0-4/",
      price: 343,
      productType: PRODUCT_TYPES.proflist,
      proflistType: "c8",
    },
    {
      id: 15,
      name: "С-8 Профлист 0.4-4",
      link: "https://v-metal.by/product/s-8-proflist-0-4-4/",
      price: 3242,
      productType: PRODUCT_TYPES.proflist,
      proflistType: "c8",
    },
    {
      id: 16,
      name: "Труба профильная 30x20x1.5",
      link: "https://v-metal.by/product/truba-profilnaya-30-20-1-5/",
      price: 75.99,
      productType: PRODUCT_TYPES.joist,
    },
    {
      id: 17,
      name: "Труба профильная 40x20x1.5",
      link: "https://v-metal.by/product/truba-profilnaya-40x20x1-5/",
      price: 89.99,
      productType: PRODUCT_TYPES.joist,
    },
    {
      id: 18,
      name: "Труба профильная 40x20x2",
      link: "https://v-metal.by/product/truba-profilnaya-40x20x2/",
      price: 105.5,
      productType: PRODUCT_TYPES.joist,
    },
    {
      id: 19,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический LANE 0.4",
      description: "Односторонний глянец",
      price: 2.51,
    },
    {
      id: 20,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический LANE 0.4",
      description: "Двусторонний глянец",
      price: 3.0,
    },
    {
      id: 21,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический LANE 0.4 Акция",
      description: "Двусторонний мат",
      price: 3.32,
      actionPrice: 3.05,
    },
    {
      id: 22,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический TRAPEZE 0.4",
      description: "Односторонний глянец",
      price: 3.24,
    },
    {
      id: 23,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический TRAPEZE 0.4",
      description: "Двусторонний глянец",
      price: 3.75,
    },
    {
      id: 24,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический TRAPEZE 0.4 Акция",
      description: "Двусторонний мат",
      price: 4.16,
    },
    {
      id: 25,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический TRAPEZE 0.45",
      description: "Односторонний глянец",
      price: 3.77,
    },
    {
      id: 26,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический TRAPEZE 0.45",
      description: "Двусторонний глянец",
      price: 4.34,
    },
    {
      id: 27,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический TRAPEZE 0.45 Viking",
      description: "Односторонний мат",
      price: 4.82,
    },
    {
      id: 28,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический TRAPEZE 0.45 Viking",
      description: "Двусторонний мат",
      price: 5.9,
    },
    {
      id: 29,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический ELLIPSE 0.4",
      description: "Односторонний глянец",
      price: 3.24,
    },
    {
      id: 30,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический ELLIPSE 0.4",
      description: "Двусторонний глянец",
      price: 3.75,
    },
    {
      id: 31,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический ELLIPSE 0.4 Акция",
      description: "Двусторонний мат",
      price: 4.16,
    },
    {
      id: 32,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический ELLIPSE 0.45",
      description: "Односторонний глянец",
      price: 3.77,
    },
    {
      id: 33,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический ELLIPSE 0.45",
      description: "Двусторонний глянец",
      price: 4.34,
    },
    {
      id: 34,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический ELLIPSE 0.45 Акция",
      description: "Двусторонний мат",
      price: 4.16,
    },
    {
      id: 35,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический ELLIPSE 0.45 Viking",
      description: "Односторонний мат",
      price: 4.82,
    },
    {
      id: 36,
      productType: PRODUCT_TYPES.shtaketnik,
      name: "Штакетник металлический ELLIPSE 0.45 Viking",
      description: "Двусторонний мат",
      price: 5.9,
    },
  ],
  ids: [1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15],
  loadingStatus: LOADING_STATUS.finished,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingStatus = LOADING_STATUS.inProgress;
    },
    finishLoading: (state, { payload }) => {
      const { products } = payload;
      state.entities = products.reduce(
        (acc: { [id: TProductID]: TProduct }, product: TProduct) => {
          acc[product.id] = product;
          return acc;
        },
        { ...state.entities }
      );
      const ids = products.map(({ id }: TProduct) => id);
      state.ids = [...state.ids, ids];
      state.loadingStatus = LOADING_STATUS.finished;
    },
    failLoading: (state) => {
      state.loadingStatus = LOADING_STATUS.failed;
    },
  },
});
