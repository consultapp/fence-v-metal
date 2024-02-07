import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { selectFenceHeight } from "@/store/ui/fence/selectors";
import CustomInput from "@/toolkit/CustomInput/CustomInput";

export default function Stage7() {
  const current = useAppSelector(selectFenceHeight);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fenceSlice.actions.setHeight(e.target.value ?? ""));
  };

  return (
    <div>
      <div className="fenceSection__header3">Высота, м.</div>
      <CustomInput onChange={changeHandler} value={current ? current : ""} />
    </div>
  );
}
