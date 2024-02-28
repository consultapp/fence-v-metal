import classNames from "classnames";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import Form1 from "./Form1";
import Form2 from "./Form2";

export default function ModalSendResult() {
  const ref = useRef(null);
  const [state, setState] = useState(true);
  return (
    <form className={styles.fenceSendResult} ref={ref.current}>
      <div className={styles.fenceSendResult__header}>Как хотите обсудить?</div>
      <div className={styles.fenceSendResult__twoColumns}>
        <CustomButton
          type="primary"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setState(false);
          }}
          className="fenceButton_small"
        >
          Перезвоните&nbsp;мне
        </CustomButton>
        <CustomButton
          type="primary"
          border="outlined"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setState(true);
          }}
          className="fenceButton_small"
        >
          Позвоню&nbsp;сам(а)
        </CustomButton>
      </div>
      {!state ? <Form1 /> : <Form2 />}
      <div className={styles.fenceSendResult__sendButton}>
        <CustomButton type="primary" onClick={() => setState(false)}>
          Отправить&nbsp;расчёт
        </CustomButton>
      </div>
    </form>
  );
}
