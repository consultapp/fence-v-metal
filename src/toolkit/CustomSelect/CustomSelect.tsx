import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TProduct } from "@/types";
import { useMemo, useState } from "react";
import { UnknownAction } from "redux";
import IconLogo from "./icon.svg";

type Props = {
  products: TProduct[];
  selector: (state: RootState) => number | null;
  dispatcher: (arg0: number) => UnknownAction;
};

export default function CustomSelect({
  products,
  selector,
  dispatcher,
}: Props) {
  const current = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct] = useMemo(() => {
    return products.filter((item) => item.id === current);
  }, [products, current]);

  const changeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(dispatcher(Number(e.currentTarget.dataset.id)));
    setIsOpen(false);
  };

  const toggleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      const controller = new AbortController();
      document.addEventListener(
        "click",
        (event) => {
          if (event.target !== e.target) {
            setIsOpen(false);
            controller.abort();
          }
        },
        { signal: controller.signal }
      );
    }
  };

  return (
    <div className="fenceSelect" data-selected>
      <div className="fenceSelect__header" onClick={toggleSelect}>
        <div className="fenceSelect__current" data-empty>
          {currentProduct ? (
            <>
              <div className="fenceSelect__info">
                <div>{currentProduct.name}</div>
                <div>{currentProduct.description}</div>
              </div>
              <div className="fenceSelect__price">
                {currentProduct.price} руб. <span>/м</span>
              </div>
            </>
          ) : (
            <div className="fenceSelect__noinfo">Не выбрано</div>
          )}
        </div>
        <img
          src={IconLogo}
          alt="toggler"
          className={
            isOpen ? "fenceSelect__togglerOpen" : "fenceSelect__toggler"
          }
        />
      </div>
      {isOpen && (
        <div className="fenceSelect__body">
          <div className="fenceSelect__option">
            <div className="fenceSelect__noinfo" key="option_noinfo">
              Не выбрано
            </div>
          </div>
          {products.map((product) => (
            <div
              className="fenceSelect__option"
              data-id={product.id}
              data-selectable
              data-selected={product.id === current}
              onClick={changeHandler}
              key={product.id}
            >
              <div className="fenceSelect__info">
                <div>{product.name}</div>
                <div>{product.description}</div>
              </div>
              <div className="fenceSelect__price">
                {product.price} руб. <span>/м</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
