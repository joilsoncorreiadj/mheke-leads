"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ExplanationSection from "../components/ExplanationSection";
import QuestionnaireStep from "../components/QuestionnaireStep";
import ThankYouSection from "../components/ThankYouSection";

export default function Index() {
  const [currentStep, setCurrentStep] = useState('hero');
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleStart = () => {
    setCurrentStep('explanation');
  };

  const handleContinue = () => {
    setCurrentStep('instagram');
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case 'instagram':
        setCurrentStep('difficulty');
        break;
      case 'difficulty':
        setCurrentStep('business');
        break;
      case 'business':
        setCurrentStep('partner');
        break;
      case 'partner':
        setCurrentStep('ticket');
        break;
      case 'ticket':
        setCurrentStep('thanks');
        break;
    }
  };

  const handleRestart = () => {
    setCurrentStep('hero');
    setAnswers({});
  };

  const getStepNumber = () => {
    const steps = ['instagram', 'difficulty', 'business', 'partner', 'ticket'];
    return steps.indexOf(currentStep) + 1;
  };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <AnimatePresence mode="wait">
        {currentStep === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection onStart={handleStart} />
          </motion.div>
        )}

        {currentStep === 'explanation' && (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <ExplanationSection onContinue={handleContinue} />
          </motion.div>
        )}

        {(currentStep === 'instagram' || currentStep === 'difficulty' || currentStep === 'business' || currentStep === 'partner' || currentStep === 'ticket') && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <QuestionnaireStep
              currentStep={currentStep}
              stepNumber={getStepNumber()}
              totalSteps={5}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onNext={handleNextStep}
            />
          </motion.div>
        )}

        {currentStep === 'thanks' && (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ThankYouSection onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 