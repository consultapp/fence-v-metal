import SelectButtons from "@/components/SelectButton/SelectButton";
import SHTAKETNIK_TYPES from "@/fixtures/SHTAKETNIK_TYPES";
import { useAppSelector } from "@/store/hooks";
import {
  selectFenceStage2IsHidden,
  selectShtaketnikType,
} from "@/store/ui/fence/selectors";
import { fenceSlice } from "@/store/ui/fence";

export default function Stage2() {
  const isHidden = useAppSelector(selectFenceStage2IsHidden);

  if (isHidden) return;

  return (
    <fieldset>
      <legend>SHTAKETNIK_TYPES</legend>
      <SelectButtons
        types={Object.values(SHTAKETNIK_TYPES)}
        selector={selectShtaketnikType}
        dispatcher={fenceSlice.actions.setShtaketnikType}
      />
    </fieldset>
  );
}
