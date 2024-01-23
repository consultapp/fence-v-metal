import SelectProduct from "@/components/SelectProduct/SelectProduct";
import { PRODUCT_TYPES } from "@/fixtures/PRODUCT_TYPES";
import { selectProductsByType } from "@/store/entities/products/selectors";
import { useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { selectFenceJoistId } from "@/store/ui/fence/selectors";

export default function Stage5() {
  const products = useAppSelector((state) =>
    selectProductsByType(state, PRODUCT_TYPES.joist)
  );

  return (
    <fieldset>
      <legend> Select Joist</legend>
      <SelectProduct
        products={products}
        selector={selectFenceJoistId}
        dispatcher={fenceSlice.actions.setJoistId}
      />
    </fieldset>
  );
}
