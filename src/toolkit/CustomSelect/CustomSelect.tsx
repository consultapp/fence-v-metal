import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IErrorFields, TProduct } from "@/types";
import { useMemo, useRef, useState } from "react";
import { UnknownAction } from "redux";
import IconLogo from "./icon.svg";
import { Ceil, sortByPrice } from "@/functions";
import PRODUCT_TYPES from "@/fixtures/PRODUCT_TYPES";
import { selectFenceErrorField } from "@/store/ui/fence/selectors";

type Props = {
  products: TProduct[];
  errorField: keyof IErrorFields;
  selector: (state: RootState) => number | null;
  dispatcher: (arg0: number) => UnknownAction;
};

function getUnits(type: keyof typeof PRODUCT_TYPES | null) {
  if (typeof type !== typeof PRODUCT_TYPES) return;
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

  const toggleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (controller.current) controller.current.abort();

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
      <div className="fenceSelect__header" onClick={toggleSelect}>
        <div className="fenceSelect__current" data-empty>
          {currentProduct ? (
            <>
              <div className="fenceSelect__info">
                <div>{currentProduct.name}</div>
                <div>{currentProduct.description}</div>
              </div>
              <div className="fenceSelect__price">
                {currentProduct.price}&nbsp;руб.{" "}
                <span>
                  /м
                  {currentProduct.productType === PRODUCT_TYPES.proflist ? (
                    <sup>2</sup>
                  ) : (
                    ""
                  )}
                </span>
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
        <div className="fenceSelect__body custom-scrollbar">
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
                    {product.price}&nbsp;руб.{" "}
                    <span>
                      /м
                      {product.productType === PRODUCT_TYPES.proflist ? (
                        <sup>2</sup>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div>
                    {Ceil(
                      (product.price ?? 0) *
                        ((100 - product.currentPromotion) / 100)
                    )}
                    &nbsp;руб. {getUnits(product.productType)}
                  </div>
                </div>
              ) : (
                <div className="fenceSelect__price">
                  {product.price}&nbsp;руб.{" "}
                  <span>
                    /м
                    {product.productType === PRODUCT_TYPES.proflist ? (
                      <sup>2</sup>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
