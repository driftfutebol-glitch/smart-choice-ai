# Smart Choice AI

Microserviço de atendimento por IA da [Smart Choice Vendas](https://github.com/driftfutebol-glitch/smart-choice-vendas)
— loja de celulares e acessórios em Praia Grande, SP.

Expõe um único endpoint que recebe a pergunta do cliente, consulta o
**Google Gemini** com uma persona de vendedor da loja e devolve a resposta em
texto. O atendimento é deliberadamente limitado: o bot **não informa preços**,
encaminhando a negociação para o WhatsApp da loja.

## API

### `POST /api/chat`

```json
{ "mensagem": "vocês têm iPhone 13?" }
```

**Resposta `200`**

```json
{ "resposta": "Temos sim! Passa no WhatsApp que te mostro as opções..." }
```

**Resposta `500`** — falha na chamada ao modelo; devolve uma mensagem de
fallback orientando o cliente a chamar no WhatsApp, para que o atendimento
nunca fique sem saída.

## Stack

- **Node.js** + **Express** — servidor HTTP
- **@google/generative-ai** — SDK do Gemini (`gemini-1.5-flash`)
- **CORS** liberado para consumo pelo front da loja

## Configuração

A chave da API **não fica no código** — é lida da variável de ambiente e
configurada direto no painel do serviço de hospedagem:

```bash
GEMINI_API_KEY=sua-chave-aqui
```

## Como rodar

```bash
npm install
GEMINI_API_KEY=sua-chave npm start
```

O servidor sobe na porta definida em `PORT` (padrão do Express caso não definida).

## Deploy

Pensado para hospedagem em plataforma com variáveis de ambiente gerenciadas
(Render, Railway, Fly.io). Basta definir `GEMINI_API_KEY` no painel e apontar o
comando de start para `npm start`.
