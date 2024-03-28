import { selectProductById } from "@/store/entities/products/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import {
  selectFenceColor,
  selectFenceMaterialId,
} from "@/store/ui/fence/selectors";
import ColorPicker from "@/toolkit/ColorPicker/ColorPicker";
import { useLayoutEffect } from "react";

export default function StageColor() {
  const materialId = useAppSelector(selectFenceMaterialId);
  const material = useAppSelector((state) =>
    selectProductById(state, materialId ?? 0)
  );
  const currentColor = useAppSelector(selectFenceColor);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (
      material &&
      material.colors &&
      material.colors.length &&
      currentColor === null
    ) {
      dispatch(fenceSlice.actions.setColor(material.colors[0]));
    }
  }, [materialId, currentColor, dispatch, material]);

  if (!material || !material.colors) return;

  return (
    <div className="fenceSection">
      <div className="fenceSection__header3">
        Цвет
        <span className="fenceSection__headerSpan">
          {currentColor?.name?.toUpperCase()}
        </span>
      </div>
      <ColorPicker colors={material.colors} currentColor={currentColor} />
    </div>
  );
}
