import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { selectFenceHeight } from "@/store/ui/fence/selectors";

export default function Stage7() {
  const current = useAppSelector(selectFenceHeight);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fenceSlice.actions.setHeight(e.target.value ?? ""));
  };

  return (
    <fieldset>
      <legend> Height (meters)</legend>
      <input
        onChange={changeHandler}
        value={current === 0 || current ? current : ""}
      />
    </fieldset>
  );
}
