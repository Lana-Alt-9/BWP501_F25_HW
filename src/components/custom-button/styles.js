import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;

  &[data-variant="primary"] {
    background-color: var(--primary);
    border-color: var(--primary);
    color: var(--primary-text);

    &:hover:not(:disabled) {
      background-color: var(--primary-hover);
      border-color: var(--primary-hover);
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.35);
    }
  }

  &[data-variant="secondary"] {
    background-color: var(--secondary);
    border-color: var(--secondary);
    color: var(--secondary-text);

    &:hover:not(:disabled) {
      background-color: var(--secondary-hover);
      border-color: var(--secondary-hover);
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.35);
    }
  }

  &[data-variant="success"] {
    background-color: var(--primary);
    border-color: var(--primary);
    color: var(--primary-text);

    &:hover:not(:disabled) {
      background-color: var(--primary-hover);
      border-color: var(--primary-hover);
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.35);
    }
  }

  &[data-variant="danger"] {
    background-color: var(--danger);
    border-color: var(--danger);
    color: var(--danger-text);

    &:hover:not(:disabled) {
      background-color: var(--danger-hover);
      border-color: var(--danger-hover);
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(var(--danger-rgb), 0.35);
    }
  }

  &[data-variant="outline-primary"] {
    background-color: transparent;
    border-color: var(--primary);
    color: var(--primary);

    &:hover:not(:disabled) {
      background-color: var(--primary);
      color: var(--primary-text);
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.35);
    }
  }

  &[data-variant="outline-secondary"] {
    background-color: transparent;
    border-color: var(--secondary);
    color: var(--secondary);

    &:hover:not(:disabled) {
      background-color: var(--secondary);
      color: var(--secondary-text);
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.35);
    }
  }

  &[data-variant="outline-danger"] {
    background-color: transparent;
    border-color: var(--danger);
    color: var(--danger);

    &:hover:not(:disabled) {
      background-color: var(--danger);
      color: var(--danger-text);
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(var(--danger-rgb), 0.35);
    }
  }

  &:disabled {
    opacity: 0.65;
    pointer-events: none;
    cursor: not-allowed;
  }
`;
