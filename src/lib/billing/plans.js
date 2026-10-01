export const PLAN_LEVELS = {
  FREE: 0,
  PRO: 1,
  MAX: 2,
};

export const PLAN_CONFIG = {
  FREE: {
    monthlyGenerations: 20,
  },

  PRO: {
    monthlyGenerations: 100,
  },

  MAX: {
    monthlyGenerations: 300,
  },
};

export function hasPlanAccess(userPlan, requiredPlan) {
  const userLevel = PLAN_LEVELS[userPlan] ?? -1;
  const requiredLevel = PLAN_LEVELS[requiredPlan] ?? Infinity;

  return userLevel >= requiredLevel;
}
