import SelectProduct from "@/components/SelectProduct/SelectProduct";
import { selectProductsByType } from "@/store/entities/products/selectors";
import { useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import {
  selectFenceMaterialId,
  selectFenceType,
} from "@/store/ui/fence/selectors";
import CustomSelect from "@/toolkit/CustomSelect/CustomSelect";

export default function Stage3() {
  const type = useAppSelector(selectFenceType);
  const products = useAppSelector((state) => selectProductsByType(state, type));

  return (
    <div className="fenceSection">
      <div className="fenceSection__header3">Форма</div>
      {products?.length ? (
        <CustomSelect
          products={products}
          selector={selectFenceMaterialId}
          dispatcher={fenceSlice.actions.setMaterialId}
        />
      ) : (
        ""
      )}
    </div>
  );
}
