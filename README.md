## Overview

Movie House is a real but primarily educational project based on some of the largest movie sites for film lovers such as [IMDb](https://www.imdb.com/), [Rotten Tomatoes](https://www.rottentomatoes.com/), and [Letterboxd](https://letterboxd.com/), as well as the social media platforms [Facebook](https://www.facebook.com/) and [Instagram](https://www.instagram.com/). This project shares many features with the aforementioned reference sites, such as creating posts reviewing films, liking and commenting, user profiles with the option to follow others, add movies, ratings, and bio. The user can also choose to browse the various movie genres found on the categories page, find new films on the popular movies page, or even be recommended based on their choices.

## Features

The following are some of the features that can be found in Movie House, many of which are also present in the popular movie site, Letterboxd:

- Creation of posts reviewing movies
- Option to like and comment on posts
- User profile with the option to follow others
- Add movies to your profile
- Rate and review movies
- Search for movies by title, actor, or director
- Browse movies by genre
- Discover new movies based on your preferences
- Personalized movie recommendations
- Follow friends and see what movies they've watched and rated
- View popular and highly-rated movies

## Front End Tech Overview

The front-end architecture is built on the principles of Clean Architecture and Domain-Driven Design (DDD) to create a scalable and maintainable application. The components are organized in a modular way, with each module being self-contained and responsible for a single concern. This makes it easy to add new features or modify existing ones without affecting the rest of the application.

We also use the SOLID principles to ensure that the components are decoupled and easy to test. The components are built using React.js and Next.js, which provides support for Static Site Generation (SSG) and Server-Side Rendering (SSR). This makes the application fast and SEO-friendly.

For state management, we use Apollo Client, which integrates seamlessly with GraphQL APIs. It provides a powerful caching system that ensures data consistency and reduces the number of network requests.

The application also uses NextAuth for social server-side authentication, and Formik and Yup for form creation and validation. For styling, we use TailwindCSS, which provides a utility-first CSS framework that helps us create custom styles quickly and easily.

Overall, the front-end architecture is designed to be modular, scalable, and maintainable, making it easy to add new features and modify existing ones without affecting the rest of the application.

## Back End Tech Overview

The back-end of this project follows the principles of Domain-Driven Design (DDD) and Clean Architecture. The goal of DDD is to align the project's domain model with the actual business needs, while Clean Architecture promotes the separation of concerns and decoupling of the application's layers.

The back-end is built on top of Apollo Server, which uses the popular Express.js framework and GraphQL. The project uses Type-GraphQL, which is a library that allows writing GraphQL resolvers and schema definitions in a strongly typed manner using TypeScript.

TypeORM is used for managing the databases required for the application, including PostgreSQL for relational data and MongoDB for non-relational data. The data is managed through entities, which are defined using the TypeORM decorators and mapped to the database schema.

Overall, the back-end architecture of this project is designed to be modular, scalable, and maintainable. The separation of concerns and the clear boundaries between the layers allow for easy testing, debugging, and maintenance of the codebase.

## Technologies Used
  * Front-end:
    - React.js
    - Next.js (SSG, SSR)
    - NextAuth (Server-side social authentication with support for NextJS)
    - Apollo Client (State management and integration with the GraphQL API)
    - React Icons (SVGs from various libraries)
    - Formik (Form creation)
    - Yup (Form validation)
    - Framer Motion (Animations)
    - Date-fns (Date formatting)
    - TailwindCSS (Styling)
  * Back-end:
    - Apollo Server (Express under the hood + GraphQL Schemas, Resolvers and Entities)
    - NextAuth (User token validation by the server)
    - Type-GraphQL (GraphQL with support for TypeScript)
    - GraphQL (JS library for GraphQL)
    - TypeORM (ORM for database management and entities)
    - MongoDB (For non-relational data)
    - PostgreSQL (For relational data)

## Live demo
For a demonstration of all the features mentioned above, <a href="" _blank>click here</a>

## Images
![alt Home](https://i.imgur.com/ojf5U3G.png)
![alt Movies Discover](https://i.imgur.com/H6K8LM1.png)
![alt Profile 1](https://i.imgur.com/8OfAvUN.png)
![alt Profile 2](https://i.imgur.com/fnRCNtk.png)
![alt Movie List](https://i.imgur.com/t0bv3gu.png)
![alt Movie](https://i.imgur.com/Mw4wyS0.png)

## Installation instructions

- Clone the repository
- Install all dependencies using `yarn`
- Start the back-end using `yarn dev` or `yarn start`
- Start the front-end using `yarn dev
