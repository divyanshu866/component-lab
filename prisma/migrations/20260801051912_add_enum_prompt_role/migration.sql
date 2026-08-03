/*
  Warnings:

  - Added the required column `role` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PromptRole" AS ENUM ('USER', 'ASSISTANT');

-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "role" "PromptRole" NOT NULL;
