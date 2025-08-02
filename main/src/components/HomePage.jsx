import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Award, BookOpen } from 'lucide-react';

const HomePage = ({ modules, getModuleProgress }) => {
  const totalProgress = modules.reduce((acc, module) => {
    const progress = getModuleProgress(module.id);
    return acc + progress.percentage;
  }, 0) / modules.length;

  const completedModules = modules.filter(module => {
    const progress = getModuleProgress(module.id);
    return progress.percentage === 100;
  }).length;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Curso de{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Raciocínio Lógico
          </span>
          <br />
          e Matemático
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Desenvolva suas habilidades de pensamento crítico e resolução de problemas 
          através de um curso interativo e estruturado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/modulo/1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Começar Curso
            <ArrowRight className="ml-2" size={20} />
          </motion.a>
          <motion.a
            href="/mapa-mental"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
          >
            Ver Mapa Mental
          </motion.a>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-blue-600" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{modules.length}</h3>
          <p className="text-gray-600">Módulos</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award className="text-green-600" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{completedModules}</h3>
          <p className="text-gray-600">Concluídos</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Clock className="text-purple-600" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{Math.round(totalProgress)}%</h3>
          <p className="text-gray-600">Progresso</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="text-orange-600" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">20</h3>
          <p className="text-gray-600">Exercícios</p>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Seu Progresso</h2>
        <div className="space-y-4">
          {modules.map((module, index) => {
            const progress = getModuleProgress(module.id);
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex items-center space-x-4"
              >
                <div className={`p-3 rounded-lg ${module.color} text-white`}>
                  <module.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{module.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + 0.1 * index }}
                        className={`h-2 rounded-full ${module.color}`}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {progress.completed}/{progress.total}
                    </span>
                  </div>
                </div>
                <motion.a
                  href={`/modulo/${module.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {progress.percentage === 100 ? 'Revisar' : progress.percentage > 0 ? 'Continuar' : 'Iniciar'}
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="text-blue-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Conteúdo Estruturado</h3>
          <p className="text-gray-600">
            Aprenda de forma progressiva com conteúdo organizado em módulos didáticos.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Award className="text-green-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Exercícios Interativos</h3>
          <p className="text-gray-600">
            Pratique com exercícios que oferecem feedback imediato e explicações detalhadas.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Clock className="text-purple-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Acompanhamento</h3>
          <p className="text-gray-600">
            Monitore seu progresso e identifique áreas que precisam de mais atenção.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;

