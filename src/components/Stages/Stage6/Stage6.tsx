import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import {
  selectFenceErrorField,
  selectFenceLength,
} from "@/store/ui/fence/selectors";
import CustomInput from "@/toolkit/CustomInput/CustomInput";

export default function Stage6() {
  const current = useAppSelector(selectFenceLength);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fenceSlice.actions.setLength(e.target.value ?? ""));
  };

  const isError = useAppSelector((state) =>
    selectFenceErrorField(state, "length")
  );
  return (
    <div>
      <div className="fenceSection__header3">Длина,&nbsp;м.</div>
      <CustomInput
        onChange={changeHandler}
        value={current ? current : ""}
        isError={isError}
      />
    </div>
  );
}
