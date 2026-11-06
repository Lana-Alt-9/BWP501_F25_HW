import { StyledButton } from "./styles";

function CustomButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      data-variant={variant}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default CustomButton;

