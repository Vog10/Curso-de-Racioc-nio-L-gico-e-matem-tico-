import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BookOpen, Target, CheckCircle, ArrowRight, Menu, X, Home, Map, Trophy } from 'lucide-react';
import './App.css';

// Importar componentes
import HomePage from './components/HomePage';
import ModulePage from './components/ModulePage';
import ExercisePage from './components/ExercisePage';
import MindMapPage from './components/MindMapPage';
import ProgressPage from './components/ProgressPage';

// Dados dos módulos
const modules = [
  {
    id: 1,
    title: "Fundamentos do Raciocínio Lógico",
    description: "Proposições, conectivos lógicos, tabelas verdade e argumentos",
    icon: Brain,
    color: "bg-blue-500",
    completed: false
  },
  {
    id: 2,
    title: "Lógica de Predicados e Quantificadores",
    description: "Sentenças abertas, quantificadores e suas negações",
    icon: Target,
    color: "bg-green-500",
    completed: false
  },
  {
    id: 3,
    title: "Raciocínio Matemático Básico",
    description: "Conjuntos, porcentagem, regra de três e análise combinatória",
    icon: BookOpen,
    color: "bg-purple-500",
    completed: false
  },
  {
    id: 4,
    title: "Resolução de Problemas",
    description: "Estratégias, diagramas lógicos e problemas com sequências",
    icon: CheckCircle,
    color: "bg-orange-500",
    completed: false
  },
  {
    id: 5,
    title: "Raciocínio Analítico e Crítico",
    description: "Interpretação de gráficos, análise de argumentos e tomada de decisão",
    icon: Trophy,
    color: "bg-red-500",
    completed: false
  }
];

function App() {
  const [currentModule, setCurrentModule] = useState(null);
  const [progress, setProgress] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Salvar progresso no localStorage
  useEffect(() => {
    localStorage.setItem('courseProgress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (moduleId, exerciseIndex, correct) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [exerciseIndex]: correct
      }
    }));
  };

  const getModuleProgress = (moduleId) => {
    const moduleProgress = progress[moduleId] || {};
    const completed = Object.values(moduleProgress).filter(Boolean).length;
    const total = 4; // Número de exercícios por módulo
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const Sidebar = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-800">Menu do Curso</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-4">
          <a
            href="/"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Home size={20} className="text-blue-500" />
            <span>Início</span>
          </a>
          
          <a
            href="/mapa-mental"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Map size={20} className="text-green-500" />
            <span>Mapa Mental</span>
          </a>

          <a
            href="/progresso"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Trophy size={20} className="text-purple-500" />
            <span>Progresso</span>
          </a>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">MÓDULOS</h3>
            {modules.map((module) => {
              const moduleProgress = getModuleProgress(module.id);
              return (
                <a
                  key={module.id}
                  href={`/modulo/${module.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${module.color} text-white`}>
                      <module.icon size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{module.title}</div>
                      <div className="text-xs text-gray-500">
                        {moduleProgress.completed}/{moduleProgress.total} exercícios
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {moduleProgress.percentage}%
                  </div>
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </motion.div>
  );

  const Header = () => (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <Brain className="text-blue-500" size={24} />
              <h1 className="text-xl font-bold text-gray-800">
                Raciocínio Lógico e Matemático
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Sidebar />
        
        {/* Overlay para fechar sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
          )}
        </AnimatePresence>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  modules={modules} 
                  getModuleProgress={getModuleProgress}
                />
              } 
            />
            <Route 
              path="/modulo/:id" 
              element={
                <ModulePage 
                  modules={modules}
                  getModuleProgress={getModuleProgress}
                />
              } 
            />
            <Route 
              path="/modulo/:id/exercicios" 
              element={
                <ExercisePage 
                  updateProgress={updateProgress}
                  getModuleProgress={getModuleProgress}
                />
              } 
            />
            <Route path="/mapa-mental" element={<MindMapPage />} />
            <Route 
              path="/progresso" 
              element={
                <ProgressPage 
                  modules={modules}
                  getModuleProgress={getModuleProgress}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

