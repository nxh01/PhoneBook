import Input from "./Input";

function ModalInput(props) {
  const {
    type,
    placeholder,
    name,
    value,
    onChange,
    disabled,
    required = true,
  } = props;
  return (
    <>
      <div className="modal__input-cnt">
        <label htmlFor={name}>
          {placeholder}{" "}
          <span style={{ color: "red" }}>{required ? "*" : ""}</span>
        </label>
        <Input
          type={type}
          required={required}
          name={name}
          value={value}
          onChange={onChange}
          InputClassName={`project-input`}
          disabled={disabled}
        />
      </div>
    </>
  );
}

export default ModalInput;
