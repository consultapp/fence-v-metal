import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@reduxjs/toolkit/query";

import styles from "./styles.module.css";
import { TProduct } from "@/types";

type Props = {
  products: TProduct[];
  selector: (state: RootState) => any;
  dispatcher: (arg0: string) => unknown;
};

export default function SelectProduct({
  products,
  selector,
  dispatcher,
}: Props) {
  const current = useAppSelector(selector);
  console.log("current", current);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ClickEvent<HTMLButtonElement>) => {
    dispatch(dispatcher(Number(e.target.dataset.id)));
  };

  return (
    <main className={styles.btnRoot1}>
      {products.map((product) => (
        <div
          data-id={product.id}
          className={current === product.id ? styles.selectedP : ""}
          key={product.id}
          onClick={changeHandler}
        >
          {product.name}
        </div>
      ))}
    </main>
  );
}
