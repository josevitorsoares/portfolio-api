<div align="center">
  <img src="https://i.postimg.cc/t4hqNMf2/hero-portfolio.png" alt="Hero do portfólio API" width="100%" />

<br><br>

# José Vitor Soares | Portfolio API 🚀

_Backend for Frontend (BFF) robusto e de alta performance, desenvolvido para suportar as funcionalidades dinâmicas do meu portfólio pessoal._

  <p align="center">
    <a href="https://josevitorsoares.dev"><b>🌐 Acesse o Portfólio (josevitorsoares.dev)</b></a>
  </p>

  <div>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
    <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </div>
</div>

<br>

<details>
  <summary><b>📖 Índice</b></summary>
  <ol>
    <li><a href="#-visão-geral">Visão Geral</a></li>
    <li><a href="#-o-que-você-encontra">O que você encontra</a></li>
    <li><a href="#-destaques-técnicos">Destaques Técnicos</a></li>
    <li><a href="#-stack-e-camadas">Stack e Camadas</a></li>
    <li><a href="#-arquitetura-e-estrutura">Arquitetura e Estrutura</a></li>
    <li><a href="#-propósito-do-repositório">Propósito do Repositório</a></li>
  </ol>
</details>

---

## ✨ Visão Geral

> Este projeto atua como o **motor invisível** do meu portfólio, estruturado como um **BFF (Backend for Frontend)**.

A aplicação centraliza a lógica de negócios, protege chaves de API sensíveis e serve dados pré-formatados para o front-end em React. Foi construída com foco em **alta performance**, **código limpo** e arquitetura escalável.

### 📌 O que você encontra

- 📦 **Rastreamento de Encomendas:** Integração (via API própria `RastroCorreios`) que recebe um código de rastreamento e devolve uma timeline em JSON limpo e formatado.
- 📝 **Gestão de Artigos:** Módulo focado na camada de distribuição de postagens/artigos processados para o front-end.
<!-- - 🐦 **Monitoramento Social:** Base provisionada para integração rápida com APIs sociais (ex: Twitter API v2). -->
- ⚙️ **Tratamento Global de Erros:** Exceções padronizadas mapeadas para as respostas do protocolo HTTP (BadRequest, Unauthorized, TooManyRequests, etc.).

---

## 🚀 Destaques Técnicos

| Área              | Abordagem            | Destaque                                                                           |
| :---------------- | :------------------- | :--------------------------------------------------------------------------------- |
| **Performance**   | `Fastify`            | Framework focado em baixo overhead e máxima velocidade no processamento de rotas.  |
| **Tipagem**       | `TypeScript`         | Segurança em tempo de desenvolvimento na definição de Contratos, DTOs e Entidades. |
| **Integração**    | `Axios`              | Clientes HTTP modularizados e isolados em Gateways para consumo de APIs.           |
| **Cache/Storage** | `Redis`              | Preparado para caching rápido, útil para blindar rate limits de APIs parceiras.    |
| **Arquitetura**   | `Clean Architecture` | Separação semântica profunda: Domínio, Aplicação, Infraestrutura e Apresentação.   |

---

## 🧰 Stack e Camadas

A arquitetura foi escolhida para garantir a responsabilidade única, testabilidade e separação de conceitos essenciais à manutenção a longo prazo:

- **Core:** Node.js, TypeScript
- **Web & Roteamento:** Fastify
- **Data Fetching:** Axios
- **Cache & Infraestrutura:** Redis, Docker Compose (ambiente local)
- **Engenharia de Software:** Clean Architecture, Injeção de Dependências através de Factories e Design Patterns (Gateways, UseCases).

---

## 🗂 Arquitetura e Estrutura

O código-fonte reflete as diretrizes arquiteturais focadas no isolamento do código de negócio em relação ao framework técnico:

```text
src/
 ├── article/        # Domínio de Artigos e Postagens
 ├── tracking/       # Domínio de Rastreamento de Encomendas
 ├── twitter/        # Domínio de Interações com o Twitter/X
 └── shared/         # Elementos globais genéricos, providers e handlers de erros
```

**Diretrizes de Organização (Padrão por Domínio):**

- **Domain:** Contém as entidades principais e enums. Sem dependência de bibliotecas externas.
- **Application:** Contém as lógicas de negócio através dos Casos de Uso (UseCases) e os seus respectivos contratos (Interfaces) e DTOs de I/O.
- **Infrastructure:** Integração com os recursos do mundo real, como banco de dados (Redis), solicitações Axios, hooks (ex: HMAC Validator) etc.
- **Presentation:** Controladores (Controllers) que formatam e manipulam a camada web e rotas.
- **Main:** Centralização de instâncias, onde ocorre a criação dos objetos via Factories, conectando "todas as partes soltas".

---

## 🎯 Propósito do Repositório

Este repositório existe para ser a **espinha dorsal** por trás de `josevitorsoares.dev` e ao mesmo tempo atuar como reflexo prático dos meus conhecimentos no mundo de backend. Demonstra a organização usando `Clean Architecture` e `Domain-Driven Design`, isolando infraestrutura e bibliotecas para construir um produto resistente a mudanças na tecnologia de base.

---

## 🔗 Links Relevantes

- **LinkedIn:** [José Vitor Soares](https://www.linkedin.com/in/josevitorsoares)

---

## 💡 Autor

Feito com 💜 por [José Vitor G. Soares](https://github.com/josevitorsoares)
