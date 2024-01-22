import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import SHTAKETNIK_TYPES from "@/fixtures/SHTAKETNIK_TYPES";
import { createSlice } from "@reduxjs/toolkit";

interface IInit {
  fenceType: keyof typeof FENCE_TYPES | null;
  shtaketnikType: keyof typeof SHTAKETNIK_TYPES | null;
}

const initialState: IInit = {
  fenceType: null,
  shtaketnikType: null,
};

export const fenceSlice = createSlice({
  name: "fence",
  initialState,
  reducers: {
    setFenceType: (state, { payload }) => {
      state.fenceType = payload;
      state.shtaketnikType = null;
    },
    setShtaketnikType: (state, { payload }) => {
      state.shtaketnikType = payload;
    },
  },
});
