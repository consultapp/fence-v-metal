import { RootState } from "@/store";
import { Dispatch } from "redux";
import { productSlice } from "..";

import { TProduct } from "@/types";
import { parseProflistData } from "./parseProflistData";
import { selectProductLoadingStatus } from "../selectors";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import { parseShtaketnikData } from "./parseShtaketnikData";

// https://metal.webcartel.ru/wp-json/wp/v2/products/?_fields=slug&per_page=100&product_cat=8
export const CAT_PROFILE_PIPE = { slug: "profile-pipe", id: 8 };

// https://metal.webcartel.ru/wp-json/wp/v2/products/?_fields=slug&per_page=100&product_cat=36
export const CAT_SHTAKETNIK = { slug: "fence", id: 36 };

// https://metal.webcartel.ru/wp-json/wp/v2/products/?_fields=slug&per_page=100&product_cat=49
export const CAT_PROFLIST = { slug: "profnastil", id: 49 };

async function loadData() {
  const proflists = fetch(
    "https://metal.webcartel.ru/wp-json/wp/v2/products/?_fields=id,slug,meta,title&per_page=100&product_cat=49"
  );
  const shtaketnik = fetch(
    "https://metal.webcartel.ru/wp-json/wp/v2/products/?_fields=id,slug,meta,title&per_page=100&product_cat=36"
  );
  const pipes = fetch(
    "https://metal.webcartel.ru/wp-json/wp/v2/products/?_fields=id,slug,meta,title&per_page=100&product_cat=8"
  );

  const products: TProduct[] = [];

  try {
    const data = await Promise.all([proflists, shtaketnik, pipes]);
    const proflistsData = await data[0].json();
    const shtaketnikData = await data[1].json();
    // const pipesData = await data[2].json();
    products.push(
      ...parseProflistData(proflistsData),
      ...parseShtaketnikData(shtaketnikData)
    );
  } catch (error) {
    new Error("Load error" + error);
  }

  console.log("products", products);

  return products;
}

export const loadProductsIfNotExisted =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    const loadingStatus = selectProductLoadingStatus(getState());

    if (loadingStatus === LOADING_STATUS.finished) {
      return;
    }
    console.log("Network Usage (loadProductsIfNotExisted)");

    dispatch(productSlice.actions.startLoading());

    loadData()
      .then((products) => {
        dispatch(productSlice.actions.finishLoading({ products }));
        console.log("dispatch", products);
      })
      .catch(() => {
        console.log("failLoading");
        dispatch(productSlice.actions.failLoading());
      });
  };
