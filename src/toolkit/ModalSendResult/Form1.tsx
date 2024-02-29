// import styles from "./styles.module.scss";

export default function Form1() {
  return (
    <>
      <div className="field contacts-form__field">
        <i className="icon-users field__icon"></i>
        <input
          type="text"
          name="Имя"
          className="field__input field__input--dark"
          placeholder="Ваше Имя"
        />
      </div>
      <div className="field__wrapper">
        <i className="field__icon field__icon--active icon-phone"></i>
        <input
          type="tel"
          name="Телефон"
          className="field__input field--optional field__input--dark"
          placeholder="Ваш телефон"
        />
        <i className="fa-caret-down field__dropdown-icon"></i>
      </div>
      <label className="check-field">
        <input
          type="checkbox"
          className="check-field__input"
          id="isAgree"
          name="isAgree"
        />
        <span className="check-field__text">
          Согласен на обработку
          <a href="https://metal.webcartel.ru/privacy-policy/">
            персональных данных
          </a>
        </span>
      </label>
    </>
  );
}
