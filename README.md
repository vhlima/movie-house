## Overview

Movie House é um projeto de estudo, porém bem real. Baseado nos maiores sites
para cinéfilos como <a href="https://www.imdb.com/" _blank>IMDb</a>, <a href="https://www.rottentomatoes.com/" _blank>Rotten Tomatoes</a> e <a href="https://letterboxd.com/" _blank>Letterboxd</a> e nas redes sociais do <a href="https://www.facebook.com/" _blank>Facebook</a> e <a href="https://www.instagram.com/" _blank>Instagram</a>. Neste projeto, podemos encontrar diversas características em comúm com os sites de referência citados acima, como: criação de posts avaliando filmes, curtidas, comentários, perfil de usuário com opção de seguir outros, adicionar filmes, avaliações e bio. O usuário também pode optar por navegar pelos diversos gêneros de filme que podem ser encontrados através da pagina de categorias, encontrar novos filmes pela página de filmes populares, ou até mesmo ser recomendado baseado em suas escolhas.

## Tecnologias utilizadas
  * Front-end:
    - React.js
    - Next.js (SSG, SSR)
    - Apollo Client (Client para consumir informações do GraphQL)
    - React Icons (Icones de diversas bibliotecas)
    - Formik (Criação de formulários)
    - Yup (Validação de formulários)
    - Framer Motion (Animações)
    - TailwindCSS (Estilização)
  * Back-end
    - Apollo Server (Express por baixo dos panos + GraphQL Schemas, Resolvers e Entities)
    - Type-GraphQL (GraphQL com suporte para TypeScript)
    - GraphQL (Biblioteca JS do GraphQL)
    - TypeORM (ORM para criação de migrations e multipla integração)
    - MongoDB (Para dados não-relacionais)
    - PostgreSQL (Para dados relacionais)

## Live demo
Para uma demonstração de todas as funcionalidades citadas acima <a href="" _blank>clique aqui</a>

## Imagens
![alt Home](https://i.imgur.com/3EKqTdP.png)
![alt Movie](https://i.imgur.com/KqQ7iX7.png)
![alt Profile](https://i.imgur.com/oWliIL8.png)

## Instruções para instalação

- Clonar o repositório
- Instale todas as dependências utilizando `yarn`
- Inicie o back-end utilizando `yarn dev` ou `yarn start`
- Inicie o front-end utilizando `yarn dev` ou `yarn start`
