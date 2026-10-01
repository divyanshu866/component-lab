import { prisma } from "@/lib/prisma";

export async function getUserEntitlement(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      provider: "PADDLE",
      status: "active",
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const isPro = subscription !== null;

  return {
    plan: isPro ? "PRO" : "FREE",
    subscription,
  };
}
