// src/components/Mindt/flow/BurnoutFlow.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepNavigation from './StepNavigation';
import getRealtimeInsight from './getRealtimeInsight';
import { useLanguage } from '../../../context/LanguageContext';
import { burnoutQuestionsShort } from './burnoutQuestionsShort';
import EmotionalExhaustionQuestions from './EmotionalExhaustionQuestions';
import DepersonalizationQuestions from './DepersonalizationQuestions';
import PersonalAchievementQuestions from './PersonalAchievementQuestions';
import { logFlow } from '../../../utils/logFlow';

const BurnoutFlow = ({ mode = 'short', onInsightChange, onNextQuestion }) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [insights, setInsights] = useState([]);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const navigate = useNavigate();
  const totalSteps = mode === 'short' ? 6 : 3;

  useEffect(() => {
    logFlow("BurnoutFlow", "Inizio flusso", { mode, language, step: currentStep });
  }, []);

  const handleAnswer = async (key, value, label) => {
    const updatedAnswers = { ...answers, [key]: value };
    setAnswers(updatedAnswers);

    logFlow({
      component: "BurnoutFlow",
      action: `Answered ${label}`,
      data: {
        questionKey: key,
        answerValue: value
      }
    });

    if (mode === 'short') {
      setLoadingInsight(true);
      if (onInsightChange) onInsightChange(null, true);

      try {
        const insight = await getRealtimeInsight(label, value, language);
        const updatedInsights = [...insights];
        updatedInsights[currentStep] = insight;
        setInsights(updatedInsights);

        if (onInsightChange) onInsightChange(insight, false);
      } catch (error) {
        console.error("Errore generazione insight:", error);
        if (onInsightChange) onInsightChange(null, false);
      } finally {
        setLoadingInsight(false);
      }
    }
  };

  const handleNext = () => {
    logFlow({
      component: "BurnoutFlow",
      action: "Clicked → Avanti",
      data: { currentStep }
    });

    if (onNextQuestion) onNextQuestion(); // 👈 RIGA AGGIUNTA

    if (currentStep + 1 < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("burnoutAnswers", JSON.stringify(
        Object.entries(answers).map(([question, score]) => ({ question, score }))
      ));
      localStorage.setItem("burnoutInsights", JSON.stringify(insights));

      navigate("/mindt-finale");

      logFlow({
        component: "BurnoutFlow",
        action: "Test completato",
        data: { answers, insights }
      });
    }
  };

  const handleBack = () => {
    logFlow({
      component: "BurnoutFlow",
      action: "Clicked ← Indietro",
      data: { currentStep }
    });

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 text-white">
      {mode === 'short' && (
        <QuestionShortStep
          step={currentStep}
          questions={burnoutQuestionsShort[language]}
          answers={answers}
          onAnswer={handleAnswer}
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
    </div>
  );
};

export default BurnoutFlow;

const questionKeys = ['EE1', 'EE2', 'DP1', 'DP2', 'RP1', 'RP2'];

const QuestionShortStep = ({ step, questions, answers, onAnswer }) => {
  const key = questionKeys[step];
  const label = questions[key];
  const options = questions.options;

  const total = questionKeys.length;
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="space-y-8 text-center text-white">
      <div className="w-full max-w-md mx-auto h-2 bg-zinc-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#ee7a4d] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="text-2xl md:text-3xl font-extrabold leading-snug">
        {label}
      </h2>

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
    </div>
  );
};
