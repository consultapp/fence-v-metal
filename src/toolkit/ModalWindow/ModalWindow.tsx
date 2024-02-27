import styles from "./styles.module.scss";
import classNames from "classnames";

type Props = {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  w400?: boolean;
};

export default function ModalWindow({
  isOpen,
  close,
  children,
  w400 = false,
}: Props) {
  return (
    <div
      className={classNames(styles.fenceModal)}
      id="modal"
      data-open={isOpen}
      onClick={close}
    >
      <div
        className={classNames(
          styles.fenceModal__container,
          w400 && styles.fenceModal_w400
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.fenceModal__close}
          onClick={close}
        >
          <path
            d="M1 1L11 11M21 21L11 11M11 11L21 1M11 11L1 21"
            stroke="#22122D"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <div className={styles.fenceModal__wrapper}> {children}</div>
      </div>
    </div>
  );
}
