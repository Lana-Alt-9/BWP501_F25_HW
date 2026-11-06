import { FaArrowRight, FaUsers } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PathConstants from "../../routes/pathConstants";
import {
  Actions,
  CallToAction,
  CallToActionText,
  CallToActionTitle,
  Hero,
  HeroContent,
  HeroText,
  HeroTitle,
  Main,
  MemberName,
  MemberAvatar,
  MemberCard,
  MemberCardBody,
  MemberId,
  Page,
  PrimaryAction,
  SecondaryAction,
  Section,
  SectionDescription,
  SectionHeading,
  SectionTitle,
  TeamBadge,
  TeamGrid,
} from "./style";

const teamMembers = [
  { name: "رفعت القاسمي", id: "rafat_288553" },
  { name: "زيد المناع", id: "Zaid_284391" },
  { name: "لانا التيناوي", id: "Lana_278955" },
  { name: "بيان خيت", id: "bayan_307900" },
  { name: "قصي حاج عمر", id: "qusie_321952" },
];

function AboutUs() {
  return (
    <Page>
      <Header />

      <Main>
        <Hero>
          <HeroContent>
            <TeamBadge>
              <FaUsers aria-hidden="true" />
              فريقنا
            </TeamBadge>
            <HeroTitle>حولنا</HeroTitle>
            <HeroText>
              نحن فريق من الطلاب في الجامعة الافتراضية السورية، ملتزمون بتقديم
              حلول مبتكرة لتسهيل عملية تسجيل الطلاب. هدفنا هو تبسيط الإجراءات
              وتحسين تجربة المستخدم من خلال منصتنا الرقمية.
            </HeroText>
          </HeroContent>
        </Hero>

        <Section>
          <SectionHeading>
            <SectionTitle>فريقنا</SectionTitle>
            <SectionDescription>
              أُنشئ بواسطة خمسة طلاب من الجامعة الافتراضية السورية
            </SectionDescription>
          </SectionHeading>

          <TeamGrid>
            {teamMembers.map((member) => (
              <MemberCard key={member.id}>
                <MemberCardBody>
                  <MemberAvatar aria-hidden="true">
                    {member.name.charAt(0)}
                  </MemberAvatar>
                  <MemberName>{member.name}</MemberName>
                  <MemberId>{member.id}</MemberId>
                </MemberCardBody>
              </MemberCard>
            ))}
          </TeamGrid>
        </Section>

        <Section>
          <CallToAction>
            <CallToActionTitle>نجعل تسجيل الطلاب أسهل</CallToActionTitle>
            <CallToActionText>
              استعرض الطلاب المسجلين وأضف طلاباً جددًا
            </CallToActionText>
            <Actions>
              <PrimaryAction to={PathConstants.VIEWSTUDENTS}>
                عرض الطلاب <FaArrowRight aria-hidden="true" />
              </PrimaryAction>
              <SecondaryAction to={PathConstants.ADD_STUDENT}>
                إضافة طالب
              </SecondaryAction>
            </Actions>
          </CallToAction>
        </Section>
      </Main>

      <Footer />
    </Page>
  );
}

export default AboutUs;
