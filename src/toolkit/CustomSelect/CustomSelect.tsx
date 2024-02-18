import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IErrorFields, TProduct } from "@/types";
import { useCallback, useMemo, useRef, useState } from "react";
import { UnknownAction } from "redux";
import IconLogo from "./icon.svg";
import { Ceil, sortByPrice } from "@/functions";
import PRODUCT_TYPES from "@/fixtures/PRODUCT_TYPES";
import { selectFenceErrorField } from "@/store/ui/fence/selectors";
import classNames from "classnames";

type Props = {
  products: TProduct[];
  errorField: keyof IErrorFields;
  selector: (state: RootState) => number | null;
  dispatcher: (arg0: number) => UnknownAction;
};

function getUnits(type: keyof typeof PRODUCT_TYPES | null) {
  return (
    <>
      &nbsp;руб.{" "}
      <span>
        /м
        {type === PRODUCT_TYPES.proflist ? <sup>2</sup> : ""}
      </span>
    </>
  );
}

export default function CustomSelect({
  products,
  errorField,
  selector,
  dispatcher,
}: Props) {
  const current = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const controller = useRef(new AbortController());
  const header = useRef<HTMLDivElement>(null);
  const [currentProduct] = useMemo(() => {
    return products.filter((item) => item.id === current);
  }, [products, current]);

  const isError = useAppSelector((state) =>
    selectFenceErrorField(state, errorField)
  );

  const changeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(dispatcher(Number(e.currentTarget.dataset.id)));
    setIsOpen(false);
    controller.current.abort();
  };

  const testTopShow = useCallback(() => {
    if (header && header.current) {
      const clientHeight = document.documentElement.clientHeight;
      const { top } = header.current.getBoundingClientRect();
      if (clientHeight - top < 60 * 4 + 60) return true;
    }
    return false;
  }, []);

  const toggleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (controller.current) controller.current.abort();
    console.log("testTopShow()", testTopShow());
    if (isOpen) {
      setIsOpen(false);
    } else {
      if (products.length) {
        setIsOpen(true);
        controller.current = new AbortController();
        document.addEventListener(
          "click",
          (event) => {
            if (event.target !== e.target) {
              setIsOpen(false);
              controller.current.abort();
            }
          },
          { signal: controller.current.signal }
        );
      }
    }
  };

  return (
    <div
      className="fenceSelect"
      data-selected
      data-open={isOpen}
      data-error={isError}
    >
      <div className="fenceSelect__header" ref={header} onClick={toggleSelect}>
        <div className="fenceSelect__current" data-empty>
          {currentProduct ? (
            <>
              <div className="fenceSelect__info">
                <div>{currentProduct.name}</div>
                <div>{currentProduct.description}</div>
              </div>
              <div className="fenceSelect__price">
                {currentProduct.currentPromotion
                  ? Ceil(
                      (currentProduct.price ?? 0) *
                        ((100 - currentProduct.currentPromotion) / 100)
                    )
                  : currentProduct.price}
                {getUnits(currentProduct.productType)}
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
      {!isOpen && (
        <div className="fenceSelect__error">Пожалуйста, заполните это поле</div>
      )}
      {isOpen && (
        <div
          className={classNames(
            "fenceSelect__body",
            "custom-scrollbar",
            testTopShow() && "fenceSelect__body_Top"
          )}
        >
          {sortByPrice(products).map((product) => (
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
              {product.currentPromotion ? (
                <div className="fenceSelect__priceDiscount">
                  <div>
                    {product.price}
                    {getUnits(product.productType)}
                  </div>
                  <div>
                    {Ceil(
                      (product.price ?? 0) *
                        ((100 - product.currentPromotion) / 100)
                    )}
                    {getUnits(product.productType)}
                  </div>
                </div>
              ) : (
                <div className="fenceSelect__price">
                  {product.price}
                  {getUnits(product.productType)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
