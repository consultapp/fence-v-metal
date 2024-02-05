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
import Loading from "@/toolkit/Loading/Loading";
import Calculator from "../Calculator/Calculator";
import CustomButton from "@/toolkit/CustomButton/CustomButton";
import { fenceSlice } from "@/store/ui/fence";

export default function Fence() {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectProductLoadingStatus);

  useEffect(() => {
    dispatch(loadProductsIfNotExisted());
  }, [dispatch]);

  if (loadingStatus === LOADING_STATUS.failed)
    return (
      <div>
        <h1>Error of data loading.</h1>
      </div>
    );

  return (
    <div className="fenceCalc">
      <div className="fenceCalc_header1">Калькулятор забора</div>
      <div className="fenceCalc_header2">
        Рассчитайте вес и длину необходимого вам товара
      </div>
      {loadingStatus !== LOADING_STATUS.finished ? (
        <div
          style={{
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div className="fenceCalc_wrapper">
          <Stage1 />
          <Stage2 />
          <Stage3 />
          <Stage4 />
          <Stage5 />
          <div className="fenceSection">
            <div className="fenceSection_twoColumn">
              <Stage6 />
              <Stage7 />
            </div>
          </div>

          <div className="fenceSection fenceSection_flexRow">
            <CustomButton type="primary" onClick={() => {}} half50={true}>
              Рассчитать
            </CustomButton>
            <CustomButton
              type="primary"
              border="outlined"
              onClick={() => dispatch(fenceSlice.actions.resetFence())}
              half50={true}
            >
              Очистить все поля
            </CustomButton>
          </div>

          <Calculator />
        </div>
      )}
    </div>
  );
}
