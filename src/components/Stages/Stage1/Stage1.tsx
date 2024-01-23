import SelectButtons from "@/components/SelectButton/SelectButton";
import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import { fenceSlice } from "@/store/ui/fence";
import { selectFenceType } from "@/store/ui/fence/selectors";

export default function Stage1() {
  return (
    <fieldset>
      <legend>FENCE_TYPES </legend>
      <SelectButtons
        types={Object.values(FENCE_TYPES)}
        selector={selectFenceType}
        dispatcher={fenceSlice.actions.setFenceType}
      />
    </fieldset>
  );
}
