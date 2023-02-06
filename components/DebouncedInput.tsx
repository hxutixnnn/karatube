import { InputHTMLAttributes, useState } from "react";
import { useDebounce } from "react-use";

interface DebouncedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  debounceTime?: number;
  onDebouncedChange: (
    deboucedValue: string | number | readonly string[]
  ) => void;
}

function DebouncedInput({
  value,
  defaultValue,
  onChange: _,
  debounceTime,
  onDebouncedChange,
  ...props
}: DebouncedInputProps) {
  const [_value, setValue] = useState(value);

  useDebounce(
    () => {
      onDebouncedChange(_value);
    },
    debounceTime ?? 2000,
    [_value]
  );

  return (
    <input
      value={_value}
      onChange={(e) => setValue(e.currentTarget.value)}
      {...props}
    />
  );
}

export default DebouncedInput;
