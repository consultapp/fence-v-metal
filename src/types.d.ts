// PRODUCTS
import FENCE_TYPES from "./fixtures/FENCE_TYPES";
import LOADING_STATUS from "./fixtures/LOADING_STATUS";
import PRODUCT_TYPES from "./fixtures/PRODUCT_TYPES";
import SHTAKETNIK_TYPES from "./fixtures/SHTAKETNIK_TYPES";

export type TProductID = number;
export interface TProduct {
  id: TProductID;
  slug: string;
  productType: keyof typeof PRODUCT_TYPES;
  name: string;
  link?: string;
  price?: number;
  unit?: string;
  width?: number; // attributes_2_value for PROFLIST
  proflistType?: keyof typeof PRODUCT_TYPES;
  description?: string;
  group_image?: string;
  currentPromotion?: number;
  profilePipeDiscount?: { [key: number]: number };
}

export interface TProductStore {
  entities: { [key: TProductID]: TProduct };
  ids: TProductID[];
  loadingStatus: keyof typeof LOADING_STATUS;
}

export type TShtaketnik = {
  fenceType: FENCE_TYPES.shtaketnik;
  sides: "idel" | "one" | "chess";
  fill: "LANE" | "TRAPEZE" | "ELLIPSE";
};

export type TProflist = {
  fenceType: FENCE_TYPES.proflist;
  productId: TProductID;
};

export type TFenceType = TShtaketnik | TProflist;

export type TFence = {
  type: TFenceType;
  shtaketnikType: "idle" | "no" | "oneSide" | "chess";
  length: number;
  height: number;
  pillar: TPillarID;
  joist: TJoistID;
};

export interface IFilter {
  slug: string;
  name: string;
  link: string;
  description: string;
  perMeter?: {
    [key in keyof typeof SHTAKETNIK_TYPES]: number;
  };
}

export interface IErrorFields {
  material: boolean;
  pillar: boolean;
  joist: boolean;
  length: boolean;
  height: boolean;
}

declare global {
  interface Window {
    basketAddProduct(prodId: number, count: number): void;
    __INITIAL_STATE__: { tooltips: { [key: string]: string }; url: string };
  }
}
// window.__INITIAL_STATE__ = window.__INITIAL_STATE__ || {};
