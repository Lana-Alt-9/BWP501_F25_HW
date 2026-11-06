function inputCompanent({
  fieldLabel,
  fieldValue,
  onChangeFunction,
  onBlurFunction,
  placeholder,
  type = "text",
  name,
  error,
  touched,
}) {
  const inputId =
    name || fieldLabel?.toLowerCase().replace(/\s+/g, "-") || undefined;
  const hasError = touched && error;
  const isFile = type === "file";

  const inputClass = hasError ? "form-control is-invalid" : "form-control";

  return (
    <div className="mb-3">
      {fieldLabel && (
        <label className="form-label fw-semibold small" htmlFor={inputId}>
          {fieldLabel}
        </label>
      )}
      {isFile ? (
        <input
          id={inputId}
          name={name}
          type="file"
          className={inputClass}
          onChange={(e) => onChangeFunction(e.target.files?.[0] ?? null)}
          onBlur={onBlurFunction}
          aria-invalid={!!hasError}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          className={inputClass}
          value={fieldValue ?? ""}
          onChange={(e) => onChangeFunction(e.target.value)}
          onBlur={onBlurFunction}
          placeholder={placeholder}
          aria-invalid={!!hasError}
        />
      )}
      {hasError ? <div className="text-danger small mt-1">{error}</div> : null}
    </div>
  );
}
export default inputCompanent;
