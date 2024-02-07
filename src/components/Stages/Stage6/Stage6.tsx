import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { selectFenceLength } from "@/store/ui/fence/selectors";
import CustomInput from "@/toolkit/CustomInput/CustomInput";

export default function Stage6() {
  const current = useAppSelector(selectFenceLength);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fenceSlice.actions.setLength(e.target.value ?? ""));
  };

  return (
    <div>
      <div className="fenceSection__header3">Длина, м.</div>
      <CustomInput onChange={changeHandler} value={current ? current : ""} />
    </div>
  );
}
