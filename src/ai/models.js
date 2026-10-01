export const MODEL_CATALOG = {
  GPT_6_LUNA: {
    label: "GPT-6 Luna",
    value: "gpt-6-luna",
    description: "Fast & efficient",
    minimumPlan: "FREE",
    allowedEfforts: {
      FREE: ["low", "medium"],
      PRO: ["low", "medium", "high", "xhigh", "max"],
      MAX: ["low", "medium", "high", "xhigh", "max"],
    },
  },

  GPT_6_SOL: {
    label: "GPT-6 Sol",
    value: "gpt-6-sol",
    description: "Advanced reasoning",
    minimumPlan: "PRO",
    allowedEfforts: {
      PRO: ["low", "medium", "high", "xhigh", "max"],
      MAX: ["low", "medium", "high", "xhigh", "max"],
    },
  },
  GPT_6_ASTRA: {
    label: "GPT-6 Astra",
    value: "gpt-6-astra",
    description: "Maximum intelligence",
    minimumPlan: "MAX",
    allowedEfforts: {
      MAX: ["low", "medium", "high", "xhigh", "max"],
    },
  },

  GEMINI_3_8_FLASH: {
    label: "Gemini 3.8 Flash",
    value: "gemini-3.8-flash",
    description: "Advanced coding",
    minimumPlan: "PRO",
    allowedEfforts: {
      PRO: ["low", "medium", "high", "xhigh", "max"],
      MAX: ["low", "medium", "high", "xhigh", "max"],
    },
  },

  GEMINI_3_5_FLASH_LITE: {
    label: "Gemini 3.5 Flash-Lite",
    value: "gemini-3.5-flash-lite",
    description: "Fast alternative",
    minimumPlan: "FREE",
    allowedEfforts: {
      FREE: ["low", "medium"],
      PRO: ["low", "medium", "high", "xhigh", "max"],
      MAX: ["low", "medium", "high", "xhigh", "max"],
    },
  },
};

export const AI_MODELS = [
  MODEL_CATALOG.GPT_6_LUNA,
  MODEL_CATALOG.GPT_6_SOL,
  MODEL_CATALOG.GEMINI_3_8_FLASH,
  MODEL_CATALOG.GEMINI_3_5_FLASH_LITE,
];
export const INTERNAL_MODELS = {
  classifier: MODEL_CATALOG.GPT_6_LUNA,
  classifierFallback: MODEL_CATALOG.GEMINI_3_5_FLASH_LITE,
};
export const CLASSIFIER_MODEL = INTERNAL_MODELS.classifier.value;
