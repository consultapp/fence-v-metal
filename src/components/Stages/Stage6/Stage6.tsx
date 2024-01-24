import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { selectFenceLength } from "@/store/ui/fence/selectors";

export default function Stage6() {
  const current = useAppSelector(selectFenceLength);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fenceSlice.actions.setLength(e.target.value ?? ""));
  };

  return (
    <fieldset>
      <legend> Length (meters)</legend>
      <input
        onChange={changeHandler}
        value={current === 0 || current ? current : ""}
      />
    </fieldset>
  );
}
