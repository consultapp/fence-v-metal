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
  ],
  ids: [1, 2, 3, 4, 5, 6],
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
