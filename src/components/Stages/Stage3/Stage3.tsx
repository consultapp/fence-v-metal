import FilteredProducts from "@/components/FilteredProducts/FilteredProducts";
import TooltipCustom from "@/components/TooltipCustom/TooltipCustom";
import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import { selectProductsByType } from "@/store/entities/products/selectors";
import { useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import {
  selectFenceMaterialId,
  selectFenceType,
} from "@/store/ui/fence/selectors";

export default function Stage3() {
  const type = useAppSelector(selectFenceType);
  const products = useAppSelector((state) => selectProductsByType(state, type));

  return (
    <div className="fenceSection">
      <div className="fenceSection__header3">
        Форма {type === FENCE_TYPES.proflist ? "профиля" : "штакетника"}{" "}
        <TooltipCustom
          type={
            type === FENCE_TYPES.proflist ? "formOfProfil" : "formShtaketnik"
          }
        />
      </div>
      {
        <FilteredProducts
          products={products}
          selector={selectFenceMaterialId}
          dispatcher={fenceSlice.actions.setMaterialId}
        />
      }
    </div>
  );
}
