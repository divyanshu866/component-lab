-- DropForeignKey
ALTER TABLE "AIRequest" DROP CONSTRAINT "AIRequest_promptId_fkey";

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_userId_fkey";

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIRequest" ADD CONSTRAINT "AIRequest_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
