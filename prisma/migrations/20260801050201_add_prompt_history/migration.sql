-- CreateTable
CREATE TABLE "Prompt" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "componentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Prompt_componentId_createdAt_idx" ON "Prompt"("componentId", "createdAt");

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;
