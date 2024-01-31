type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: number | string;
};

export default function CustomInput({ onChange, placeholder, value }: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value ? value : ""}
    />
  );
}
