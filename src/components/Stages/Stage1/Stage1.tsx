import FENCE_TYPES from "@/fixtures/FENCE_TYPES";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { selectFenceType } from "@/store/ui/fence/selectors";

export default function Stage1() {
  const type = useAppSelector(selectFenceType);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target", e.target.id);
    dispatch(fenceSlice.actions.setFenceType(e.target.id));
  };

  return (
    <fieldset>
      <legend> Fence Category</legend>
      <div>
        <input
          type="radio"
          id="shtaketnik"
          name="fenceType"
          value="shtaketnik"
          checked={type === FENCE_TYPES.shtaketnik}
          onChange={changeHandler}
        />
        <label htmlFor="shtaketnik">shtaketnik</label>
      </div>
      <div>
        <input
          type="radio"
          id="proflist"
          name="fenceType"
          value="proflist"
          checked={type === FENCE_TYPES.proflist}
          onChange={changeHandler}
        />
        <label htmlFor="proflist">proflist</label>
      </div>
    </fieldset>
  );
}
