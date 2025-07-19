// src/components/Mindt/flow/BurnoutFlow.jsx

import React, { useState } from 'react';
import StepNavigation from './StepNavigation';
import SummaryFeedback from './SummaryFeedback';
import InsightBox from './InsightBox';
import getRealtimeInsight from './getRealtimeInsight';
import { useLanguage } from '../../../context/LanguageContext';

// Domande per flusso short
import { burnoutQuestionsShort } from './burnoutQuestionsShort';

// Componenti per flusso full
import EmotionalExhaustionQuestions from './EmotionalExhaustionQuestions';
import DepersonalizationQuestions from './DepersonalizationQuestions';
import PersonalAchievementQuestions from './PersonalAchievementQuestions';

const BurnoutFlow = ({ mode = 'short' }) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [insights, setInsights] = useState([]);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleAnswer = async (key, value, label) => {
    const updatedAnswers = { ...answers, [key]: value };
    setAnswers(updatedAnswers);

    if (mode === 'short') {
      setLoadingInsight(true);
      try {
        const insight = await getRealtimeInsight(label, language, value);
        console.log("📌 Insight ricevuto:", insight);
        const updatedInsights = [...insights];
        updatedInsights[currentStep] = insight;
        setInsights(updatedInsights);
      } catch (error) {
        console.error("Errore generazione insight:", error);
      } finally {
        setLoadingInsight(false);
      }
    }
  };

  const handleNext = () => {
    if (currentStep + 1 < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalSteps = mode === 'short' ? 6 : 3;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-6 text-white">
      {!showSummary ? (
        <>
          {mode === 'short' && (
            <QuestionShortStep
              step={currentStep}
              questions={burnoutQuestionsShort[language]}
              answers={answers}
              onAnswer={handleAnswer}
              insight={insights[currentStep]}
              loading={loadingInsight}
            />
          )}

          {mode === 'full' && (
            <>
              {currentStep === 0 && (
                <EmotionalExhaustionQuestions
                  answers={answers}
                  onAnswer={handleAnswer}
                />
              )}
              {currentStep === 1 && (
                <DepersonalizationQuestions
                  answers={answers}
                  onAnswer={handleAnswer}
                />
              )}
              {currentStep === 2 && (
                <PersonalAchievementQuestions
                  answers={answers}
                  onAnswer={handleAnswer}
                />
              )}
            </>
          )}

          <div className="mt-8">
            <StepNavigation
              onNext={handleNext}
              onBack={handleBack}
              isLast={currentStep + 1 === totalSteps}
              isNextEnabled={!!answers[questionKeys[currentStep]]}
            />
          </div>
        </>
      ) : (
        <SummaryFeedback answers={answers} insights={insights} />
      )}
    </div>
  );
};

export default BurnoutFlow;

const questionKeys = ['EE1', 'EE2', 'DP1', 'DP2', 'RP1', 'RP2'];

const QuestionShortStep = ({ step, questions, answers, onAnswer, insight, loading }) => {
  const key = questionKeys[step];
  const label = questions[key];
  const options = questions.options;

  const total = questionKeys.length;
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="space-y-8 text-center text-white">
      {/* PROGRESS BAR */}
      <div className="w-full max-w-md mx-auto h-2 bg-zinc-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#ee7a4d] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* DOMANDA */}
      <h2 className="text-2xl md:text-3xl font-extrabold leading-snug">
        {label}
      </h2>

      {/* OPZIONI */}
      <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
        {options.map((opt, idx) => {
          const isSelected = answers[key] === idx;

          return (
            <button
              key={idx}
              onClick={() => onAnswer(key, idx, label)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                isSelected
                  ? "bg-white text-[#224344] border-[#ee7a4d]"
                  : "bg-transparent text-white border-white hover:bg-white hover:text-[#224344] hover:border-[#ee7a4d]"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* INSIGHT */}
      {(insight || loading) && (
        <div className="mt-6 max-w-md mx-auto">
          <InsightBox insight={insight} loading={loading} />
        </div>
      )}
    </div>
  );
};
