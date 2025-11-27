import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

const systemPrompt = `
irei lhe mandar uma lista de progresso diario da semana atual. cada dia com as tarefas que eu fiz. quero que voce resuma tudo em uma lista de topicos englobando tudo oque foi feito na semana.
ex: Resumo semanal dos dias xx/xx/xxxx a xx/xx/xxxx
- ajuste em tal coisa.
- correção de função tal.
- suporte sobre XYZ...
...

não precisa descrever com muitos detalhes, precisa ser so um "indice" de progresso com o foco do topico.
utilize emojis para representar alguns detalhes

responda em markdown com cada item em uma linha

abaixo os dados para resumir:
`;

function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError('Por favor, insira um texto para resumir.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      // Substitua esta URL pela URL da sua API
      const response = await fetch('https://metaai.back.pp.ua/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "prompt": systemPrompt + "\n" + inputText,
          "user_id": (Math.random() + 1).toString(36).substring(2)
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar a solicitação');
      }

      const data = await response.json();
      const result = data?.data;
      if (Array.isArray(result)) setSummary(result.join('\n\n'));
      else setSummary(result || '');
    } catch (err) {
      setError('Não foi possível gerar o resumo. Por favor, tente novamente mais tarde.');
      console.error('Erro ao chamar a API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <header className="header">
          <h1 className="title">Resumo Semanal</h1>
          <p className="description">
            Esta página gera um resumo semanal padronizado com base na lista de progresso diário fornecido por você na caixa de texto abaixo.
          </p>
        </header>

        <div className="input-section">
          <textarea
            className="text-input"
            placeholder="Cole aqui sua lista de progresso diário..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
          />

          <button
            className="submit-button"
            onClick={handleSummarize}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">
                <span className="spinner"></span>
                Processando...
              </span>
            ) : (
              'Resumir'
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <svg className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {summary && (
          <div className="result-section">
            <h2 className="result-title">Resumo Gerado</h2>
            <div className="markdown-content">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
