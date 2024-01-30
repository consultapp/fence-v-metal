import Stage1 from "@/components/Stages/Stage1/Stage1";
import Stage2 from "../Stages/Stage2/Stage2";
import Stage3 from "../Stages/Stage3/Stage3";
import Stage4 from "../Stages/Stage4/Stage4";
import Stage5 from "../Stages/Stage5/Stage5";
import Stage6 from "../Stages/Stage6/Stage6";
import Stage7 from "../Stages/Stage7/Stage7";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadProductsIfNotExisted } from "@/store/entities/products/thunk/loadProductsIfNotExisted";
import { selectProductLoadingStatus } from "@/store/entities/products/selectors";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import Loading from "../Loading/Loading";
import styles from "./style.module.scss";
import classNames from "classnames";
import Calculator from "../Calculator/Calculator";

export default function Fence() {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectProductLoadingStatus);

  useEffect(() => {
    dispatch(loadProductsIfNotExisted());
  }, [dispatch]);

  if (loadingStatus === LOADING_STATUS.failed)
    return (
      <div className={classNames(styles.root)}>
        <h1>Error of data loading.</h1>
      </div>
    );

  if (loadingStatus !== LOADING_STATUS.finished)
    return (
      <div className={classNames(styles.root, styles.loading)}>
        <Loading />
      </div>
    );

  return (
    <div className="fenceCalc">
      <div className="fenceCalc_header1">Калькулятор забора</div>
      <div className="fenceCalc_header2">
        Рассчитайте вес и длину необходимого вам товара
      </div>
      <div className="fenceCalc_wrapper">
        <Stage1 />
        <Stage2 />
        <Stage3 />
        <Stage4 />
        <Stage5 />
        <Stage6 />
        <Stage7 />
        <Calculator />
      </div>
    </div>
  );
}
