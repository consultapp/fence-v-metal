import { RootState } from "@/store";
import { Dispatch } from "redux";
import { productSlice } from "..";

import { TProduct } from "@/types";
import { parseProflistData } from "./parseProflistData";
import { selectProductLoadingStatus } from "../selectors";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import { parseShtaketnikData } from "./parseShtaketnikData";
import { parsePipesData } from "./parsePipesData";
import { parseScrew } from "./parseScrew";
import { API_URL } from "@/fixtures/API_URL";

async function loadData() {
  const proflists = fetch(
    `${API_URL}/products/?_fields=id,slug,meta,title,link&per_page=100&product_cat=49`
  );
  const shtaketnik = fetch(
    `${API_URL}/products/?_fields=id,slug,meta,title,link&per_page=100&product_cat=36`
  );
  const pipes = fetch(
    `${API_URL}/products/?_fields=id,slug,meta,title,link&per_page=100&product_cat=8`
  );
  const screw = fetch(
    `${API_URL}/products/1160/?_fields=id,slug,meta,title,link`
  );

  const products: TProduct[] = [];

  try {
    const data = await Promise.all([proflists, shtaketnik, pipes, screw]);
    const p = await Promise.all(data.map((d) => d.json()));

    products.push(
      ...parseProflistData(p[0]),
      ...parseShtaketnikData(p[1]),
      ...parsePipesData(p[2]),
      ...parseScrew([p[3]])
    );
  } catch (error) {
    new Error("Load error" + error);
  }

  return products;
}

export const loadProductsIfNotExisted =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    const loadingStatus = selectProductLoadingStatus(getState());

    if (loadingStatus === LOADING_STATUS.finished) {
      return;
    }

    dispatch(productSlice.actions.startLoading());

    loadData()
      .then((products) => {
        dispatch(productSlice.actions.finishLoading({ products }));
      })
      .catch(() => {
        console.error("failLoading");
        dispatch(productSlice.actions.failLoading());
      });
  };
