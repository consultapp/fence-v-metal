import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import { PRODUCT_TYPES } from "@/fixtures/PRODUCT_TYPES";
import { RootState } from "@/store";

export const selectProductModule = (state: RootState) => state.product;

// Status
export const selectProductLoadingStatus = (state: RootState) =>
  selectProductModule(state).loadingStatus;

export const selectIsProductLoading = (state: RootState) =>
  selectProductLoadingStatus(state) === LOADING_STATUS.inProgress;

export const selectProductsByType = (
  state: RootState,
  payload: keyof typeof PRODUCT_TYPES | null
) =>
  selectProductModule(state).entities.filter(
    (item) => item.productType === payload
  );
