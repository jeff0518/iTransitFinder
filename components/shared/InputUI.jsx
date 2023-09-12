function InputUI(props) {
  const {
    inputId,
    inputType,
    inputText,
    inputStyle,
    inputRef,
    inputPlaceholder,
    value,
    onChange,
  } = props;
  return (
    <div className={style[inputStyle]}>
      <label htmlFor={inputId}>{inputText}</label>
      <input
        type={inputType}
        id={inputId}
        ref={inputRef}
        placeholder={inputPlaceholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}

export default InputUI;
