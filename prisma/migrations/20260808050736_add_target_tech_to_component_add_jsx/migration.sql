-- CreateEnum
CREATE TYPE "TargetTech" AS ENUM ('HTML', 'REACT', 'VUE');

-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "jsx" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "targetTech" "TargetTech" NOT NULL DEFAULT 'HTML',
ALTER COLUMN "html" SET DEFAULT '',
ALTER COLUMN "css" SET DEFAULT '',
ALTER COLUMN "js" SET DEFAULT '';
