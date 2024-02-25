import { IColor } from "@/types";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useAppDispatch } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";

type Props = { color: IColor; selected: boolean };

export default function ColorPickerButton({ color, selected }: Props) {
  const dispatch = useAppDispatch();

  if (!color) return;

  return (
    <div
      className={classNames(
        styles.colorPickerButton,
        selected && styles.colorPickerButton_selected
      )}
      onClick={() => dispatch(fenceSlice.actions.setColor(color.slug))}
    >
      <div style={{ backgroundColor: color.color }}></div>
    </div>
  );
}
