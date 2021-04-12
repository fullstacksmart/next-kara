import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  enum Profession {
    NURSE
    DOCTOR
    OTHER_MEDICAL
    OTHER_NON_MEDICAL
  }

  # TODO populate dynamically
  enum IsoCode {
    SRB
    GER
    AUT
    CRO
    POL
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  enum UserType {
    TALENT
    EMPLOYER
    AGENCY
  }

  enum ApprobationStatus {
    IN_PREPARATION
    ONGOING
    APPROVED
    DENIED
  }

  enum SkillLevel {
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
    gender: Gender!
    email: String!
    password: String
    type: UserType
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
    isoCode: IsoCode
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
    password: String
    gender: Gender!
    type: UserType
    name: FullName!
    profilePic: String
    profession: Profession
    address: Address
    description: String
    experiences: [Experience]
    qualifications: [Qualification]
    approbations: [Approbation]
    documents: [Document]
    languages: [LanguageSkill]
    otherSkills: [OtherSkill]
    basicInfo: BasicInfo!
    percentageComplete: Int!
  }

  input TalentInput {
    id: ID!
    gender: Gender!
    name: NameInput!
    email: String
    profilePic: String
    profession: Profession
    address: AddressInput
    description: String
    experiences: [NewExperience]!
    qualifications: [NewQualification]!
    approbations: [ApprobationInput]!
    documents: [String]!
    languages: [LanguageSkillInput]!
    otherSkills: [OtherSkillInput]!
  }

  type BasicInfo {
    id: ID!
    gender: Gender!
    name: FullName!
    fullName: String
    profilePic: String
    profession: Profession
    address: Address
    description: String
    isBasicInfoComplete: Boolean!
  }

  type Experience {
    id: ID!
    talent: Talent!
    lineOfWork: Profession
    employer: Organization
    duration: Duration
    description: String
    isComplete: Boolean
  }

  type Qualification {
    id: ID!
    talent: Talent!
    fieldOfEducation: String
    degree: String
    institution: Organization
    duration: Duration
    description: String
    isComplete: Boolean
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
    id: ID!
    talent: Talent!
    name: String
    level: SkillLevel
  }

  type OtherSkill {
    id: ID!
    talent: Talent!
    name: String
    level: SkillLevel
    description: String
  }
  input NameInput {
    firstName: String
    middleName: String
    lastName: String
  }

  input AddressInput {
    city: String
    isoCode: IsoCode
  }

  input UserInput {
    id: ID!
    name: NameInput!
    email: String!
    gender: Gender!
    company: String
    password: String!
    type: UserType!
  }

  input OrganizationInput {
    name: String
    address: AddressInput
  }

  input DateInput {
    timeStamp: String
  }
  input DurationInput {
    from: DateInput
    to: DateInput
  }

  input TalentUpdate {
    id: ID!
    name: NameInput
    gender: Gender
    address: AddressInput
    profilePic: String
    profession: Profession
    description: String
    languages: [LanguageSkillInput]
    otherSkills: [OtherSkillInput]
    approbations: [ApprobationInput]
  }
  input LanguageSkillInput {
    id: ID!
    talent: ID
    name: String
    level: SkillLevel
  }
  input OtherSkillInput {
    id: ID!
    talent: ID
    name: String
    level: SkillLevel
    description: String
  }

  input ApprobationInput {
    id: ID!
    talent: ID
    state: FederalState
    status: ApprobationStatus
  }

  input NewExperience {
    talent: ID!
    lineOfWork: Profession
    employer: OrganizationInput
    duration: DurationInput
    description: String
  }

  input ExperienceUpdate {
    id: ID!
    talent: ID!
    lineOfWork: Profession
    employer: OrganizationInput
    duration: DurationInput
    description: String
  }

  input NewQualification {
    talent: ID!
    fieldOfEducation: String
    degree: String
    institution: OrganizationInput
    duration: DurationInput
    description: String
  }

  input QualificationUpdate {
    id: ID!
    talent: ID!
    fieldOfEducation: String
    degree: String
    institution: OrganizationInput
    duration: DurationInput
    description: String
  }

  input DeleteExperience {
    talent: ID!
    id: ID!
  }

  input DeleteQualification {
    talent: ID!
    id: ID!
  }

  type Query {
    getAllTalentIds: [ID]!
    getAllUserIds: [ID]!
    getAllEmployerIds: [ID]!
    getTalentById(id: String!): Talent!
  }

  type Mutation {
    addTalent(input: TalentInput!): Talent!
    addEmployer(input: UserInput!): User!
    updateTalent(input: TalentUpdate!): Talent!
    addExperience(input: NewExperience!): Talent!
    updateExperience(input: ExperienceUpdate!): Talent!
    deleteExperience(input: DeleteExperience): Talent!
    addQualification(input: NewQualification!): Talent!
    updateQualification(input: QualificationUpdate!): Talent!
    deleteQualification(input: DeleteQualification): Talent!
  }
`;
export default typeDefs;
