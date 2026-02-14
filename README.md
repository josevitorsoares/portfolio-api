# Portfolio API 🚀

Backend desenvolvido para suportar as funcionalidades dinâmicas do meu portfólio pessoal ([josevitorsoares.dev](https://www.josevitorsoares.dev)).

Este projeto atua como um **BFF (Backend for Frontend)**, centralizando a lógica de negócios e protegendo as chaves de API sensíveis, servindo os dados já tratados para o front-end em React.

## 🛠 Tecnologias

- **Node.js**: Runtime JavaScript.
- **Fastify**: Framework web focado em alta performance e baixo overhead.
- **Axios**: Para consumo de APIs externas.
- **Twitter API v2**: Integração para monitoramento de posts.
- **RastroCorreios API**: Uma API desenvolvida por mim para consultar objetos dos correios.

## ⚡ Funcionalidades

### 1. Monitoramento Social (TweeDollar)

- Conecta-se à API do Twitter/X.
- Filtra e retorna o último tweet postado pela minha página de monitoramento do dólar ([@tweedollar](https://x.com/tweedollar)).
- Implementa cache para evitar atingir o _rate limit_ da API do Twitter.

### 2. Rastreamento de Encomendas

- Rota que recebe um código de rastreio (ex: `AB123456789BR`).
- Comunica-se com o serviço de logística.
- Formata os dados brutos (timeline de eventos) para uma estrutura JSON limpa consumida pelo front-end.

## 📦 Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/portfolio-api.git
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente (`.env`):

```text
TWITTER_BEARER_TOKEN=sua_chave_aqui
TRACKING_API_KEY=sua_chave_aqui
PORT=3333
```

## 🔗 Links

Portfólio (Frontend): Link do Repo Front

LinkedIn: [José Vitor Soares](https://www.linkedin.com/in/josevitorsoares)
