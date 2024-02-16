import styles from "./styles.module.scss";

type Props = { isOpen: boolean; close: () => void; children: React.ReactNode };

export default function ModalWindow({ isOpen, close, children }: Props) {
  return (
    <div
      className={styles.fenceModal}
      id="modal"
      data-open={isOpen}
      onClick={close}
    >
      <div
        className={styles.fenceModal__container}
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
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>

        <div className={styles.fenceModal__wrapper}> {children}</div>
      </div>
    </div>
  );
}
