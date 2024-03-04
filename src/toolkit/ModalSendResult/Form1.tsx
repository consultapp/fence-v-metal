import styles from "./styles.module.scss";
import classNames from "classnames";

export default function Form1() {
  return (
    <>
      <div
        className={classNames(
          "field contacts-form__field",
          styles.fenceSendResult_mt20
        )}
      >
        <i className="icon-users field__icon"></i>
        <input
          type="text"
          name="Имя"
          className="field__input field__input--dark"
          placeholder="Ваше Имя"
        />
      </div>
      <div className={classNames("field__wrapper")}>
        <i className="field__icon field__icon--active icon-phone"></i>
        <input
          type="tel"
          name="Телефон"
          className="field__input field--optional field__input--dark"
          placeholder="Ваш телефон"
        />
      </div>
      <label className={classNames("check-field", styles.fenceSendResult_mt20)}>
        <input
          type="checkbox"
          className="check-field__input"
          id="isAgree"
          name="isAgree"
        />
        <span className="check-field__text">
          Согласен на обработку{" "}
          <a href="https://metal.webcartel.ru/privacy-policy/" target="_blank">
            персональных данных
          </a>
          .
        </span>
      </label>
    </>
  );
}
