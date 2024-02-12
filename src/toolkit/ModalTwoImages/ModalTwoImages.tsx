import classNames from "classnames";
import styles from "./styles.module.scss";

type Props = { image1: string | undefined; image2: string | undefined };

export default function ModalTwoImages({ image1, image2 }: Props) {
  return (
    <>
      {image1 && (
        <div className={styles.root}>
          <img
            className={classNames(styles.images, styles.images__main)}
            src={image1}
          />
        </div>
      )}
      {image2 && <img className={styles.images} src={image2} />}
    </>
  );
}
