import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mindMapImage from '../assets/logical_math_course_mindmap.png';

const MindMapPage = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = mindMapImage;
    link.download = 'mapa_mental_raciocinio_logico.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={16} />
          <span>Baixar Mapa Mental</span>
        </motion.button>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Mapa Mental do Curso
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Visualize a estrutura completa do curso de Raciocínio Lógico e Matemático. 
          Este mapa mental mostra todos os módulos e seus principais tópicos de forma organizada.
        </p>
      </motion.div>

      {/* Mind Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Eye className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">
              Estrutura Visual do Curso
            </h2>
          </div>
          <p className="text-gray-600">
            Clique na imagem para ampliar ou use o botão de download para salvar em alta resolução
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-lg border-2 border-gray-200 cursor-pointer"
          onClick={handleDownload}
        >
          <img
            src={mindMapImage}
            alt="Mapa Mental do Curso de Raciocínio Lógico e Matemático"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="bg-white bg-opacity-90 rounded-lg p-4 flex items-center space-x-2"
            >
              <Eye size={20} className="text-gray-700" />
              <span className="text-gray-700 font-medium">Clique para ampliar</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Module Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold text-lg">1</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Fundamentos do Raciocínio Lógico
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Proposições e Conectivos</li>
            <li>• Tabelas Verdade</li>
            <li>• Equivalências Lógicas</li>
            <li>• Argumentos e Validade</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-green-600 font-bold text-lg">2</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Lógica de Predicados
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Sentenças Abertas</li>
            <li>• Quantificadores</li>
            <li>• Negação de Quantificadores</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-purple-600 font-bold text-lg">3</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Raciocínio Matemático
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Conjuntos e Operações</li>
            <li>• Porcentagem e Proporção</li>
            <li>• Regra de Três</li>
            <li>• Análise Combinatória</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-orange-600 font-bold text-lg">4</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Resolução de Problemas
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Estratégias de Resolução</li>
            <li>• Diagramas Lógicos</li>
            <li>• Sequências e Padrões</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-red-600 font-bold text-lg">5</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Raciocínio Analítico
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Interpretação de Gráficos</li>
            <li>• Análise de Argumentos</li>
            <li>• Tomada de Decisão</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">∞</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aprendizado Contínuo
            </h3>
            <p className="text-sm text-gray-600">
              Pratique e revise os conceitos quantas vezes precisar
            </p>
          </div>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Por que usar um Mapa Mental?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="text-white" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Visão Geral</h3>
            <p className="text-gray-600 text-sm">
              Compreenda a estrutura completa do curso de uma só vez
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Memorização</h3>
            <p className="text-gray-600 text-sm">
              Facilita a memorização através de associações visuais
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Foco</h3>
            <p className="text-gray-600 text-sm">
              Identifique rapidamente os tópicos mais importantes
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MindMapPage;

