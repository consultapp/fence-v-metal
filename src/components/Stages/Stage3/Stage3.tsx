import SelectProduct from "@/components/SelectProduct/SelectProduct";
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
    <fieldset>
      <legend> Select Material</legend>
      {products?.length ? (
        <SelectProduct
          products={products}
          selector={selectFenceMaterialId}
          dispatcher={fenceSlice.actions.setMaterialId}
        />
      ) : (
        ""
      )}
    </fieldset>
  );
}
