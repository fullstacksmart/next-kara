-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('NURSE', 'DOCTOR', 'OTHER_MEDICAL', 'OTHER_NON_MEDICAL');

-- CreateEnum
CREATE TYPE "IsoCode" AS ENUM ('SRB', 'AUT', 'GER', 'SUI', 'CRO', 'POL');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Talent', 'EMPLOYER', 'AGENCY');

-- CreateEnum
CREATE TYPE "ApprobationStatus" AS ENUM ('IN_PREPARATION', 'ONGOING', 'DENIED', 'APPROVED');

-- CreateEnum
CREATE TYPE "FederalState" AS ENUM ('BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'NI', 'MV', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BASIC', 'PROFICIENT', 'EXPERT', 'MASTER');

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "isoCode" "IsoCode" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "lineOfWork" "Profession" NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "talentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" SERIAL NOT NULL,
    "fieldOfEducation" "Profession" NOT NULL,
    "degree" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "talentId" INTEGER,
    "organizationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approbation" (
    "id" SERIAL NOT NULL,
    "status" "ApprobationStatus" NOT NULL,
    "federalState" "FederalState" NOT NULL,
    "talentId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "talentId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" "SkillLevel" NOT NULL,
    "description" TEXT NOT NULL,
    "talentId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" "SkillLevel" NOT NULL,
    "description" TEXT NOT NULL,
    "talentId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talent" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profession" "Profession" NOT NULL,
    "profilePic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "addressId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Organization" ADD FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approbation" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherSkill" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageSkill" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent" ADD FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
