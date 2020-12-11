import { gql } from 'apollo-server-micro';

const typedefs = gql`
  enum ProfessionType {
    NURSE,
    DOCTOR,
    OTHER_MEDICAL,
    OTHER_NON-MEDICAL
  }

  enum ApprobationStatus {
    ONGOING,
    APPROVED,
    DENIED
  }

  enum LanguageSkillLevel {
    BASIC,
    PROFICIENT,
    BUSINESS_CONVERSATION,
    MOTHER_TONGUE
  }

  enum OtherSKillLevel {
    BASIC,
    PROFICIENT,
    EXPERT,
    MASTER
  }

  enum FederalState {
    BW
    BY
    BE
    BB
    HB
    HH
    HE
    NI
    MV
    NW
    RP
    SL
    SN
    ST
    SH
    TH
    OTHER
  }
  interface User {
    id: ID!
    email: String!
    password: String!
  }

  type FullName {
    firstName: String
    middleName: String
    lastName: String!
  }

  type Address {
    street: String
    streetNo: String
    city: String
    postalCode: String
    isoCode: String
  }

  type Date {
    timeStamp: String
  }

  type Duration {
    from: Date
    to: Date
  }

  type Organization {
    id: ID!
    name: String!
    address: Address
  }

  type Talent implements User {
    id: ID!
    email: String!
    password: String!
    name: FullName!
    profession: ProfessionType
    address: Address
    description: String
    experiences: [Experience]
    qualifications: [Qualification]
    approbations: [Approbation]
    documents: [Document]
    languages: [LanguageSkill]
    otherSkills: [OtherSkill]
  }

  type Experience {
    id: ID!
    talent: Talent!
    title: String!
    lineOfWork: ProfessionType
    employer: Organization
    duration: Duration
    description: String
  }

  type Qualification {
    id: ID!
    talent: Talent!
    fieldOfEducation: String
    degree: String
    institution: Organization
    duration: Duration
    description: String
  }

  type Approbation {
    id: ID!
    talent: Talent!
    status: ApprobationStatus
    state: FederalState
  }

  type Document {
    id: ID!
    talent: Talent!
    name: String
    description: String
    url: String
  }

  type LanguageSkill {
    talent: Talent!
    language: String
    level: LanguageSkillLevel
  }

  type OtherSkill {
    id: ID!
    talent: Talent!
    name: String
    level: OtherSKillLevel
    description: String
  }
`;
export default typedefs;
