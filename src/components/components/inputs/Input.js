function Input(props) {
  const {
    placeholder,
    InputClassName,
    type,
    disabled,
    name,
    value,
    onChange,
    required,
    accept,
    id,
    onClick,
  } = props;

  return (
    <>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className={[
          `input ${InputClassName} ${disabled ? "disabled-input" : ""}`,
        ]}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        accept={accept}
        onClick={onClick}
      />
    </>
  );
}

export default Input;
