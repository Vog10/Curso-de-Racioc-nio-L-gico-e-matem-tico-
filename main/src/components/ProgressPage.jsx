import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Target, Clock, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgressPage = ({ modules, getModuleProgress }) => {
  const navigate = useNavigate();

  // Calcular estatísticas gerais
  const totalExercises = modules.length * 4; // 4 exercícios por módulo
  const completedExercises = modules.reduce((acc, module) => {
    const progress = getModuleProgress(module.id);
    return acc + progress.completed;
  }, 0);
  const overallProgress = Math.round((completedExercises / totalExercises) * 100);
  const completedModules = modules.filter(module => {
    const progress = getModuleProgress(module.id);
    return progress.percentage === 100;
  }).length;

  // Calcular tempo estimado restante (assumindo 5 min por exercício)
  const remainingExercises = totalExercises - completedExercises;
  const estimatedTime = remainingExercises * 5;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar ao Início</span>
        </button>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Seu Progresso
        </h1>
        <p className="text-xl text-gray-600">
          Acompanhe seu desempenho e evolução no curso
        </p>
      </motion.div>

      {/* Overall Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-blue-600" size={32} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{overallProgress}%</h3>
          <p className="text-gray-600">Progresso Geral</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-blue-500 h-2 rounded-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-green-600" size={32} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{completedModules}</h3>
          <p className="text-gray-600">Módulos Concluídos</p>
          <p className="text-sm text-gray-500 mt-2">de {modules.length} módulos</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="text-purple-600" size={32} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{completedExercises}</h3>
          <p className="text-gray-600">Exercícios Feitos</p>
          <p className="text-sm text-gray-500 mt-2">de {totalExercises} exercícios</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="text-orange-600" size={32} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{estimatedTime}</h3>
          <p className="text-gray-600">Min. Restantes</p>
          <p className="text-sm text-gray-500 mt-2">tempo estimado</p>
        </div>
      </motion.div>

      {/* Progress by Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Progresso por Módulo</h2>
        <div className="space-y-6">
          {modules.map((module, index) => {
            const progress = getModuleProgress(module.id);
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${module.color} text-white`}>
                      <module.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {module.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{module.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {progress.percentage}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {progress.completed}/{progress.total} exercícios
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + 0.1 * index }}
                      className={`h-3 rounded-full ${module.color}`}
                    />
                  </div>
                  <motion.a
                    href={`/modulo/${module.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {progress.percentage === 100 ? 'Revisar' : progress.percentage > 0 ? 'Continuar' : 'Iniciar'}
                  </motion.a>
                </div>

                {/* Exercise Details */}
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((exerciseIndex) => {
                    const isCompleted = progress[exerciseIndex] === true;
                    const isIncorrect = progress[exerciseIndex] === false;
                    const isNotAttempted = progress[exerciseIndex] === undefined;

                    return (
                      <div
                        key={exerciseIndex}
                        className={`p-2 rounded text-center text-xs font-medium ${
                          isCompleted ? 'bg-green-100 text-green-800' :
                          isIncorrect ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1">
                          {isCompleted && <CheckCircle size={12} />}
                          {isIncorrect && <XCircle size={12} />}
                          <span>Ex. {exerciseIndex + 1}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Achievement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Conquistas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`text-center p-4 rounded-lg ${
            completedExercises >= 5 ? 'bg-yellow-100 border-2 border-yellow-300' : 'bg-gray-100'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              completedExercises >= 5 ? 'bg-yellow-500' : 'bg-gray-400'
            }`}>
              <Trophy className="text-white" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Primeiro Passo</h3>
            <p className="text-gray-600 text-sm">Complete 5 exercícios</p>
            <p className="text-xs text-gray-500 mt-1">
              {completedExercises >= 5 ? '✅ Conquistado!' : `${completedExercises}/5`}
            </p>
          </div>

          <div className={`text-center p-4 rounded-lg ${
            completedModules >= 1 ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-100'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              completedModules >= 1 ? 'bg-blue-500' : 'bg-gray-400'
            }`}>
              <Target className="text-white" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Especialista</h3>
            <p className="text-gray-600 text-sm">Complete 1 módulo</p>
            <p className="text-xs text-gray-500 mt-1">
              {completedModules >= 1 ? '✅ Conquistado!' : `${completedModules}/1`}
            </p>
          </div>

          <div className={`text-center p-4 rounded-lg ${
            overallProgress >= 100 ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              overallProgress >= 100 ? 'bg-green-500' : 'bg-gray-400'
            }`}>
              <CheckCircle className="text-white" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Mestre</h3>
            <p className="text-gray-600 text-sm">Complete todo o curso</p>
            <p className="text-xs text-gray-500 mt-1">
              {overallProgress >= 100 ? '✅ Conquistado!' : `${overallProgress}/100%`}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      {overallProgress < 100 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl p-8 shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Continue Aprendendo!
          </h2>
          <p className="text-gray-600 mb-6">
            Você está indo muito bem! Continue praticando para dominar todos os conceitos.
          </p>
          <motion.a
            href={`/modulo/${modules.find(m => getModuleProgress(m.id).percentage < 100)?.id || 1}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Continuar Estudando
          </motion.a>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressPage;

