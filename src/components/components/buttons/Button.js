function Button(props) {
  const {
    action,
    className,
    text,
    Icon,
    variant = "orange",
    type = "button",
    disabled,
    size,
    children,
    style,
  } = props;
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        className={`btn ${
          variant == "default" ? "default" : `btn__${variant}`
        }  ${className} ${size}-btn ${disabled ? "disabled" : ""} `}
        onClick={action}
        style={style}
      >
        {text}
        {Icon && <Icon />}
        {children}
      </button>
    </>
  );
}

export default Button;
