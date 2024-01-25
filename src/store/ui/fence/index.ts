import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import SHTAKETNIK_TYPES from "@/fixtures/SHTAKETNIK_TYPES";
import { TProductID } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInit {
  fenceType: keyof typeof FENCE_TYPES | null;
  shtaketnikType: keyof typeof SHTAKETNIK_TYPES | null;
  materialId: TProductID | null;
  pillarId: TProductID | null;
  joistId: TProductID | null;
  length: number;
  height: number;
}

const initialState: IInit = {
  fenceType: null,
  shtaketnikType: null,
  materialId: null,
  pillarId: null,
  joistId: null,
  length: 100,
  height: 1.7,
};

export const fenceSlice = createSlice({
  name: "fence",
  initialState,
  reducers: {
    setFenceType: (state, { payload }) => {
      state.fenceType = payload;
      state.shtaketnikType = null;
      state.materialId = null;
    },
    setShtaketnikType: (state, { payload }) => {
      state.shtaketnikType = payload;
    },
    setMaterialId: (state, { payload }) => {
      state.materialId = payload;
    },
    setPillarlId: (state, { payload }) => {
      state.pillarId = payload;
    },
    setJoistId: (state, { payload }) => {
      state.joistId = payload;
    },
    setLength: (state, { payload }) => {
      state.length = payload;
    },
    setHeight: (state, { payload }) => {
      if (payload === "") {
        state.height = 0;
      } else {
        let tmp = payload;
        if (payload < 1) tmp = 1;
        if (payload > 2.2) tmp = 2.2;
        state.height = tmp;
      }
    },
  },
});
