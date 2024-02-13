import { TProduct } from "@/types";
import classNames from "classnames";

type Props = {
  product: TProduct;
  count?: number;
  totalPrice?: number;
  oldPrice?: number;
  contain?: boolean;
  description?: string;
  countInfo?: string;
  showDescription?: boolean;
};

export default function TableCell({
  product,
  count = 1,
  countInfo = "",
  totalPrice,
  oldPrice,
  description = "",
  contain = false,
  showDescription = false,
}: Props) {
  if (!product) return;
  return (
    <>
      <div className="fenceTable__cell">
        <div className="fenceTable__imageContainer">
          <div
            className={classNames(
              "fenceTable__image",
              contain && "fenceTable__image_contain"
            )}
            style={{ backgroundImage: `url("${product.group_image}")` }}
          ></div>
        </div>
        <div>
          <div>{product.name}</div>
          <div className="fenceTable__desc">
            {showDescription && product.description ? product.description : ""}
          </div>
          <div className="fenceTable__countMobile">
            <div>
              {`${count} `}
              {countInfo === "m2" ? (
                <>
                  m<sup>2</sup>
                </>
              ) : (
                countInfo
              )}
            </div>
            <div className="fenceTable__description">{description}</div>
          </div>
        </div>
      </div>
      <div className="fenceTable__cell fenceTable__count">
        <div>
          {`${count} `}
          {countInfo === "m2" ? (
            <>
              m<sup>2</sup>
            </>
          ) : (
            countInfo
          )}
        </div>
        <div className="fenceTable__description">{description}</div>
      </div>
      {product.currentPromotion || oldPrice !== totalPrice ? (
        <div className="fenceTable__cell fenceTable__priceDiscount">
          <div>{oldPrice} руб.</div>
          <div>{totalPrice} руб.</div>
        </div>
      ) : (
        <div className="fenceTable__cell fenceTable__price">
          {totalPrice} руб.
        </div>
      )}
    </>
  );
}
