-- CreateTable
CREATE TABLE "GenerationUsage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "generationsUsed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GenerationUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GenerationUsage_userId_idx" ON "GenerationUsage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GenerationUsage_userId_periodStart_key" ON "GenerationUsage"("userId", "periodStart");

-- AddForeignKey
ALTER TABLE "GenerationUsage" ADD CONSTRAINT "GenerationUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
