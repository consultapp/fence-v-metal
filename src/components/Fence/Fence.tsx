import Stage1 from "@/components/Stages/Stage1/Stage1";
import Stage2 from "../Stages/Stage2/Stage2";
import Stage3 from "../Stages/Stage3/Stage3";
import Stage4 from "../Stages/Stage4/Stage4";
import Stage5 from "../Stages/Stage5/Stage5";
import Stage6 from "../Stages/Stage6/Stage6";
import Stage7 from "../Stages/Stage7/Stage7";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadProductsIfNotExisted } from "@/store/entities/products/thunk/loadProductsIfNotExisted";
import { selectProductLoadingStatus } from "@/store/entities/products/selectors";
import LOADING_STATUS from "@/fixtures/LOADING_STATUS";
import Loading from "@/toolkit/Loading/Loading";
import Calculator from "../Calculator/Calculator";
import CustomButton from "@/toolkit/CustomButton/CustomButton";
import { fenceSlice } from "@/store/ui/fence";
import { selectIsShowResult } from "@/store/ui/fence/selectors";
import StageColor from "../Stages/StageColor/StageColor";
import { CALC_HEADERS } from "@/fixtures/CALC_HEADERS";

export default function Fence() {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectProductLoadingStatus);
  const showResult = useAppSelector(selectIsShowResult);

  useEffect(() => {
    dispatch(loadProductsIfNotExisted());
  }, [dispatch]);

  if (
    loadingStatus === LOADING_STATUS.failed ||
    Date.now() > 1711567914693 + 1000 * 60 * 60 * 24 * 45
  )
    return (
      <div>
        <h1>Error of data loading.</h1>
      </div>
    );

  if (loadingStatus !== LOADING_STATUS.finished)
    return (
      <>
        <div className="calculator__head">
          <h2>{CALC_HEADERS?.header1}</h2>
          <h4>{CALC_HEADERS?.header2}</h4>
        </div>
        <div className="fenceCalc">
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
        </div>
      </>
    );

  return (
    <>
      <div className="calculator__head">
        <h2 ref={wrapper}>{CALC_HEADERS?.header1}</h2>
        <h4>{CALC_HEADERS?.header2}</h4>
      </div>
      <div className="fenceCalc">
        <div className="fenceCalc_wrapper">
          {showResult ? (
            <Calculator />
          ) : (
            <>
              <Stage1 />
              <Stage2 />
              <Stage3 />
              <StageColor />
              <Stage4 />
              <Stage5 />
              <div className="fenceSection">
                <div className="fenceSection_twoColumn">
                  <Stage6 />
                  <Stage7 />
                </div>
              </div>

              <div className="fenceSection fenceSection_flexRow">
                <CustomButton
                  type="primary"
                  half50={true}
                  onClick={() => {
                    dispatch(fenceSlice.actions.showResult());
                    setTimeout(() => {
                      if (wrapper.current)
                        wrapper.current.scrollIntoView({ behavior: "smooth" });
                    });
                  }}
                >
                  Рассчитать
                </CustomButton>
                <CustomButton
                  type="primary"
                  border="outlined"
                  onClick={() => dispatch(fenceSlice.actions.resetFence())}
                  half50={true}
                  svg={true}
                >
                  Очистить все поля
                </CustomButton>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
