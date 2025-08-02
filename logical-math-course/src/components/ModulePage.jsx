import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, CheckCircle, BookOpen } from 'lucide-react';

const ModulePage = ({ modules, getModuleProgress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = parseInt(id);
  const module = modules.find(m => m.id === moduleId);
  const [content, setContent] = useState('');

  useEffect(() => {
    // Carregar conteúdo do módulo
    const loadContent = async () => {
      try {
        const response = await fetch(`/src/assets/module${moduleId}_content.md`);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        }
      } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
      }
    };
    
    if (moduleId) {
      loadContent();
    }
  }, [moduleId]);

  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Módulo não encontrado</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  const progress = getModuleProgress(moduleId);
  const previousModule = modules.find(m => m.id === moduleId - 1);
  const nextModule = modules.find(m => m.id === moduleId + 1);

  // Conteúdo estático para demonstração
  const getModuleContent = (id) => {
    const contents = {
      1: {
        title: "Fundamentos do Raciocínio Lógico",
        sections: [
          {
            title: "1.1 Proposições e Conectivos Lógicos",
            content: `Uma proposição é uma sentença declarativa que pode ser classificada como verdadeira (V) ou falsa (F), mas nunca ambas simultaneamente.

**Exemplos:**
• "O Brasil é um país da América do Sul." (Verdadeira)
• "2 + 2 = 5." (Falsa)
• "Qual é o seu nome?" (Não é proposição, pois é uma pergunta)

**Conectivos Lógicos:**
• **Negação (¬):** Inverte o valor lógico
• **Conjunção (∧):** "E" - verdadeira apenas se ambas forem verdadeiras
• **Disjunção (∨):** "Ou" - verdadeira se pelo menos uma for verdadeira
• **Condicional (→):** "Se... então" - falsa apenas se antecedente verdadeiro e consequente falso
• **Bicondicional (↔):** "Se e somente se" - verdadeira se ambas tiverem mesmo valor lógico`
          },
          {
            title: "1.2 Tabelas Verdade",
            content: `Tabelas verdade determinam o valor lógico de proposições compostas considerando todas as combinações possíveis.

**Exemplo - Conjunção (P ∧ Q):**
| P | Q | P ∧ Q |
|---|---|-------|
| V | V |   V   |
| V | F |   F   |
| F | V |   F   |
| F | F |   F   |

**Exemplo - Disjunção (P ∨ Q):**
| P | Q | P ∨ Q |
|---|---|-------|
| V | V |   V   |
| V | F |   V   |
| F | V |   V   |
| F | F |   F   |`
          },
          {
            title: "1.3 Equivalências Lógicas",
            content: `Duas proposições são equivalentes se possuem a mesma tabela verdade.

**Leis de De Morgan:**
• ¬(P ∧ Q) ≡ ¬P ∨ ¬Q
• ¬(P ∨ Q) ≡ ¬P ∧ ¬Q

**Outras Equivalências:**
• Dupla Negação: ¬(¬P) ≡ P
• Condicional: (P → Q) ≡ (¬P ∨ Q)
• Contrapositiva: (P → Q) ≡ (¬Q → ¬P)`
          },
          {
            title: "1.4 Argumentos e Validade",
            content: `Um argumento é válido se a verdade das premissas garante a verdade da conclusão.

**Exemplo de Argumento Válido (Modus Ponens):**
Premissa 1: Se chove, então a rua fica molhada
Premissa 2: Chove
Conclusão: A rua fica molhada

**Exemplo de Argumento Inválido:**
Premissa 1: Se chove, então a rua fica molhada
Premissa 2: A rua está molhada
Conclusão: Chove (INVÁLIDO - pode haver outras causas)`
          }
        ]
      },
      2: {
        title: "Lógica de Predicados e Quantificadores",
        sections: [
          {
            title: "2.1 Sentenças Abertas",
            content: `Uma sentença aberta contém variáveis e se torna proposição quando valores são atribuídos.

**Exemplos:**
• P(x): "x é um número par"
• Q(x, y): "x é maior que y"
• R(x): "x é uma cidade brasileira"`
          },
          {
            title: "2.2 Quantificadores",
            content: `**Quantificador Universal (∀):**
∀x P(x) - "Para todo x, P(x)"

**Quantificador Existencial (∃):**
∃x P(x) - "Existe x tal que P(x)"

**Quantificador Existencial Único (∃!):**
∃!x P(x) - "Existe um único x tal que P(x)"`
          },
          {
            title: "2.3 Negação de Quantificadores",
            content: `**Regras de Negação:**
• ¬(∀x P(x)) ≡ ∃x ¬P(x)
• ¬(∃x P(x)) ≡ ∀x ¬P(x)

**Exemplo:**
• Proposição: "Todos os gatos são pretos"
• Negação: "Existe pelo menos um gato que não é preto"`
          }
        ]
      },
      3: {
        title: "Raciocínio Matemático Básico",
        sections: [
          {
            title: "3.1 Conjuntos e Operações",
            content: `**Operações com Conjuntos:**
• **União (A ∪ B):** Elementos que pertencem a pelo menos um conjunto
• **Interseção (A ∩ B):** Elementos comuns aos dois conjuntos
• **Diferença (A - B):** Elementos de A que não estão em B
• **Complementar (A^c):** Elementos do universo que não estão em A`
          },
          {
            title: "3.2 Porcentagem e Proporção",
            content: `**Cálculos com Porcentagem:**
• x% de V = (x/100) × V
• Aumento de x%: V × (1 + x/100)
• Desconto de x%: V × (1 - x/100)

**Exemplo:**
• 15% de 200 = (15/100) × 200 = 30
• Aumento de 20% em 100 = 100 × 1,2 = 120`
          },
          {
            title: "3.3 Regra de Três",
            content: `**Regra de Três Simples:**
Para grandezas proporcionais, use produtos cruzados.

**Exemplo:**
3 operários → 12 dias
4 operários → x dias
3 × 12 = 4 × x → x = 9 dias`
          },
          {
            title: "3.4 Análise Combinatória",
            content: `**Fórmulas:**
• **Arranjos:** A(n,p) = n!/(n-p)!
• **Permutações:** P(n) = n!
• **Combinações:** C(n,p) = n!/[p! × (n-p)!]

**Dica:** Se a ordem importa, use arranjos. Se não importa, use combinações.`
          }
        ]
      },
      4: {
        title: "Resolução de Problemas",
        sections: [
          {
            title: "4.1 Estratégias de Resolução",
            content: `**Metodologia:**
1. **Compreensão:** Leia e identifique dados e pergunta
2. **Planejamento:** Escolha a estratégia adequada
3. **Execução:** Aplique o método sistematicamente
4. **Verificação:** Confira se a resposta faz sentido`
          },
          {
            title: "4.2 Diagramas Lógicos",
            content: `**Diagramas de Venn:**
Úteis para problemas com conjuntos e suas relações.

**Problemas de Mentira e Verdade:**
• Cavaleiros sempre falam verdade
• Escudeiros sempre mentem
• Analise consistência das declarações`
          },
          {
            title: "4.3 Sequências e Padrões",
            content: `**Tipos de Sequências:**
• **Aritmética:** Diferença constante entre termos
• **Geométrica:** Razão constante entre termos
• **Fibonacci:** Cada termo é soma dos dois anteriores

**Estratégia:** Calcule diferenças entre termos consecutivos para identificar padrões.`
          }
        ]
      },
      5: {
        title: "Raciocínio Analítico e Crítico",
        sections: [
          {
            title: "5.1 Interpretação de Gráficos",
            content: `**Tipos de Gráficos:**
• **Barras:** Comparar categorias
• **Linhas:** Mostrar tendências temporais
• **Pizza:** Representar partes do todo
• **Histogramas:** Distribuição de frequências`
          },
          {
            title: "5.2 Análise de Argumentos",
            content: `**Tipos de Argumentos:**
• **Dedutivos:** Conclusão segue necessariamente das premissas
• **Indutivos:** Conclusão é provável com base nas premissas

**Principais Falácias:**
• Ad Hominem: Atacar a pessoa, não o argumento
• Falsa Dicotomia: Apresentar apenas duas opções
• Generalização Precipitada: Conclusões gerais com poucos exemplos`
          },
          {
            title: "5.3 Tomada de Decisão",
            content: `**Processo:**
1. Definir o problema
2. Gerar alternativas
3. Avaliar opções
4. Escolher a melhor alternativa
5. Implementar e monitorar

**Métodos:**
• Análise de prós e contras
• Matriz de decisão
• Árvore de decisão`
          }
        ]
      }
    };
    return contents[id] || { title: "Módulo", sections: [] };
  };

  const moduleContent = getModuleContent(moduleId);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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
          <span>Voltar</span>
        </button>
        <div className="text-sm text-gray-500">
          Módulo {moduleId} de {modules.length}
        </div>
      </motion.div>

      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <div className="flex items-start space-x-6">
          <div className={`p-4 rounded-xl ${module.color} text-white`}>
            <module.icon size={32} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {module.title}
            </h1>
            <p className="text-gray-600 mb-4">{module.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-2 rounded-full ${module.color}`}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {progress.completed}/{progress.total} exercícios
                </span>
              </div>
              <motion.a
                href={`/modulo/${moduleId}/exercicios`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play size={16} />
                <span>Fazer Exercícios</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Conteúdo do Módulo</h2>
        </div>
        
        <div className="space-y-8">
          {moduleContent.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="border-l-4 border-blue-500 pl-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {section.title}
              </h3>
              <div className="prose prose-gray max-w-none">
                {section.content.split('\n').map((paragraph, pIndex) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h4 key={pIndex} className="font-semibold text-gray-800 mt-4 mb-2">
                        {paragraph.slice(2, -2)}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('•')) {
                    return (
                      <li key={pIndex} className="ml-4 text-gray-700">
                        {paragraph.slice(2)}
                      </li>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={pIndex} className="text-gray-700 mb-3">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between"
      >
        {previousModule ? (
          <motion.a
            href={`/modulo/${previousModule.id}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Módulo Anterior</span>
          </motion.a>
        ) : (
          <div />
        )}
        
        {nextModule ? (
          <motion.a
            href={`/modulo/${nextModule.id}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Próximo Módulo</span>
            <ArrowRight size={16} />
          </motion.a>
        ) : (
          <div />
        )}
      </motion.div>
    </div>
  );
};

export default ModulePage;

