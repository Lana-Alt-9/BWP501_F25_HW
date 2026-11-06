import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { IoIosAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import {
  Page,
  Hero,
  HeroInner,
  Badge,
  HeroText,
  HeroActions,
  CenteredHeroActions,
  PrimaryBtn,
  OutlineBtn,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  Section,
  Container,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
  Cta,
  CtaTitle,
  CtaText,
} from "./style";
import { MdFindInPage } from "react-icons/md";
import { Link } from "react-router-dom";
import { features, stats } from "../../data/home";
import PathConstants from "../../routes/pathConstants";
import {
  MemberCard,
  MemberCardBody,
  MemberId,
  MemberName,
  TeamGrid,
} from "../AboutUs/style";

const featureIcons = {
  1: <IoIosAdd size={24} />,
  2: <FaUserEdit size={24} />,
  3: <MdFindInPage size={24} />,
};
const teamMembers = [
  { name: "رفعت القاسمي", id: "rafat_288553" },
  { name: "زيد المناع", id: "Zaid_284391" },
  { name: "لانا التيناوي", id: "Lana_278955" },
  { name: "بيان خيت", id: "bayan_307900" },
  { name: "قصي حاج عمر", id: "qusie_321952" },
];

function Home() {
  return (
    <Page>
      <Header />
      <TeamGrid className="container">
        {teamMembers.map((member) => (
          <MemberCard key={member.id}>
            <MemberCardBody>
              <MemberName>{member.name}</MemberName>

              <MemberId>{member.id}</MemberId>
            </MemberCardBody>
          </MemberCard>
        ))}
      </TeamGrid>
      <Hero>
        <HeroInner>
          <div>
            <h1>مرحبا بك في موقع إدارة الطلاب في الجامعة الافتراضية</h1>
            <Badge>كيفية اضافة طالب في الجامعة الافتراضية</Badge>
            <HeroText>
              لإضافة طالب في الجامعة الافتراضية تحتاج لاتباع هذه الخطوات
            </HeroText>
            <HeroActions>
              <PrimaryBtn as={Link} to={PathConstants.REGISTER}>
                إنشاء حساب
              </PrimaryBtn>
              <OutlineBtn as={Link} to={PathConstants.LOGIN}>
                تسجيل دخول
              </OutlineBtn>
            </HeroActions>
          </div>

          <StatsGrid>
            {stats.map((item) => (
              <StatCard key={item.label}>
                <StatValue>{item.value}</StatValue>
                <StatLabel>{item.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </HeroInner>
      </Hero>

      <Section $muted>
        <Container>
          <FeaturesGrid>
            {features.map((item) => (
              <FeatureCard key={item.id}>
                <FeatureIcon>{featureIcons[item.id]}</FeatureIcon>
                <FeatureTitle>{item.title}</FeatureTitle>
                <FeatureText>{item.description}</FeatureText>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </Section>

      <Cta>
        <Container>
          <CtaTitle>هل أنت جاهز للبدء بإدارة الطلاب</CtaTitle>
          <CtaText>انشئ حساب للقيام بهذا</CtaText>
          <CenteredHeroActions>
            <PrimaryBtn as={Link} to={PathConstants.REGISTER}>
              انشئ حساب
            </PrimaryBtn>
            <OutlineBtn as={Link} to={PathConstants.LOGIN}>
              تسجيل دخول
            </OutlineBtn>
          </CenteredHeroActions>
        </Container>
      </Cta>

      <Footer />
    </Page>
  );
}
export default Home;
