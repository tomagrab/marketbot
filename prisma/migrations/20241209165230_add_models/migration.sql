/*
  Warnings:

  - You are about to drop the column `stockPriceChange` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `stockPriceChangePercent` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `stockPriceClose` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `stockPriceCurrent` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `stockPriceHigh` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `stockPriceLow` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `stockPriceOpen` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `stockSymbolId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currentPriceId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Industry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Market` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId]` on the table `StockSymbol` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbol]` on the table `StockSymbol` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `StockSymbol` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MarketEventType" AS ENUM ('EARNINGS', 'POLICY_CHANGE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_stockSymbolId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "stockPriceChange",
DROP COLUMN "stockPriceChangePercent",
DROP COLUMN "stockPriceClose",
DROP COLUMN "stockPriceCurrent",
DROP COLUMN "stockPriceHigh",
DROP COLUMN "stockPriceLow",
DROP COLUMN "stockPriceOpen",
DROP COLUMN "stockSymbolId",
ADD COLUMN     "currentPriceId" TEXT;

-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "simulationSpeed" INTEGER,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "StockSymbol" ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Simulation" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "speed" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Simulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "simulationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holding" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketEvent" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "eventType" "MarketEventType" NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceSnapshot" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "high" DECIMAL(10,2) NOT NULL,
    "low" DECIMAL(10,2) NOT NULL,
    "open" DECIMAL(10,2) NOT NULL,
    "close" DECIMAL(10,2) NOT NULL,
    "change" DECIMAL(10,4) NOT NULL,
    "changePct" DECIMAL(5,4) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Holding_portfolioId_companyId_idx" ON "Holding"("portfolioId", "companyId");

-- CreateIndex
CREATE INDEX "MarketEvent_marketId_eventDate_idx" ON "MarketEvent"("marketId", "eventDate");

-- CreateIndex
CREATE INDEX "PriceSnapshot_companyId_timestamp_idx" ON "PriceSnapshot"("companyId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Company_currentPriceId_key" ON "Company"("currentPriceId");

-- CreateIndex
CREATE INDEX "Company_industryId_idx" ON "Company"("industryId");

-- CreateIndex
CREATE INDEX "Company_marketId_idx" ON "Company"("marketId");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_name_key" ON "Industry"("name");

-- CreateIndex
CREATE INDEX "Industry_marketId_idx" ON "Industry"("marketId");

-- CreateIndex
CREATE UNIQUE INDEX "Market_name_key" ON "Market"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StockSymbol_companyId_key" ON "StockSymbol"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "StockSymbol_symbol_key" ON "StockSymbol"("symbol");

-- CreateIndex
CREATE INDEX "StockSymbol_companyId_idx" ON "StockSymbol"("companyId");

-- AddForeignKey
ALTER TABLE "Simulation" ADD CONSTRAINT "Simulation_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "Simulation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketEvent" ADD CONSTRAINT "MarketEvent_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockSymbol" ADD CONSTRAINT "StockSymbol_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceSnapshot" ADD CONSTRAINT "PriceSnapshot_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceSnapshot" ADD CONSTRAINT "PriceSnapshot_id_fkey" FOREIGN KEY ("id") REFERENCES "Company"("currentPriceId") ON DELETE RESTRICT ON UPDATE CASCADE;
