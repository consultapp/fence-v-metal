import { IColor } from "@/types";
import styles from "./styles.module.scss";
import ColorPickerButton from "../ColorPickerButton/ColorPickerButton";

type Props = { colors: IColor[] | undefined; currentColor: IColor | null };

export default function ColorPicker({ colors, currentColor }: Props) {
  if (!colors || !colors.length) return;

  return (
    <div className={styles.colorPicker}>
      {colors.map((color) => (
        <ColorPickerButton
          key={color.slug}
          color={color}
          selected={color.slug === currentColor?.slug}
        />
      ))}
    </div>
  );
}
