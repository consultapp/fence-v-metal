import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import FILTERS from "@/fixtures/FILTERS";
import SHTAKETNIK_TYPES from "@/fixtures/SHTAKETNIK_TYPES";
import { store } from "@/store";
import { IErrorFields, TProductID } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInit {
  fenceType: keyof typeof FENCE_TYPES;
  shtaketnikType: keyof typeof SHTAKETNIK_TYPES;
  filter: string | null;
  materialId: TProductID | null;
  pillarId: TProductID | null;
  joistId: TProductID | null;
  length: number;
  height: number;
  showResult: boolean;
  errorFields: IErrorFields;
  color: string | null;
}

const initialState: IInit = {
  fenceType: FENCE_TYPES.proflist,
  shtaketnikType: SHTAKETNIK_TYPES.oneSide,
  filter: FILTERS[FENCE_TYPES.proflist][0].slug,
  materialId: null,
  pillarId: null,
  joistId: null,
  showResult: false,
  length: 100,
  height: 1.7,
  errorFields: {
    material: false,
    pillar: false,
    joist: false,
    length: false,
    height: false,
  },
  color: null,
};

export const fenceSlice = createSlice({
  name: "fence",
  initialState,
  reducers: {
    setFenceType: (state, { payload }) => {
      state.fenceType = payload;
      if (payload) {
        state.filter = FILTERS[payload as keyof typeof FILTERS][0].slug;
      }
      state.shtaketnikType = initialState.shtaketnikType;
      state.materialId = initialState.materialId;
      state.color = null;
    },
    setShtaketnikType: (state, { payload }) => {
      state.shtaketnikType = payload;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
      state.materialId = null;
      state.color = null;
    },
    setMaterialId: (state, { payload }) => {
      if (state.errorFields.material) state.errorFields.material = false;
      state.materialId = payload;
      state.color = null;
    },
    setPillarlId: (state, { payload }) => {
      if (state.errorFields.pillar) state.errorFields.pillar = false;
      state.pillarId = payload;
    },
    setJoistId: (state, { payload }) => {
      if (state.errorFields.joist) state.errorFields.joist = false;
      state.joistId = payload;
    },
    setColor: (state, { payload }) => {
      state.color = payload;
    },
    setLength: (state, { payload }) => {
      if (payload === "") {
        state.length = 0;
      } else {
        if (state.errorFields.length) state.errorFields.length = false;
        let tmp = payload;
        if (checkNumber(tmp)) {
          if (payload < 1) tmp = 1;
          if (payload > 999) tmp = 999;
          state.length = tmp;
        }
      }
    },
    setHeight: (state, { payload }) => {
      if (payload === "") {
        state.height = 0;
      } else {
        if (state.errorFields.height) state.errorFields.height = false;
        let tmp = payload;
        if (checkNumber(tmp)) {
          if (payload < 1) tmp = 1;
          if (payload > 2.5) tmp = 2.5;
          state.height = tmp;
        }
      }
    },
    resetFence: (state) => {
      state.fenceType = initialState.fenceType;
      state.shtaketnikType = initialState.shtaketnikType;
      state.filter = initialState.filter;
      state.materialId = initialState.materialId;
      state.pillarId = initialState.pillarId;
      state.joistId = initialState.joistId;
      state.length = initialState.length;
      state.height = initialState.height;
      state.color = initialState.color;
    },
    showResult: (state) => {
      let result = true;
      if (!state.materialId) {
        state.errorFields.material = true;
        result = false;
      }
      if (!state.pillarId) {
        state.errorFields.pillar = true;
        result = false;
      }
      if (!state.joistId) {
        state.errorFields.joist = true;
        result = false;
      }
      if (!state.length) {
        state.errorFields.length = true;
        result = false;
      }
      if (!state.height) {
        state.errorFields.height = true;
        result = false;
      }
      state.showResult = result;
    },
    hideResult: (state) => {
      state.showResult = false;
    },
  },
});

function checkNumber(n: string) {
  return n.match(/^(0|[1-9]+)(?:[.,]?)(?:\d{1,2}|)$/);
}
