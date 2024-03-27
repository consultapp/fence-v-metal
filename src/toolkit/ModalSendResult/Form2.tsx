import { PHONES } from "@/fixtures/PHONES";
import styles from "./styles.module.scss";

export default function Form2() {
  return (
    <>
      <div className={styles.fenceSendResult__form2Text1}>
        Ждём вашего звонка!
      </div>
      {PHONES?.map((phone) => (
        <div className={styles.fenceSendResult__form2Text2}>{phone}</div>
      ))}
    </>
  );
}
