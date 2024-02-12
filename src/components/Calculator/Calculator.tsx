import { FenceProflist, FenceShtaketnik } from "@/fence";
import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import { selectProductById } from "@/store/entities/products/selectors";
import { PRODUCT_TYPES } from "@/fixtures/PRODUCT_TYPES";
import { selectProductsByType } from "@/store/entities/products/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import {
  selectCurrentFilter,
  selectFenceForCalculations,
  selectFenceType,
  selectShtaketnikType,
} from "@/store/ui/fence/selectors";
import CustomButton from "@/toolkit/CustomButton/CustomButton";
import TableCell from "@/toolkit/TableCell/TableCell";
import { Ceil } from "@/functions";

export default function Calculator() {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectFenceType);

  const [length, height, pillarId, joistId, materialId] = useAppSelector(
    selectFenceForCalculations
  );
  const shtaketnikType = useAppSelector(selectShtaketnikType);
  const filter = useAppSelector(selectCurrentFilter);

  const material = useAppSelector((state) =>
    selectProductById(state, materialId ?? 0)
  );
  const pillar = useAppSelector((state) =>
    selectProductById(state, pillarId ?? 0)
  );
  const joist = useAppSelector((state) =>
    selectProductById(state, joistId ?? 0)
  );
  const [screw] = useAppSelector((state) =>
    selectProductsByType(state, PRODUCT_TYPES.screw)
  );
  const [stub] = useAppSelector((state) =>
    selectProductsByType(state, PRODUCT_TYPES.stub)
  );

  const fence =
    type === FENCE_TYPES.shtaketnik
      ? new FenceShtaketnik({
          length,
          height,
          pillar,
          joist,
          screw,
          stub,
          material,
          shtaketnikType,
          filter,
        })
      : new FenceProflist({
          length,
          height,
          pillar,
          joist,
          screw,
          stub,
          material,
        });

  const cMaterial = fence.getMaterialCalculations();
  const cPillar = fence.getPillarCalculation();
  const cJoist = fence.getJoistCalculation();
  const cScrew = fence.getScrewCalculations();
  const cStub = fence.getStubCalculations();

  const addToBasket = () => {
    // basketAddProduct(prodID,1);
    if ("basketAddProduct" in window) {
      window.basketAddProduct(material.id, cMaterial?.squareMeter ?? 0);
      window.basketAddProduct(pillar.id, cPillar?.meters ?? 0);
      window.basketAddProduct(joist.id, cJoist?.meters ?? 0);
      window.basketAddProduct(screw.id, cScrew?.count ?? 0);
      window.basketAddProduct(stub.id, cStub?.count ?? 0);
    }
  };

  if (!cMaterial) return "";

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
          <div className="fenceTable__cell fenceTable__header fenceTable_center">
            Количество
          </div>
          <div className="fenceTable__cell fenceTable__header fenceTable_end">
            Стоимость
          </div>
          <TableCell
            product={material}
            contain={true}
            countInfo={cMaterial?.countInfo}
            count={cMaterial.squareMeter}
            description={cMaterial.description}
            totalPrice={cMaterial.totalPrice}
            oldPrice={cMaterial.oldPrice}
            showDescription={true}
          />
          <TableCell
            product={pillar}
            count={cPillar?.meters}
            totalPrice={cPillar?.totalPrice}
            oldPrice={cPillar?.oldPrice}
            description={cPillar?.description}
            countInfo="м"
          />
          <TableCell
            product={joist}
            count={cJoist?.meters}
            totalPrice={cJoist?.totalPrice}
            oldPrice={cJoist?.oldPrice}
            countInfo="м"
          />
          <TableCell
            product={screw}
            countInfo="шт."
            count={cScrew?.count ?? 0}
            totalPrice={cScrew?.totalPrice ?? 0}
            oldPrice={cScrew?.totalPrice ?? 0}
          />
          <TableCell
            product={stub}
            count={cStub?.count}
            totalPrice={cStub?.totalPrice ?? 0}
            oldPrice={cStub?.totalPrice ?? 0}
            countInfo="шт."
          />
          <div className="fenceTable__result">Итого:</div>
          <div className="fenceTable__resultPrice">
            {Ceil(
              (cMaterial?.totalPrice ?? 0) +
                (cPillar?.totalPrice ?? 0) +
                (cJoist?.totalPrice ?? 0) +
                (cScrew?.totalPrice ?? 0) +
                (cStub?.totalPrice ?? 0)
            )}
            &nbsp;руб.
          </div>
        </div>
      </div>
      <div className="fenceSection fenceSection_flexRow">
        <CustomButton
          type="secondary"
          half50={true}
          onClick={() => dispatch(fenceSlice.actions.showResult())}
        >
          Отправить расчёт
        </CustomButton>
        <CustomButton type="primary" onClick={addToBasket} half50={true}>
          Добавить в корзину
        </CustomButton>
      </div>
    </>
  );
}
