import { prisma } from "@/lib/prisma";
import { PLAN_CONFIG } from "./plans";

function getFreePeriodStart() {
  const now = new Date();

  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

function getQuotaPeriod(entitlement) {
  if (entitlement.plan === "FREE") {
    return {
      periodStart: getFreePeriodStart(),
      periodEnd: null,
    };
  }

  const subscription = entitlement.subscription;

  if (!subscription?.currentPeriodStart) {
    throw new Error(
      `Missing subscription billing period for ${entitlement.plan} user`,
    );
  }

  return {
    periodStart: subscription.currentPeriodStart,
    periodEnd: subscription.currentPeriodEnd,
  };
}

export async function consumeGeneration(userId, entitlement) {
  const plan = entitlement.plan;
  const planConfig = PLAN_CONFIG[plan];

  if (!planConfig) {
    throw new Error(`Invalid plan: ${plan}`);
  }

  const limit = planConfig.monthlyGenerations;

  const { periodStart, periodEnd } = getQuotaPeriod(entitlement);

  const rows = await prisma.$queryRaw`
    INSERT INTO "GenerationUsage" (
      "id",
      "userId",
      "periodStart",
      "generationsUsed",
      "createdAt",
      "updatedAt"
    )
    VALUES (
      ${crypto.randomUUID()},
      ${userId},
      ${periodStart},
      1,
      NOW(),
      NOW()
    )
    ON CONFLICT ("userId", "periodStart")
    DO UPDATE
    SET
      "generationsUsed" =
        "GenerationUsage"."generationsUsed" + 1,
      "updatedAt" = NOW()
    WHERE
      "GenerationUsage"."generationsUsed" < ${limit}
    RETURNING "generationsUsed";
  `;

  if (rows.length === 0) {
    return {
      allowed: false,
      used: limit,
      limit,
      remaining: 0,
      periodStart,
      periodEnd,
    };
  }

  const used = Number(rows[0].generationsUsed);

  return {
    allowed: true,
    used,
    limit,
    remaining: Math.max(limit - used, 0),
    periodStart,
    periodEnd,
  };
}
export async function getGenerationUsage(userId, entitlement) {
  const plan = entitlement.plan;
  const planConfig = PLAN_CONFIG[plan];

  if (!planConfig) {
    throw new Error(`Invalid plan: ${plan}`);
  }

  const limit = planConfig.monthlyGenerations;
  const { periodStart, periodEnd } = getQuotaPeriod(entitlement);

  const usage = await prisma.generationUsage.findUnique({
    where: {
      userId_periodStart: {
        userId,
        periodStart,
      },
    },
  });

  const used = usage?.generationsUsed ?? 0;

  return {
    plan,
    used,
    limit,
    remaining: Math.max(limit - used, 0),
    periodStart,
    periodEnd,
  };
}
