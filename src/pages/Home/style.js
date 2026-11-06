import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
`;

export const Hero = styled.section`
  background: var(--hero-bg);
  color: #fff;
  overflow: hidden;
`;

export const HeroInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 70px 20px 100px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    padding: 40px 16px 70px;
  }
`;

export const Badge = styled.span`
  display: inline-block;
  background: color-mix(in srgb, var(--hero-green) 25%, transparent);
  border: 1px solid var(--hero-green);
  color: var(--hero-accent);
  font-size: 12px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
`;

export const Highlight = styled.strong`
  color: var(--hero-accent);
  font-weight: 700;
`;

export const HeroText = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 17px;
  max-width: 460px;
  line-height: 1.65;
  margin: 0;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

export const CenteredHeroActions = styled(HeroActions)`
  justify-content: center;
  margin-top: 0;
`;

export const PrimaryBtn = styled.button`
  background: var(--hero-green);
  color: var(--hero-button-text);
  border: none;
  font-weight: 600;
  padding: 11px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover {
    filter: brightness(0.85);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--hero-accent);
    outline-offset: 3px;
  }
`;

export const OutlineBtn = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid var(--hero-accent);
  font-weight: 600;
  padding: 11px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: color-mix(in srgb, var(--hero-accent) 15%, transparent);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--hero-accent);
    outline-offset: 3px;
  }
`;

export const StatsGrid = styled.div`
  font-size: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  max-width: 400px;
  margin-inline-end: auto;

  @media (max-width: 850px) {
    margin: 0 auto;
  }
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(206, 191, 94, 0.3);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: var(--hero-accent);
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 4px;
`;

export const Section = styled.section`
  padding: 55px 0;
  background: ${(p) => (p.$muted ? "var(--bg-muted)" : "var(--bg)")};
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 20px;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  text-align: center;
`;

export const FeatureIcon = styled.div`
  width: 52px;
  height: 52px;
  margin: 0 auto 12px;
  border-radius: 12px;
  background: rgba(var(--primary-rgb), 0.12);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeatureTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 6px;
  color: var(--text);
`;

export const FeatureText = styled.p`
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.55;
  max-width: 260px;
  margin: 0 auto;
`;

export const Cta = styled.section`
  background: var(--hero-bg);
  padding: 60px 0;
  text-align: center;
  color: #fff;
`;

export const CtaTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 10px;
`;

export const CtaText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 24px;
`;
