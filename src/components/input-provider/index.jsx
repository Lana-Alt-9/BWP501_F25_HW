import InputCompanent from "../input-component";
function inputProvider({ itemObject }) {
  const {
    type,
    fieldLabel,
    name,
    fieldValue,
    onChangeFunction,
    onBlurFunction,
    placeholder,
    error,
    touched,
  } = itemObject;
  if (type === "checkbox") {
    return (
      <div className="form-check d-flex align-items-center gap-2 mb-3">
        <input
          id={name}
          className="form-check-input mt-0"
          type="checkbox"
          name={name}
          checked={!!fieldValue}
          onChange={(e) => onChangeFunction(e.target.checked)}
          onBlur={onBlurFunction}
        />
        <label className="form-check-label" htmlFor={name}>
          {fieldLabel}
        </label>
        {touched && error ? (
          <div className="text-danger small mt-1">{error}</div>
        ) : null}
      </div>
    );
  }
  return (
    <InputCompanent
      fieldLabel={fieldLabel}
      name={name}
      fieldValue={fieldValue}
      onChangeFunction={onChangeFunction}
      onBlurFunction={onBlurFunction}
      placeholder={placeholder}
      type={type}
      error={error}
      touched={touched}
    />
  );
}
export default inputProvider;
