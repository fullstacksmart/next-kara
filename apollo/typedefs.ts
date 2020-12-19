import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  enum ProfessionType {
    NURSE
    DOCTOR
    OTHER_MEDICAL
    OTHER_NON_MEDICAL
  }

  enum UserType {
    TALENT
    EMPLOYER
    AGENCY
  }

  enum ApprobationStatus {
    ONGOING
    APPROVED
    DENIED
  }

  enum LanguageSkillLevel {
    BASIC
    PROFICIENT
    BUSINESS_LEVEL
    MOTHER_TONGUE
  }

  enum OtherSKillLevel {
    BASIC
    PROFICIENT
    EXPERT
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
    name: FullName!
    email: String!
    password: String!
    type: UserType!
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
    type: UserType!
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

  input NewUser {
    name: FullName!
    email: String!
    password: String!
    type: UserType!
  }

  type Query {
    getAllTalentIds: [ID]!
    getAllUserIds: [ID]!
    getAllEmployerIds: [ID]!
  }

  type Mutation {
    addUser(input: NewUser!): User!
  }
`;
export default typeDefs;
