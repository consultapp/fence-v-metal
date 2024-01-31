import { PRODUCT_TYPES } from "@/fixtures/PRODUCT_TYPES";
import { selectProductsByType } from "@/store/entities/products/selectors";
import { useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { selectFencePillarId } from "@/store/ui/fence/selectors";
import CustomSelect from "@/toolkit/CustomSelect/CustomSelect";

export default function Stage4() {
  const products = useAppSelector((state) =>
    selectProductsByType(state, PRODUCT_TYPES.pillar)
  );

  return (
    <div className="fenceSection">
      <div className="fenceSection__header3">Столб</div>
      <CustomSelect
        products={products}
        selector={selectFencePillarId}
        dispatcher={fenceSlice.actions.setPillarlId}
      />
    </div>
  );
}
