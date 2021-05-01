/*
  Warnings:

  - The primary key for the `Talent` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Approbation" DROP CONSTRAINT "Approbation_talentId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_talentId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_talentId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageSkill" DROP CONSTRAINT "LanguageSkill_talentId_fkey";

-- DropForeignKey
ALTER TABLE "OtherSkill" DROP CONSTRAINT "OtherSkill_talentId_fkey";

-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_talentId_fkey";

-- AlterTable
ALTER TABLE "Approbation" ALTER COLUMN "talentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "talentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "talentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LanguageSkill" ALTER COLUMN "talentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OtherSkill" ALTER COLUMN "talentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Qualification" ALTER COLUMN "talentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Talent" DROP CONSTRAINT "Talent_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Approbation" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageSkill" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherSkill" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
