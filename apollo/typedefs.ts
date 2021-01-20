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
    DEU
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

  enum Industry {
    CARE
    MEDICINE
    PERSONNEL_CONSULTING
    TECHNOLOGY
  }

  enum CARE {
    HOSPITAL
    NURSING_HOME
    OUTPATIEN_CARE_SERVICE
    REHAB
    PRACTICE
  }

  enum MEDICINE {
    HOSPITAL
    DOCTORS_OFFICE
    MEDICAL_RESEARCH_INSTITUTE
    SANATORIUM
  }

  enum PERSONNEL_CONSULTING {
    PERSONNEL_PLACEMENT
    LANGUAGE_SCHOOL
    MIGRATION_LAW
    LABOR_LAW
    OTHERS
  }

  enum TECHNOLOGY {
    OTHER
  }

  interface User {
    id: ID!
    name: FullName!
    gender: Gender!
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
    password: String!
    gender: Gender!
    type: UserType!
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

  type Employer implements User {
    id: ID!
    companyName: String!
    industry: Industry!
    email: String!
    password: String!
    gender: Gender!
    type: UserType!
    name: FullName!
    fullName: String!
    profilePic: String
    address: Address
    description: String
    website: String
    basicInfoEmployer: BasicInfoEmployer!
  }

  type BasicInfoEmployer {
    id: ID!
    gender: Gender!
    companyName: String
    industry: Industry!
    name: FullName!
    fullName: String
    profilePic: String
    website: String
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
  input NameInput {
    firstName: String
    middleName: String
    lastName: String
  }

  input InitialNameInput {
    firstName: String
    middleName: String
    lastName: String!
  }

  input AddressInput {
    city: String
    isoCode: IsoCode
  }

  input UserInput {
    name: InitialNameInput!
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
  }

  input EmployerUpdate {
    id: ID!
    name: NameInput
    companyName: String
    industry: Industry
    website: String
    gender: Gender
    address: AddressInput
    profilePic: String
    description: String
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
    getEmployerById(id: String!): Employer!
  }

  type Mutation {
    addUser(input: UserInput!): User!
    updateTalent(input: TalentUpdate!): Talent!
    updateEmployer(input: EmployerUpdate!): Employer!
    addExperience(input: NewExperience!): Talent!
    updateExperience(input: ExperienceUpdate!): Talent!
    deleteExperience(input: DeleteExperience): Talent!
    addQualification(input: NewQualification!): Talent!
    updateQualification(input: QualificationUpdate!): Talent!
    deleteQualification(input: DeleteQualification): Talent!
  }
`;
export default typeDefs;
