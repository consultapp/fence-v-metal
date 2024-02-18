import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import PRODUCT_TYPES from "@/fixtures/PRODUCT_TYPES";
import { RootState } from "@/store";
import { TProduct, TProductID } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

export const selectProductModule = (state: RootState) => state.product;
export const selectProductEntities = createSelector(
  [selectProductModule],
  (s) => s.entities
);
export const selectProductEntityValues = createSelector(
  [selectProductEntities],
  (s) => Object.values<TProduct>(s)
);
// Status
export const selectProductLoadingStatus = (state: RootState) =>
  selectProductModule(state).loadingStatus;

export const selectProductIsLoading = (state: RootState) =>
  selectProductLoadingStatus(state) === LOADING_STATUS.inProgress;

const selectPayload = (
  _state: RootState,
  payload: keyof typeof PRODUCT_TYPES | null
) => payload;

export const selectProductsByType = createSelector(
  [selectProductEntityValues, selectPayload],
  (values, payload) => values.filter((item) => item.productType === payload)
);

export const selectProductById = (state: RootState, payload: TProductID) =>
  selectProductModule(state).entities[payload];
