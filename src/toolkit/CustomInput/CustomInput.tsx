import styles from "./styles.module.scss";
type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  isError: boolean;
};

export default function CustomInput({ onChange, value, isError }: Props) {
  return (
    <>
      <input
        type="text"
        onChange={onChange}
        value={value ? value : ""}
        placeholder="0"
        data-error={isError}
      />
      {isError && (
        <div className={styles.root__error}>Пожалуйста, заполните это поле</div>
      )}
    </>
  );
}
