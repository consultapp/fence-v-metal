import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fenceSlice } from "@/store/ui/fence";
import { RootState } from "@reduxjs/toolkit/query";

import styles from "./styles.module.css";

type Props = {
  types: string[];
  selector: (state: RootState) => any;
  dispatcher: (arg0: string) => unknown;
};

export default function SelectButtons({ types, selector, dispatcher }: Props) {
  const current = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ClickEvent<HTMLButtonElement>) => {
    dispatch(dispatcher(e.target.dataset.value));
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
