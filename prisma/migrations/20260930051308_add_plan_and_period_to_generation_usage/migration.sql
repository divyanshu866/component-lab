/*
  Warnings:

  - Added the required column `periodEnd` to the `GenerationUsage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `GenerationUsage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GenerationUsage_userId_idx";

-- AlterTable
ALTER TABLE "GenerationUsage" ADD COLUMN     "periodEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "plan" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "GenerationUsage_userId_periodEnd_idx" ON "GenerationUsage"("userId", "periodEnd");
