import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import { RootState } from "@/store";

export const selectFenceModule = (state: RootState) => state.fence;

export const selectFenceType = (state: RootState) =>
  selectFenceModule(state).fenceType;

export const selectShtaketnikType = (state: RootState) =>
  selectFenceModule(state).shtaketnikType;

export const selectFenceTypeIsSelected = (state: RootState) =>
  selectFenceType(state) !== null;

export const selectFenceStage2IsHidden = (state: RootState) =>
  selectFenceType(state) !== FENCE_TYPES.shtaketnik;
