// src/components/Mindt/flow/burnoutQuestionsFull.js
import { EE } from "./EmotionalExhaustionQuestions";
import { DP } from "./DepersonalizationQuestions";
import { RP } from "./PersonalAchievementQuestions";

export const burnoutQuestionsFull = {
  it: [...EE.it, ...DP.it, ...RP.it],
  en: [...EE.en, ...DP.en, ...RP.en],
  es: [...EE.es, ...DP.es, ...RP.es],
};
