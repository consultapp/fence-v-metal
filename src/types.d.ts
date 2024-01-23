// PRODUCTS
import FENCE_TYPES from "./fixtures/FENCE_TYPES";
import LOADING_STATUS from "./fixtures/LOADING_STATUS";
import PRODUCT_TYPES from "./fixtures/PRODUCT_TYPES";

export type TProductID = number;
export interface TProduct {
  id: TProductID;
  productType: keyof typeof PRODUCT_TYPES;
  name: string;
  link?: string;
  price?: number;
  proflistType?: keyof typeof PRODUCT_TYPES;
  description?: string;
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

export interface TProductStore<T> {
  entities: T[];
  ids: T["id"][];
  loadingStatus: keyof typeof LOADING_STATUS;
}
