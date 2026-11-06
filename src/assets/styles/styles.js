import styled from "styled-components";
export const ErrorText = styled.div`
  color: var(--danger);
  margin-top: 6px;
`;
export const Row = styled.div`
  display: flex;
`;
export const Card = styled.div`
  width: 400px;
`;
export const Main = styled.div`
  display: flex;
`;
export const Title = styled.h1`
  font-size: 24px;
`;
export const FooterWrap = styled.footer`
  background: var(--card-bg);
  border-top: 1px solid var(--border);
  padding: 48px 24px 0;
`;

export const FooterContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding-bottom: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const FooterCol = styled.div`
  h3 {
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    margin: 0 0 16px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  p {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0 0 6px;
    line-height: 1.55;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
  }

  a {
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: var(--primary);
    }
  }
`;

export const Newsletter = styled.div`
  display: flex;
  margin-top: 12px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--input-bg);

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 10px 14px;
    font-size: 13px;
    color: var(--text);
    background: transparent;
    font-family: inherit;

    &::placeholder {
      color: var(--text-muted);
    }
  }

  button {
    width: 44px;
    border: none;
    background: var(--primary);
    color: white;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;

    &:hover {
      background: var(--primary-hover);
    }
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid var(--border);
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  p {
    margin: 0;
    font-size: 12px;
    color: var(--text-muted);
  }
`;

export const Social = styled.div`
  display: flex;
  gap: 14px;

  a {
    color: var(--text-muted);
    font-size: 14px;
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: var(--primary);
    }
  }
`;
