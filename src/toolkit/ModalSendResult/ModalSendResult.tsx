import classNames from "classnames";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

export default function ModalSendResult() {
  const ref = useRef(null);
  const [state, setState] = useState(true);
  return (
    <form className={styles.fenceSendResult} ref={ref.current}>
      <div className={styles.fenceSendResult__header}>Как хотите обсудить?</div>
      <div className={styles.fenceSendResult__twoColumns}>
        <CustomButton
          type="primary"
          onClick={() => setState(false)}
          className="fenceButton_small"
        >
          Перезвоните&nbsp;мне
        </CustomButton>
        <CustomButton
          type="primary"
          border="outlined"
          onClick={() => setState(true)}
          className="fenceButton_small"
        >
          Позвоню&nbsp;сам(а)
        </CustomButton>
      </div>
      <div className={styles.fenceSendResult}></div> ModalSendResult
    </form>
  );
}
