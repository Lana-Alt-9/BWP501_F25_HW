import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  flex-grow: 1;
`;

export const Hero = styled.section`
  padding: 3rem 0;
  background: var(--hero-bg);
  color: #fff;
`;

export const HeroContent = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;

  @media (min-width: 992px) {
    padding: 3rem 1rem;
  }
`;

export const TeamBadge = styled.span`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background: rgba(206, 191, 94, 0.16);
  color: var(--hero-accent);

  svg {
    margin-inline-end: 0.5rem;
  }
`;

export const HeroTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
`;

export const HeroText = styled.p`
  max-width: 680px;
  margin: 0 auto;
  font-size: 1.25rem;
`;

export const Section = styled.section`
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

export const SectionHeading = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

export const SectionDescription = styled.p`
  margin-bottom: 0;
  color: var(--text-muted, #6c757d);
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
  }
`;

export const MemberCard = styled.article`
  min-width: 0;
  height: 100%;
  border-radius: 1rem;
  background: var(--bg, #fff);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

export const MemberCardBody = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

export const MemberAvatar = styled.div`
  width: 76px;
  height: 76px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
  font-size: 1.75rem;
  font-weight: 700;
`;

export const MemberName = styled.h3`
  margin-bottom: 0.25rem;
  font-size: 1.25rem;
  font-weight: 700;
`;



export const MemberId = styled.p`
  margin-bottom: 0;
  color: var(--text-muted, #6c757d);
  font-size: 0.875rem;
`;

export const CallToAction = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  background: var(--hero-bg);
  color: #fff;
  text-align: center;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

export const CallToActionTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
`;

export const CallToActionText = styled.p`
  margin-bottom: 1.5rem;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

export const PrimaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  background: var(--hero-accent);
  color: var(--hero-bg);
  text-decoration: none;

  &:hover {
    color: var(--hero-bg);
    filter: brightness(0.92);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }

  svg {
    margin-inline-start: 0.5rem;
  }
`;

export const SecondaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border: 1px solid #fff;
  border-radius: 50px;
  color: #fff;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  &:focus-visible {
    outline: 2px solid var(--hero-accent);
    outline-offset: 3px;
  }
`;
