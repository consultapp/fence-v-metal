import SelectProduct from "@/components/SelectProduct/SelectProduct";
import { PRODUCT_TYPES } from "@/fixtures/PRODUCT_TYPES";
import { selectProductsByType } from "@/store/entities/products/selectors";
import { useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { selectFencePillarId } from "@/store/ui/fence/selectors";

export default function Stage4() {
  const products = useAppSelector((state) =>
    selectProductsByType(state, PRODUCT_TYPES.pillar)
  );

  return (
    <fieldset>
      <legend> Select Pillar</legend>
      <SelectProduct
        products={products}
        selector={selectFencePillarId}
        dispatcher={fenceSlice.actions.setPillarlId}
      />
    </fieldset>
  );
}
