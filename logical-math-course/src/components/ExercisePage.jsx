import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import exercisesData from '../assets/exercises.json';

const ExercisePage = ({ updateProgress, getModuleProgress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = parseInt(id);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const moduleKey = `module${moduleId}`;
    if (exercisesData[moduleKey]) {
      setExercises(exercisesData[moduleKey]);
    }
  }, [moduleId]);

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === exercises[currentExercise].answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
      updateProgress(moduleId, currentExercise, true);
    } else {
      updateProgress(moduleId, currentExercise, false);
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Carregando exercícios...</h2>
      </div>
    );
  }

  if (completed) {
    const percentage = Math.round((score / exercises.length) * 100);
    const progress = getModuleProgress(moduleId);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center space-y-8"
      >
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="text-green-600" size={48} />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Exercícios Concluídos!
          </h1>
          
          <div className="space-y-4 mb-8">
            <div className="text-6xl font-bold text-green-600">
              {percentage}%
            </div>
            <p className="text-gray-600">
              Você acertou {score} de {exercises.length} questões
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-green-500 h-3 rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{progress.completed}</div>
              <div className="text-sm text-gray-600">Exercícios Corretos</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{progress.percentage}%</div>
              <div className="text-sm text-gray-600">Progresso do Módulo</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw size={16} />
              <span>Refazer Exercícios</span>
            </motion.button>
            
            <motion.button
              onClick={() => navigate(`/modulo/${moduleId}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Voltar ao Módulo</span>
            </motion.button>
            
            {moduleId < 5 && (
              <motion.button
                onClick={() => navigate(`/modulo/${moduleId + 1}`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>Próximo Módulo</span>
                <ArrowRight size={16} />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  const exercise = exercises[currentExercise];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <button
          onClick={() => navigate(`/modulo/${moduleId}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar ao Módulo</span>
        </button>
        <div className="text-sm text-gray-500">
          Questão {currentExercise + 1} de {exercises.length}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Módulo {moduleId} - Exercícios
          </h2>
          <div className="text-sm text-gray-600">
            Pontuação: {score}/{exercises.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentExercise + (showResult ? 1 : 0)) / exercises.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-blue-500 h-2 rounded-full"
          />
        </div>
      </motion.div>

      {/* Exercise */}
      <motion.div
        key={currentExercise}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {exercise.question}
        </h3>

        <div className="space-y-3 mb-8">
          {exercise.options.map((option, index) => {
            const optionLetter = option.charAt(0);
            const optionText = option.substring(3);
            const isSelected = selectedAnswer === optionLetter;
            const isCorrectAnswer = optionLetter === exercise.answer;
            
            let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
            
            if (showResult) {
              if (isCorrectAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else {
              if (isSelected) {
                buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
              } else {
                buttonClass += "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
              }
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(optionLetter)}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
                className={buttonClass}
                disabled={showResult}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    showResult && isCorrectAnswer ? 'bg-green-500 text-white' :
                    showResult && isSelected && !isCorrectAnswer ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {optionLetter}
                  </div>
                  <span className="flex-1">{optionText}</span>
                  {showResult && isCorrectAnswer && (
                    <CheckCircle className="text-green-500" size={20} />
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <XCircle className="text-red-500" size={20} />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-lg mb-6 ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                {isCorrect ? (
                  <CheckCircle className="text-green-600 mt-1" size={20} />
                ) : (
                  <XCircle className="text-red-600 mt-1" size={20} />
                )}
                <div>
                  <h4 className={`font-semibold mb-2 ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isCorrect ? 'Correto!' : 'Incorreto'}
                  </h4>
                  <p className={`text-sm ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {exercise.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between">
          <div />
          {!showResult ? (
            <motion.button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              whileHover={{ scale: selectedAnswer ? 1.05 : 1 }}
              whileTap={{ scale: selectedAnswer ? 0.95 : 1 }}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                selectedAnswer
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Confirmar Resposta
            </motion.button>
          ) : (
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>
                {currentExercise < exercises.length - 1 ? 'Próxima Questão' : 'Finalizar'}
              </span>
              <ArrowRight size={16} />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ExercisePage;

