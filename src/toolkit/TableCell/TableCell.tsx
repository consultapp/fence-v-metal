import { getUnits } from "@/components/Calculator/getUnits";
import { IColor, TProduct } from "@/types";
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
  color?: IColor | null;
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
  color = null,
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
        <div className="fenceTable__product">
          <a
            className="fenceTable__productName"
            href={product.link}
            target="_blanc"
          >
            {product.name}
          </a>
          <div className="fenceTable__desc">
            {showDescription && product.description ? product.description : ""}
            {color && color.name ? `, ${color.name}` : ""}
          </div>
          <div className="fenceTable__countMobile">
            <div>
              {`${count} `}
              {getUnits(countInfo)}
            </div>
            <div className="fenceTable__description">{description}</div>
          </div>
        </div>
      </div>
      <div className="fenceTable__cell fenceTable__count">
        <div>
          {`${count} `}
          {getUnits(countInfo)}
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
