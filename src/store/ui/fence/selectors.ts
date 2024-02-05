import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import FILTERS from "@/fixtures/FILTERS";
import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectFenceModule = (state: RootState) => state.fence;

export const selectFenceType = (state: RootState) =>
  selectFenceModule(state).fenceType;

export const selectShtaketnikType = (state: RootState) =>
  selectFenceModule(state).shtaketnikType;

export const selectFenceTypeIsSelected = (state: RootState) =>
  selectFenceType(state) !== null;

export const selectFilters = (state: RootState) => {
  const fenceType = selectFenceType(state);
  return fenceType ? FILTERS[fenceType] : null;
};

export const selectCurrentFilter = (state: RootState) => {
  const fenceType = selectFenceType(state);
  if (fenceType) {
    return FILTERS[fenceType].filter(
      (f) => f.slug === selectFenceModule(state).filter
    )[0];
  }
  return null;
};

export const selectIsShowResult = (state: RootState) =>
  selectFenceModule(state).showResult;

export const selectFenceStage2IsHidden = (state: RootState) =>
  selectFenceType(state) !== FENCE_TYPES.shtaketnik;

export const selectFenceMaterialId = (state: RootState) =>
  selectFenceModule(state).materialId;

export const selectFencePillarId = (state: RootState) =>
  selectFenceModule(state).pillarId;

export const selectFenceJoistId = (state: RootState) =>
  selectFenceModule(state).joistId;

export const selectFenceLength = (state: RootState) =>
  selectFenceModule(state).length;

export const selectFenceHeight = (state: RootState) =>
  selectFenceModule(state).height;

export const selectFenceForCalculations = createSelector(
  [
    selectFenceLength,
    selectFenceHeight,
    selectFencePillarId,
    selectFenceJoistId,
    selectFenceMaterialId,
  ],
  (a, b, c, d, e) => [a, b, c, d, e]
);
