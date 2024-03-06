import TooltipCustom from "@/components/TooltipCustom/TooltipCustom";
import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import { fenceSlice } from "@/store/ui/fence";
import { selectFenceType } from "@/store/ui/fence/selectors";
import RadioButtons from "@/toolkit/RadioButtons/RadioButtons";

export default function Stage1() {
  return (
    <div className="fenceSection">
      <div className="fenceSection__header3">
        Тип забора <TooltipCustom type="fenceType" />
      </div>
      <RadioButtons
        types={Object.values(FENCE_TYPES)}
        selector={selectFenceType}
        dispatcher={fenceSlice.actions.setFenceType}
      />
      <div className="fenceSection__line"></div>
    </div>
  );
}
