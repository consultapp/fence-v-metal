import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { FenceProflist, FenceShtaketnik } from "@/fence";
import { sendFenceForm } from "./sendFenceForm";

interface Props {
  calculations: ReturnType<
    FenceProflist["getCalculation"] | FenceShtaketnik["getCalculation"]
  >;
  close: () => void;
}

export default function ModalSendResult({ calculations, close }: Props) {
  const refForm = useRef<HTMLFormElement | null>(null);
  const refInput = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState(true);

  const mouseHandler = () => {
    if (refInput && refInput.current && !refInput.current.value) {
      console.log(refInput.current);
      refInput.current.value = "not_a_robot";
    }
  };

  return (
    <form
      className={styles.fenceSendResult}
      ref={refForm}
      onMouseMove={mouseHandler}
    >
      <div className={styles.fenceSendResult__header}>Как хотите обсудить?</div>
      <input type="hidden" id="honey" name="honey" value="" ref={refInput} />
      <div className={styles.fenceSendResult__twoColumns}>
        <CustomButton
          type="primary"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setState(true);
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
            setState(false);
          }}
          className="fenceButton_small"
        >
          Позвоню&nbsp;сам(а)
        </CustomButton>
      </div>
      {state ? <Form1 /> : <Form2 />}
      <div className={styles.fenceSendResult__sendButton}>
        <CustomButton
          type="primary"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            if (refForm && refForm.current) {
              sendFenceForm(refForm.current, calculations)
                .then((data) => console.log("data", data))
                .catch((reason) =>
                  console.log("Error of email sending: ", reason)
                );
            }
            close();
          }}
        >
          Отправить&nbsp;расчёт
        </CustomButton>
      </div>
    </form>
  );
}
