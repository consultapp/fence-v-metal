import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@reduxjs/toolkit/query";

import styles from "./styles.module.css";
import { TProduct } from "@/types";
import { UnknownAction } from "redux";

type Props = {
  products: TProduct[];
  selector: (state: RootState) => any;
  dispatcher: (arg0: number) => UnknownAction;
};

export default function SelectProduct({
  products,
  selector,
  dispatcher,
}: Props) {
  const current = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(dispatcher(Number(e.currentTarget.dataset.id)));
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
          <p>{product.name}</p>
          <p>{product?.price} руб.</p>
          <p>{product?.description}</p>
        </div>
      ))}
    </main>
  );
}
