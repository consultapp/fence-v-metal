import { TProduct } from "@/types";
import classNames from "classnames";

type Props = {
  product: TProduct;
  count?: number;
  sum?: number;
  contain?: boolean;
  description?: string;
  countInfo?: string;
};

export default function TableCell({
  product,
  count = 1,
  countInfo = "",
  sum,
  description = "",
  contain = false,
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
        {product.name}
      </div>
      <div className="fenceTable__cell fenceTable__count">
        <div>{`${count} ${countInfo}`}</div>
        <div className="fenceTable__description">{description}</div>
      </div>
      <div className="fenceTable__cell fenceTable__price">
        {sum ? sum : product.price} руб.
      </div>
    </>
  );
}
