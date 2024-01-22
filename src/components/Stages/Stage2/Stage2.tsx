import SHTAKETNIK_TYPES from "@/fixtures/SHTAKETNIK_TYPES";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import {
  selectFenceStage2IsHidden,
  selectShtaketnikType,
} from "@/store/ui/fence/selectors";

export default function Stage2() {
  const isHidden = useAppSelector(selectFenceStage2IsHidden);
  const type = useAppSelector(selectShtaketnikType);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target", e.target.id);
    dispatch(fenceSlice.actions.setShtaketnikType(e.target.id));
  };

  if (isHidden) return;

  return (
    <fieldset>
      <legend>Shtaketnik type</legend>
      <div>
        <input
          type="radio"
          id="oneSide"
          name="shtaketnikType"
          value="oneSide"
          checked={type === SHTAKETNIK_TYPES.oneSide}
          onChange={changeHandler}
        />
        <label htmlFor="shtaketnik">oneSide</label>
      </div>
      <div>
        <input
          type="radio"
          id="chess"
          name="shtaketnikType"
          value="chess"
          checked={type === SHTAKETNIK_TYPES.chess}
          onChange={changeHandler}
        />
        <label htmlFor="proflist">chess</label>
      </div>
    </fieldset>
  );
}
