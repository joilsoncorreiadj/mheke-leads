import { useState } from "react";
import { submitForm } from "@/lib/api";

export default function QuestionnaireStep({
  currentStep,
  stepNumber,
  totalSteps,
  answers,
  onAnswerChange,
  onNext
}) {
  const [otherText, setOtherText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    if (!isStepComplete()) return;
    
    if (currentStep === 'ticket') {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        
        // Envia os dados para a API
        const response = await submitForm({
          ...answers,
          submittedAt: new Date().toISOString()
        });
        console.log('Resposta da API:', response);
        // Chama a função onNext para avançar para a próxima etapa
        onNext();
        
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        setSubmitError(error.message || 'Ocorreu um erro ao enviar o formulário. Tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      onNext();
    }
  };

  const handleCheckboxChange = (questionId, option, checked) => {
    const currentAnswers = (answers[questionId] || []);
    if (checked) {
      onAnswerChange(questionId, [...currentAnswers, option]);
    } else {
      onAnswerChange(questionId, currentAnswers.filter(item => item !== option));
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 'instagram':
        return answers.instagram && (answers.instagram).trim() !== '';
      case 'difficulty':
        return answers.difficulty && (answers.difficulty).length > 0;
      case 'business':
        return answers.business && (answers.business).trim() !== '';
      case 'partner':
        return answers.partner && (answers.partner).trim() !== '';
      case 'ticket':
        return answers.ticket && (answers.ticket).trim() !== '';
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'instagram':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Qual o @ da sua marca?
            </h2>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="@mhekebrand"
                value={(answers.instagram) || ''}
                onChange={(e) => onAnswerChange('instagram', e.target.value)}
                className="input-modern w-full text-center text-lg"
                required
              />
            </div>
          </div>
        );

      case 'difficulty':
        const difficultyOptions = [
          'Posicionamento e identidade de marca',
          'Criação de conteúdo estratégico',
          'Vendas e conversão',
          'Outro'
        ];
        const selectedDifficulties = (answers.difficulty || []);

        return (
          <div className="space-y-6">
            <div className="text-center lg:max-w-lg mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-center">
                Qual a sua maior dificuldade com a sua marca hoje?
              </h2>
            </div>
            <p className="text-muted text-center">Marque uma ou mais opções:</p>
            <div className="space-y-2 lg:space-y-4 max-w-2xl mx-auto">
              {difficultyOptions.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border border-border hover:border-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedDifficulties.includes(option)}
                    onChange={(e) => handleCheckboxChange('difficulty', option, e.target.checked)}
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
              {selectedDifficulties.includes('Outro') && (
                <textarea
                  placeholder="Descreva sua dificuldade..."
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  className="input-modern w-full h-24 resize-none"
                />
              )}
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Descreva em poucas palavras o seu negócio
            </h2>
            <div className="max-w-2xl mx-auto">
              <textarea
                placeholder="Somos uma marca de roupas femininas com foco em conforto e estilo para o dia a dia."
                value={(answers.business) || ''}
                onChange={(e) => onAnswerChange('business', e.target.value)}
                className="input-modern w-full h-32 resize-none"
                required
              />
            </div>
          </div>
        );

      case 'partner':
        const partnerOptions = ['Sim', 'Não'];

        return (
          <div className="space-y-6">
            <div className="text-center lg:max-w-lg mx-auto">
              <h2 className="text-xl md:text-4xl font-bold text-center">
                Você possui sócio ou alguém que toma decisões junto com você na marca?
              </h2>
            </div>
            <div className="space-y-4 max-w-md mx-auto">
              {partnerOptions.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border border-border hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="partner"
                    value={option}
                    checked={answers.partner === option}
                    onChange={(e) => onAnswerChange('partner', e.target.value)}
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'ticket':
        const ticketOptions = [
          'R$10 a R$100',
          'R$101 a R$500',
          'R$501 a R$1.000',
          'R$1.001 a R$5.000',
          'Acima de R$5.000'
        ];

        return (
          <div className="space-y-6">
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-xl md:text-4xl font-bold text-center">
                Qual o ticket médio do seu produto?
              </h2>
            </div>
            <div className="space-y-4 max-w-md mx-auto">
              {ticketOptions.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer p-4 px-2 rounded-lg border border-border hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="ticket"
                    value={option}
                    checked={answers.ticket === option}
                    onChange={(e) => onAnswerChange('ticket', e.target.value)}
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-lg">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            <span className="text-sm text-muted">
              Etapa {stepNumber} de {totalSteps}
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 max-w-md mx-auto">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="card-modern">
          {renderStep()}

          <div className="flex justify-center mt-8">
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={!isStepComplete() || isSubmitting}
                className={`btn-primary text-lg ${!isStepComplete() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} min-w-[180px]`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  currentStep === 'ticket' ? 'Finalizar' : 'Próximo'
                )}
              </button>
              {submitError && (
                <p className="mt-3 text-red-400 text-sm">{submitError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}