import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import { RootState } from "@/store";

export const selectPillarModule = (state: RootState) => state.product;

// Status
export const selectPillarLoadingStatus = (state: RootState) =>
  selectPillarModule(state).loadingStatus;

export const selectIsPillarLoading = (state: RootState) =>
  selectPillarLoadingStatus(state) === LOADING_STATUS.inProgress;
