import TooltipCustom from "@/components/TooltipCustom/TooltipCustom";
import PRODUCT_TYPES from "@/fixtures/PRODUCT_TYPES";
import { selectProductsByType } from "@/store/entities/products/selectors";
import { useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { selectFenceJoistId } from "@/store/ui/fence/selectors";
import CustomSelect from "@/toolkit/CustomSelect/CustomSelect";

export default function Stage5() {
  const products = useAppSelector((state) =>
    selectProductsByType(state, PRODUCT_TYPES.joist)
  );

  return (
    <div className="fenceSection">
      <div className="fenceSection__header3">
        Лаги <TooltipCustom type="joist" />
      </div>
      <div className="fenceSection__line"></div>

      <CustomSelect
        errorField="joist"
        products={products}
        selector={selectFenceJoistId}
        dispatcher={fenceSlice.actions.setJoistId}
      />
    </div>
  );
}
