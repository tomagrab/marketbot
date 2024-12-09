### Table of Contents

- [Table of Contents](#table-of-contents)
- [MarketBot: A Simulated Stock Market Experiment](#marketbot-a-simulated-stock-market-experiment)
- [Overview](#overview)
- [About the Experiment](#about-the-experiment)
- [Core Features](#core-features)
  - [Gameplay](#gameplay)
  - [Investor Bot](#investor-bot)
- [Development Approach](#development-approach)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [AI Integration](#ai-integration)
- [Initial Database Schema](#initial-database-schema)
- [Goals of the Experiment](#goals-of-the-experiment)
- [🚀 Quick Start](#-quick-start)
  - [Run the project on a Development Server](#run-the-project-on-a-development-server)
  - [Editing the Page](#editing-the-page)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

---

### MarketBot: A Simulated Stock Market Experiment

> 🛑 **Transparency Notice** | This README was co-written with ChatGPT 4o. Please exercise caution while reading and interpreting.

> 🗒️ **Document Notes** | I basically shotgunned a bunch of information and a couple of Markdown files at ChatGPT 4o and was like "Aye yo fam, spin me up a README" as a sort of starting point for an informative README.

---

### Overview

Welcome to **MarketBot**, a unique web application designed to simulate a stock market where users can interact with an AI-powered "Investor Bot." This project serves a dual purpose:

1. **As an application**, it offers users an engaging and educational experience through gameplay that mimics real-world stock market dynamics.
2. **As an experiment**, it tests the effectiveness of OpenAI’s o1 Pro Mode as a coding companion in a practical software development scenario.

---

### About the Experiment

The MarketBot project is a testbed to evaluate how well o1 Pro Mode assists in real-world software engineering tasks. The experiment aims to assess its capabilities in:

- Refining backend database models.
- Generating useful code and architectural suggestions.
- Assisting in troubleshooting and problem-solving during development.

Unlike traditional development projects, MarketBot starts with a pre-scaffolded project. This allows the focus to remain on incremental development and leveraging o1 Pro Mode for high-value tasks, such as optimizing algorithms, refining data models, and integrating advanced AI functionality.

---

### Core Features

#### Gameplay

MarketBot provides an interactive, simulated stock market experience with the following features:

- **Simulated Stock Market**: A virtual environment with fictional companies, dynamic stock values, and trends that evolve based on pre-defined or randomized algorithms.
- **Customizable Gameplay**: Users can configure initial funds, set the game duration (e.g., one month, one year, five years), and select game modes.
- **Game Modes**:
  - **Automated Mode**: The AI Investor Bot plays independently, showcasing its decision-making capabilities.
  - **Beat the Bot Mode**: Users compete against the bot, with the highest portfolio value at the end of the game determining the winner.

#### Investor Bot

The AI-powered Investor Bot is the heart of MarketBot.

- **AI-Driven Decision-Making**: The bot uses the OpenAI API to analyze simulated market data, including company stock values, historical trends, and fictional news, to make informed buy/sell decisions.
- **Dynamic Adaptation**: It reacts to market changes during gameplay, simulating realistic trading behaviors.

---

### Development Approach

MarketBot is built with a backend-first philosophy, prioritizing robust and scalable database modeling as the foundation for development.

- **Database Models**: Initial database schema has been defined in schema.prisma. o1 Pro Mode is tasked with analyzing and refining these models to align with the project goals.
- **Incremental Development**: The project evolves iteratively, with o1 Pro Mode providing code suggestions and optimizations as the app's functionality expands.
- **Pre-Scaffolded Base**: The core project setup (e.g., dependencies, scaffolding) is already in place, enabling the focus to remain on advanced tasks.

---

### Tech Stack

#### Frontend

- **Next.js (App Router)** with TypeScript: A modern, performant framework for the frontend, providing type safety and a clean developer experience.
- **shadcn/ui**: A design system built with TailwindCSS and Radix UI for elegant, reusable components.

#### Backend

- **Vercel**: A cloud platform for deploying Next.js applications, ensuring scalability and reliability.
- **Prisma ORM**: A robust Object-Relational Mapping tool for seamless database interaction.
- **PostgreSQL (hosted on Neon)**: A scalable and reliable cloud database for managing user data, game states, and market simulations.

#### AI Integration

- **OpenAI API**: Powering the Investor Bot’s decision-making, leveraging ChatGPT to analyze market conditions and execute trades intelligently.

---

### Initial Database Schema

Below are the initial Prisma models I created (with co-pilot autocomplete and minor syntax fixes) specifically for the MarketBot proposal. The initial schema would never be used in Production; it was intended to be inspiration for o1:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Industry {
  id        String    @id @default(uuid())
  name      String
  companies Company[]
  marketId  String
  market    Market    @relation(fields: [marketId], references: [id])
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Company {
  id                      String      @id @default(uuid())
  name                    String
  industryId              String
  industry                Industry    @relation(fields: [industryId], references: [id])
  stockSymbolId           String
  stockSymbol             StockSymbol @relation(fields: [stockSymbolId], references: [id])
  marketId                String
  market                  Market      @relation(fields: [marketId], references: [id])
  stockPriceHigh          Float
  stockPriceLow           Float
  stockPriceCurrent       Float
  stockPriceOpen          Float
  stockPriceClose         Float
  stockPriceChange        Float
  stockPriceChangePercent Float
  createdAt               DateTime    @default(now())
  updatedAt               DateTime    @updatedAt
}

model StockSymbol {
  id        String    @id @default(uuid())
  company   Company[]
  symbol    String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Market {
  id         String     @id @default(uuid())
  name       String
  companies  Company[]
  industries Industry[]
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
}
```

This schema provides the foundation for MarketBot’s backend, capturing relationships between industries, companies, stock symbols, and markets. Future iterations will refine this schema to better support app functionality.

---

### Goals of the Experiment

1. **Showcase AI-Driven Development**:

   - Highlight how o1 Pro Mode assists with backend modeling, algorithm optimization, and overall application architecture.

2. **Deliver a Functional Application**:

   - Build an app that is both entertaining and educational, demonstrating real-world use cases for AI-enhanced decision-making.

3. **Adopt Best Practices**:
   - Ensure scalability, maintainability, and clean architecture for long-term viability.

---

### 🚀 Quick Start

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

#### Run the project on a Development Server

1. Clone the repository:

```bash
git clone https://github.com/tomagrab/marketbot.git
```

2. Navigate into the project directory:

```bash
cd marketbot
```

3. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [`http://localhost:3000`](http://localhost:3000) with your browser to see the result.

#### Editing the Page

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Thank you for exploring the MarketBot project! Whether you’re here for the app, the experiment, or to learn about AI-assisted programming, we hope you find value in this journey.
