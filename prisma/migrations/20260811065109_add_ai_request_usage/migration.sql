-- CreateTable
CREATE TABLE "AIRequest" (
    "id" SERIAL NOT NULL,
    "promptId" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "targetTech" "TargetTech" NOT NULL,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "thinkingTokens" INTEGER,
    "totalTokens" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AIRequest_promptId_key" ON "AIRequest"("promptId");

-- AddForeignKey
ALTER TABLE "AIRequest" ADD CONSTRAINT "AIRequest_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
