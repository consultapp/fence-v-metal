import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

import styles from "./styles.module.css";
import { UnknownAction } from "redux";

type Props = {
  types: string[];
  selector: (state: RootState) => string | null;
  dispatcher: (arg0: string) => UnknownAction;
};

export default function SelectButtons({ types, selector, dispatcher }: Props) {
  const current = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(dispatcher(e.currentTarget.dataset.value ?? ""));
  };

  return (
    <main className={styles.btnRoot}>
      {types.map((type) => (
        <div
          data-value={type}
          className={current === type ? styles.selected : ""}
          key={type}
          onClick={changeHandler}
        >
          {type}
        </div>
      ))}
    </main>
  );
}
