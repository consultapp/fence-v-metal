import { FenceProflist, FenceShtaketnik } from "@/fence";
import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import { selectProductById } from "@/store/entities/products/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import {
  selectFenceForCalculations,
  selectFenceType,
} from "@/store/ui/fence/selectors";
import CustomButton from "@/toolkit/CustomButton/CustomButton";

export default function Calculator() {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectFenceType);
  const [length, height, pillarId, joistId] = useAppSelector(
    selectFenceForCalculations
  );

  const pillar = useAppSelector((state) =>
    selectProductById(state, pillarId ?? 0)
  );
  const joist = useAppSelector((state) =>
    selectProductById(state, joistId ?? 0)
  );

  // if (!pillarId || !joistId) return;

  const fence =
    type === FENCE_TYPES.shtaketnik
      ? new FenceShtaketnik({ length, height, pillar, joist })
      : new FenceProflist({ length, height, pillar, joist });

  const p = fence.getPillarCalculation();
  const j = fence.getJoistCalculation();

  return (
    <>
      <div className="fenceSection">
        <button
          className="fenceFlatButton"
          onClick={() => dispatch(fenceSlice.actions.hideResult())}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.7071 3.04289C10.3166 2.65237 9.68342 2.65237 9.29289 3.04289L4.79289 7.54289C4.40237 7.93342 4.40237 8.56658 4.79289 8.95711L9.29289 13.4571C9.68342 13.8476 10.3166 13.8476 10.7071 13.4571C11.0976 13.0666 11.0976 12.4334 10.7071 12.0429L6.91421 8.25L10.7071 4.45711C11.0976 4.06658 11.0976 3.43342 10.7071 3.04289Z"
              fill="#22122D"
            />
          </svg>
          Вернуться назад
        </button>
      </div>
      <div className="fenceSection">
        <div className="fenceTable">
          <div className="fenceTable__cell fenceTable__header">
            Название товара
          </div>
          <div className="fenceTable__cell fenceTable__header">Количество</div>
          <div className="fenceTable__cell fenceTable__header">Стоимость</div>
          <div className="fenceTable__cell">4</div>
          <div className="fenceTable__cell">5</div>
          <div className="fenceTable__cell">6</div>
          <div className="fenceTable__cell">7</div>
          <div className="fenceTable__cell">8</div>
          <div className="fenceTable__cell">9</div>
          <div className="fenceTable__cell">10</div>
          <div className="fenceTable__cell">11</div>
          <div className="fenceTable__cell">12</div>
          <div className="fenceTable__cell">13</div>
          <div className="fenceTable__cell">14</div>
          <div className="fenceTable__cell">15</div>
          <div className="fenceTable__cell">13</div>
          <div className="fenceTable__cell">14</div>
          <div className="fenceTable__cell">15</div>
          <div className="fenceTable__result">Итого:</div>
          <div className="fenceTable__resultPrice">999 руб.</div>
        </div>
      </div>
      <div className="fenceSection">
        <div className="fenceSection__twoColumns"></div>
      </div>
      <div className="fenceSection fenceSection_flexRow">
        <CustomButton
          type="secondary"
          half50={true}
          onClick={() => dispatch(fenceSlice.actions.showResult())}
        >
          Отправить расчёт
        </CustomButton>
        <CustomButton
          type="primary"
          onClick={() => dispatch(fenceSlice.actions.resetFence())}
          half50={true}
        >
          Добавить в корзину
        </CustomButton>
      </div>
    </>
  );
}
