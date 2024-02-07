type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: number | string;
};

export default function CustomInput({ onChange, value }: Props) {
  return <input type="text" onChange={onChange} value={value ? value : ""} />;
}
