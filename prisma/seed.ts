import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Markets
  const sillyStreetMarket = await prisma.market.upsert({
    where: { name: 'SillyStreet' },
    update: {},
    create: {
      name: 'SillyStreet',
      startDate: new Date('2022-01-01'),
      endDate: null,
      simulationSpeed: 1,
    },
  });

  const laughLaneMarket = await prisma.market.upsert({
    where: { name: 'LaughLane' },
    update: {},
    create: {
      name: 'LaughLane',
      startDate: new Date('2023-01-01'),
      endDate: null,
      simulationSpeed: 2,
    },
  });

  // Create Industries under SillyStreet
  const techIndustry = await prisma.industry.upsert({
    where: { name: 'Technology' },
    update: {},
    create: {
      name: 'Technology',
      marketId: sillyStreetMarket.id,
    },
  });

  const healthcareIndustry = await prisma.industry.upsert({
    where: { name: 'Healthcare' },
    update: {},
    create: {
      name: 'Healthcare',
      marketId: sillyStreetMarket.id,
    },
  });

  const financeIndustry = await prisma.industry.upsert({
    where: { name: 'Finance' },
    update: {},
    create: {
      name: 'Finance',
      marketId: sillyStreetMarket.id,
    },
  });

  const consumerGoodsIndustry = await prisma.industry.upsert({
    where: { name: 'Consumer Goods' },
    update: {},
    create: {
      name: 'Consumer Goods',
      marketId: sillyStreetMarket.id,
    },
  });

  const energyIndustry = await prisma.industry.upsert({
    where: { name: 'Energy' },
    update: {},
    create: {
      name: 'Energy',
      marketId: sillyStreetMarket.id,
    },
  });

  // Create some Companies for SillyStreet
  const companyNames = [
    { name: 'GiggleShares Inc', industry: techIndustry },
    { name: 'LaughingStocks LLC', industry: healthcareIndustry },
    { name: 'Punny Papers Co', industry: financeIndustry },
    { name: 'TickleTrade Corp', industry: consumerGoodsIndustry },
    { name: 'Mirthful Markets Ltd', industry: energyIndustry },
  ];

  for (const { name, industry } of companyNames) {
    const company = await prisma.company.create({
      data: {
        name,
        industryId: industry.id,
        marketId: sillyStreetMarket.id,
      },
    });

    // Create a StockSymbol for each Company
    const symbol = name.split(' ')[0].substring(0, 4).toUpperCase();
    await prisma.stockSymbol.upsert({
      where: { symbol },
      update: {},
      create: {
        symbol,
        companyId: company.id,
      },
    });
  }

  // Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob',
    },
  });

  // Print results
  console.log('Seeded data:', {
    sillyStreetMarket,
    laughLaneMarket,
    user1,
    user2,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
