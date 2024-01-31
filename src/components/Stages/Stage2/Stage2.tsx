import SHTAKETNIK_TYPES from "@/fixtures/SHTAKETNIK_TYPES";
import { useAppSelector } from "@/store/hooks";
import {
  selectFenceStage2IsHidden,
  selectShtaketnikType,
} from "@/store/ui/fence/selectors";
import { fenceSlice } from "@/store/ui/fence";
import RadioButtons from "@/toolkit/RadioButtons/RadioButtons";

export default function Stage2() {
  const isHidden = useAppSelector(selectFenceStage2IsHidden);

  if (isHidden) return;

  return (
    <div className="fenceSection">
      <div className="fenceSection__header3">Тип забора</div>
      <RadioButtons
        types={Object.values(SHTAKETNIK_TYPES)}
        selector={selectShtaketnikType}
        dispatcher={fenceSlice.actions.setShtaketnikType}
      />
      <div className="fenceSection__line"></div>
    </div>
  );
}
