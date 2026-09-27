const MODEL_CATALOG = {
  GPT_6_LUNA: {
    label: "GPT-6 Luna",
    value: "gpt-6-luna",
    description: "Fast & efficient",
  },

  GPT_6_SOL: {
    label: "GPT-6 Sol",
    value: "gpt-6-sol",
    description: "Advanced reasoning",
  },
  GPT_6_ASTRA: {
    label: "GPT-6 Astra",
    value: "gpt-6-astra",
    description: "Maximum intelligence",
  },

  GEMINI_3_8_FLASH: {
    label: "Gemini 3.8 Flash",
    value: "gemini-3.8-flash",
    description: "Advanced coding",
  },

  GEMINI_3_5_FLASH_LITE: {
    label: "Gemini 3.5 Flash-Lite",
    value: "gemini-3.5-flash-lite",
    description: "Fast alternative",
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
