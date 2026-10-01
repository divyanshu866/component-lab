/*
  Warnings:

  - You are about to drop the column `periodEnd` on the `GenerationUsage` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `GenerationUsage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "GenerationUsage_userId_periodEnd_idx";

-- AlterTable
ALTER TABLE "GenerationUsage" DROP COLUMN "periodEnd",
DROP COLUMN "plan";

-- CreateIndex
CREATE INDEX "GenerationUsage_userId_idx" ON "GenerationUsage"("userId");
