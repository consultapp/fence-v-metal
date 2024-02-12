import styles from "./styles.module.scss";

type Props = { isOpen: boolean; close: () => void; children: React.ReactNode };

export default function ModalWindow({ isOpen, close, children }: Props) {
  return (
    <div className={styles.fenceModal} id="modal" data-open={isOpen}>
      <div className={styles.fenceModal__container}>
        <span className={styles.fenceModal__close} onClick={close}>
          &times;
        </span>
        <div className={styles.fenceModal__wrapper}> {children}</div>
      </div>
    </div>
  );
}
