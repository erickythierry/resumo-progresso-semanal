# Resumo Semanal - Landing Page

Landing page moderna para gerar resumos semanais padronizados a partir de listas de progresso diário.

## 🚀 Tecnologias

- **React** - Biblioteca para construção da interface
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápida e moderna
- **React Markdown** - Renderização de markdown

## 📦 Instalação

```bash
# Instalar dependências
npm install
```

## 🏃 Como Executar

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm preview
```

## ⚙️ Configuração da API

No arquivo `src/App.tsx`, localize a linha 25 e substitua a URL pela URL da sua API:

```typescript
const response = await fetch('https://sua-api.com/resumir', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: inputText }),
})
```

### Formato Esperado da API

A API deve retornar um JSON com o resumo em markdown:

```json
{
  "summary": "# Resumo\n\n- Item 1\n- Item 2"
}
```

ou

```json
{
  "markdown": "# Resumo\n\n- Item 1\n- Item 2"
}
```

## 🎨 Características

- ✅ Design moderno com tema dark
- ✅ Totalmente responsivo (mobile-friendly)
- ✅ Animações suaves e micro-interações
- ✅ Tratamento de erros
- ✅ Loading state durante processamento
- ✅ Renderização de markdown com estilo
- ✅ TypeScript para maior segurança de tipos

## 📱 Responsividade

A aplicação é totalmente adaptável para:
- Desktop (> 768px)
- Tablet (480px - 768px)
- Mobile (< 480px)

## 🎯 Funcionalidades

1. **Entrada de Texto**: Área de texto para inserir o progresso diário
2. **Botão Resumir**: Envia o texto para a API e processa o resultado
3. **Loading State**: Indicador visual durante o processamento
4. **Tratamento de Erros**: Mensagens amigáveis em caso de erro
5. **Renderização Markdown**: Exibe o resultado formatado em markdown
