## Overview

Movie House é um projeto de estudo, porém bem real. Baseado nos maiores sites para cinéfilos como <a href="https://www.imdb.com/" _blank>IMDb</a>, <a href="https://www.rottentomatoes.com/" _blank>Rotten Tomatoes</a> e <a href="https://letterboxd.com/" _blank>Letterboxd</a> e nas redes sociais <a href="https://www.facebook.com/" _blank>Facebook</a> e <a href="https://www.instagram.com/" _blank>Instagram</a>. Neste projeto podemos encontrar diversas características em comúm com os sites de referência citados acima, como: criação de posts avaliando filmes, curtidas, comentários, perfil de usuário com opção de seguir outros, adicionar filmes, avaliações e bio. O usuário também pode optar por navegar pelos diversos gêneros de filme que podem ser encontrados através da pagina de categorias, encontrar novos filmes pela página de filmes populares, ou até mesmo ser recomendado baseado em suas escolhas.

## Front End Tech Overview

O front-end deste projeto é trabalhado com base nos conceitos SOLID, procurando utilizar ao máximo de micro serviços e single responsibility. O intúito de utilizar este princípio, é que devemos aproveitar da arquitetura unidirecional do React para criação dos micro serviços. Temos muitas páginas que fazem integração com a API externa do TMDB, sendo assim, tornando necessária a utilização do static site generation (SSG) para evitar requisições desnecessárias a API externa. Visando também a parte de SEO, todas as páginas trabalham com server side rendering (SSR)
para uma melhor experiência do usuário.

## Back End Tech Overview

O back-end trabalha com o conceito de entidades e resolvers, conceito amplamente utilizado em back-ends GraphQL.
Utilizamos TypeORM para o gerenciamento total dos bancos de dados necessários para rodarem a aplicação, gerenciamento de entidades jutantamente ao TypeGraphQL e repositórios para consulta de dados.
Função de cada banco de dados: 
  1. PostgreSQL para dados relacionais, que dependem de outras funcionalidades para persistencia de dados.  
  2. MongoDB para dados não-relacionais, que em todos os casos estão vindo da API externa do TMDB, armazenando dados de filmes, atores, entre outros..

## Tecnologias utilizadas
  * Front-end:
    - React.js
    - Next.js (SSG, SSR)
    - NextAuth (Autenticação social server-side com suporte para NextJS)
    - Apollo Client (Gerenciamento de estado e integração com a API GraphQL)
    - React Icons (SVGs de diversas bibliotecas)
    - Formik (Criação de formulários)
    - Yup (Validação de formulários)
    - Framer Motion (Animações)
    - Date-fns (Formatação de datas)
    - TailwindCSS (Estilização)   
  * Back-end:
    - Apollo Server (Express por baixo dos panos + GraphQL Schemas, Resolvers e Entities)
    - NextAuth (Validação de token de usuário por parte do servidor)
    - Type-GraphQL (GraphQL com suporte para TypeScript)
    - GraphQL (Biblioteca JS do GraphQL)
    - TypeORM (ORM para gerenciamento de banco de dados e entidades)
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
